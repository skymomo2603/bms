import { STATUS_OPTIONS } from "@/constants/herobanner";
import type { AdminFilterDefinition } from "@/types/admin";

export const HEROBANNER_FILTER_KEY = "keyword";

export const HEROBANNER_DROPDOWN_FILTERS: AdminFilterDefinition[] = [
  {
    key: "status",
    label: "Status",
    options: ["All", ...STATUS_OPTIONS],
  },
];
