import { HeroBannerDto, HeroBannerStatus } from "@/types/herobanner";
import { toHeroBannerDto, toHeroBannerDtos } from "@/utils/herobanner";

function getApiBaseUrl() {
  return (
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3000"
  );
}

export interface HeroBannerPayload {
  title: string;
  remarks: string;
  image: string;
  status: HeroBannerStatus;
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

export async function createHeroBanner(
  data: HeroBannerPayload
): Promise<HeroBannerDto> {
  const response = await fetch(`${getApiBaseUrl()}/hero-banners`, {
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

  return toHeroBannerDto(await response.json());
}

export async function getHeroBanners(): Promise<HeroBannerDto[]> {
  const response = await fetch(`${getApiBaseUrl()}/hero-banners`);

  if (!response.ok) {
    throw new Error("Failed to fetch hero banners");
  }

  return toHeroBannerDtos(await response.json());
}

export async function getActiveHeroBanner(): Promise<HeroBannerDto | null> {
  const response = await fetch(`${getApiBaseUrl()}/hero-banners/active`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch active hero banner");
  }

  return toHeroBannerDto(await response.json());
}

export async function getHeroBanner(id: number): Promise<HeroBannerDto> {
  const response = await fetch(`${getApiBaseUrl()}/hero-banners/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch hero banner");
  }

  return toHeroBannerDto(await response.json());
}

export async function updateHeroBanner(
  id: number,
  data: Partial<HeroBannerPayload>
): Promise<HeroBannerDto> {
  const response = await fetch(`${getApiBaseUrl()}/hero-banners/${id}`, {
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

  return toHeroBannerDto(await response.json());
}

export async function deleteHeroBanners(ids: number[]) {
  const response = await fetch(`${getApiBaseUrl()}/hero-banners/bulk`, {
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

export async function deleteHeroBanner(id: number) {
  const response = await fetch(`${getApiBaseUrl()}/hero-banners/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  return response.json();
}
