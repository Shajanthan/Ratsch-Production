# Ratsch Production

Production guide for the Ratsch Production site: **frontend on Vercel**, **backend on Firebase** (Cloud Functions or Cloud Run), with secrets kept in environment variables (never in code or git).

---

## 1. Keeping your keys secure

- **Never commit `.env` or real secrets.** They are ignored via `.gitignore` (root and `BE/`).
- **Use platform environment variables** for production:
  - **Vercel** → Project → Settings → Environment Variables
  - **Firebase** → Project → Functions → Environment config (or Cloud Run env vars)
- **Use `.env` only locally.** Copy `.env.example` to `.env`, fill in values, and never commit `.env`.
- **Vite (frontend)** only exposes variables that start with `VITE_`. Do **not** put backend secrets in frontend env; use only `VITE_*` for public/build-time config (e.g. API URL, Cloudinary cloud name).

---

## 2. Frontend: Deploy to Vercel

### 2.1 Connect the repo

1. Go to [vercel.com](https://vercel.com) and sign in.
2. **Add New** → **Project** and import your Git repository (e.g. GitHub).
3. Set **Root Directory** to the repo root (where `package.json` and `vite.config.ts` are).
4. **Framework Preset:** Vite (or leave auto).
5. **Build Command:** `npm run build` (default).
6. **Output Directory:** `dist` (Vite default).
7. **Install Command:** `npm install`.

### 2.2 Environment variables (Vercel)

In the project: **Settings → Environment Variables**. Add these for **Production** (and optionally Preview/Development):

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL (no trailing slash) | `https://your-backend.run.app/api` or your Cloud Function URL + `/api` |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Your cloud name from Cloudinary dashboard |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary unsigned upload preset name | Your preset name |

- After adding/changing env vars, **redeploy** (Deployments → ⋮ → Redeploy) so the new values are baked into the build.

### 2.3 Deploy

- Push to your main branch; Vercel will build and deploy.
- Or run **Deploy** from the Vercel dashboard.

Your live site will be at `https://your-project.vercel.app` (or your custom domain).

---

## 3. Backend: Deploy to Firebase / Google Cloud

Your backend is a Node/Express app in `BE/`. You can run it on **Firebase Cloud Functions** (same project as Firebase Auth/Firestore) or **Google Cloud Run**. Both use environment variables for secrets.

### 3.1 Option A: Firebase Cloud Functions

1. **Install Firebase CLI** (if needed):
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Initialize Firebase** in the repo (if not already):
   ```bash
   firebase init
   ```
   - Select **Functions** (and optionally **Hosting** if you use it).
   - Use an existing Firebase project or create one.
   - Choose **JavaScript** or **TypeScript** as needed.
   - This creates a `functions` folder.

3. **Move or link your backend into `functions`:**
   - Either copy the contents of `BE/src` into `functions` and install `BE/` dependencies in `functions`, or
   - Configure `functions` to use your Express app (e.g. in `functions/index.js`):
     ```js
     const functions = require("firebase-functions");
     const app = require("./path-to-your-express-app").default; // or your Express app export
     exports.api = functions.https.onRequest(app);
     ```
   - Ensure the Express app listens to `req`/`res` from the function, not `app.listen(PORT)`.

4. **Set environment variables for Cloud Functions:**
   - Firebase Console → **Build** → **Functions** → your function → **Environment variables** (or use `.env` in `functions` only for local emulator).
   - Or via CLI:
     ```bash
     firebase functions:config:set \
       firebase.project_id="YOUR_PROJECT_ID" \
       firebase.private_key_id="..." \
       # ... etc. For complex values (e.g. private key), use Firebase Console or Secret Manager.
     ```
   - Prefer **Firebase Console → Functions → Environment variables / Secrets** for production so you never commit keys.

5. **Deploy:**
   ```bash
   firebase deploy --only functions
   ```
   - Your API will be at `https://REGION-PROJECT_ID.cloudfunctions.net/api` (or the path you mounted the Express app on).

Use this URL (with the path where your API routes are) as `VITE_API_URL` in Vercel (e.g. `https://...cloudfunctions.net/api`).

### 3.2 Option B: Google Cloud Run

1. **Add a Dockerfile** in `BE/` (if not present). Example:
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   EXPOSE 8080
   CMD ["node", "src/index.js"]
   ```
   - Ensure your Express app uses `process.env.PORT || 8080` (Cloud Run sets `PORT`).

2. **Build and deploy:**
   ```bash
   cd BE
   gcloud run deploy ratsch-api --source . --region REGION --allow-unauthenticated
   ```
   - Set env vars in Cloud Run console: **Edit & Deploy New Revision → Variables & Secrets** and add all keys from the table below.

3. **API URL:** `https://ratsch-api-....run.app`. In your Express app, mount routes under `/api` (e.g. `app.use("/api", routes)`) so that `VITE_API_URL` can be `https://ratsch-api-....run.app/api`.

### 3.3 Backend environment variables (never commit)

Set these in **Firebase Cloud Functions** config or **Cloud Run** environment:

| Variable | Description |
|----------|-------------|
| `PORT` | Optional; Cloud Run / Functions set this. Default in code: `5000`. |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_PRIVATE_KEY_ID` | Service account private key ID |
| `FIREBASE_PRIVATE_KEY` | Service account private key (with `\n` for newlines; often from JSON key file) |
| `FIREBASE_CLIENT_EMAIL` | Service account client email |
| `FIREBASE_CLIENT_ID` | Service account client ID |
| `FIREBASE_AUTH_URI` | Usually `https://accounts.google.com/o/oauth2/auth` |
| `FIREBASE_TOKEN_URI` | Usually `https://oauth2.googleapis.com/token` |
| `FIREBASE_CLIENT_X509_CERT_URL` | Certificate URL from service account JSON |
| `FIREBASE_API_KEY` | Firebase Web API key (used for Auth REST API in login) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

For **CORS** in production, configure `cors` in `BE/src/index.js` to allow your Vercel origin (e.g. `https://your-project.vercel.app`). Example:

```js
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:5173"];
app.use(cors({ origin: allowedOrigins }));
```

Then set `CORS_ORIGIN=https://your-project.vercel.app` in your backend environment.

---

## 4. Local development

- **Frontend:** `npm install` then `npm run dev`. Create `.env` from `.env.example` and set `VITE_API_URL=http://localhost:5000/api` and Cloudinary vars.
- **Backend:** In `BE/`, copy `BE/.env.example` to `BE/.env`, fill in Firebase and Cloudinary values, then `npm install` and `npm run dev` (or `npm start`).
- Never commit `.env` or paste real keys into the README.

---

## 5. Checklist before going live

- [ ] `.env` and `.env.*` (except `.env.example`) are in `.gitignore` and not committed.
- [ ] Vercel env vars set: `VITE_API_URL`, `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_UPLOAD_PRESET`.
- [ ] Backend env vars set on Firebase/Cloud Run (Firebase Admin, Firebase API key, Cloudinary).
- [ ] `VITE_API_URL` points to the **production** backend URL (e.g. Cloud Function or Cloud Run + `/api`).
- [ ] CORS on the backend allows your Vercel (and custom) frontend origin(s).
- [ ] Redeploy frontend after any change to Vite env vars.

---

## 6. Project structure (reference)

- **Root:** Vite + React frontend (`src/`, `index.html`, `vite.config.ts`). Deployed to **Vercel**.
- **BE/:** Express API (Firebase Admin, Cloudinary, auth, projects, services, etc.). Deployed to **Firebase Cloud Functions** or **Google Cloud Run**.
- **Secrets:** Only in environment variables (Vercel for frontend, Firebase/Cloud Run for backend). Use `.env.example` as a template; never commit real `.env` files.
