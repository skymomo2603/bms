import cors from "cors";
import "dotenv/config";
import express, { Application } from "express";
import carouselRoutes from "./routes/carouselRoutes.js";
import heroBannerRoutes from "./routes/heroBannerRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/rooms", roomRoutes);
app.use("/hero-banners", heroBannerRoutes);
app.use("/carousels", carouselRoutes);

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
