import type { SvgIconComponent } from "@mui/icons-material";

export interface AdminBreadcrumb {
  label: string;
  href?: string;
  active?: boolean;
}

export interface AdminFilterDefinition {
  key: string;
  label: string;
  options?: string[];
}

export type AdminFilterValues = Record<string, string | boolean>;

export interface AdminNavItemDefinition {
  label: string;
  href: string;
  icon: SvgIconComponent;
  iconSize: number;
}

export interface AdminSidebarNavItem {
  label: string;
  href: string;
  icon: SvgIconComponent;
}

export interface PublicNavItem {
  label: string;
  href: string;
}
