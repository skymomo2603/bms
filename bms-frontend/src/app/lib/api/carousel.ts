import { getApiBaseUrl } from "@/lib/api/baseUrl";
import { CarouselDto, CarouselStatus } from "@/types/carousel";
import { toCarouselDto, toCarouselDtos } from "@/utils/carousel";

export interface CarouselPayload {
  headline: string;
  message: string;
  title: string;
  remarks: string;
  status: CarouselStatus;
}

async function parseErrorResponse(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type");
  try {
    if (contentType?.includes("application/json")) {
      const error = await response.json();
      return error.error || error.message || `Error ${response.status}`;
    } else {
      const text = await response.text();
      return text || `Error ${response.status}`;
    }
  } catch {
    return `Error ${response.status}: ${response.statusText}`;
  }
}

export async function createCarousel(
  data: CarouselPayload
): Promise<CarouselDto> {
  const response = await fetch(`${getApiBaseUrl()}/carousels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  return toCarouselDto(await response.json());
}

export async function getCarousels(): Promise<CarouselDto[]> {
  const response = await fetch(`${getApiBaseUrl()}/carousels`);

  if (!response.ok) {
    throw new Error("Failed to fetch carousels");
  }

  return toCarouselDtos(await response.json());
}

export async function getActiveCarousel(): Promise<CarouselDto | null> {
  const response = await fetch(`${getApiBaseUrl()}/carousels/active`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch active carousel");
  }

  return toCarouselDto(await response.json());
}

export async function getCarousel(id: number): Promise<CarouselDto> {
  const response = await fetch(`${getApiBaseUrl()}/carousels/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch carousel");
  }

  return toCarouselDto(await response.json());
}

export async function updateCarousel(
  id: number,
  data: Partial<CarouselPayload>
): Promise<CarouselDto> {
  const response = await fetch(`${getApiBaseUrl()}/carousels/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  return toCarouselDto(await response.json());
}

export async function deleteCarousels(ids: number[]) {
  const response = await fetch(`${getApiBaseUrl()}/carousels/bulk`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });

  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function deleteCarousel(id: number) {
  const response = await fetch(`${getApiBaseUrl()}/carousels/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  return response.json();
}
