"use client";

import {
  DeleteOutlined as DeleteOutlinedIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

import FormSection from "@/components/admin/common/FormSection";
import { FORM_DEFAULTS, STATUS_OPTIONS } from "@/constants/herobanner";
import { HeroBanner, HeroBannerFormProps } from "@/types/herobanner";
import {
  actionButtonSx,
  buttonContainerSx,
  deleteButtonSx,
  imageBoxSx,
  imageEmptyStateSx,
  imagePreviewSx,
  uploadButtonSx,
} from "./HeroBannerForm.styles";

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

const getInitialFormData = (initialData?: Partial<HeroBanner>): HeroBanner => ({
  title: initialData?.title ?? FORM_DEFAULTS.title,
  remarks: initialData?.remarks ?? FORM_DEFAULTS.remarks,
  status: initialData?.status ?? FORM_DEFAULTS.status,
  image: initialData?.image ?? FORM_DEFAULTS.image,
  ...(initialData?.id && { id: initialData.id }),
});

export default function HeroBannerForm({
  initialData,
  onSubmit,
  isLoading = false,
  error,
}: HeroBannerFormProps) {
  const [formData, setFormData] = useState<HeroBanner>(
    getInitialFormData(initialData)
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setFormData((prev) => ({
            ...prev,
            image: result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    field: keyof Omit<HeroBanner, "id">,
    value: string | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value ?? "",
    }));
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.title.trim()) {
      console.error("Title is required");
      return;
    }

    await onSubmit(formData);
  };

  const handleClear = () => {
    setFormData(getInitialFormData());
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Image Section */}
      <FormSection label="Image">
        <Box sx={imageBoxSx}>
          {formData.image ? (
            <Box sx={{ mb: 2 }}>
              <img
                src={typeof formData.image === "string" ? formData.image : ""}
                alt="Preview"
                style={imagePreviewSx}
              />
            </Box>
          ) : (
            <Box sx={imageEmptyStateSx}>
              <Typography
                sx={{ color: "var(--text-grey-dark)", fontSize: ".9rem" }}
              >
                No image selected
              </Typography>
            </Box>
          )}

          <Box sx={buttonContainerSx}>
            <Button
              component="label"
              variant="contained"
              startIcon={<UploadIcon />}
              disabled={isLoading}
              sx={uploadButtonSx}
            >
              Upload Image
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isLoading}
              />
            </Button>
            {formData.image && (
              <Button
                variant="contained"
                startIcon={<DeleteOutlinedIcon />}
                onClick={() => handleInputChange("image", null)}
                disabled={isLoading}
                sx={deleteButtonSx}
              >
                Remove
              </Button>
            )}
          </Box>
        </Box>
      </FormSection>

      {/* Title Section */}
      <FormSection label="Title" mt={1.5}>
        <TextField
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Enter hero banner title"
          disabled={isLoading}
          sx={{ width: { xs: "100%", sm: "24rem" }, maxWidth: "100%" }}
          inputProps={{ style: { fontSize: ".9rem" } }}
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
          sx={{ width: { xs: "100%", sm: "24rem" }, maxWidth: "100%" }}
          inputProps={{ style: { fontSize: ".9rem" } }}
        />
      </FormSection>

      {/* Status Section */}
      <FormSection label="Status" mt={1.5}>
        <Select
          value={formData.status}
          onChange={(e) =>
            handleInputChange("status", e.target.value as "Active" | "Inactive")
          }
          disabled={isLoading}
          sx={{ fontSize: ".9rem" }}
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
          disabled={isLoading || !formData.title.trim()}
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
          onClick={handleClear}
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
