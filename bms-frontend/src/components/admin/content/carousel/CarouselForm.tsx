"use client";

import {
  AddOutlined as AddOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
  UploadOutlined as UploadIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";

import FormSection from "@/components/admin/common/FormSection";
import { FORM_DEFAULTS, STATUS_OPTIONS } from "@/constants/carousel";
import type {
  CarouselFormData,
  CarouselFormProps,
  CarouselImageFormData,
  CarouselStatus,
} from "@/types/carousel";
import {
  actionButtonSx,
  imageEmptyStateSx,
  imagePreviewFrameSx,
  imagePreviewSx,
  selectFieldSx,
  textFieldSx,
} from "./CarouselForm.styles";

import ImageCropDialog from "./ImageCropDialog";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const getInitialFormData = (
  initialData?: Partial<CarouselFormData>
): CarouselFormData => ({
  headline: initialData?.headline ?? FORM_DEFAULTS.headline,
  message: initialData?.message ?? FORM_DEFAULTS.message,
  title: initialData?.title ?? FORM_DEFAULTS.title,
  remarks: initialData?.remarks ?? FORM_DEFAULTS.remarks,
  status: initialData?.status ?? FORM_DEFAULTS.status,
  images:
    initialData?.images?.map((image) => ({
      ...image,
    })) ?? [],
});

function getNextImageOrder(images: CarouselImageFormData[]): number {
  if (images.length === 0) {
    return 1;
  }

  return Math.max(...images.map((image) => image.order), 0) + 1;
}

type ImagePickerTarget = number | "new" | null;

export default function CarouselForm({
  initialData,
  onSubmit,
  onNew,
  isLoading = false,
}: CarouselFormProps) {
  const [formData, setFormData] = useState<CarouselFormData>(
    getInitialFormData(initialData)
  );
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [imagePickerTarget, setImagePickerTarget] =
    useState<ImagePickerTarget>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData(getInitialFormData(initialData));
  }, [initialData]);

  const openImagePicker = (target: Exclude<ImagePickerTarget, null>) => {
    setImagePickerTarget(target);
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImagePickerTarget(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        setCropSrc(result);
      }
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCropConfirm = (croppedImage: string) => {
    setFormData((prev) => {
      if (imagePickerTarget === "new") {
        return {
          ...prev,
          images: [
            ...prev.images,
            {
              image: croppedImage,
              caption: "",
              order: getNextImageOrder(prev.images),
              status: "Active",
            },
          ],
        };
      }

      if (typeof imagePickerTarget === "number") {
        return {
          ...prev,
          images: prev.images.map((image, index) =>
            index === imagePickerTarget
              ? { ...image, image: croppedImage }
              : image
          ),
        };
      }

      return prev;
    });

    setCropSrc(null);
    setImagePickerTarget(null);
  };

  const handleCropCancel = () => {
    setCropSrc(null);
    setImagePickerTarget(null);
  };

  const handleInputChange = (
    field: "headline" | "message" | "title" | "remarks",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStatusChange = (value: CarouselStatus) => {
    setFormData((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleImageStatusChange = (
    index: number,
    status: CarouselImageFormData["status"]
  ) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((image, imageIndex) =>
        imageIndex === index ? { ...image, status } : image
      ),
    }));
  };

  const handleImageFieldChange = (
    index: number,
    field: "caption" | "order",
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((image, imageIndex) => {
        if (imageIndex !== index) {
          return image;
        }

        if (field === "order") {
          const nextOrder = Number(value);
          return {
            ...image,
            order: Number.isFinite(nextOrder) ? nextOrder : 0,
          };
        }

        return {
          ...image,
          caption: String(value),
        };
      }),
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_image, imageIndex) => imageIndex !== index),
    }));
  };

  const handleSave = async () => {
    await onSubmit(formData);
  };

  return (
    <>
      <ImageCropDialog
        open={!!cropSrc}
        imageSrc={cropSrc ?? ""}
        onConfirm={handleCropConfirm}
        onCancel={handleCropCancel}
      />

      <FormSection label="Images">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "3fr",
              md: "repeat(3, minmax(0, 1fr))",
              xl: "repeat(3, minmax(0, 1fr))",
            },
            gap: 3,
          }}
        >
          {formData.images.map((image, index) => (
            <Box
              key={image.id ?? `image-${index}`}
              sx={{
                border: "1px solid var(--border-color-field)",
                "&:hover": {
                  border: "1px solid var(--border-color-field-hover)",
                },
                borderRadius: 2,
                px: 2.5,
                py: 2.25,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minHeight: 1,
              }}
            >
              <Box sx={imagePreviewFrameSx}>
                {image.image ? (
                  <Box
                    component="img"
                    src={image.image}
                    alt={`Carousel image ${index + 1}`}
                    sx={imagePreviewSx}
                  />
                ) : (
                  <Typography sx={imageEmptyStateSx}>
                    No image uploaded
                  </Typography>
                )}
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "3.5rem minmax(0, 1fr)",
                  alignItems: "center",
                  gap: 1.25,
                }}
              >
                <Typography sx={{ fontSize: "0.85rem" }}>Caption</Typography>
                <TextField
                  fullWidth
                  value={image.caption}
                  onChange={(event) =>
                    handleImageFieldChange(index, "caption", event.target.value)
                  }
                  disabled={isLoading}
                  sx={textFieldSx}
                />

                <Typography sx={{ fontSize: "0.85rem" }}>Order</Typography>
                <TextField
                  type="number"
                  value={image.order}
                  onChange={(event) =>
                    handleImageFieldChange(index, "order", event.target.value)
                  }
                  disabled={isLoading}
                  inputProps={{ min: 1 }}
                  sx={textFieldSx}
                />

                <Typography sx={{ fontSize: "0.85rem" }}>Status</Typography>
                <Select
                  value={image.status}
                  onChange={(event) =>
                    handleImageStatusChange(
                      index,
                      event.target.value as CarouselStatus
                    )
                  }
                  disabled={isLoading}
                  sx={{ ...selectFieldSx, maxWidth: "12rem" }}
                  MenuProps={{
                    disableScrollLock: true,
                    disablePortal: true,
                    PaperProps: { sx: { borderRadius: 1 } },
                  }}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <MenuItem
                      key={status}
                      value={status}
                      sx={{ fontSize: ".9rem" }}
                    >
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  mt: "auto",
                  flexWrap: "wrap",
                  pt: 1,
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<UploadIcon />}
                  onClick={() => openImagePicker(index)}
                  disabled={isLoading}
                  sx={{
                    margin: "auto",
                    minWidth: "9rem",
                    fontSize: ".85rem",
                    bgcolor: "var(--button-bg-blue)",
                    color: "white",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "var(--button-bg-blue-hover)",
                    },
                  }}
                >
                  {image.image ? "Upload" : "Upload Image"}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DeleteOutlinedIcon />}
                  onClick={() => handleRemoveImage(index)}
                  disabled={isLoading}
                  sx={{
                    margin: "auto",
                    minWidth: "9rem",
                    fontSize: ".85rem",
                    bgcolor: "var(--info-bgcolor-delete)",
                    color: "white",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "var(--info-bgcolor-delete-light)",
                    },
                  }}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          ))}

          <Button
            type="button"
            onClick={() => openImagePicker("new")}
            disabled={isLoading}
            sx={{
              minHeight: 1,
              border: "1px solid var(--border-color-field)",
              "&:hover": {
                border: "1px solid var(--border-color-field-hover)",
              },
              borderRadius: 2,
              borderStyle: "solid",
              px: 3,
              py: 4,
              color: "var(--border-color-field)",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
              textTransform: "none",
              bgcolor: "transparent",
            }}
          >
            <Box
              sx={{
                width: "8rem",
                height: "8rem",
                borderRadius: "50%",
                border: "2px solid currentColor",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AddOutlinedIcon sx={{ fontSize: "4rem" }} />
            </Box>
          </Button>
        </Box>

        <VisuallyHiddenInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isLoading}
        />
      </FormSection>

      {/* Headline Section */}
      <FormSection label="Headline" mt={1.5}>
        <TextField
          value={formData.headline}
          onChange={(e) => handleInputChange("headline", e.target.value)}
          placeholder="Enter carousel headline"
          disabled={isLoading}
          sx={textFieldSx}
        />
      </FormSection>

      {/* Message Section */}
      <FormSection label="Message">
        <TextField
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          placeholder="Enter message"
          multiline
          rows={2}
          disabled={isLoading}
          sx={textFieldSx}
        />
      </FormSection>

      {/* Title Section */}
      <FormSection label="Title" mt={1.5}>
        <TextField
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Enter carousel title"
          disabled={isLoading}
          sx={textFieldSx}
        />
      </FormSection>

      {/* Remarks Section */}
      <FormSection label="Remarks">
        <TextField
          value={formData.remarks}
          onChange={(e) => handleInputChange("remarks", e.target.value)}
          placeholder="Enter remarks"
          multiline
          rows={2}
          disabled={isLoading}
          sx={textFieldSx}
        />
      </FormSection>

      {/* Status Section */}
      <FormSection label="Status" mt={1.5}>
        <Select
          value={formData.status}
          onChange={(e) =>
            handleStatusChange(e.target.value as "Active" | "Inactive")
          }
          disabled={isLoading}
          sx={selectFieldSx}
          MenuProps={{
            disableScrollLock: true,
            disablePortal: true,
            PaperProps: { sx: { borderRadius: 1 } },
          }}
        >
          {STATUS_OPTIONS.map((status) => (
            <MenuItem key={status} value={status} sx={{ fontSize: ".9rem" }}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormSection>

      {/* Action Buttons */}
      <Box
        sx={{ display: "flex", gap: 2, mt: 9, justifyContent: "flex-start" }}
      >
        <Button
          variant="contained"
          onClick={handleSave}
          sx={actionButtonSx.primary}
        >
          {isLoading ? (
            <>
              <CircularProgress size={16} sx={{ mr: 1 }} />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
        <Button
          variant="outlined"
          onClick={onNew}
          disabled={isLoading}
          sx={actionButtonSx.secondary}
        >
          New
        </Button>
        <Button
          variant="contained"
          disabled={isLoading}
          sx={{ ...actionButtonSx.primary, ml: 6 }}
        >
          Preview
        </Button>
      </Box>
    </>
  );
}
