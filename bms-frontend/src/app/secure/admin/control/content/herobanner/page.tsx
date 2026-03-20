"use client";

import BreadcrumbsNav from "@/components/admin/common/BreadcrumbsNav";
import FacilityControls from "@/components/admin/common/FacilityControls";
import FilterBar from "@/components/admin/common/FilterBar";
import AdminNotificationStack from "@/components/admin/common/NotificationStack";
import DeleteHeroBannerDialog from "@/components/admin/content/herobanner/DeleteHeroBannerDialog";
import HeroBannerListItem from "@/components/admin/content/herobanner/HeroBannerListItem";
import HeroBannerStatusDialog from "@/components/admin/content/herobanner/HeroBannerStatusDialog";
import {
  HEROBANNER_DROPDOWN_FILTERS,
  HEROBANNER_FILTER_KEY,
} from "@/constants/heroBannerList";
import {
  HEROBANNER_LIST_BREADCRUMBS,
  HEROBANNER_ROUTES,
} from "@/constants/herobanner";
import { useAdminNotifications } from "@/hooks/useAdminNotifications";
import {
  deleteHeroBanners,
  getHeroBanners,
  updateHeroBanner,
} from "@/lib/api/heroBanner";
import { HeroBannerDto, HeroBannerStatus } from "@/types/herobanner";
import { Box, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";

type FilterValues = Record<string, string | boolean>;

interface PendingStatusChange {
  id: number;
  title: string;
  currentStatus: HeroBannerStatus;
  nextStatus: HeroBannerStatus;
}

interface PendingDeleteAction {
  ids: number[];
  mode: "single" | "bulk";
  title?: string;
}

const createHref = HEROBANNER_ROUTES.entry;

export default function HeroBannerPage() {
  const [banners, setBanners] = useState<HeroBannerDto[]>([]);
  const [filters, setFilters] = useState<FilterValues>({});
  const [selectedBannerIds, setSelectedBannerIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDeleteAction, setPendingDeleteAction] =
    useState<PendingDeleteAction | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] =
    useState<PendingStatusChange | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const { notifications, showNotification, closeNotification } =
    useAdminNotifications();

  const handleDeleteAll = useCallback(() => {
    if (selectedBannerIds.length === 0) {
      return;
    }

    setPendingDeleteAction({ ids: selectedBannerIds, mode: "bulk" });
  }, [selectedBannerIds]);

  const handleConfirmDelete = useCallback(async () => {
    if (!pendingDeleteAction) {
      return;
    }

    const idsToDelete = pendingDeleteAction.ids;
    const deleteMode = pendingDeleteAction.mode;

    try {
      setIsDeleting(true);
      await deleteHeroBanners(idsToDelete);
      setBanners((prev) => prev.filter((b) => !idsToDelete.includes(b.id)));
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

  const handleToggleBanner = useCallback((id: number, checked: boolean) => {
    setSelectedBannerIds((prev) =>
      checked ? [...prev, id] : prev.filter((bannerId) => bannerId !== id)
    );
  }, []);

  const handleOpenDeleteEntry = useCallback((banner: HeroBannerDto) => {
    setPendingDeleteAction({
      ids: [banner.id],
      mode: "single",
      title: banner.title,
    });
  }, []);

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

  const handleStatusChange = (
    banner: HeroBannerDto,
    nextStatus: HeroBannerStatus
  ) => {
    if (banner.status === nextStatus) {
      return;
    }

    setPendingStatusChange({
      id: banner.id,
      title: banner.title,
      currentStatus: banner.status,
      nextStatus,
    });
  };

  const handleConfirmStatusChange = useCallback(async () => {
    if (!pendingStatusChange) {
      return;
    }

    const { id, nextStatus } = pendingStatusChange;

    try {
      setIsUpdatingStatus(true);
      await updateHeroBanner(id, {
        status: nextStatus,
      });

      setBanners((prev) =>
        prev.map((banner) => {
          if (banner.id === id) {
            return { ...banner, status: nextStatus };
          }

          if (nextStatus === "Active") {
            return { ...banner, status: "Inactive" };
          }

          return banner;
        })
      );

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

  useEffect(() => {
    loadBanners();
  }, [loadBanners]);

  const filteredBanners = useMemo(() => {
    const rawStatus = filters.status;
    const rawKeyword = filters[HEROBANNER_FILTER_KEY];

    const statusFilter =
      typeof rawStatus === "string" && rawStatus !== "All" ? rawStatus : "";

    const keywordFilter =
      typeof rawKeyword === "string" ? rawKeyword.trim().toLowerCase() : "";

    return banners.filter((banner) => {
      const matchesStatus = statusFilter
        ? banner.status.toLowerCase() === statusFilter.toLowerCase()
        : true;
      const matchesKeyword = keywordFilter
        ? banner.title.toLowerCase().includes(keywordFilter)
        : true;

      return matchesStatus && matchesKeyword;
    });
  }, [banners, filters]);

  const handleSelectAll = useCallback(() => {
    setSelectedBannerIds(filteredBanners.map((b) => b.id));
  }, [filteredBanners]);

  return (
    <>
      <BreadcrumbsNav crumbs={HEROBANNER_LIST_BREADCRUMBS} />

      <Grid container sx={{ px: 2 }}>
        <Grid
          item
          xs={2.3}
          sx={{
            px: 1.5,
            borderRight: "1px solid var(--border-color-custom-2)",
          }}
        >
          <FacilityControls
            labelSingular="Banner"
            labelPlural="Banners"
            onCreate={createHref}
            onSelectAll={handleSelectAll}
            onDeleteAll={handleDeleteAll}
            deleteAllDisabled={selectedBannerIds.length === 0}
            selectedCount={selectedBannerIds.length}
          />
        </Grid>
        <Grid item xs={9.7} sx={{ pl: 1.5 }}>
          <FilterBar
            keyword={HEROBANNER_FILTER_KEY}
            dropdownFilters={HEROBANNER_DROPDOWN_FILTERS}
            onApplyFilters={(values: FilterValues) => {
              setFilters(values);
              setSelectedBannerIds([]);
            }}
          />

          {isLoading && (
            <Typography sx={{ mt: 2, color: "var(--text-grey-dark)" }}>
              Loading banners...
            </Typography>
          )}

          {!isLoading && (
            <Box sx={{ mt: 3 }}>
              {filteredBanners.map((banner) => (
                <HeroBannerListItem
                  key={banner.id}
                  id={banner.id}
                  title={banner.title}
                  remarks={banner.remarks}
                  image={banner.image}
                  status={banner.status}
                  isSelected={selectedBannerIds.includes(banner.id)}
                  isUpdatingStatus={isUpdatingStatus}
                  onToggleSelect={(checked) =>
                    handleToggleBanner(banner.id, checked)
                  }
                  onStatusChange={(nextStatus) =>
                    handleStatusChange(banner, nextStatus)
                  }
                  onDelete={() => handleOpenDeleteEntry(banner)}
                />
              ))}

              {filteredBanners.length === 0 && (
                <Typography sx={{ mt: 2, color: "var(--text-grey-dark)" }}>
                  No banners found for the applied filters.
                </Typography>
              )}
            </Box>
          )}
        </Grid>
      </Grid>

      <DeleteHeroBannerDialog
        open={Boolean(pendingDeleteAction)}
        mode={pendingDeleteAction?.mode ?? "single"}
        title={pendingDeleteAction?.title}
        count={pendingDeleteAction?.ids.length ?? 0}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setPendingDeleteAction(null)}
      />

      <HeroBannerStatusDialog
        open={Boolean(pendingStatusChange)}
        title={pendingStatusChange?.title}
        currentStatus={pendingStatusChange?.currentStatus}
        nextStatus={pendingStatusChange?.nextStatus}
        isUpdatingStatus={isUpdatingStatus}
        onConfirm={handleConfirmStatusChange}
        onClose={() => setPendingStatusChange(null)}
      />

      <AdminNotificationStack
        notifications={notifications}
        onClose={closeNotification}
      />
    </>
  );
}
