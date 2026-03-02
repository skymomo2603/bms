"use client";

import AdminNavItem from "@/components/admin/common/AdminNavItem";
import BreadcrumbsNav from "@/components/admin/common/BreadcrumbsNav";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";

export default function UsersTab() {
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
      <BreadcrumbsNav crumbs={[{ label: "Users", active: true }]} />
      <AdminNavItem navItems={navItems} />
    </>
  );
}
