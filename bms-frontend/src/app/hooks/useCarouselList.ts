"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useAdminNotifications } from "@/hooks/useAdminNotifications";
import {
  deleteCarousels,
  getCarousels,
  updateCarousel,
} from "@/lib/api/carousel";
import type {
  CarouselDto,
  CarouselListFilterValues,
  CarouselPendingDeleteAction,
  CarouselPendingStatusChange,
  CarouselStatus,
} from "@/types/carousel";
import { filterCarousels } from "@/utils/carousel";

export function useCarouselList() {
  const [carousels, setCarousels] = useState<CarouselDto[]>([]);
  const [filters, setFilters] = useState<CarouselListFilterValues>({});
  const [selectedCarouselIds, setSelectedCarouselIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDeleteAction, setPendingDeleteAction] =
    useState<CarouselPendingDeleteAction | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] =
    useState<CarouselPendingStatusChange | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const { notifications, showNotification, closeNotification } =
    useAdminNotifications();

  const loadCarousels = useCallback(async () => {
    setIsLoading(true);

    try {
      setCarousels(await getCarousels());
    } catch (err) {
      const errorMessage =
        err instanceof Error && err.message
          ? err.message
          : "Failed to load carousels.";
      showNotification(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    loadCarousels();
  }, [loadCarousels]);

  const filteredCarousels = useMemo(
    () => filterCarousels(carousels, filters),
    [carousels, filters]
  );

  const applyFilters = useCallback((nextFilters: CarouselListFilterValues) => {
    setFilters(nextFilters);
    setSelectedCarouselIds([]);
  }, []);

  const toggleCarouselSelection = useCallback(
    (id: number, checked: boolean) => {
      setSelectedCarouselIds((prev) =>
        checked ? [...prev, id] : prev.filter((carouselId) => carouselId !== id)
      );
    },
    []
  );

  const selectAllVisibleCarousels = useCallback(() => {
    setSelectedCarouselIds(filteredCarousels.map((carousel) => carousel.id));
  }, [filteredCarousels]);

  const openDeleteAction = useCallback((carousel: CarouselDto) => {
    setPendingDeleteAction({
      ids: [carousel.id],
      mode: "single",
      title: carousel.title,
    });
  }, []);

  const openBulkDeleteAction = useCallback(() => {
    if (selectedCarouselIds.length === 0) {
      return;
    }

    setPendingDeleteAction({ ids: selectedCarouselIds, mode: "bulk" });
  }, [selectedCarouselIds]);

  const closeDeleteAction = useCallback(() => {
    setPendingDeleteAction(null);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!pendingDeleteAction) {
      return;
    }

    const idsToDelete = pendingDeleteAction.ids;
    const deleteMode = pendingDeleteAction.mode;

    try {
      setIsDeleting(true);
      await deleteCarousels(idsToDelete);
      setCarousels((prev) =>
        prev.filter((carousel) => !idsToDelete.includes(carousel.id))
      );
      setSelectedCarouselIds((prev) =>
        prev.filter((id) => !idsToDelete.includes(id))
      );
      setPendingDeleteAction(null);
    } catch (err) {
      const fallbackMessage =
        deleteMode === "bulk"
          ? "Failed to delete selected carousels."
          : "Failed to delete carousel.";
      const errorMessage =
        err instanceof Error && err.message ? err.message : fallbackMessage;
      showNotification(errorMessage);
      setPendingDeleteAction(null);
    } finally {
      setIsDeleting(false);
    }
  }, [pendingDeleteAction, showNotification]);

  const requestStatusChange = useCallback(
    (carousel: CarouselDto, nextStatus: CarouselStatus) => {
      if (carousel.status === nextStatus) {
        return;
      }

      setPendingStatusChange({
        id: carousel.id,
        title: carousel.title,
        currentStatus: carousel.status,
        nextStatus,
      });
    },
    []
  );

  const closeStatusChange = useCallback(() => {
    setPendingStatusChange(null);
  }, []);

  const confirmStatusChange = useCallback(async () => {
    if (!pendingStatusChange) {
      return;
    }

    const { id, nextStatus } = pendingStatusChange;

    try {
      setIsUpdatingStatus(true);
      await updateCarousel(id, { status: nextStatus });
      await loadCarousels();
      setPendingStatusChange(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error && err.message
          ? err.message
          : "Failed to update carousel status.";
      showNotification(errorMessage);
    } finally {
      setIsUpdatingStatus(false);
    }
  }, [loadCarousels, pendingStatusChange, showNotification]);

  return {
    filteredCarousels,
    selectedCarouselIds,
    isLoading,
    pendingDeleteAction,
    isDeleting,
    pendingStatusChange,
    isUpdatingStatus,
    notifications,
    closeNotification,
    applyFilters,
    toggleCarouselSelection,
    selectAllVisibleCarousels,
    openDeleteAction,
    openBulkDeleteAction,
    closeDeleteAction,
    confirmDelete,
    requestStatusChange,
    closeStatusChange,
    confirmStatusChange,
  };
}
