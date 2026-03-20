"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Cropper, { Area } from "react-easy-crop";

const CROP_ASPECT = 1920 / 448;
const OUTPUT_WIDTH = 1920;
const OUTPUT_HEIGHT = 448;

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area
): Promise<string> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise<void>((resolve) => {
    image.onload = () => resolve();
  });

  const canvas = document.createElement("canvas");
  canvas.width = OUTPUT_WIDTH;
  canvas.height = OUTPUT_HEIGHT;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    OUTPUT_WIDTH,
    OUTPUT_HEIGHT
  );

  return canvas.toDataURL("image/jpeg", 0.92);
}

interface ImageCropDialogProps {
  open: boolean;
  imageSrc: string;
  onCancel: () => void;
  onConfirm: (croppedImage: string) => void;
}

export default function ImageCropDialog({
  open,
  imageSrc,
  onCancel,
  onConfirm,
}: ImageCropDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  useEffect(() => {
    if (open) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    }
  }, [open]);

  const handleCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
    onConfirm(cropped);
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="md"
      fullWidth
      disableScrollLock
    >
      <DialogTitle sx={{ color: "var(--text-blue-dark)", fontSize: "1rem" }}>
        Crop Image
        <Typography
          sx={{
            display: "block",
            fontSize: ".78rem",
            color: "var(--text-grey-dark)",
            mt: 0.5,
          }}
        >
          Adjust and zoom to fit the 1920 × 448 hero banner area.
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 280,
            bgcolor: "#111",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={CROP_ASPECT}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </Box>

        <Box sx={{ mt: 2.5, px: 0.5 }}>
          <Typography
            sx={{ fontSize: ".78rem", color: "var(--text-grey-dark)", mb: 0.5 }}
          >
            Zoom
          </Typography>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.05}
            onChange={(_, val) => setZoom(val as number)}
            sx={{ color: "var(--button-bg-blue)" }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onCancel}
          sx={{
            fontSize: "0.8rem",
            textTransform: "none",
            color: "var(--text-blue-dark2)",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          disableElevation
          variant="contained"
          sx={{
            fontSize: "0.8rem",
            textTransform: "none",
            bgcolor: "var(--button-bg-blue)",
            "&:hover": { bgcolor: "var(--button-bg-blue-hover)" },
          }}
        >
          Crop & Use
        </Button>
      </DialogActions>
    </Dialog>
  );
}
