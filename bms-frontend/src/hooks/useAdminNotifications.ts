"use client";

import { useCallback, useRef, useState } from "react";

import {
  type AdminNotification,
  type AdminNotificationSeverity,
} from "@/components/admin/common/NotificationStack";

export function useAdminNotifications() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const notificationIdRef = useRef(0);

  const showNotification = useCallback(
    (message: string, severity: AdminNotificationSeverity = "error") => {
      const id = String(++notificationIdRef.current);
      setNotifications((prev) => [...prev, { id, message, severity }]);
    },
    []
  );

  const closeNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  return {
    notifications,
    showNotification,
    closeNotification,
  };
}
