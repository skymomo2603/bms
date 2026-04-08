"use client";

import BreadcrumbsNav from "@/components/admin/common/BreadcrumbsNav";
import AdminNavItem from "@/components/admin/common/NavItem";
import { CONTENT_BREADCRUMBS, CONTENT_NAV_ITEMS } from "@/constants/content";

export default function ContentPage() {
  return (
    <>
      <BreadcrumbsNav crumbs={CONTENT_BREADCRUMBS} />
      <AdminNavItem navItems={CONTENT_NAV_ITEMS} />
    </>
  );
}
