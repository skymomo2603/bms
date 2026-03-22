import { Router } from "express";
import {
  createHeroBanner,
  deleteHeroBanner,
  deleteHeroBannersBulk,
  getActiveHeroBanner,
  getAllHeroBanners,
  getHeroBannerById,
  updateHeroBanner,
} from "../controllers/heroBannerController.js";

const router = Router();

/**
 * Hero Banner Routes
 * All routes are prefixed with /hero-banners in index.ts
 */

// GET all hero banners
router.get("/", getAllHeroBanners);

// GET active hero banner
router.get("/active", getActiveHeroBanner);

// DELETE hero banners (bulk)
router.delete("/bulk", deleteHeroBannersBulk);

// GET single hero banner by ID
router.get("/:id", getHeroBannerById);

// CREATE new hero banner
router.post("/", createHeroBanner);

// UPDATE hero banner
router.put("/:id", updateHeroBanner);

// DELETE hero banner
router.delete("/:id", deleteHeroBanner);

export default router;
