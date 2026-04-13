"use client";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box } from "@mui/material";
import { useState } from "react";

import CommonActionButton from "@/components/common/fields/CommonActionButton";
import CommonDateField from "@/components/common/fields/CommonDateField";
import CommonSelectField from "@/components/common/fields/CommonSelectField";

const CATEGORY_OPTIONS = ["Standard", "Deluxe", "Premier", "Suite"];
const CAPACITY_OPTIONS = ["1", "2", "3", "4+"];
const BED_OPTIONS = ["Single", "Double", "Queen", "King"];

function addDays(value: Date, days: number) {
  return new Date(
    value.getFullYear(),
    value.getMonth(),
    value.getDate() + days
  );
}

export default function HomeBookingSearch() {
  const [checkIn, setCheckIn] = useState<Date | null>(() =>
    addDays(new Date(), 1)
  );
  const [checkOut, setCheckOut] = useState<Date | null>(() =>
    addDays(new Date(), 3)
  );
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [capacity, setCapacity] = useState(CAPACITY_OPTIONS[0]);
  const [bedSize, setBedSize] = useState(BED_OPTIONS[0]);

  const handleCheckInChange = (nextValue: Date | null) => {
    setCheckIn(nextValue);

    if (!nextValue) {
      return;
    }

    if (!checkOut || checkOut <= nextValue) {
      setCheckOut(addDays(nextValue, 1));
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          lg: "minmax(0, 1.1fr) minmax(0, 1.1fr) minmax(0, 0.9fr) minmax(0, 0.7fr) minmax(0, 0.9fr) auto",
        },
        gap: 1.8,
        alignItems: "end",
      }}
    >
      <CommonDateField
        fullWidth
        label="Check-in"
        minDate={new Date()}
        onChange={handleCheckInChange}
        value={checkIn}
      />

      <CommonDateField
        fullWidth
        label="Check-out"
        minDate={checkIn ?? new Date()}
        onChange={setCheckOut}
        value={checkOut}
      />

      <CommonSelectField
        fullWidth
        label="Category"
        onChange={setCategory}
        options={CATEGORY_OPTIONS}
        value={category}
      />

      <CommonSelectField
        fullWidth
        label="Capacity"
        onChange={setCapacity}
        options={CAPACITY_OPTIONS}
        value={capacity}
      />

      <CommonSelectField
        fullWidth
        label="Bed size"
        onChange={setBedSize}
        options={BED_OPTIONS}
        value={bedSize}
      />

      <CommonActionButton
        sx={{
          width: { xs: "100%", lg: "auto" },
          px: 2,
        }}
        type="button"
        startIcon={<SearchRoundedIcon />}
      >
        Find Room
      </CommonActionButton>
    </Box>
  );
}
