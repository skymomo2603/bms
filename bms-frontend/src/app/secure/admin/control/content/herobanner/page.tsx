"use client";

import BreadcrumbsNav from "@/components/BreadcrumbsNav";
import FacilityControls from "@/components/FacilityControls";
import FilterBar from "@/components/FilterBar";
import { Grid } from "@mui/material";

interface FilterDefinition {
  key: string;
  label: string;
  options?: string[];
}

const keyword = "keyword";

const dropdownFilters: FilterDefinition[] = [
  {
    key: "status",
    label: "Status",
    options: ["Active", "Inactive"],
  },
];

function handleCreate() {}

function handleSelectAll() {}

function handleDeleteAll() {}

export default function HeroBanner() {
  return (
    <>
      <BreadcrumbsNav
        crumbs={[
          { label: "Content", href: "/secure/admin/control/content" },
          { label: "Hero Banner", active: true },
        ]}
      />

      <Grid container sx={{ px: 2 }}>
        <Grid
          item
          xs={2.3}
          sx={{
            px: 1.5,
            borderRight: "1px solid var(--border-color-custom-2)",
          }}
        >
          <FacilityControls
            labelSingular="Banner"
            labelPlural="Banners"
            onCreate={handleCreate}
            onSelectAll={handleSelectAll}
            onDeleteAll={handleDeleteAll}
            statusOptions={undefined}
          />
        </Grid>
        <Grid item xs={9.7} sx={{ pl: 1.5 }}>
          <FilterBar
            keyword={keyword}
            dropdownFilters={dropdownFilters}
            onApplyFilters={(values: Record<string, string | boolean>) => {
              console.log("Filter values:", values);
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
