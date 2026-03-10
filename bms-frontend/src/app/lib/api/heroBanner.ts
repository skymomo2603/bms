const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface HeroBannerPayload {
  title: string;
  remarks: string;
  image: string;
  status: string;
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

export async function createHeroBanner(data: HeroBannerPayload) {
  const response = await fetch(`${API_BASE_URL}/hero-banners`, {
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

  return response.json();
}

export async function getHeroBanners() {
  const response = await fetch(`${API_BASE_URL}/hero-banners`);

  if (!response.ok) {
    throw new Error("Failed to fetch hero banners");
  }

  return response.json();
}

export async function getHeroBanner(id: number) {
  const response = await fetch(`${API_BASE_URL}/hero-banners/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch hero banner");
  }

  return response.json();
}

export async function updateHeroBanner(
  id: number,
  data: Partial<HeroBannerPayload>
) {
  const response = await fetch(`${API_BASE_URL}/hero-banners/${id}`, {
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

  return response.json();
}

export async function deleteHeroBanner(id: number) {
  const response = await fetch(`${API_BASE_URL}/hero-banners/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  return response.json();
}
