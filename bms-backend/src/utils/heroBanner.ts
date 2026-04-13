import {
  CreateHeroBannerRequest,
  Status,
  UpdateHeroBannerRequest,
} from "../types/index.js";
import { assertNoInlineImageData } from "./mediaStorage.js";

const HERO_BANNER_STATUSES: Status[] = ["Active", "Inactive"];

export function isHeroBannerStatus(value: unknown): value is Status {
  return HERO_BANNER_STATUSES.includes(value as Status);
}

export function validateCreateHeroBanner(
  data: CreateHeroBannerRequest
): string[] {
  const errors: string[] = [];

  if (!data.headline || !data.headline.trim()) {
    errors.push("Headline is required");
  }

  if (!data.title || !data.title.trim()) {
    errors.push("Title is required");
  }

  if (!data.image || !data.image.trim()) {
    errors.push("Image is required");
  } else {
    const imageError = assertNoInlineImageData(data.image, "Image");
    if (imageError) {
      errors.push(imageError);
    }
  }

  if (data.remarks !== undefined && typeof data.remarks !== "string") {
    errors.push("Remarks must be a string");
  }

  if (data.status !== undefined && !isHeroBannerStatus(data.status)) {
    errors.push("Status must be 'Active' or 'Inactive'");
  }

  return errors;
}

export function validateUpdateHeroBanner(
  data: UpdateHeroBannerRequest
): string[] {
  const errors: string[] = [];

  if (data.headline !== undefined && !data.headline.trim()) {
    errors.push("Headline cannot be empty");
  }

  if (data.title !== undefined && !data.title.trim()) {
    errors.push("Title cannot be empty");
  }

  if (data.image !== undefined && !data.image.trim()) {
    errors.push("Image cannot be empty");
  }

  if (data.image !== undefined && data.image.trim()) {
    const imageError = assertNoInlineImageData(data.image, "Image");
    if (imageError) {
      errors.push(imageError);
    }
  }

  if (data.remarks !== undefined && typeof data.remarks !== "string") {
    errors.push("Remarks must be a string");
  }

  if (data.status !== undefined && !isHeroBannerStatus(data.status)) {
    errors.push("Status must be 'Active' or 'Inactive'");
  }

  return errors;
}
