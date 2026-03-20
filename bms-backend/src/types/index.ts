import { HeroBanner } from "@prisma/client";

export type { HeroBanner };

export type HeroBannerStatus = "Active" | "Inactive";

export interface CreateHeroBannerRequest {
  title: string;
  remarks: string;
  image: string;
  status?: HeroBannerStatus;
}

export interface UpdateHeroBannerRequest {
  title?: string;
  remarks?: string;
  image?: string;
  status?: HeroBannerStatus;
}
