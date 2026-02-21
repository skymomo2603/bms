"use client";

import BreadcrumbsNav from "@/components/BreadcrumbsNav";

export default function ManageRooms() {
  return (
    <>
      <BreadcrumbsNav
        crumbs={[
          { label: "Rooms", href: "/secure/admin/control/rooms" },
          { label: "Manage Rooms", active: true },
        ]}
      />
    </>
  );
}
