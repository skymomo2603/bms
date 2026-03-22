"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useAdminNotifications } from "@/hooks/useAdminNotifications";
import {
  deleteHeroBanners,
  getHeroBanners,
  updateHeroBanner,
} from "@/lib/api/heroBanner";
import type {
  HeroBannerDto,
  HeroBannerListFilterValues,
  HeroBannerPendingDeleteAction,
  HeroBannerPendingStatusChange,
  HeroBannerStatus,
} from "@/types/herobanner";
import { filterHeroBanners } from "@/utils/herobanner";

export function useHeroBannerList() {
  const [banners, setBanners] = useState<HeroBannerDto[]>([]);
  const [filters, setFilters] = useState<HeroBannerListFilterValues>({});
  const [selectedBannerIds, setSelectedBannerIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDeleteAction, setPendingDeleteAction] =
    useState<HeroBannerPendingDeleteAction | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] =
    useState<HeroBannerPendingStatusChange | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const { notifications, showNotification, closeNotification } =
    useAdminNotifications();

  const loadBanners = useCallback(async () => {
    setIsLoading(true);

    try {
      setBanners(await getHeroBanners());
    } catch (err) {
      const errorMessage =
        err instanceof Error && err.message
          ? err.message
          : "Failed to load hero banners.";
      showNotification(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    loadBanners();
  }, [loadBanners]);

  const filteredBanners = useMemo(
    () => filterHeroBanners(banners, filters),
    [banners, filters]
  );

  const applyFilters = useCallback(
    (nextFilters: HeroBannerListFilterValues) => {
      setFilters(nextFilters);
      setSelectedBannerIds([]);
    },
    []
  );

  const toggleBannerSelection = useCallback((id: number, checked: boolean) => {
    setSelectedBannerIds((prev) =>
      checked ? [...prev, id] : prev.filter((bannerId) => bannerId !== id)
    );
  }, []);

  const selectAllVisibleBanners = useCallback(() => {
    setSelectedBannerIds(filteredBanners.map((banner) => banner.id));
  }, [filteredBanners]);

  const openDeleteAction = useCallback((banner: HeroBannerDto) => {
    setPendingDeleteAction({
      ids: [banner.id],
      mode: "single",
      title: banner.title,
    });
  }, []);

  const openBulkDeleteAction = useCallback(() => {
    if (selectedBannerIds.length === 0) {
      return;
    }

    setPendingDeleteAction({ ids: selectedBannerIds, mode: "bulk" });
  }, [selectedBannerIds]);

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
      await deleteHeroBanners(idsToDelete);
      setBanners((prev) =>
        prev.filter((banner) => !idsToDelete.includes(banner.id))
      );
      setSelectedBannerIds((prev) =>
        prev.filter((id) => !idsToDelete.includes(id))
      );
      setPendingDeleteAction(null);
    } catch (err) {
      const fallbackMessage =
        deleteMode === "bulk"
          ? "Failed to delete selected banners."
          : "Failed to delete hero banner.";
      const errorMessage =
        err instanceof Error && err.message ? err.message : fallbackMessage;
      showNotification(errorMessage);
      setPendingDeleteAction(null);
    } finally {
      setIsDeleting(false);
    }
  }, [pendingDeleteAction, showNotification]);

  const requestStatusChange = useCallback(
    (banner: HeroBannerDto, nextStatus: HeroBannerStatus) => {
      if (banner.status === nextStatus) {
        return;
      }

      setPendingStatusChange({
        id: banner.id,
        title: banner.title,
        currentStatus: banner.status,
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
      await updateHeroBanner(id, { status: nextStatus });
      await loadBanners();
      setPendingStatusChange(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error && err.message
          ? err.message
          : "Failed to update hero banner status.";
      showNotification(errorMessage);
    } finally {
      setIsUpdatingStatus(false);
    }
  }, [loadBanners, pendingStatusChange, showNotification]);

  return {
    filteredBanners,
    selectedBannerIds,
    isLoading,
    pendingDeleteAction,
    isDeleting,
    pendingStatusChange,
    isUpdatingStatus,
    notifications,
    closeNotification,
    applyFilters,
    toggleBannerSelection,
    selectAllVisibleBanners,
    openDeleteAction,
    openBulkDeleteAction,
    closeDeleteAction,
    confirmDelete,
    requestStatusChange,
    closeStatusChange,
    confirmStatusChange,
  };
}
