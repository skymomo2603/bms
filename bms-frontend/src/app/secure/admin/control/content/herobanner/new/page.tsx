"use client";

import { Box } from "@mui/material";
import { useState } from "react";

import BreadcrumbsNav from "@/components/admin/common/BreadcrumbsNav";
import HeroBannerForm from "@/components/admin/content/herobanner/HeroBannerForm";
import { HEROBANNER_BREADCRUMBS } from "@/constants/herobanner";
import { HeroBanner as HeroBannerType } from "@/types/herobanner";

export default function HeroBannerNewPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: HeroBannerType) => {
    setIsLoading(true);
    setError(null);

    try {
      // API call (lib/api)
      // const response = await createHeroBanner(formData);
      console.log("Form submitted:", formData);
      // Handle success (redirect, toast, etc.)
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
