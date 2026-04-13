import { Router } from "express";
import { uploadImage } from "../controllers/mediaController.js";
import { imageUpload } from "../middleware/upload.js";

const router = Router();

router.post("/images", imageUpload.single("image"), uploadImage);

export default router;
