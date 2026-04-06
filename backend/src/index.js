import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import navbarCategoryRoutes from "./routes/navbarCategoryRoutes.js";
import clientReviewRoutes from "./routes/clientReviewRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import coreValueRoutes from "./routes/coreValueRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import homepageRoutes from "./routes/homepageRoutes.js";
import aboutUsRoutes from "./routes/aboutUsRoutes.js";
import teamMemberRoutes from "./routes/teamMemberRoutes.js";
import cloudinaryRoutes from "./routes/cloudinaryRoutes.js";
import ratschHomeRoutes from "./routes/ratschHomeRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : undefined;
app.use(cors(corsOrigin ? { origin: corsOrigin } : {}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Ratsch Production Backend API",
    version: "1.0.0",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/navbar-categories", navbarCategoryRoutes);
app.use("/api/client-reviews", clientReviewRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/core-values", coreValueRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/homepage", homepageRoutes);
app.use("/api/about-us", aboutUsRoutes);
app.use("/api/team-members", teamMemberRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/ratsch-homepage", ratschHomeRoutes);
app.use("/api/contact", contactRoutes);

// Error handling middleware (must have 4 args for Express to treat as error handler)
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
