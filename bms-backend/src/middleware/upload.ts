import multer from "multer";

const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const maxImageSizeInBytes = Number(process.env.MAX_IMAGE_SIZE_BYTES || 10 * 1024 * 1024);

export const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: Number.isFinite(maxImageSizeInBytes)
      ? maxImageSizeInBytes
      : 10 * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    if (!ALLOWED_IMAGE_MIME_TYPES.has(file.mimetype)) {
      callback(new Error("Unsupported image file type"));
      return;
    }

    callback(null, true);
  },
});