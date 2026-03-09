"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";

import AdminNotificationStack, {
  type AdminNotification,
  type AdminNotificationSeverity,
} from "@/components/admin/common/AdminNotificationStack";
import BreadcrumbsNav from "@/components/admin/common/BreadcrumbsNav";
import HeroBannerForm from "@/components/admin/content/herobanner/HeroBannerForm";
import { HEROBANNER_BREADCRUMBS } from "@/constants/herobanner";
import { createHeroBanner } from "@/lib/api/heroBanner";
import { HeroBanner as HeroBannerType } from "@/types/herobanner";

function validateFormData(formData: HeroBannerType): string[] {
  const errors: string[] = [];

  if (!formData.title.trim()) {
    errors.push("Title is required");
  }
  if (!formData.image) {
    errors.push("Image is required");
  }

  return errors;
}

export default function HeroBannerNewPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const notificationIdRef = useRef(0);
  const router = useRouter();

  const showNotification = useCallback(
    (message: string, severity: AdminNotificationSeverity = "error") => {
      const id = String(++notificationIdRef.current);
      setNotifications((prev) => [...prev, { id, message, severity }]);
    },
    []
  );

  const closeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const handleSubmit = async (formData: HeroBannerType) => {
    setIsLoading(true);

    try {
      const validationErrors = validateFormData(formData);
      if (validationErrors.length > 0) {
        validationErrors.forEach((error) => showNotification(error));
        setIsLoading(false);
        return;
      }

      await createHeroBanner({
        title: formData.title,
        remarks: formData.remarks,
        image: formData.image as string,
        status: formData.status,
      });

      // Redirect to hero banners list
      router.push("/secure/admin/control/content/herobanner");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      showNotification(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BreadcrumbsNav crumbs={HEROBANNER_BREADCRUMBS.new} />
      <Box sx={{ px: 6, py: 2.5 }}>
        <HeroBannerForm onSubmit={handleSubmit} isLoading={isLoading} />
      </Box>

      <AdminNotificationStack
        notifications={notifications}
        onClose={closeNotification}
      />
    </>
  );
}
