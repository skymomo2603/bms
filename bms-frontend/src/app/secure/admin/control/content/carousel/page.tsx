"use client";

import BreadcrumbsNav from "@/components/BreadcrumbsNav";

export default function HeroBanner() {
  return (
    <>
      <BreadcrumbsNav
        crumbs={[
          { label: "Content", href: "/secure/admin/control/content" },
          { label: "Carousel", active: true },
        ]}
      />
    </>
  );
}
