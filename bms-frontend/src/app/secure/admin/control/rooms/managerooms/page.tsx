"use client";

import BreadcrumbsNav from "@/components/admin/common/BreadcrumbsNav";
import FacilityControls from "@/components/admin/common/FacilityControls";
import FilterBar from "@/components/admin/common/FilterBar";
import { Grid } from "@mui/material";

interface FilterDefinition {
  key: string;
  label: string;
  options?: string[];
}

const createHref = "/secure/admin/control/rooms/managerooms/new";

const keyword = "keyword";

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

function handleSelectAll() {}

function handleEditAll() {}

function handleSetStatusAll(status: string) {
  console.log("Set status for all selected rooms:", status);
}

function handleDeleteAll() {}

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
          xs={2.3}
          sx={{
            px: 1.5,
            borderRight: "1px solid var(--border-color-custom-2)",
          }}
        >
          <FacilityControls
            labelSingular="Room"
            labelPlural="Rooms"
            onCreate={createHref}
            onSelectAll={handleSelectAll}
            onEditAll={handleEditAll}
            onSetStatusAll={handleSetStatusAll}
            onDeleteAll={handleDeleteAll}
            statusOptions={undefined}
          />
        </Grid>
        <Grid item xs={9.7} sx={{ pl: 1.5 }}>
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
