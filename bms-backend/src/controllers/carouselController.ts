import { Request, Response } from "express";
import { prisma } from "../prisma.js";
import {
  CarouselImageRequest,
  CreateCarouselRequest,
  UpdateCarouselRequest,
} from "../types/index.js";
import {
  validateCreateCarousel,
  validateUpdateCarousel,
} from "../utils/carousel.js";
import {
  deleteStoredImage,
  normalizeStoredImageReference,
  toPublicImageUrl,
} from "../utils/mediaStorage.js";

const carouselWithImagesInclude = {
  carouselImage: {
    orderBy: { order: "asc" as const },
  },
};

function mapCarouselImages(images: CarouselImageRequest[]) {
  return images.map((image) => ({
    image: normalizeStoredImageReference(image.image),
    caption: image.caption?.trim() || null,
    order: image.order,
    status: image.status,
  }));
}

function toCarouselResponse(
  req: Request,
  carousel: {
    id: number;
    headline: string;
    message: string;
    title: string;
    remarks: string;
    status: "Active" | "Inactive";
    createdAt: Date;
    updatedAt: Date;
    carouselImage: Array<{
      id: number;
      carouselId: number;
      image: string;
      caption: string | null;
      order: number;
      status: "Active" | "Inactive";
      createdAt: Date;
      updatedAt: Date;
    }>;
  }
) {
  return {
    ...carousel,
    carouselImage: carousel.carouselImage.map((image) => ({
      ...image,
      image: toPublicImageUrl(req, image.image),
    })),
  };
}

/**
 * GET all carousels
 * @route GET /carousels
 */
export const getAllCarousels = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const carousels = await prisma.carousel.findMany({
      include: carouselWithImagesInclude,
      orderBy: { createdAt: "desc" },
    });
    res.json(carousels.map((carousel) => toCarouselResponse(req, carousel)));
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
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const carousel = await prisma.carousel.findFirst({
      include: carouselWithImagesInclude,
      where: { status: "Active" },
      orderBy: { createdAt: "desc" },
    });

    if (!carousel) {
      res.status(404).json({ error: "Active carousel not found" });
      return;
    }

    res.json(toCarouselResponse(req, carousel));
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

    const carousel = await prisma.carousel.findUnique({
      include: carouselWithImagesInclude,
      where: { id: parsedId },
    });

    if (!carousel) {
      res.status(404).json({ error: "Carousel not found" });
      return;
    }

    res.json(toCarouselResponse(req, carousel));
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
    const { headline, message, title, remarks, status, images } =
      req.body as CreateCarouselRequest;

    // Validation
    const validationErrors = validateCreateCarousel({
      headline,
      message,
      title,
      remarks,
      status,
      images: images.map((image) => ({
        ...image,
        image: normalizeStoredImageReference(image.image),
      })),
    });

    if (validationErrors.length > 0) {
      res.status(400).json({ error: validationErrors.join(", ") });
      return;
    }

    const nextStatus = status || "Active";
    const mappedImages = mapCarouselImages(images);

    const carousel =
      nextStatus === "Active"
        ? await prisma.$transaction(async (tx) => {
            await tx.carousel.updateMany({
              where: {},
              data: { status: "Inactive" },
            });

            return tx.carousel.create({
              include: carouselWithImagesInclude,
              data: {
                headline: headline.trim(),
                message: message.trim(),
                title: title.trim(),
                remarks: remarks.trim(),
                status: nextStatus,
                carouselImage: {
                  create: mappedImages,
                },
              },
            });
          })
        : await prisma.carousel.create({
            include: carouselWithImagesInclude,
            data: {
              headline: headline.trim(),
              message: message.trim(),
              title: title.trim(),
              remarks: remarks.trim(),
              status: nextStatus,
              carouselImage: {
                create: mappedImages,
              },
            },
          });

    res.status(201).json(toCarouselResponse(req, carousel));
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
    const existingCarousel = await prisma.carousel.findUnique({
      include: carouselWithImagesInclude,
      where: { id: parsedId },
    });

    if (!existingCarousel) {
      res.status(404).json({ error: "Carousel not found" });
      return;
    }

    const normalizedImages = data.images?.map((image) => ({
      ...image,
      image: normalizeStoredImageReference(image.image),
    }));

    // Validate update payload
    const validationErrors = validateUpdateCarousel({
      ...data,
      ...(normalizedImages ? { images: normalizedImages } : {}),
    });
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
      ...(normalizedImages && {
        carouselImage: {
          deleteMany: {},
          create: mapCarouselImages(normalizedImages),
        },
      }),
    };

    const carousel =
      data.status === "Active"
        ? await prisma.$transaction(async (tx) => {
            await tx.carousel.updateMany({
              where: {
                id: { not: parsedId },
              },
              data: { status: "Inactive" },
            });

            return tx.carousel.update({
              include: carouselWithImagesInclude,
              where: { id: parsedId },
              data: updateData,
            });
          })
        : await prisma.carousel.update({
            include: carouselWithImagesInclude,
            where: { id: parsedId },
            data: updateData,
          });

    if (normalizedImages) {
      const nextImageKeys = new Set(
        normalizedImages.map((image) => image.image)
      );
      const imagesToDelete = existingCarousel.carouselImage
        .map((image) => image.image)
        .filter(
          (image) => !nextImageKeys.has(normalizeStoredImageReference(image))
        );

      await Promise.all(
        imagesToDelete.map((image) => deleteStoredImage(image))
      );
    }

    res.json(toCarouselResponse(req, carousel));
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

    const existingCarousel = await prisma.carousel.findUnique({
      include: carouselWithImagesInclude,
      where: { id: parsedId },
    });

    if (!existingCarousel) {
      res.status(404).json({ error: "Carousel not found" });
      return;
    }

    await prisma.$transaction(async (tx) => {
      await tx.carouselImage.deleteMany({
        where: { carouselId: parsedId },
      });

      await tx.carousel.delete({
        where: { id: parsedId },
      });
    });

    await Promise.all(
      existingCarousel.carouselImage.map((image) =>
        deleteStoredImage(image.image)
      )
    );

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

    const carousels = await prisma.carousel.findMany({
      include: carouselWithImagesInclude,
      where: { id: { in: parsedIds } },
    });

    const count = await prisma.$transaction(async (tx) => {
      await tx.carouselImage.deleteMany({
        where: { carouselId: { in: parsedIds } },
      });

      const result = await tx.carousel.deleteMany({
        where: { id: { in: parsedIds } },
      });

      return result.count;
    });

    await Promise.all(
      carousels.flatMap((carousel) =>
        carousel.carouselImage.map((image) => deleteStoredImage(image.image))
      )
    );

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
