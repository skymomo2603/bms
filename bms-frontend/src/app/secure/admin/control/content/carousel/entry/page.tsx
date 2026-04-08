"use client";

import { Box } from "@mui/material";

import BreadcrumbsNav from "@/components/admin/common/BreadcrumbsNav";
import AdminNotificationStack from "@/components/admin/common/NotificationStack";
import CarouselForm from "@/components/admin/content/carousel/CarouselForm";
import { CAROUSEL_ENTRY_BREADCRUMBS } from "@/constants/carousel";
import { useCarouselEntryForm } from "@/hooks/useCarouselEntryForm";

export default function CarouselEntryPage() {
  const {
    initialData,
    isLoading,
    notifications,
    closeNotification,
    handleNew,
    handleSubmit,
  } = useCarouselEntryForm();

  return (
    <>
      <BreadcrumbsNav crumbs={CAROUSEL_ENTRY_BREADCRUMBS} />
      <Box sx={{ px: 6, py: 2.5 }}>
        <CarouselForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onNew={handleNew}
          isLoading={isLoading}
        />
      </Box>

      <AdminNotificationStack
        notifications={notifications}
        onClose={closeNotification}
      />
    </>
  );
}
