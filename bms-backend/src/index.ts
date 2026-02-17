import "dotenv/config";
import express, { Application } from "express";
import { prisma } from "./prisma.js";
import roomRoutes from "./routes/roomRoutes.js";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/rooms", roomRoutes);

// Root route
app.get("/", (_req, res) => {
  res.send("🚀 Backend is running");
});

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Startup DB check
(async () => {
  try {
    await prisma.$connect();
    console.log("✅ Connected to Postgres at", process.env.DATABASE_URL);
  } catch (err) {
    console.error("❌ Failed to connect to Postgres:", err);
  }
})();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
