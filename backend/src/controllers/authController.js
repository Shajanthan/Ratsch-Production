import admin from "../config/firebase.js";
import axios from "axios";

/**
 * Verify Firebase ID Token
 * @param {string} idToken - Firebase ID token from client
 * @returns {Promise<Object>} - Decoded token with user info
 */
export const verifyToken = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    throw new Error(`Invalid token: ${error.message}`);
  }
};

/**
 * Login endpoint handler
 * Authenticates user with email/username and password
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Use Firebase Auth REST API to sign in with email/password
    const apiKey = process.env.FIREBASE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "Firebase API key not configured",
      });
    }

    const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    const response = await axios.post(authUrl, {
      email: email,
      password: password,
      returnSecureToken: true,
    });

    const { idToken, refreshToken, expiresIn, localId } = response.data;

    // Get user record from Firebase Admin SDK
    const userRecord = await admin.auth().getUser(localId);

    // Return user information and refresh token so client can renew session
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL,
        emailVerified: userRecord.emailVerified,
      },
      token: idToken,
      refreshToken: refreshToken || "",
      expiresIn: expiresIn || 3600,
    });
  } catch (error) {
    console.error("Login error:", error);

    // Handle Firebase Auth errors
    let errorMessage = "Authentication failed";
    if (error.response?.data?.error?.message) {
      const firebaseError = error.response.data.error.message;
      if (firebaseError.includes("INVALID_PASSWORD")) {
        errorMessage = "Invalid password";
      } else if (firebaseError.includes("EMAIL_NOT_FOUND")) {
        errorMessage = "User not found";
      } else if (firebaseError.includes("INVALID_EMAIL")) {
        errorMessage = "Invalid email format";
      } else {
        errorMessage = firebaseError;
      }
    }

    res.status(401).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * Verify user token endpoint
 * Used to verify if a token is still valid
 */
export const verifyUser = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "ID token is required",
      });
    }

    const decodedToken = await verifyToken(idToken);
    const userRecord = await admin.auth().getUser(decodedToken.uid);

    res.status(200).json({
      success: true,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL,
        emailVerified: userRecord.emailVerified,
      },
    });
  } catch (error) {
    console.error("Verify user error:", error);
    res.status(401).json({
      success: false,
      message: error.message || "Token verification failed",
    });
  }
};

/**
 * Refresh ID token using refresh token (no auth required).
 * Keeps session alive until user logs out.
 */
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken: refreshTokenFromBody } = req.body;
    const apiKey = process.env.FIREBASE_API_KEY;

    if (!refreshTokenFromBody) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "Firebase API key not configured",
      });
    }

    const tokenUrl = `https://securetoken.googleapis.com/v1/token?key=${apiKey}`;
    const response = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshTokenFromBody,
      }).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
    );

    const { id_token, refresh_token, expires_in } = response.data;

    res.status(200).json({
      success: true,
      token: id_token,
      refreshToken: refresh_token || refreshTokenFromBody,
      expiresIn: expires_in || 3600,
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    const msg =
      error.response?.data?.error?.message || "Token refresh failed";
    res.status(401).json({
      success: false,
      message: msg,
    });
  }
};

/**
 * Get user by UID
 */
export const getUser = async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({
        success: false,
        message: "User UID is required",
      });
    }

    const userRecord = await admin.auth().getUser(uid);

    res.status(200).json({
      success: true,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL,
        emailVerified: userRecord.emailVerified,
        metadata: {
          creationTime: userRecord.metadata.creationTime,
          lastSignInTime: userRecord.metadata.lastSignInTime,
        },
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(404).json({
      success: false,
      message: error.message || "User not found",
    });
  }
};
