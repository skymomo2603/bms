import { getApiBaseUrl } from "@/lib/api/baseUrl";

export type ImageUploadFolder = "hero-banners" | "carousels";

export interface UploadedImageAsset {
  storageKey: string;
  url: string;
}

const IMAGE_EXTENSION_BY_MIME_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

function isDataUrl(value: string): boolean {
  return /^data:/i.test(value.trim());
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [metadata, data] = dataUrl.split(",", 2);

  if (!metadata || !data) {
    throw new Error("Invalid image data");
  }

  const mimeTypeMatch = metadata.match(/^data:(.*?);base64$/i);
  const mimeType = mimeTypeMatch?.[1] || "application/octet-stream";
  const binaryData = window.atob(data);
  const bytes = new Uint8Array(binaryData.length);

  for (let index = 0; index < binaryData.length; index += 1) {
    bytes[index] = binaryData.charCodeAt(index);
  }

  return new Blob([bytes], { type: mimeType });
}

function getFileExtension(mimeType: string): string {
  return IMAGE_EXTENSION_BY_MIME_TYPE[mimeType] || "bin";
}

async function parseErrorResponse(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type");

  try {
    if (contentType?.includes("application/json")) {
      const error = await response.json();
      return error.error || error.message || `Error ${response.status}`;
    }

    const text = await response.text();
    return text || `Error ${response.status}`;
  } catch {
    return `Error ${response.status}: ${response.statusText}`;
  }
}

export async function uploadImageAsset(
  imageValue: string,
  folder: ImageUploadFolder
): Promise<UploadedImageAsset> {
  if (!isDataUrl(imageValue)) {
    return {
      storageKey: imageValue,
      url: imageValue,
    };
  }

  const blob = dataUrlToBlob(imageValue);
  const extension = getFileExtension(blob.type);
  const formData = new FormData();

  formData.append("folder", folder);
  formData.append("image", blob, `${folder}-${Date.now()}.${extension}`);

  const response = await fetch(`${getApiBaseUrl()}/media/images`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  return (await response.json()) as UploadedImageAsset;
}
