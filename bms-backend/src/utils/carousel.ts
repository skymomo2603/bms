import {
  CarouselImageRequest,
  CreateCarouselRequest,
  Status,
  UpdateCarouselRequest,
} from "../types/index.js";
import { assertNoInlineImageData } from "./mediaStorage.js";

const CAROUSEL_STATUSES: Status[] = ["Active", "Inactive"];

export function isCarouselStatus(value: unknown): value is Status {
  return CAROUSEL_STATUSES.includes(value as Status);
}

export function validateCreateCarousel(data: CreateCarouselRequest): string[] {
  const errors: string[] = [];

  if (!data.headline || !data.headline.trim()) {
    errors.push("Headline is required");
  }

  if (!data.message || !data.message.trim()) {
    errors.push("Message is required");
  }

  if (!data.title || !data.title.trim()) {
    errors.push("Title is required");
  }

  if (data.remarks !== undefined && typeof data.remarks !== "string") {
    errors.push("Remarks must be a string");
  }

  if (data.status !== undefined && !isCarouselStatus(data.status)) {
    errors.push("Status must be 'Active' or 'Inactive'");
  }

  errors.push(...validateCarouselImages(data.images, true));

  return errors;
}

export function validateUpdateCarousel(data: UpdateCarouselRequest): string[] {
  const errors: string[] = [];

  if (data.headline !== undefined && !data.headline.trim()) {
    errors.push("Headline cannot be empty");
  }

  if (data.message !== undefined && !data.message.trim()) {
    errors.push("Message cannot be empty");
  }

  if (data.title !== undefined && !data.title.trim()) {
    errors.push("Title cannot be empty");
  }

  if (data.remarks !== undefined && typeof data.remarks !== "string") {
    errors.push("Remarks must be a string");
  }

  if (data.status !== undefined && !isCarouselStatus(data.status)) {
    errors.push("Status must be 'Active' or 'Inactive'");
  }

  if (data.images !== undefined) {
    errors.push(...validateCarouselImages(data.images, true));
  }

  return errors;
}

function validateCarouselImages(
  images: CarouselImageRequest[] | undefined,
  required: boolean
): string[] {
  const errors: string[] = [];

  if (!images || images.length === 0) {
    if (required) {
      errors.push("At least one carousel image is required");
    }
    return errors;
  }

  const seenOrders = new Set<number>();

  images.forEach((image, index) => {
    const rowLabel = `Image row ${index + 1}`;

    if (!image.image || !image.image.trim()) {
      errors.push(`${rowLabel}: image is required`);
    } else {
      const imageError = assertNoInlineImageData(
        image.image,
        `${rowLabel}: image`
      );
      if (imageError) {
        errors.push(imageError);
      }
    }

    if (image.caption !== undefined && typeof image.caption !== "string") {
      errors.push(`${rowLabel}: caption must be a string`);
    }

    if (!Number.isInteger(image.order) || image.order < 1) {
      errors.push(`${rowLabel}: order must be a positive integer`);
    } else if (seenOrders.has(image.order)) {
      errors.push(`${rowLabel}: order values must be unique`);
    } else {
      seenOrders.add(image.order);
    }

    if (!isCarouselStatus(image.status)) {
      errors.push(`${rowLabel}: status must be 'Active' or 'Inactive'`);
    }
  });

  return errors;
}
