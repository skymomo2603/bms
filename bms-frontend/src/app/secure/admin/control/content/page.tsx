"use client";

import AdminNavItem from "@/components/AdminNavItem";
import BreadcrumbsNav from "@/components/BreadcrumbsNav";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";

export default function ContentTab() {
  const navItems = [
    {
      label: "Hero Banner",
      href: "/secure/admin/content/herobanner",
      icon: InsertPhotoOutlinedIcon,
      iconSize: 50,
    },
    {
      label: "Carousel",
      href: "/secure/admin/content/carousel",
      icon: CollectionsOutlinedIcon,
      iconSize: 50,
    },
  ];

  return (
    <>
      <BreadcrumbsNav crumbs={[{ label: "Content", active: true }]} />
      <AdminNavItem navItems={navItems} />
    </>
  );
}
