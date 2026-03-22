import {
  HeroBannerDto,
  HeroBannerFormData,
  HeroBannerListFilterValues,
  HeroBannerStatus,
} from "@/types/herobanner";

import { HEROBANNER_FILTER_KEY } from "@/constants/heroBannerList";

function normalizeHeroBannerStatus(value: unknown): HeroBannerStatus {
  return value === "Active" ? "Active" : "Inactive";
}

export function validateHeroBannerForm(formData: HeroBannerFormData): string[] {
  const errors: string[] = [];

  if (!formData.title.trim()) {
    errors.push("Title is required");
  }
  if (!formData.image) {
    errors.push("Image is required");
  }

  return errors;
}

export function toHeroBannerDto(value: unknown): HeroBannerDto {
  const banner = value as Partial<HeroBannerDto> | null | undefined;

  return {
    id: Number(banner?.id ?? 0),
    title: String(banner?.title ?? ""),
    remarks: String(banner?.remarks ?? ""),
    image: String(banner?.image ?? ""),
    status: normalizeHeroBannerStatus(banner?.status),
  };
}

export function toHeroBannerDtos(value: unknown): HeroBannerDto[] {
  return Array.isArray(value) ? value.map(toHeroBannerDto) : [];
}

export function toHeroBannerFormData(
  banner: HeroBannerDto
): HeroBannerFormData {
  return {
    title: banner.title,
    remarks: banner.remarks,
    image: banner.image,
    status: banner.status,
  };
}

export function filterHeroBanners(
  banners: HeroBannerDto[],
  filters: HeroBannerListFilterValues
): HeroBannerDto[] {
  const rawStatus = filters.status;
  const rawKeyword = filters[HEROBANNER_FILTER_KEY];

  const statusFilter =
    typeof rawStatus === "string" && rawStatus !== "All" ? rawStatus : "";

  const keywordFilter =
    typeof rawKeyword === "string" ? rawKeyword.trim().toLowerCase() : "";

  return banners.filter((banner) => {
    const matchesStatus = statusFilter
      ? banner.status.toLowerCase() === statusFilter.toLowerCase()
      : true;
    const matchesKeyword = keywordFilter
      ? banner.title.toLowerCase().includes(keywordFilter)
      : true;

    return matchesStatus && matchesKeyword;
  });
}
