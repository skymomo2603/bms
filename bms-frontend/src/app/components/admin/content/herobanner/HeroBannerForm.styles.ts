export const imageBoxSx = {
  border: "1px solid var(--border-color-field)",
  borderRadius: 1,
  p: 2,
  width: { xs: "100%", sm: "40rem" },
  maxWidth: "100%",
  "&:hover": {
    border: "1px solid var(--border-color-field-hover)",
  },
};

export const imagePreviewSx = {
  width: "100%" as const,
  objectFit: "cover" as const,
  borderRadius: "4px",
};

export const imageEmptyStateSx = {
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

export const uploadButtonSx = {
  bgcolor: "var(--button-bg-blue)",
  fontSize: ".88rem",
  boxShadow: "0px 0px 3px var(--box-shadow)",
  textTransform: "none",
  "&:hover": {
    bgcolor: "var(--button-bg-blue-hover)",
    boxShadow: "0px 0px 3px var(--box-shadow)",
  },
  "&:disabled": {
    opacity: 0.6,
  },
};

export const deleteButtonSx = {
  bgcolor: "var(--info-bgcolor-delete)",
  boxShadow: "0px 0px 3px var(--box-shadow)",
  textTransform: "none",
  fontSize: ".88rem",
  color: "white",
  "&:hover": {
    bgcolor: "var(--info-bgcolor-delete-light)",
    boxShadow: "0px 0px 3px var(--box-shadow)",
  },
  "&:disabled": {
    opacity: 0.6,
  },
};

export const actionButtonSx = {
  primary: {
    fontSize: ".9rem",
    textTransform: "none",
    width: "6rem",
    height: "2.5rem",
    bgcolor: "var(--button-bg-blue)",
    boxShadow: "0px 0px 3px var(--box-shadow)",
    display: "flex",
    alignItems: "center",
    gap: 1,
    "&:hover": {
      bgcolor: "var(--button-bg-blue-hover)",
      boxShadow: "0px 0px 3px var(--box-shadow)",
    },
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  },
  secondary: {
    fontSize: ".9rem",
    textTransform: "none",
    width: "6rem",
    height: "2.5rem",
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  },
};
