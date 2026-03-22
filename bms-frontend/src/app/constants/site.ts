import type { PublicNavItem } from "@/types/admin";

export const SITE_NAME = "KsVill Hotel";
export const SITE_COPYRIGHT = "©2026 KsVill Hotel. All rights reserved.";
export const SITE_VERSION = "Version X.X";

export const PUBLIC_NAV_ITEMS: PublicNavItem[] = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

export const ADMIN_CONTROL_ROUTE = "/secure/admin/control";
