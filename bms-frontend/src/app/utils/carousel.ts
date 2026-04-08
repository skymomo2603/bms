import {
  CarouselDto,
  CarouselFormData,
  CarouselListFilterValues,
  CarouselStatus,
} from "@/types/carousel";

import { CAROUSEL_FILTER_KEY } from "@/constants/carousel";

function normalizeCarouselStatus(value: unknown): CarouselStatus {
  return value === "Active" ? "Active" : "Inactive";
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

  return errors;
}

export function toCarouselDto(value: unknown): CarouselDto {
  const carousel = value as Partial<CarouselDto> | null | undefined;

  return {
    id: Number(carousel?.id ?? 0),
    headline: String(carousel?.headline ?? ""),
    message: String(carousel?.message ?? ""),
    title: String(carousel?.title ?? ""),
    remarks: String(carousel?.remarks ?? ""),
    status: normalizeCarouselStatus(carousel?.status),
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
