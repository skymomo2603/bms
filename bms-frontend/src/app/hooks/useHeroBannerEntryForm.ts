"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { HEROBANNER_ROUTES } from "@/constants/herobanner";
import { useAdminNotifications } from "@/hooks/useAdminNotifications";
import {
  createHeroBanner,
  getHeroBanner,
  updateHeroBanner,
} from "@/lib/api/heroBanner";
import type { HeroBannerFormData } from "@/types/herobanner";
import {
  toHeroBannerFormData,
  validateHeroBannerForm,
} from "@/utils/herobanner";

export function useHeroBannerEntryForm() {
  const [initialData, setInitialData] =
    useState<Partial<HeroBannerFormData> | null>(null);
  const [isFetchingBanner, setIsFetchingBanner] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
          err instanceof Error ? err.message : "Failed to load hero banner.";
        showNotification(errorMessage);
      } finally {
        setIsFetchingBanner(false);
      }
    };

    void loadBanner();
  }, [bannerId, isEditMode, showNotification]);

  const handleNew = useCallback(() => {
    router.push(HEROBANNER_ROUTES.entry);
  }, [router]);

  const handleSubmit = useCallback(
    async (formData: HeroBannerFormData) => {
      setIsSubmitting(true);

      try {
        const validationErrors = validateHeroBannerForm(formData);
        if (validationErrors.length > 0) {
          validationErrors.forEach((error) => showNotification(error));
          return;
        }

        if (isEditMode) {
          await updateHeroBanner(bannerId, {
            headline: formData.headline,
            title: formData.title,
            remarks: formData.remarks,
            image: formData.image as string,
            status: formData.status,
          });
        } else {
          await createHeroBanner({
            headline: formData.headline,
            title: formData.title,
            remarks: formData.remarks,
            image: formData.image as string,
            status: formData.status,
          });
        }

        router.push(HEROBANNER_ROUTES.list);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred.";
        showNotification(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [bannerId, isEditMode, router, showNotification]
  );

  return {
    initialData: initialData ?? undefined,
    isLoading: isSubmitting || isFetchingBanner,
    notifications,
    closeNotification,
    handleNew,
    handleSubmit,
  };
}
