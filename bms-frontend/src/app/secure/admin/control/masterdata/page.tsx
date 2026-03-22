"use client";

import BreadcrumbsNav from "@/components/admin/common/BreadcrumbsNav";
import AdminNavItem from "@/components/admin/common/NavItem";
import {
  MASTER_DATA_BREADCRUMBS,
  MASTER_DATA_NAV_ITEMS,
} from "@/constants/adminNav";

export default function MasterDataTab() {
  return (
    <>
      <BreadcrumbsNav crumbs={MASTER_DATA_BREADCRUMBS} />
      <AdminNavItem navItems={MASTER_DATA_NAV_ITEMS} />
    </>
  );
}
