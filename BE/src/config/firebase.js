import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Helper function to parse private key from environment variable
const parsePrivateKey = (key) => {
  if (!key) {
    console.error(
      "⚠️  FIREBASE_PRIVATE_KEY is not set in environment variables",
    );
    return undefined;
  }
  // Remove surrounding quotes if present
  let parsedKey = key.trim();
  if (
    (parsedKey.startsWith('"') && parsedKey.endsWith('"')) ||
    (parsedKey.startsWith("'") && parsedKey.endsWith("'"))
  ) {
    parsedKey = parsedKey.slice(1, -1);
  }
  // Replace escaped newlines with actual newlines
  const finalKey = parsedKey.replace(/\\n/g, "\n");

  // Validate key format (for debugging - only log first few chars)
  if (!finalKey.includes("BEGIN PRIVATE KEY")) {
    console.error(
      "⚠️  Private key format invalid. Expected '-----BEGIN PRIVATE KEY-----'",
    );
  }

  return finalKey;
};

// Initialize Firebase Admin SDK
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: parsePrivateKey(process.env.FIREBASE_PRIVATE_KEY),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

// Validate required fields
const requiredFields = [
  "project_id",
  "private_key",
  "client_email",
  "private_key_id",
];

const missingFields = requiredFields.filter((field) => !serviceAccount[field]);

if (missingFields.length > 0) {
  console.error(
    "Missing required Firebase configuration:",
    missingFields.join(", "),
  );
}

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin initialized successfully");
  }
} catch (error) {
  console.error("Error initializing Firebase Admin:", error.message);
  if (error.message.includes("private key")) {
    console.error("\n⚠️  Private key format issue detected. Please check:");
    console.error(
      "1. Ensure FIREBASE_PRIVATE_KEY in .env includes BEGIN/END markers",
    );
    console.error("2. Ensure \\n characters are present for line breaks");
    console.error("3. Remove any extra quotes around the key value");
  }
}

export default admin;
