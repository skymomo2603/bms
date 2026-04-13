"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DeleteHeroBannerDialogProps {
  open: boolean;
  mode: "single" | "bulk";
  title?: string;
  count: number;
  isDeleting: boolean;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export default function DeleteHeroBannerDialog({
  open,
  mode,
  title,
  count,
  isDeleting,
  onConfirm,
  onClose,
}: DeleteHeroBannerDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={() => (!isDeleting ? onClose() : undefined)}
      disableScrollLock
    >
      <DialogTitle sx={{ color: "var(--text-blue-dark)", fontSize: "1rem" }}>
        {mode === "bulk" ? "Delete Selected Banners" : "Delete Banner Entry"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: "0.88rem" }}>
          {mode === "bulk"
            ? `Are you sure you want to delete ${count} selected banner${count > 1 ? "s" : ""}? This action cannot be undone.`
            : `Are you sure you want to delete "${title}"? This action cannot be undone.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          disabled={isDeleting}
          sx={{
            fontSize: "0.8rem",
            textTransform: "none",
            color: "var(--text-blue-dark2)",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isDeleting}
          disableElevation
          sx={{
            fontSize: "0.8rem",
            textTransform: "none",
            bgcolor: "var(--info-bgcolor-delete)",
            color: "white",
            "&:hover": { bgcolor: "var(--info-bgcolor-delete-light)" },
          }}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
