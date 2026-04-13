import { randomUUID } from "crypto";
import type { Request } from "express";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const IMAGE_EXTENSION_BY_MIME_TYPE: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
};

const IMAGE_FILE_NAME_PATTERN = /^[a-z0-9][a-z0-9-]*(?:\/[a-z0-9][a-z0-9-]*)*$/;
const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;
const DATA_URL_PATTERN = /^data:/i;
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);
const projectRoot = path.resolve(currentDirectory, "../..");

export const MEDIA_PUBLIC_BASE_PATH =
  process.env.MEDIA_PUBLIC_BASE_PATH?.replace(/\/+$/, "") || "/media";

export const MEDIA_STORAGE_ROOT = path.resolve(
  projectRoot,
  process.env.MEDIA_STORAGE_ROOT || "storage/media"
);

export function isDataUrl(value: string): boolean {
  return DATA_URL_PATTERN.test(value.trim());
}

export function isAbsoluteUrl(value: string): boolean {
  return ABSOLUTE_URL_PATTERN.test(value.trim());
}

function sanitizeFolder(folder: string): string {
  const normalized = folder
    .trim()
    .replace(/\\/g, "/")
    .replace(/^\/+|\/+$/g, "");

  if (!normalized || !IMAGE_FILE_NAME_PATTERN.test(normalized)) {
    throw new Error("Invalid media folder");
  }

  return normalized;
}

function toFileExtension(mimeType: string, originalName?: string): string {
  const fromMimeType = IMAGE_EXTENSION_BY_MIME_TYPE[mimeType];
  if (fromMimeType) {
    return fromMimeType;
  }

  const fromOriginalName = path.extname(originalName || "").toLowerCase();
  return fromOriginalName || ".bin";
}

async function saveImageBuffer(
  buffer: Buffer,
  mimeType: string,
  originalName: string | undefined,
  folder: string
): Promise<string> {
  const safeFolder = sanitizeFolder(folder);
  const extension = toFileExtension(mimeType, originalName);
  const storageKey = path.posix.join(safeFolder, `${randomUUID()}${extension}`);
  const absoluteFilePath = path.join(
    MEDIA_STORAGE_ROOT,
    ...storageKey.split("/")
  );

  await fs.mkdir(path.dirname(absoluteFilePath), { recursive: true });
  await fs.writeFile(absoluteFilePath, buffer);

  return storageKey;
}

export async function saveUploadedImage(
  file: { buffer: Buffer; mimetype: string; originalName?: string },
  folder: string
): Promise<string> {
  return saveImageBuffer(file.buffer, file.mimetype, file.originalName, folder);
}

export async function saveDataUrlImage(
  dataUrl: string,
  folder: string,
  originalName?: string
): Promise<string> {
  const trimmedValue = dataUrl.trim();
  const matches = trimmedValue.match(/^data:(.*?);base64,(.*)$/i);

  if (!matches) {
    throw new Error("Invalid image data");
  }

  const [, mimeType, base64Payload] = matches;
  const buffer = Buffer.from(base64Payload, "base64");

  return saveImageBuffer(buffer, mimeType, originalName, folder);
}

function storageKeyFromMediaPath(pathname: string): string | null {
  if (!pathname.startsWith(`${MEDIA_PUBLIC_BASE_PATH}/`)) {
    return null;
  }

  return decodeURIComponent(pathname.slice(MEDIA_PUBLIC_BASE_PATH.length + 1));
}

export function normalizeStoredImageReference(value: string): string {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return trimmedValue;
  }

  if (trimmedValue.startsWith("/")) {
    return storageKeyFromMediaPath(trimmedValue) || trimmedValue;
  }

  if (!isAbsoluteUrl(trimmedValue)) {
    return trimmedValue;
  }

  try {
    const parsedUrl = new URL(trimmedValue);
    return storageKeyFromMediaPath(parsedUrl.pathname) || trimmedValue;
  } catch {
    return trimmedValue;
  }
}

export function isManagedStorageKey(value: string): boolean {
  const normalizedValue = normalizeStoredImageReference(value);

  return Boolean(
    normalizedValue &&
    !normalizedValue.startsWith("/") &&
    !isAbsoluteUrl(normalizedValue) &&
    !isDataUrl(normalizedValue)
  );
}

export async function deleteStoredImage(
  value: string | null | undefined
): Promise<void> {
  if (!value) {
    return;
  }

  const storageKey = normalizeStoredImageReference(value);
  if (!isManagedStorageKey(storageKey)) {
    return;
  }

  const absoluteFilePath = path.join(
    MEDIA_STORAGE_ROOT,
    ...storageKey.split("/")
  );

  try {
    await fs.unlink(absoluteFilePath);
  } catch (error: any) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
}

function toAbsoluteUrl(req: Request, pathname: string): string {
  return new URL(pathname, `${req.protocol}://${req.get("host")}`).toString();
}

export function toPublicImageUrl(req: Request, value: string): string {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return normalizedValue;
  }

  if (isAbsoluteUrl(normalizedValue) || isDataUrl(normalizedValue)) {
    return normalizedValue;
  }

  if (normalizedValue.startsWith("/")) {
    return toAbsoluteUrl(req, normalizedValue);
  }

  return toAbsoluteUrl(
    req,
    `${MEDIA_PUBLIC_BASE_PATH}/${encodeURI(normalizedValue)}`
  );
}

export function assertNoInlineImageData(
  value: string,
  label: string
): string | null {
  if (isDataUrl(value)) {
    return `${label} must be uploaded before saving`;
  }

  return null;
}
