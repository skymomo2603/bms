"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { HeroBannerStatus } from "@/types/herobanner";

interface HeroBannerStatusDialogProps {
  open: boolean;
  title?: string;
  currentStatus?: HeroBannerStatus;
  nextStatus?: HeroBannerStatus;
  isUpdatingStatus: boolean;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export default function HeroBannerStatusDialog({
  open,
  title,
  currentStatus,
  nextStatus,
  isUpdatingStatus,
  onConfirm,
  onClose,
}: HeroBannerStatusDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={() => (!isUpdatingStatus ? onClose() : undefined)}
      disableScrollLock
    >
      <DialogTitle sx={{ color: "var(--text-blue-dark)", fontSize: "1rem" }}>
        Confirm Status Change
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: "0.88rem" }}>
          {nextStatus === "Active"
            ? `Change "${title}" to Active? The currently active hero banner will be set to Inactive so only one banner remains active.`
            : `Change "${title}" from ${currentStatus} to ${nextStatus}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          disabled={isUpdatingStatus}
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
          disabled={isUpdatingStatus}
          disableElevation
          sx={{
            fontSize: "0.8rem",
            textTransform: "none",
            bgcolor: "var(--button-bg-blue)",
            color: "white",
            "&:hover": { bgcolor: "var(--button-bg-blue-hover)" },
          }}
        >
          {isUpdatingStatus ? "Updating..." : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
