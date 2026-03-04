"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

import BreadcrumbsNav from "@/components/admin/common/BreadcrumbsNav";
import HeroBannerForm from "@/components/admin/content/herobanner/HeroBannerForm";
import { HEROBANNER_BREADCRUMBS } from "@/constants/herobanner";
import { createHeroBanner } from "@/lib/api/heroBanner";
import { HeroBanner as HeroBannerType } from "@/types/herobanner";

export default function HeroBannerNewPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: HeroBannerType) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate image is not null
      if (!formData.image) {
        setError("Image is required");
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
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BreadcrumbsNav crumbs={HEROBANNER_BREADCRUMBS.new} />
      <Box sx={{ px: 6, py: 3 }}>
        <HeroBannerForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      </Box>
    </>
  );
}
