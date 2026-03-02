"use client";

import AdminNavItem from "@/components/admin/common/AdminNavItem";
import BreadcrumbsNav from "@/components/admin/common/BreadcrumbsNav";
import DoorFrontOutlinedIcon from "@mui/icons-material/DoorFrontOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import RedeemOutlinedIcon from "@mui/icons-material/RedeemOutlined";

export default function RoomsTab() {
  const navItems = [
    {
      label: "Manage Rooms",
      href: "/secure/admin/control/rooms/managerooms",
      icon: DoorFrontOutlinedIcon,
      iconSize: 48,
    },
    {
      label: "Manage Pricing",
      href: "/secure/admin/control/rooms/managepricing",
      icon: LocalOfferOutlinedIcon,
      iconSize: 46,
    },
    {
      label: "Manage Promos",
      href: "/secure/admin/control/rooms/managepromos",
      icon: RedeemOutlinedIcon,
      iconSize: 46,
    },
  ];

  return (
    <>
      <BreadcrumbsNav crumbs={[{ label: "Rooms", active: true }]} />
      <AdminNavItem navItems={navItems} />
    </>
  );
}
