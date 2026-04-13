"use client";

import type { AlertColor } from "@mui/material";
import { Alert, Box } from "@mui/material";
import { useEffect, useRef } from "react";

export type AdminNotificationSeverity = AlertColor;

export type AdminNotification = {
  id: string;
  message: string;
  severity?: AdminNotificationSeverity;
};

type AdminNotificationStackProps = {
  notifications: AdminNotification[];
  onClose: (id: string) => void;
  autoHideDuration?: number;
  top?: number;
  right?: number;
};

export default function AdminNotificationStack({
  notifications,
  onClose,
  autoHideDuration = 6000,
  top = 90,
  right = 20,
}: AdminNotificationStackProps) {
  const timerIdsRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const activeNotificationIds = new Set(
      notifications.map((notification) => notification.id)
    );

    notifications.forEach((notification) => {
      if (timerIdsRef.current[notification.id]) {
        return;
      }

      timerIdsRef.current[notification.id] = window.setTimeout(() => {
        delete timerIdsRef.current[notification.id];
        onClose(notification.id);
      }, autoHideDuration);
    });

    Object.entries(timerIdsRef.current).forEach(([notificationId, timerId]) => {
      if (activeNotificationIds.has(notificationId)) {
        return;
      }

      window.clearTimeout(timerId);
      delete timerIdsRef.current[notificationId];
    });
  }, [autoHideDuration, notifications, onClose]);

  useEffect(() => {
    return () => {
      Object.values(timerIdsRef.current).forEach((timerId) => {
        window.clearTimeout(timerId);
      });

      timerIdsRef.current = {};
    };
  }, []);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top,
        right,
        zIndex: 1300,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        alignItems: "flex-end",
      }}
    >
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          onClose={() => onClose(notification.id)}
          severity={notification.severity ?? "info"}
          sx={{ width: "100%", minWidth: 250, boxShadow: 3 }}
        >
          {notification.message}
        </Alert>
      ))}
    </Box>
  );
}
