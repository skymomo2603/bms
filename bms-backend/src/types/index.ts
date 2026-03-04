import { HeroBanner } from "@prisma/client";

export type { HeroBanner };

export interface CreateHeroBannerRequest {
  title: string;
  remarks: string;
  image: string;
  status: "Active" | "Inactive";
}

export interface UpdateHeroBannerRequest {
  title?: string;
  remarks?: string;
  image?: string;
  status?: "Active" | "Inactive";
}
