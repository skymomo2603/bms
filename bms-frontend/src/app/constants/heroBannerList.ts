import { STATUS_OPTIONS } from "@/constants/herobanner";

export interface HeroBannerFilterDefinition {
  key: string;
  label: string;
  options?: string[];
}

export const HEROBANNER_FILTER_KEY = "keyword";

export const HEROBANNER_DROPDOWN_FILTERS: HeroBannerFilterDefinition[] = [
  {
    key: "status",
    label: "Status",
    options: ["All", ...STATUS_OPTIONS],
  },
];
