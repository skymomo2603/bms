"use client";

import AdminNavItem from "@/components/AdminNavItem";
import BreadcrumbsNav from "@/components/BreadcrumbsNav";
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
