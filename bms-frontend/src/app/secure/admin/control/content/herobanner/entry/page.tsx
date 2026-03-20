"use client";

import { Box } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import BreadcrumbsNav from "@/components/admin/common/BreadcrumbsNav";
import AdminNotificationStack from "@/components/admin/common/NotificationStack";
import HeroBannerForm from "@/components/admin/content/herobanner/HeroBannerForm";
import {
  HEROBANNER_ENTRY_BREADCRUMBS,
  HEROBANNER_ROUTES,
} from "@/constants/herobanner";
import { useAdminNotifications } from "@/hooks/useAdminNotifications";
import {
  createHeroBanner,
  getHeroBanner,
  updateHeroBanner,
} from "@/lib/api/heroBanner";
import { HeroBannerFormData } from "@/types/herobanner";
import {
  toHeroBannerFormData,
  validateHeroBannerForm,
} from "@/utils/herobanner";

export default function HeroBannerEntryPage() {
  const [initialData, setInitialData] =
    useState<Partial<HeroBannerFormData> | null>(null);
  const [isFetchingBanner, setIsFetchingBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { notifications, showNotification, closeNotification } =
    useAdminNotifications();

  const bannerIdParam = searchParams.get("id");
  const bannerId = bannerIdParam ? Number(bannerIdParam) : NaN;
  const isEditMode = Number.isInteger(bannerId) && bannerId > 0;

  useEffect(() => {
    if (!isEditMode) {
      setInitialData(null);
      return;
    }

    const loadBanner = async () => {
      setIsFetchingBanner(true);

      try {
        const banner = await getHeroBanner(bannerId);
        setInitialData(toHeroBannerFormData(banner));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load hero banner";
        showNotification(errorMessage);
      } finally {
        setIsFetchingBanner(false);
      }
    };

    loadBanner();
  }, [bannerId, isEditMode, showNotification]);

  const handleNew = () => {
    router.push(HEROBANNER_ROUTES.entry);
  };

  const handleSubmit = async (formData: HeroBannerFormData) => {
    setIsLoading(true);

    try {
      const validationErrors = validateHeroBannerForm(formData);
      if (validationErrors.length > 0) {
        validationErrors.forEach((error) => showNotification(error));
        setIsLoading(false);
        return;
      }

      if (isEditMode) {
        await updateHeroBanner(bannerId, {
          title: formData.title,
          remarks: formData.remarks,
          image: formData.image as string,
          status: formData.status,
        });
      } else {
        await createHeroBanner({
          title: formData.title,
          remarks: formData.remarks,
          image: formData.image as string,
          status: formData.status,
        });
      }

      // Redirect to hero banners list
      router.push(HEROBANNER_ROUTES.list);
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
      <BreadcrumbsNav crumbs={HEROBANNER_ENTRY_BREADCRUMBS} />
      <Box sx={{ px: 6, py: 2.5 }}>
        <HeroBannerForm
          initialData={initialData ?? undefined}
          onSubmit={handleSubmit}
          onNew={handleNew}
          isLoading={isLoading || isFetchingBanner}
        />
      </Box>

      <AdminNotificationStack
        notifications={notifications}
        onClose={closeNotification}
      />
    </>
  );
}
