import type { AdminBreadcrumb, AdminFilterDefinition } from "@/types/admin";

export const STATUS_OPTIONS = ["Active", "Inactive"] as const;

export const HEROBANNER_ROUTES = {
  list: "/secure/admin/control/content/herobanner",
  entry: "/secure/admin/control/content/herobanner/entry",
  entryEdit: (id: number) =>
    `/secure/admin/control/content/herobanner/entry?id=${id}`,
};

export const HEROBANNER_LIST_BREADCRUMBS: AdminBreadcrumb[] = [
  { label: "Content", href: "/secure/admin/control/content" },
  { label: "Hero Banner", active: true },
];

export const HEROBANNER_ENTRY_BREADCRUMBS: AdminBreadcrumb[] = [
  { label: "Content", href: "/secure/admin/control/content" },
  { label: "Hero Banner", href: HEROBANNER_ROUTES.list },
  { label: "Entry", active: true },
];

export const FORM_DEFAULTS = {
  headline: "",
  title: "",
  remarks: "",
  status: "Active" as const,
  image: null,
};

export const HEROBANNER_FILTER_KEY = "keyword";

export const HEROBANNER_DROPDOWN_FILTERS: AdminFilterDefinition[] = [
  {
    key: "status",
    label: "Status",
    options: ["All", ...STATUS_OPTIONS],
  },
];
