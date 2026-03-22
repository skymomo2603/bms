import type { SxProps, Theme } from "@mui/material/styles";

export const publicFieldHeight = "2.4rem";

export const publicFieldContainerSx = {
  position: "relative",
  width: "100%",
} satisfies SxProps<Theme>;

export const publicFieldLabelSx = {
  position: "absolute",
  top: "-0.45rem",
  left: "0.72rem",
  zIndex: 2,
  px: "0.28rem",
  bgcolor: "white",
  color: "#606060",
  fontSize: "0.74rem",
  letterSpacing: "0.078rem",
  lineHeight: 1.1,
  display: "inline-flex",
  alignItems: "center",
} satisfies SxProps<Theme>;

export const publicFieldShellSx = {
  display: "flex",
  alignItems: "stretch",
  width: "100%",
  height: publicFieldHeight,
  border: "1px solid #c9c9c9",
  borderRadius: "0.6rem",
  bgcolor: "rgba(255,255,255,0.98)",
  overflow: "hidden",
} satisfies SxProps<Theme>;

export const publicFieldInputSx = {
  flex: 1,
  minWidth: 0,
  border: 0,
  outline: 0,
  bgcolor: "transparent",
  color: "#161d24",
  px: "0.9rem",
  fontSize: "0.8rem",
  fontWeight: 400,
  fontFamily: "inherit",
  lineHeight: 1.2,
} satisfies SxProps<Theme>;

export const publicDateButtonSx = {
  flex: "0 0 auto",
  width: publicFieldHeight,
  height: publicFieldHeight,
  borderRadius: 0,
  bgcolor: "#0a69ac",
  color: "white",
  boxShadow: "none",
  borderLeft: "1px solid rgba(255, 255, 255, 0.18)",
  "&:hover": {
    bgcolor: "#0c75bf",
    boxShadow: "none",
  },
} satisfies SxProps<Theme>;

export const publicSelectShellSx = {
  height: publicFieldHeight,
  borderRadius: ".7rem",
  bgcolor: "transparent",
} satisfies SxProps<Theme>;

export const publicSelectSx = {
  height: publicFieldHeight,
  borderRadius: "0.6rem",
  color: "#161d24",
  fontSize: "0.8rem",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #c9c9c9",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #c9c9c9",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #c9c9c9",
  },
  "& .MuiSelect-select": {
    px: "0.9rem",
    py: 0,
    display: "flex",
    alignItems: "center",
    minHeight: `${publicFieldHeight} !important`,
    boxSizing: "border-box",
  },
  "& .MuiSelect-icon": {
    right: 8,
    color: "#c4c9cf",
    fontSize: "1.35rem",
  },
} satisfies SxProps<Theme>;

export const publicMenuPaperSx = {
  mt: 0.5,
  borderRadius: "0.6rem",
  border: "1px solid rgba(4, 53, 93, 0.08)",
  boxShadow: "0 18px 42px rgba(4, 53, 93, 0.16)",
} satisfies SxProps<Theme>;

export const publicActionButtonSx = {
  height: publicFieldHeight,
  borderRadius: "0.6rem",
  bgcolor: "#1b73b8",
  color: "white",
  px: 2.2,
  fontSize: "0.8rem",
  fontWeight: 400,
  textTransform: "none",
  boxShadow: "none",
  whiteSpace: "nowrap",
  "&:hover": {
    bgcolor: "#2780c6",
    boxShadow: "none",
  },
} satisfies SxProps<Theme>;
