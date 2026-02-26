"use client";

import BreadcrumbsNav from "@/components/BreadcrumbsNav";
import FacilityControl from "@/components/FacilityControl";
import FilterBar from "@/components/FilterBar";
import { Grid } from "@mui/material";

interface FilterDefinition {
  key: string;
  label: string;
  options?: string[];
}

const dropdownFilters: FilterDefinition[] = [
  {
    key: "roomType",
    label: "Room Type",
    options: ["Family", "Deluxe", "Suite"],
  },
  {
    key: "bedType",
    label: "Bed Type",
    options: ["Single", "Double", "Queen", "King"],
  },
  {
    key: "capacity",
    label: "Capacity",
    options: ["1", "2", "3", "4"],
  },
  {
    key: "status",
    label: "Status",
    options: ["Active", "Inactive"],
  },
];

const checkboxFilters: FilterDefinition[] = [
  { key: "all", label: "All" },
  { key: "wifi", label: "Wi-Fi" },
  { key: "tv", label: "TV" },
  { key: "ac", label: "AC" },
];

const keyword = "keyword";

function handleCreate() {
  console.log("Create Button Triggered");
}

function handleSelectAll() {}

function handleEditAll() {}

export default function ManageRooms() {
  return (
    <>
      <BreadcrumbsNav
        crumbs={[
          { label: "Rooms", href: "/secure/admin/control/rooms" },
          { label: "Manage Rooms", active: true },
        ]}
      />

      <Grid container sx={{ px: 2 }}>
        <Grid
          item
          xs={2}
          sx={{
            px: 1.5,
            borderRight: "1px solid var(--border-color-custom-2)",
          }}
        >
          <FacilityControl
            labelSingular="Room"
            labelPlural="Rooms"
            onCreate={handleCreate}
            onSelectAll={handleSelectAll}
            onEditAll={handleEditAll}
          />
        </Grid>
        <Grid item xs={10} sx={{ pl: 1.5 }}>
          <FilterBar
            keyword={keyword}
            dropdownFilters={dropdownFilters}
            checkboxFilters={checkboxFilters}
            onApplyFilters={(values: Record<string, string | boolean>) => {
              console.log("Filter values:", values);
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
