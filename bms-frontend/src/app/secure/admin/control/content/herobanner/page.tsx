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
  HEROBANNER_LIST_BREADCRUMBS,
  HEROBANNER_ROUTES,
} from "@/constants/herobanner";
import { useHeroBannerList } from "@/hooks/useHeroBannerList";
import { Box, Grid, Typography } from "@mui/material";

const createHref = HEROBANNER_ROUTES.entry;

export default function HeroBannerPage() {
  const {
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
  } = useHeroBannerList();

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
            onSelectAll={selectAllVisibleBanners}
            onDeleteAll={openBulkDeleteAction}
            deleteAllDisabled={selectedBannerIds.length === 0}
            selectedCount={selectedBannerIds.length}
          />
        </Grid>
        <Grid item xs={9.7} sx={{ pl: 1.5 }}>
          <FilterBar
            keyword={HEROBANNER_FILTER_KEY}
            dropdownFilters={HEROBANNER_DROPDOWN_FILTERS}
            onApplyFilters={applyFilters}
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
                    toggleBannerSelection(banner.id, checked)
                  }
                  onStatusChange={(nextStatus) =>
                    requestStatusChange(banner, nextStatus)
                  }
                  onDelete={() => openDeleteAction(banner)}
                />
              ))}

              {filteredBanners.length === 0 && (
                <Typography sx={{ mt: 2, color: "var(--text-grey-dark)" }}>
                  No banners found...
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
        onConfirm={confirmDelete}
        onClose={closeDeleteAction}
      />

      <HeroBannerStatusDialog
        open={Boolean(pendingStatusChange)}
        title={pendingStatusChange?.title}
        currentStatus={pendingStatusChange?.currentStatus}
        nextStatus={pendingStatusChange?.nextStatus}
        isUpdatingStatus={isUpdatingStatus}
        onConfirm={confirmStatusChange}
        onClose={closeStatusChange}
      />

      <AdminNotificationStack
        notifications={notifications}
        onClose={closeNotification}
      />
    </>
  );
}
