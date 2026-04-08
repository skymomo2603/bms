import {
  CreateCarouselRequest,
  Status,
  UpdateCarouselRequest,
} from "../types/index.js";

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

  return errors;
}
