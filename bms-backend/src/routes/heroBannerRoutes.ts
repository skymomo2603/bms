import { Request, Response, Router } from "express";
import prisma from "../config/database.js";
import {
  CreateHeroBannerRequest,
  UpdateHeroBannerRequest,
} from "../types/index.js";

const router = Router();

// GET all hero banners
router.get("/", async (req: Request, res: Response) => {
  try {
    const banners = await prisma.heroBanner.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(banners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch banners" });
  }
});

// GET single hero banner
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const banner = await prisma.heroBanner.findUnique({
      where: { id: parseInt(id) },
    });
    if (!banner) {
      return res.status(404).json({ error: "Banner not found" });
    }
    res.json(banner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch banner" });
  }
});

// CREATE hero banner
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, remarks, image, status } =
      req.body as CreateHeroBannerRequest;

    // Validation
    if (!title || !remarks || !image) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const banner = await prisma.heroBanner.create({
      data: {
        title,
        remarks,
        image,
        status,
      },
    });

    res.status(201).json(banner);
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Title already exists" });
    }
    res.status(500).json({ error: "Failed to create banner" });
  }
});

// UPDATE hero banner
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body as UpdateHeroBannerRequest;

    const banner = await prisma.heroBanner.update({
      where: { id: parseInt(id) },
      data,
    });

    res.json(banner);
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Banner not found" });
    }
    res.status(500).json({ error: "Failed to update banner" });
  }
});

// DELETE hero banner
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.heroBanner.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Banner deleted" });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Banner not found" });
    }
    res.status(500).json({ error: "Failed to delete banner" });
  }
});

export default router;
