import type { SxProps, Theme } from "@mui/material/styles";

import { commonShadow } from "@/components/admin/styles/commonStyles";

export const sharedFieldHeight = "2.4rem";

export const sharedFieldContainerSx = {
  minWidth: "120px",
  bgcolor: "white",
  boxShadow: commonShadow,
  borderRadius: 1,
} satisfies SxProps<Theme>;

export const sharedFieldFullWidthSx = {
  width: "100%",
  minWidth: 0,
} satisfies SxProps<Theme>;

export const sharedInputLabelSx = {
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
} satisfies SxProps<Theme>;

export const sharedSelectSx = {
  height: sharedFieldHeight,
  fontSize: ".8rem",
  color: "var(--text-blue-dark2)",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSelect-icon": {
    color: "var(--text-light)",
  },
} satisfies SxProps<Theme>;

export const sharedMenuPaperSx = {
  color: "var(--text-blue-dark)",
  boxShadow: commonShadow,
  borderRadius: 1,
} satisfies SxProps<Theme>;

export const sharedTextFieldSx = {
  bgcolor: "white",
  boxShadow: commonShadow,
  borderRadius: 1,
  width: "100%",
  "& .MuiOutlinedInput-root": {
    height: sharedFieldHeight,
    pr: 0.65,
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
      border: "1px solid var(--info-bgcolor-delete)",
    },
  },
  "& .MuiInputBase-root": {
    width: "100%",
  },
  "& .MuiInputBase-input": {
    p: "0.82rem 0.9rem",
    fontSize: "0.8rem",
  },
} satisfies SxProps<Theme>;

export const sharedTextFieldLabelSx = {
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
} satisfies SxProps<Theme>;

export const sharedPrimaryButtonSx = {
  height: sharedFieldHeight,
  bgcolor: "var(--button-bg-blue)",
  textTransform: "none",
  fontSize: ".8rem",
  boxShadow: commonShadow,
  whiteSpace: "nowrap",
  "&:hover": {
    bgcolor: "var(--button-bg-blue-hover)",
    boxShadow: commonShadow,
  },
} satisfies SxProps<Theme>;

export const sharedDateIconButtonSx = {
  width: "2rem",
  height: "2rem",
  borderRadius: "8px",
  color: "white",
  bgcolor: "var(--button-bg-blue)",
  boxShadow: "0 6px 18px rgba(4, 90, 141, 0.18)",
  "&:hover": {
    bgcolor: "var(--button-bg-blue-hover)",
  },
} satisfies SxProps<Theme>;

export function mergeSx(
  ...items: Array<SxProps<Theme> | null | undefined | false>
): SxProps<Theme> {
  const merged: SxProps<Theme>[] = [];

  items.forEach((item) => {
    if (!item) {
      return;
    }

    if (Array.isArray(item)) {
      merged.push(...item);
      return;
    }

    merged.push(item);
  });

  return merged as SxProps<Theme>;
}
