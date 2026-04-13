import type {
  CarouselDto,
  CarouselFormData,
  CarouselImageDto,
  CarouselImageFormData,
  CarouselImagePayload,
  CarouselListFilterValues,
  CarouselPayload,
  CarouselStatus,
} from "@/types/carousel";

import { CAROUSEL_FILTER_KEY } from "@/constants/carousel";

function normalizeCarouselStatus(value: unknown): CarouselStatus {
  return value === "Active" ? "Active" : "Inactive";
}

function toCarouselImageDto(value: unknown): CarouselImageDto {
  const image = value as Partial<CarouselImageDto> | null | undefined;

  return {
    id: Number(image?.id ?? 0),
    image: String(image?.image ?? ""),
    caption: String(image?.caption ?? ""),
    order: Number(image?.order ?? 0),
    status: normalizeCarouselStatus(image?.status),
  };
}

function toCarouselImageDtos(value: unknown): CarouselImageDto[] {
  return Array.isArray(value) ? value.map(toCarouselImageDto) : [];
}

export function validateCarouselForm(formData: CarouselFormData): string[] {
  const errors: string[] = [];

  if (!formData.headline.trim()) {
    errors.push("Headline is required");
  }
  if (!formData.message) {
    errors.push("Message is required");
  }
  if (!formData.title.trim()) {
    errors.push("Title is required");
  }

  if (formData.images.length === 0) {
    errors.push("At least one image is required");
  }

  const seenOrders = new Set<number>();

  formData.images.forEach((image, index) => {
    const rowLabel = `Image row ${index + 1}`;

    if (!image.image.trim()) {
      errors.push(`${rowLabel}: image is required`);
    }

    if (!Number.isInteger(image.order) || image.order < 1) {
      errors.push(`${rowLabel}: order must be a positive integer`);
    } else if (seenOrders.has(image.order)) {
      errors.push(`${rowLabel}: order values must be unique`);
    } else {
      seenOrders.add(image.order);
    }
  });

  return errors;
}

export function toCarouselDto(value: unknown): CarouselDto {
  const carousel =
    (value as
      | (Partial<CarouselDto> & { carouselImage?: unknown[] })
      | null
      | undefined) ?? undefined;

  return {
    id: Number(carousel?.id ?? 0),
    headline: String(carousel?.headline ?? ""),
    message: String(carousel?.message ?? ""),
    title: String(carousel?.title ?? ""),
    remarks: String(carousel?.remarks ?? ""),
    status: normalizeCarouselStatus(carousel?.status),
    images: toCarouselImageDtos(carousel?.images ?? carousel?.carouselImage),
  };
}

export function toCarouselDtos(value: unknown): CarouselDto[] {
  return Array.isArray(value) ? value.map(toCarouselDto) : [];
}

export function toCarouselFormData(carousel: CarouselDto): CarouselFormData {
  return {
    headline: carousel.headline,
    message: carousel.message,
    title: carousel.title,
    remarks: carousel.remarks,
    status: carousel.status,
    images: carousel.images.map(
      (image): CarouselImageFormData => ({
        id: image.id,
        image: image.image,
        caption: image.caption,
        order: image.order,
        status: image.status,
      })
    ),
  };
}

export function toCarouselPayload(formData: CarouselFormData): CarouselPayload {
  return {
    ...formData,
    images: formData.images.map(
      (image): CarouselImagePayload => ({
        ...(image.id ? { id: image.id } : {}),
        image: image.image,
        caption: image.caption.trim(),
        order: image.order,
        status: image.status,
      })
    ),
  };
}

export function filterCarousels(
  carousels: CarouselDto[],
  filters: CarouselListFilterValues
): CarouselDto[] {
  const rawStatus = filters.status;
  const rawKeyword = filters[CAROUSEL_FILTER_KEY];

  const statusFilter =
    typeof rawStatus === "string" && rawStatus !== "All" ? rawStatus : "";

  const keywordFilter =
    typeof rawKeyword === "string" ? rawKeyword.trim().toLowerCase() : "";

  return carousels.filter((carousel) => {
    const matchesStatus = statusFilter
      ? carousel.status.toLowerCase() === statusFilter.toLowerCase()
      : true;
    const matchesKeyword = keywordFilter
      ? carousel.title.toLowerCase().includes(keywordFilter)
      : true;

    return matchesStatus && matchesKeyword;
  });
}
