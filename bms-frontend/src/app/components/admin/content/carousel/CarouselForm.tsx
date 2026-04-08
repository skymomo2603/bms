"use client";

import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

import FormSection from "@/components/admin/common/FormSection";
import { FORM_DEFAULTS, STATUS_OPTIONS } from "@/constants/carousel";
import { CarouselFormData, CarouselFormProps } from "@/types/carousel";
import {
  actionButtonSx,
  selectFieldSx,
  textFieldSx,
} from "./CarouselForm.styles";

const getInitialFormData = (
  initialData?: Partial<CarouselFormData>
): CarouselFormData => ({
  headline: initialData?.headline ?? FORM_DEFAULTS.headline,
  message: initialData?.message ?? FORM_DEFAULTS.message,
  title: initialData?.title ?? FORM_DEFAULTS.title,
  remarks: initialData?.remarks ?? FORM_DEFAULTS.remarks,
  status: initialData?.status ?? FORM_DEFAULTS.status,
});

export default function CarouselForm({
  initialData,
  onSubmit,
  onNew,
  isLoading = false,
}: CarouselFormProps) {
  const [formData, setFormData] = useState<CarouselFormData>(
    getInitialFormData(initialData)
  );

  useEffect(() => {
    setFormData(getInitialFormData(initialData));
  }, [initialData]);

  const handleInputChange = (
    field: keyof CarouselFormData,
    value: string | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value ?? "",
    }));
  };

  const handleSave = async () => {
    await onSubmit(formData);
  };

  return (
    <>
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
            handleInputChange("status", e.target.value as "Active" | "Inactive")
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
