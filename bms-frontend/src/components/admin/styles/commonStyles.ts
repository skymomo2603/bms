// Common reusable styles for admin components

export const commonShadow = "0px 0px 3px var(--box-shadow)";

// Button Styles
export const primaryButtonSx = {
  fontSize: ".9rem",
  textTransform: "none" as const,
  width: "6rem",
  height: "2.5rem",
  bgcolor: "var(--button-bg-blue)",
  boxShadow: commonShadow,
  display: "flex",
  alignItems: "center",
  gap: 1,
  "&:hover": {
    bgcolor: "var(--button-bg-blue-hover)",
    boxShadow: commonShadow,
  },
  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
};

export const secondaryButtonSx = {
  fontSize: ".9rem",
  textTransform: "none" as const,
  width: "6rem",
  height: "2.5rem",
  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
};

export const deleteButtonSx = {
  bgcolor: "var(--info-bgcolor-delete)",
  boxShadow: commonShadow,
  textTransform: "none" as const,
  fontSize: ".88rem",
  color: "white",
  "&:hover": {
    bgcolor: "var(--info-bgcolor-delete-light)",
    boxShadow: commonShadow,
  },
  "&:disabled": {
    opacity: 0.6,
  },
};

export const uploadButtonSx = {
  bgcolor: "var(--button-bg-blue)",
  fontSize: ".88rem",
  boxShadow: commonShadow,
  textTransform: "none" as const,
  "&:hover": {
    bgcolor: "var(--button-bg-blue-hover)",
    boxShadow: commonShadow,
  },
  "&:disabled": {
    opacity: 0.6,
  },
};

// Container/Box Styles
export const largeImageBoxSx = {
  border: "1px solid var(--border-color-field)",
  borderRadius: 1,
  p: 2,
  width: { xs: "100%", sm: "40rem" },
  maxWidth: "100%",
  "&:hover": {
    border: "1px solid var(--border-color-field-hover)",
  },
};

export const emptyStateSx = {
  width: "100%",
  height: "4rem",
  bgcolor: "var(--background-custom-blue-light-1)",
  borderRadius: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mb: 2,
};

export const buttonContainerSx = {
  display: "flex",
  gap: 1.5,
};

export const previewImageSx = {
  width: "100%" as const,
  objectFit: "cover" as const,
  borderRadius: "4px",
};

// Text Styles
export const placeholderTextSx = {
  color: "var(--text-grey-dark)",
  fontSize: ".9rem",
};

export const textFieldSx = {
  width: { xs: "100%", sm: "24rem" },
  maxWidth: "100%",
  "& .MuiInputBase-input": {
    fontSize: ".9rem",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid var(--border-color-field-hover)",
    },
  },
};

export const selectFieldSx = {
  fontSize: ".9rem",
  "& .MuiSelect-select": {
    fontSize: ".9rem",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "1px solid var(--border-color-field-hover)",
  },
};
