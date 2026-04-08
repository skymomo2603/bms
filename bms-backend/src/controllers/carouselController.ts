import { Request, Response } from "express";
import { prisma } from "../prisma.js";
import {
  CreateCarouselRequest,
  UpdateCarouselRequest,
} from "../types/index.js";
import {
  validateCreateCarousel,
  validateUpdateCarousel,
} from "../utils/carousel.js";

/**
 * GET all carousels
 * @route GET /carousels
 */
export const getAllCarousels = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const banners = await prisma.carousel.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(banners);
  } catch (error) {
    console.error("Error fetching carousels:", error);
    res.status(500).json({ error: "Failed to fetch carousels" });
  }
};

/**
 * GET active carousel
 * @route GET /carousels/active
 */
export const getActiveCarousel = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const banner = await prisma.carousel.findFirst({
      where: { status: "Active" },
      orderBy: { createdAt: "desc" },
    });

    if (!banner) {
      res.status(404).json({ error: "Active carousel not found" });
      return;
    }

    res.json(banner);
  } catch (error) {
    console.error("Error fetching active carousel:", error);
    res.status(500).json({ error: "Failed to fetch active carousel" });
  }
};

/**
 * GET single carousel by ID
 * @route GET /carousels/:id
 */
export const getCarouselById = async (
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

    const banner = await prisma.carousel.findUnique({
      where: { id: parsedId },
    });

    if (!banner) {
      res.status(404).json({ error: "Carousel not found" });
      return;
    }

    res.json(banner);
  } catch (error) {
    console.error("Error fetching carousel:", error);
    res.status(500).json({ error: "Failed to fetch carousel" });
  }
};

/**
 * CREATE new carousel
 * @route POST /carousels
 */
export const createCarousel = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { headline, message, title, remarks, status } =
      req.body as CreateCarouselRequest;

    // Validation
    const validationErrors = validateCreateCarousel({
      headline,
      message,
      title,
      remarks,
      status,
    });

    if (validationErrors.length > 0) {
      res.status(400).json({ error: validationErrors.join(", ") });
      return;
    }

    const nextStatus = status || "Active";

    const banner =
      nextStatus === "Active"
        ? await prisma.$transaction(async (tx) => {
            await tx.carousel.updateMany({
              where: {},
              data: { status: "Inactive" },
            });

            return tx.carousel.create({
              data: {
                headline: headline.trim(),
                message: message.trim(),
                title: title.trim(),
                remarks: remarks.trim(),
                status: nextStatus,
              },
            });
          })
        : await prisma.carousel.create({
            data: {
              headline: headline.trim(),
              message: message.trim(),
              title: title.trim(),
              remarks: remarks.trim(),
              status: nextStatus,
            },
          });

    res.status(201).json(banner);
  } catch (error: any) {
    console.error("Error creating carousel:", error);

    res.status(500).json({ error: "Failed to create carousel" });
  }
};

/**
 * UPDATE carousel
 * @route PUT /carousels/:id
 */
export const updateCarousel = async (
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

    const data = req.body as UpdateCarouselRequest;

    // Validate update payload
    const validationErrors = validateUpdateCarousel(data);
    if (validationErrors.length > 0) {
      res.status(400).json({ error: validationErrors.join(", ") });
      return;
    }

    // Trim strings if provided
    const updateData = {
      ...(data.headline && { headline: data.headline.trim() }),
      ...(data.message && { message: data.message.trim() }),
      ...(data.title && { title: data.title.trim() }),
      ...(data.remarks && { remarks: data.remarks.trim() }),
      ...(data.status && { status: data.status }),
    };

    const banner =
      data.status === "Active"
        ? await prisma.$transaction(async (tx) => {
            await tx.carousel.updateMany({
              where: {
                id: { not: parsedId },
              },
              data: { status: "Inactive" },
            });

            return tx.carousel.update({
              where: { id: parsedId },
              data: updateData,
            });
          })
        : await prisma.carousel.update({
            where: { id: parsedId },
            data: updateData,
          });

    res.json(banner);
  } catch (error: any) {
    console.error("Error updating carousel:", error);

    if (error.code === "P2025") {
      res.status(404).json({ error: "Carousel not found" });
      return;
    }

    res.status(500).json({ error: "Failed to update carousel" });
  }
};

/**
 * DELETE carousel
 * @route DELETE /carousels/:id
 */
export const deleteCarousel = async (
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

    await prisma.carousel.delete({
      where: { id: parsedId },
    });

    res.json({ message: "Carousel deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting carousel:", error);

    if (error.code === "P2025") {
      res.status(404).json({ error: "Carousel not found" });
      return;
    }

    res.status(500).json({ error: "Failed to delete carousel" });
  }
};

/**
 * BULK DELETE carousels
 * @route DELETE /carousels/bulk
 */
export const deleteCarouselsBulk = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { ids } = req.body as { ids: unknown };

    if (!Array.isArray(ids) || ids.length === 0) {
      res.status(400).json({ error: "ids must be a non-empty array" });
      return;
    }

    const parsedIds = (ids as unknown[]).map((id) => parseInt(String(id), 10));

    if (parsedIds.some(isNaN)) {
      res.status(400).json({ error: "All ids must be valid integers" });
      return;
    }

    const { count } = await prisma.carousel.deleteMany({
      where: { id: { in: parsedIds } },
    });

    res.json({ message: `${count} carousel(s) deleted successfully` });
  } catch (error) {
    console.error("Error bulk deleting carousels:", error);
    res.status(500).json({ error: "Failed to delete carousels" });
  }
};

/**
 * Validation helper for CREATE request
 */
/**
 * Validation helper for UPDATE request
 */
