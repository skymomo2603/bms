"use client";

import BreadcrumbsNav from "@/components/admin/common/BreadcrumbsNav";
import AdminNavItem from "@/components/admin/common/NavItem";
import { USER_BREADCRUMBS, USER_NAV_ITEMS } from "@/constants/adminNav";

export default function UsersPage() {
  return (
    <>
      <BreadcrumbsNav crumbs={USER_BREADCRUMBS} />
      <AdminNavItem navItems={USER_NAV_ITEMS} />
    </>
  );
}
