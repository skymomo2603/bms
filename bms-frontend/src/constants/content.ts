import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";

import { HEROBANNER_ROUTES } from "@/constants/herobanner";
import type { AdminBreadcrumb, AdminNavItemDefinition } from "@/types/admin";

export const CONTENT_ROUTES = {
  list: "/secure/admin/control/content",
  carousel: "/secure/admin/control/content/carousel",
};

export const CONTENT_BREADCRUMBS: AdminBreadcrumb[] = [
  { label: "Content", active: true },
];

export const CAROUSEL_BREADCRUMBS: AdminBreadcrumb[] = [
  { label: "Content", href: CONTENT_ROUTES.list },
  { label: "Carousel", active: true },
];

export const CONTENT_NAV_ITEMS: AdminNavItemDefinition[] = [
  {
    label: "Hero Banner",
    href: HEROBANNER_ROUTES.list,
    icon: InsertPhotoOutlinedIcon,
    iconSize: 50,
  },
  {
    label: "Carousel",
    href: CONTENT_ROUTES.carousel,
    icon: CollectionsOutlinedIcon,
    iconSize: 50,
  },
];
