import { commonShadow } from "@/components/admin/styles/commonStyles";

const inputHeight = "2.4rem";

export const filterBarStyles = {
  container: {
    p: 3,
    bgcolor: "var(--background-custom-blue-light-1)",
    color: "var(--text-blue-dark2)",
    borderRadius: "calc(0.5rem * (200 / 400))",
  },
  selectContainer: {
    minWidth: "120px",
    bgcolor: "white",
    boxShadow: commonShadow,
    borderRadius: 1,
  },
  inputLabel: {
    fontSize: "0.7rem",
    color: "var(--text-blue-dark2)",
    backgroundColor: "white",
    letterSpacing: "0.07rem",
    display: "inline-flex",
    alignItems: "center",
    lineHeight: 1.1,
    py: 0,
    px: 0.28,
    ml: -0.6,
    mt: 0.58,
  },
  select: {
    height: inputHeight,
    fontSize: ".8rem",
    color: "var(--text-blue-dark2)",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiSelect-icon": { color: "var(--text-light)" },
  },
  menuPaper: {
    color: "var(--text-blue-dark)",
    boxShadow: commonShadow,
    borderRadius: 1,
  },
  checkboxContainer: {
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
    height: inputHeight,
    width: "fit-content",
    bgcolor: "white",
    boxShadow: commonShadow,
    borderRadius: 1,
    px: 3,
  },
  checkbox: {
    p: 0,
    pr: 0.8,
    "& .MuiSvgIcon-root": {
      fontSize: 20,
      strokeWidth: 0.2,
      color: "var(--border-color-custom-1)",
    },
    "&.Mui-checked .MuiSvgIcon-root": {
      color: "var(--button-bg-blue)",
    },
  },
  checkboxLabel: {
    fontSize: ".8rem",
  },
  keywordField: {
    bgcolor: "white",
    boxShadow: commonShadow,
    borderRadius: 1,
    height: inputHeight,
    flexGrow: 0.25,
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
    "& .MuiInputBase-root": { width: "100%" },
    "& .MuiInputBase-input": { p: 1.3, fontSize: "0.8rem" },
  },
  keywordLabel: {
    fontSize: "0.75rem",
    color: "var(--text-blue-dark2)",
    backgroundColor: "white",
    letterSpacing: "0.078rem",
    display: "inline-flex",
    alignItems: "center",
    lineHeight: 1.1,
    py: 0,
    px: 0.28,
    ml: -0.6,
    mt: 0.58,
  },
  applyButton: {
    bgcolor: "var(--button-bg-blue)",
    textTransform: "none",
    fontSize: ".8rem",
    boxShadow: commonShadow,
    "&:hover": {
      bgcolor: "var(--button-bg-blue-hover)",
      boxShadow: commonShadow,
    },
  },
};
