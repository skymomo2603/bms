import { Carousel, CarouselImage, HeroBanner } from "@prisma/client";

export type { Carousel, CarouselImage, HeroBanner };

export type Status = "Active" | "Inactive";

export interface CreateHeroBannerRequest {
  headline: string;
  title: string;
  remarks: string;
  image: string;
  status: Status;
}

export interface UpdateHeroBannerRequest {
  headline: string;
  title: string;
  remarks: string;
  image: string;
  status: Status;
}

export interface CreateCarouselRequest {
  headline: string;
  message: string;
  title: string;
  remarks: string;
  status: Status;
  images: CarouselImageRequest[];
}

export interface UpdateCarouselRequest {
  headline?: string;
  message?: string;
  title?: string;
  remarks?: string;
  status?: Status;
  images?: CarouselImageRequest[];
}

export interface CarouselImageRequest {
  id?: number;
  image: string;
  caption?: string;
  order: number;
  status: Status;
}
