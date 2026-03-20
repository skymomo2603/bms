import {
  CreateHeroBannerRequest,
  HeroBannerStatus,
  UpdateHeroBannerRequest,
} from "../types/index.js";

const HERO_BANNER_STATUSES: HeroBannerStatus[] = ["Active", "Inactive"];

export function isHeroBannerStatus(value: unknown): value is HeroBannerStatus {
  return HERO_BANNER_STATUSES.includes(value as HeroBannerStatus);
}

export function validateCreateHeroBanner(
  data: CreateHeroBannerRequest
): string[] {
  const errors: string[] = [];

  if (!data.title || !data.title.trim()) {
    errors.push("Title is required");
  }

  if (!data.image || !data.image.trim()) {
    errors.push("Image is required");
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

  if (data.title !== undefined && !data.title.trim()) {
    errors.push("Title cannot be empty");
  }

  if (data.image !== undefined && !data.image.trim()) {
    errors.push("Image cannot be empty");
  }

  if (data.remarks !== undefined && typeof data.remarks !== "string") {
    errors.push("Remarks must be a string");
  }

  if (data.status !== undefined && !isHeroBannerStatus(data.status)) {
    errors.push("Status must be 'Active' or 'Inactive'");
  }

  return errors;
}
