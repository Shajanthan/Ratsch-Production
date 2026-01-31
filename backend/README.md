# Ratsch Production – Backend API

Standalone Node/Express backend for Ratsch Production. Deploy this app separately (e.g. **Google Cloud Run**, **Firebase Cloud Functions**, or any Node host).

---

## Local development

1. Copy `.env.example` to `.env` and fill in your Firebase and Cloudinary values.
2. Install and run:

   ```bash
   npm install
   npm run dev
   ```

   API runs at `http://localhost:5000`. Health check: `GET /`.

---

## Deploy separately

### Google Cloud Run

1. Ensure the app uses `process.env.PORT || 5000` (it does; Cloud Run sets `PORT=8080`).
2. From this directory:

   ```bash
   gcloud run deploy ratsch-api --source . --region REGION --allow-unauthenticated
   ```

3. In Cloud Run → **Variables & Secrets**, add all variables from `.env.example` (never commit `.env`).
4. Set `CORS_ORIGIN` to your frontend URL (e.g. `https://your-app.vercel.app`).
5. Frontend: set `VITE_API_URL` to `https://ratsch-api-....run.app/api` (with `/api`).

### Firebase Cloud Functions

Wire this Express app in `functions/index.js` with `functions.https.onRequest(app)` and deploy with `firebase deploy --only functions`. Set env vars in Firebase Console.

### Other hosts

- Use the included **Dockerfile** for any container host (e.g. AWS ECS, Railway).
- For PaaS (Heroku, Render, etc.), set `PORT` and all env vars; the app uses `process.env.PORT || 5000`.

---

## Environment variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default `5000`; Cloud Run uses `8080`) |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_PRIVATE_KEY_ID` | Service account private key ID |
| `FIREBASE_PRIVATE_KEY` | Service account private key (with `\n` for newlines) |
| `FIREBASE_CLIENT_EMAIL` | Service account client email |
| `FIREBASE_CLIENT_ID` | Service account client ID |
| `FIREBASE_AUTH_URI` | Usually `https://accounts.google.com/o/oauth2/auth` |
| `FIREBASE_TOKEN_URI` | Usually `https://oauth2.googleapis.com/token` |
| `FIREBASE_CLIENT_X509_CERT_URL` | Certificate URL from service account JSON |
| `FIREBASE_API_KEY` | Firebase Web API key |
| `FIREBASE_AUTH_DOMAIN` | e.g. `your-project.firebaseapp.com` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `CORS_ORIGIN` | Comma-separated allowed origins (e.g. frontend URL) |

---

## API base path

Routes are mounted under `/api` (e.g. `/api/auth`, `/api/projects`). The frontend should set `VITE_API_URL` to the backend base URL **including** `/api` (e.g. `https://your-backend.run.app/api`).
