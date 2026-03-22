"use client";

import BreadcrumbsNav from "@/components/admin/common/BreadcrumbsNav";
import { CAROUSEL_BREADCRUMBS } from "@/constants/content";

export default function HeroBanner() {
  return (
    <>
      <BreadcrumbsNav crumbs={CAROUSEL_BREADCRUMBS} />
    </>
  );
}
