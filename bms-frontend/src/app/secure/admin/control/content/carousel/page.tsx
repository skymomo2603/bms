"use client";

import BreadcrumbsNav from "@/components/admin/common/BreadcrumbsNav";
import FacilityControls from "@/components/admin/common/FacilityControls";
import FilterBar from "@/components/admin/common/FilterBar";
import AdminNotificationStack from "@/components/admin/common/NotificationStack";
import CarouselListItem from "@/components/admin/content/carousel/CarouselListItem";
import CarouselStatusDialog from "@/components/admin/content/carousel/CarouselStatusDialog";
import DeleteCarouselDialog from "@/components/admin/content/carousel/DeleteCarouselDialog";
import {
  CAROUSEL_DROPDOWN_FILTERS,
  CAROUSEL_FILTER_KEY,
  CAROUSEL_LIST_BREADCRUMBS,
  CAROUSEL_ROUTES,
} from "@/constants/carousel";
import { useCarouselList } from "@/hooks/useCarouselList";
import { Box, Grid, Typography } from "@mui/material";

const createHref = CAROUSEL_ROUTES.entry;

export default function CarouselPage() {
  const {
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
  } = useCarouselList();

  return (
    <>
      <BreadcrumbsNav crumbs={CAROUSEL_LIST_BREADCRUMBS} />

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
            labelSingular="Carousel"
            labelPlural="Carousels"
            onCreate={createHref}
            onSelectAll={selectAllVisibleCarousels}
            onDeleteAll={openBulkDeleteAction}
            deleteAllDisabled={selectedCarouselIds.length === 0}
            selectedCount={selectedCarouselIds.length}
          />
        </Grid>
        <Grid item xs={9.7} sx={{ pl: 1.5 }}>
          <FilterBar
            keyword={CAROUSEL_FILTER_KEY}
            dropdownFilters={CAROUSEL_DROPDOWN_FILTERS}
            onApplyFilters={applyFilters}
          />

          {isLoading && (
            <Typography sx={{ mt: 2, color: "var(--text-grey-dark)" }}>
              Loading carousels...
            </Typography>
          )}

          {!isLoading && (
            <Box sx={{ mt: 3 }}>
              {filteredCarousels.map((carousel) => (
                <CarouselListItem
                  key={carousel.id}
                  id={carousel.id}
                  headline={carousel.headline}
                  title={carousel.title}
                  message={carousel.message}
                  remarks={carousel.remarks}
                  status={carousel.status}
                  isSelected={selectedCarouselIds.includes(carousel.id)}
                  isUpdatingStatus={isUpdatingStatus}
                  onToggleSelect={(checked) =>
                    toggleCarouselSelection(carousel.id, checked)
                  }
                  onStatusChange={(nextStatus) =>
                    requestStatusChange(carousel, nextStatus)
                  }
                  onDelete={() => openDeleteAction(carousel)}
                />
              ))}

              {filteredCarousels.length === 0 && (
                <Typography sx={{ mt: 2, color: "var(--text-grey-dark)" }}>
                  No carousels found...
                </Typography>
              )}
            </Box>
          )}
        </Grid>
      </Grid>

      <DeleteCarouselDialog
        open={Boolean(pendingDeleteAction)}
        mode={pendingDeleteAction?.mode ?? "single"}
        title={pendingDeleteAction?.title}
        count={pendingDeleteAction?.ids.length ?? 0}
        isDeleting={isDeleting}
        onConfirm={confirmDelete}
        onClose={closeDeleteAction}
      />

      <CarouselStatusDialog
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
