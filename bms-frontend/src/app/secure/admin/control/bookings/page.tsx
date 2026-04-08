"use client";

import BreadcrumbsNav from "@/components/admin/common/BreadcrumbsNav";
import AdminNavItem from "@/components/admin/common/NavItem";
import { BOOKING_BREADCRUMBS, BOOKING_NAV_ITEMS } from "@/constants/adminNav";

export default function BookingsPage() {
  return (
    <>
      <BreadcrumbsNav crumbs={BOOKING_BREADCRUMBS} />
      <AdminNavItem navItems={BOOKING_NAV_ITEMS} />
    </>
  );
}
