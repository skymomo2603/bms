"use client";

import AdminNavItem from "@/components/admin/common/AdminNavItem";
import BreadcrumbsNav from "@/components/admin/common/BreadcrumbsNav";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";

export default function BookingsTab() {
  const navItems = [
    {
      label: "To Do",
      href: "#",
      icon: ConstructionOutlinedIcon,
      iconSize: 50,
    },
  ];

  return (
    <>
      <BreadcrumbsNav crumbs={[{ label: "Bookings", active: true }]} />
      <AdminNavItem navItems={navItems} />
    </>
  );
}
