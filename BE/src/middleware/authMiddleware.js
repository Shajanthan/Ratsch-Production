import admin from "../config/firebase.js";

/**
 * Middleware to verify Firebase ID token
 * Adds decoded token to req.user
 */
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const idToken = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!idToken) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required",
      });
    }

    // Verify the token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
