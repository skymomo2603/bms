import { Router } from "express";
import {
  createCarousel,
  deleteCarousel,
  deleteCarouselsBulk,
  getActiveCarousel,
  getAllCarousels,
  getCarouselById,
  updateCarousel,
} from "../controllers/carouselController.js";

const router = Router();

/**
 * Carousel Routes
 * All routes are prefixed with /carousels in index.ts
 */

// GET all carousels
router.get("/", getAllCarousels);

// GET active carousel
router.get("/active", getActiveCarousel);

// DELETE carousels (bulk)
router.delete("/bulk", deleteCarouselsBulk);

// GET single carousel by ID
router.get("/:id", getCarouselById);

// CREATE new carousel
router.post("/", createCarousel);

// UPDATE carousel
router.put("/:id", updateCarousel);

// DELETE carousel
router.delete("/:id", deleteCarousel);

export default router;
