import { Request, Response } from "express";
import { prisma } from "../prisma.js";
import {
  CreateHeroBannerRequest,
  UpdateHeroBannerRequest,
} from "../types/index.js";

/**
 * GET all hero banners
 * @route GET /hero-banners
 */
export const getAllHeroBanners = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const banners = await prisma.heroBanner.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(banners);
  } catch (error) {
    console.error("Error fetching hero banners:", error);
    res.status(500).json({ error: "Failed to fetch hero banners" });
  }
};

/**
 * GET single hero banner by ID
 * @route GET /hero-banners/:id
 */
export const getHeroBannerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    const banner = await prisma.heroBanner.findUnique({
      where: { id: parsedId },
    });

    if (!banner) {
      res.status(404).json({ error: "Hero banner not found" });
      return;
    }

    res.json(banner);
  } catch (error) {
    console.error("Error fetching hero banner:", error);
    res.status(500).json({ error: "Failed to fetch hero banner" });
  }
};

/**
 * CREATE new hero banner
 * @route POST /hero-banners
 */
export const createHeroBanner = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, remarks, image, status } =
      req.body as CreateHeroBannerRequest;

    // Validation
    const validationErrors = validateCreateHeroBanner({
      title,
      remarks,
      image,
      status,
    });

    if (validationErrors.length > 0) {
      res.status(400).json({ error: validationErrors.join(", ") });
      return;
    }

    const banner = await prisma.heroBanner.create({
      data: {
        title: title.trim(),
        remarks: remarks.trim(),
        image: image.trim(),
        status: status || "Active",
      },
    });

    res.status(201).json(banner);
  } catch (error: any) {
    console.error("Error creating hero banner:", error);

    // Handle Prisma-specific errors
    if (error.code === "P2002") {
      res.status(409).json({ error: "Title already exists" });
      return;
    }

    res.status(500).json({ error: "Failed to create hero banner" });
  }
};

/**
 * UPDATE hero banner
 * @route PUT /hero-banners/:id
 */
export const updateHeroBanner = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    const data = req.body as UpdateHeroBannerRequest;

    // Validate update payload
    const validationErrors = validateUpdateHeroBanner(data);
    if (validationErrors.length > 0) {
      res.status(400).json({ error: validationErrors.join(", ") });
      return;
    }

    // Trim strings if provided
    const updateData = {
      ...(data.title && { title: data.title.trim() }),
      ...(data.remarks && { remarks: data.remarks.trim() }),
      ...(data.image && { image: data.image.trim() }),
      ...(data.status && { status: data.status }),
    };

    const banner = await prisma.heroBanner.update({
      where: { id: parsedId },
      data: updateData,
    });

    res.json(banner);
  } catch (error: any) {
    console.error("Error updating hero banner:", error);

    if (error.code === "P2025") {
      res.status(404).json({ error: "Hero banner not found" });
      return;
    }

    res.status(500).json({ error: "Failed to update hero banner" });
  }
};

/**
 * DELETE hero banner
 * @route DELETE /hero-banners/:id
 */
export const deleteHeroBanner = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    await prisma.heroBanner.delete({
      where: { id: parsedId },
    });

    res.json({ message: "Hero banner deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting hero banner:", error);

    if (error.code === "P2025") {
      res.status(404).json({ error: "Hero banner not found" });
      return;
    }

    res.status(500).json({ error: "Failed to delete hero banner" });
  }
};

/**
 * Validation helper for CREATE request
 */
function validateCreateHeroBanner(data: CreateHeroBannerRequest): string[] {
  const errors: string[] = [];

  if (!data.title || !data.title.trim()) {
    errors.push("Title is required");
  }

  if (!data.image || !data.image.trim()) {
    errors.push("Image is required");
  }

  if (data.remarks && typeof data.remarks !== "string") {
    errors.push("Remarks must be a string");
  }

  if (data.status && !["Active", "Inactive"].includes(data.status)) {
    errors.push("Status must be 'Active' or 'Inactive'");
  }

  return errors;
}

/**
 * Validation helper for UPDATE request
 */
function validateUpdateHeroBanner(data: UpdateHeroBannerRequest): string[] {
  const errors: string[] = [];

  if (data.title !== undefined && !data.title.trim()) {
    errors.push("Title cannot be empty");
  }

  if (data.image !== undefined && !data.image.trim()) {
    errors.push("Image cannot be empty");
  }

  if (data.remarks !== undefined && typeof data.remarks !== "string") {
    errors.push("Remarks must be a string");
  }

  if (data.status && !["Active", "Inactive"].includes(data.status)) {
    errors.push("Status must be 'Active' or 'Inactive'");
  }

  return errors;
}
