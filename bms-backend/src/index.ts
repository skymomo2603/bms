import "dotenv/config";
import express, { Application } from "express";
import heroBannerRoutes from "./routes/heroBannerRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/rooms", roomRoutes);
app.use("/api/herobanner", heroBannerRoutes);

// Root route
app.get("/", (_req, res) => {
  res.send("🚀 Backend is running");
});

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
