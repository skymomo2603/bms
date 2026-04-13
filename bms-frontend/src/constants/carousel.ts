import type { AdminBreadcrumb, AdminFilterDefinition } from "@/types/admin";

export const STATUS_OPTIONS = ["Active", "Inactive"] as const;

export const CAROUSEL_ROUTES = {
  list: "/secure/admin/control/content/carousel",
  entry: "/secure/admin/control/content/carousel/entry",
  entryEdit: (id: number) =>
    `/secure/admin/control/content/carousel/entry?id=${id}`,
};

export const CAROUSEL_LIST_BREADCRUMBS: AdminBreadcrumb[] = [
  { label: "Content", href: "/secure/admin/control/content" },
  { label: "Carousel", active: true },
];

export const CAROUSEL_ENTRY_BREADCRUMBS: AdminBreadcrumb[] = [
  { label: "Content", href: "/secure/admin/control/content" },
  { label: "Carousel", href: CAROUSEL_ROUTES.list },
  { label: "Entry", active: true },
];

export const FORM_DEFAULTS = {
  headline: "",
  message: "",
  title: "",
  remarks: "",
  status: "Active" as const,
  images: [],
};

export const CAROUSEL_FILTER_KEY = "keyword";

export const CAROUSEL_DROPDOWN_FILTERS: AdminFilterDefinition[] = [
  {
    key: "status",
    label: "Status",
    options: ["All", ...STATUS_OPTIONS],
  },
];
