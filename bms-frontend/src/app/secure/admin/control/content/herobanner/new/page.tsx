"use client";

import BreadcrumbsNav from "@/components/admin/common/BreadcrumbsNav";
import FormSection from "@/components/admin/facility/FormSection";
import {
  DeleteOutlined as DeleteOutlinedIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

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

const statusList = ["Active", "Inactive"];

export default function HeroBanner() {
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("Active");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <BreadcrumbsNav
        crumbs={[
          { label: "Content", href: "/secure/admin/control/content" },
          {
            label: "Hero Banner",
            href: "/secure/admin/control/content/herobanner",
          },
          { label: "New", active: true },
        ]}
      />

      <Box sx={{ px: 6, py: 3 }}>
        {/* Image Section */}
        <FormSection label="Image">
          <Box
            sx={{
              border: "1px solid var(--border-color-field)",
              borderRadius: 1,
              p: 2,
              width: { xs: "100%", sm: "40rem" },
              maxWidth: "100%",
              "&:hover": {
                border: "1px solid var(--border-color-field-hover)",
              },
            }}
          >
            {image ? (
              <Box sx={{ mb: 2 }}>
                <img
                  src={image}
                  alt="Preview"
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "4rem",
                  bgcolor: "var(--background-custom-blue-light-1)",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{ color: "var(--text-grey-dark)", fontSize: ".9rem" }}
                >
                  No image selected
                </Typography>
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button
                component="label"
                variant="contained"
                startIcon={<UploadIcon />}
                sx={{
                  bgcolor: "var(--button-bg-blue)",
                  fontSize: ".88rem",
                  boxShadow: "0px 0px 3px var(--box-shadow)",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "var(--button-bg-blue-hover)",
                    boxShadow: "0px 0px 3px var(--box-shadow)",
                  },
                }}
              >
                Upload Image
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
              {image && (
                <Button
                  variant="contained"
                  startIcon={<DeleteOutlinedIcon />}
                  onClick={() => setImage(null)}
                  sx={{
                    bgcolor: "var(--info-bgcolor-delete)",
                    boxShadow: "0px 0px 3px var(--box-shadow)",
                    textTransform: "none",
                    fontSize: ".88rem",
                    color: "white",
                    "&:hover": {
                      bgcolor: "var(--info-bgcolor-delete-light)",
                      boxShadow: "0px 0px 3px var(--box-shadow)",
                    },
                  }}
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ width: { xs: "100%", sm: "24rem" }, maxWidth: "100%" }}
            inputProps={{ style: { fontSize: ".9rem" } }}
          />
        </FormSection>

        {/* Remarks Section */}
        <FormSection label="Remarks">
          <TextField
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            multiline
            rows={2}
            sx={{ width: { xs: "100%", sm: "24rem" }, maxWidth: "100%" }}
            inputProps={{ style: { fontSize: ".9rem" } }}
          />
        </FormSection>

        {/* Status Section */}
        <FormSection label="Status" mt={1.5}>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ fontSize: ".9rem" }}
            MenuProps={{
              disableScrollLock: true,
              disablePortal: true,
              PaperProps: { sx: { borderRadius: 1 } },
            }}
          >
            {statusList.map((f) => (
              <MenuItem key={f} value={f} sx={{ fontSize: ".9rem" }}>
                {f}
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
            sx={{
              fontSize: ".9rem",
              textTransform: "none",
              width: "6rem",
              height: "2.5rem",
              bgcolor: "var(--button-bg-blue)",
              boxShadow: "0px 0px 3px var(--box-shadow)",
              "&:hover": {
                bgcolor: "var(--button-bg-blue-hover)",
                boxShadow: "0px 0px 3px var(--box-shadow)",
              },
            }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            sx={{
              fontSize: ".9rem",
              textTransform: "none",
              width: "6rem",
              height: "2.5rem",
            }}
          >
            New
          </Button>
          <Button
            variant="contained"
            sx={{
              ml: 6,
              fontSize: ".9rem",
              textTransform: "none",
              width: "6rem",
              height: "2.5rem",
              bgcolor: "var(--button-bg-blue)",
              boxShadow: "0px 0px 3px var(--box-shadow)",
              "&:hover": {
                bgcolor: "var(--button-bg-blue-hover)",
                boxShadow: "0px 0px 3px var(--box-shadow)",
              },
            }}
          >
            Preview
          </Button>
        </Box>
      </Box>
    </>
  );
}
