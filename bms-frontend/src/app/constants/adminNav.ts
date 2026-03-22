import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";

import type {
  AdminBreadcrumb,
  AdminNavItemDefinition,
  AdminSidebarNavItem,
} from "@/types/admin";

export const ADMIN_ROUTES = {
  dashboard: "/secure/admin/control",
  bookings: "/secure/admin/control/bookings",
  rooms: "/secure/admin/control/rooms",
  content: "/secure/admin/control/content",
  masterData: "/secure/admin/control/masterdata",
  users: "/secure/admin/control/users",
};

export const ADMIN_SIDEBAR_ITEMS: AdminSidebarNavItem[] = [
  {
    label: "Dashboard",
    href: ADMIN_ROUTES.dashboard,
    icon: DashboardIcon,
  },
  {
    label: "Bookings",
    href: ADMIN_ROUTES.bookings,
    icon: MenuBookRoundedIcon,
  },
  {
    label: "Rooms",
    href: ADMIN_ROUTES.rooms,
    icon: MeetingRoomRoundedIcon,
  },
  {
    label: "Content",
    href: ADMIN_ROUTES.content,
    icon: ArticleRoundedIcon,
  },
  {
    label: "Master Data",
    href: ADMIN_ROUTES.masterData,
    icon: StorageRoundedIcon,
  },
  {
    label: "Users",
    href: ADMIN_ROUTES.users,
    icon: PersonRoundedIcon,
  },
];

export const BOOKING_BREADCRUMBS: AdminBreadcrumb[] = [
  { label: "Bookings", active: true },
];

export const BOOKING_NAV_ITEMS: AdminNavItemDefinition[] = [
  {
    label: "To Do",
    href: ADMIN_ROUTES.bookings,
    icon: MenuBookRoundedIcon,
    iconSize: 50,
  },
];

export const MASTER_DATA_BREADCRUMBS: AdminBreadcrumb[] = [
  { label: "Master Data", active: true },
];

export const MASTER_DATA_NAV_ITEMS: AdminNavItemDefinition[] = [
  {
    label: "To Do",
    href: ADMIN_ROUTES.masterData,
    icon: StorageRoundedIcon,
    iconSize: 50,
  },
];

export const USER_BREADCRUMBS: AdminBreadcrumb[] = [
  { label: "Users", active: true },
];

export const USER_NAV_ITEMS: AdminNavItemDefinition[] = [
  {
    label: "To Do",
    href: ADMIN_ROUTES.users,
    icon: PersonRoundedIcon,
    iconSize: 50,
  },
];
