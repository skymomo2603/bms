"use client";

import { DeleteOutlined as DeleteOutlinedIcon } from "@mui/icons-material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import Link from "next/link";

import { commonShadow } from "@/components/admin/styles/commonStyles";
import { CAROUSEL_ROUTES } from "@/constants/carousel";
import type { CarouselStatus } from "@/types/carousel";

interface CarouselListItemProps {
  id: number;
  headline: string;
  title: string;
  message: string;
  remarks: string;
  status: CarouselStatus;
  isSelected: boolean;
  isUpdatingStatus: boolean;
  onToggleSelect: (checked: boolean) => void;
  onStatusChange: (nextStatus: CarouselStatus) => void;
  onDelete: () => void;
}

export default function CarouselListItem({
  id,
  headline,
  title,
  message,
  remarks,
  status,
  isSelected,
  isUpdatingStatus,
  onToggleSelect,
  onStatusChange,
  onDelete,
}: CarouselListItemProps) {
  return (
    <Box
      position="relative"
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2.6,
        px: 2,
        py: 2,
        boxShadow: "0px 0px 4px var(--box-shadow)",
        borderRadius: 1,
        mb: 2,
        borderBottom:
          status === "Active" ? "1.5px solid #02864A" : "1.5px solid #8A97A6",
      }}
    >
      <Checkbox
        checked={isSelected}
        onChange={(event) => onToggleSelect(event.target.checked)}
        sx={{
          top: 0,
          left: 0,
          position: "absolute",
          "& .MuiSvgIcon-root": {
            backgroundColor: "white",
            borderRadius: "2px",
            color: "#82ADC6",
          },
          "&.Mui-checked .MuiSvgIcon-root": {
            color: "var(--button-bg-blue)",
          },
        }}
      />

      <Box sx={{ minWidth: 0, flexGrow: 1, pl: 4, pr: 2, pt: 0.5 }}>
        <Typography
          sx={{
            fontSize: ".72rem",
            color: "var(--text-grey-dark)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {headline}
        </Typography>
        <Typography
          sx={{
            mt: 0.5,
            fontSize: ".9rem",
            color: "var(--text-blue-dark2)",
            fontStyle: "italic",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            mt: 0.75,
            fontSize: "0.78rem",
            color: "var(--text-grey-dark)",
            lineHeight: 1.6,
          }}
        >
          {message}
        </Typography>
        <Typography
          sx={{
            mt: 0.6,
            fontSize: "0.72rem",
            color: "var(--text-grey-dark)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {remarks}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1.4} sx={{ ml: "auto", pt: 0.25 }}>
        <Select
          size="small"
          value={status}
          onChange={(event: SelectChangeEvent<CarouselStatus>) =>
            onStatusChange(event.target.value as CarouselStatus)
          }
          disabled={isUpdatingStatus}
          IconComponent={ExpandMoreOutlinedIcon}
          sx={{
            minWidth: "5rem",
            height: "2.5rem",
            borderRadius: 1,
            fontSize: "0.8rem",
            bgcolor:
              status === "Active" ? "var(--info-bgcolor-active)" : "#7A8797",
            color: "white",
            "& .MuiSelect-select": {
              py: 1,
              px: 1.5,
            },
            "& .MuiSelect-icon": {
              color: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover": {
              bgcolor:
                status === "Active"
                  ? "var(--info-bgcolor-active-light)"
                  : "#697585",
            },
          }}
          MenuProps={{
            disableScrollLock: true,
            disablePortal: true,
            PaperProps: {
              sx: {
                color: "var(--text-blue-dark)",
                boxShadow: commonShadow,
                borderRadius: 1,
              },
            },
          }}
        >
          <MenuItem value="Active" sx={{ fontSize: "0.88rem" }}>
            Active
          </MenuItem>
          <MenuItem value="Inactive" sx={{ fontSize: "0.88rem" }}>
            Inactive
          </MenuItem>
        </Select>

        <Link href={CAROUSEL_ROUTES.entryEdit(id)}>
          <Button
            disableElevation
            sx={{
              minWidth: "4rem",
              p: 1,
              borderRadius: 1,
              fontSize: "0.8rem",
              textTransform: "none",
              bgcolor: "var(--button-bg-blue)",
              color: "white",
              "&:hover": {
                bgcolor: "var(--button-bg-blue-hover)",
              },
            }}
          >
            Edit
          </Button>
        </Link>

        <Button
          disableElevation
          onClick={onDelete}
          sx={{
            minWidth: "2.4rem",
            p: 1,
            borderRadius: 1,
            bgcolor: "var(--info-bgcolor-delete)",
            color: "white",
            "&:hover": {
              bgcolor: "var(--info-bgcolor-delete-light)",
            },
          }}
        >
          <DeleteOutlinedIcon fontSize="small" />
        </Button>
      </Stack>
    </Box>
  );
}
