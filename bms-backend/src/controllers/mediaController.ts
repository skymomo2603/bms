import { Request, Response } from "express";
import { saveUploadedImage, toPublicImageUrl } from "../utils/mediaStorage.js";

type ImageUploadRequest = Request & {
  file?: {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
  };
};

export const uploadImage = async (
  req: ImageUploadRequest,
  res: Response
): Promise<void> => {
  try {
    const folder = typeof req.body.folder === "string" ? req.body.folder : "";
    const uploadedFile = req.file;

    if (!uploadedFile) {
      res.status(400).json({ error: "image file is required" });
      return;
    }

    if (!folder.trim()) {
      res.status(400).json({ error: "folder is required" });
      return;
    }

    const storageKey = await saveUploadedImage(
      {
        buffer: uploadedFile.buffer,
        mimetype: uploadedFile.mimetype,
        originalName: uploadedFile.originalname,
      },
      folder
    );

    res.status(201).json({
      storageKey,
      url: toPublicImageUrl(req, storageKey),
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};
