export const STATUS_OPTIONS = ["Active", "Inactive"] as const;

export const HEROBANNER_BREADCRUMBS = {
  new: [
    { label: "Content", href: "/secure/admin/control/content" },
    { label: "Hero Banner", href: "/secure/admin/control/content/herobanner" },
    { label: "New", active: true },
  ],
  edit: (id: string) => [
    { label: "Content", href: "/secure/admin/control/content" },
    { label: "Hero Banner", href: "/secure/admin/control/content/herobanner" },
    { label: "Edit", active: true },
  ],
};

export const FORM_DEFAULTS = {
  title: "",
  remarks: "",
  status: "Active" as const,
  image: null,
};
