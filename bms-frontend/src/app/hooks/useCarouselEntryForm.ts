"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { CAROUSEL_ROUTES } from "@/constants/carousel";
import { useAdminNotifications } from "@/hooks/useAdminNotifications";
import {
  createCarousel,
  getCarousel,
  updateCarousel,
} from "@/lib/api/carousel";
import type { CarouselFormData } from "@/types/carousel";
import { toCarouselFormData, validateCarouselForm } from "@/utils/carousel";

export function useCarouselEntryForm() {
  const [initialData, setInitialData] =
    useState<Partial<CarouselFormData> | null>(null);
  const [isFetchingCarousel, setIsFetchingCarousel] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { notifications, showNotification, closeNotification } =
    useAdminNotifications();

  const carouselIdParam = searchParams.get("id");
  const carouselId = carouselIdParam ? Number(carouselIdParam) : NaN;
  const isEditMode = Number.isInteger(carouselId) && carouselId > 0;

  useEffect(() => {
    if (!isEditMode) {
      setInitialData(null);
      return;
    }

    const loadCarousel = async () => {
      setIsFetchingCarousel(true);

      try {
        const carousel = await getCarousel(carouselId);
        setInitialData(toCarouselFormData(carousel));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load carousel.";
        showNotification(errorMessage);
      } finally {
        setIsFetchingCarousel(false);
      }
    };

    void loadCarousel();
  }, [carouselId, isEditMode, showNotification]);

  const handleNew = useCallback(() => {
    router.push(CAROUSEL_ROUTES.entry);
  }, [router]);

  const handleSubmit = useCallback(
    async (formData: CarouselFormData) => {
      setIsSubmitting(true);

      try {
        const validationErrors = validateCarouselForm(formData);
        if (validationErrors.length > 0) {
          validationErrors.forEach((error) => showNotification(error));
          return;
        }

        if (isEditMode) {
          await updateCarousel(carouselId, {
            headline: formData.headline,
            message: formData.message,
            title: formData.title,
            remarks: formData.remarks,
            status: formData.status,
          });
        } else {
          await createCarousel({
            headline: formData.headline,
            message: formData.message,
            title: formData.title,
            remarks: formData.remarks,
            status: formData.status,
          });
        }

        router.push(CAROUSEL_ROUTES.list);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred.";
        showNotification(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [carouselId, isEditMode, router, showNotification]
  );

  return {
    initialData: initialData ?? undefined,
    isLoading: isSubmitting || isFetchingCarousel,
    notifications,
    closeNotification,
    handleNew,
    handleSubmit,
  };
}
