import {
  buttonContainerSx,
  deleteButtonSx,
  primaryButtonSx,
  secondaryButtonSx,
  selectFieldSx,
  textFieldSx,
  uploadButtonSx,
} from "@/components/admin/styles/commonStyles";

export const imagePreviewFrameSx = {
  flex: "0 0 auto",
  borderRadius: 1,
  overflow: "hidden",
  bgcolor: "#f4f7fb",
  border: "1px solid rgba(4, 111, 195, 0.16)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "center",
};

export const imagePreviewSx = {
  width: "100%",
  objectFit: "cover" as const,
  display: "block",
};

export const imageEmptyStateSx = {
  ...imagePreviewFrameSx,
  color: "var(--text-grey-dark)",
  fontSize: ".88rem",
};

export { selectFieldSx };

export { textFieldSx };

export { buttonContainerSx, deleteButtonSx, uploadButtonSx };

export const actionButtonSx = {
  primary: primaryButtonSx,
  secondary: secondaryButtonSx,
};
