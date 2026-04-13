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
import { SelectChangeEvent } from "@mui/material/Select";
import Link from "next/link";

import { commonShadow } from "@/components/admin/styles/commonStyles";
import { HEROBANNER_ROUTES } from "@/constants/herobanner";
import { HeroBannerStatus } from "@/types/herobanner";

interface HeroBannerListItemProps {
  id: number;
  title: string;
  remarks: string;
  image: string;
  status: HeroBannerStatus;
  isSelected: boolean;
  isUpdatingStatus: boolean;
  onToggleSelect: (checked: boolean) => void;
  onStatusChange: (nextStatus: HeroBannerStatus) => void;
  onDelete: () => void;
}

export default function HeroBannerListItem({
  id,
  title,
  remarks,
  image,
  status,
  isSelected,
  isUpdatingStatus,
  onToggleSelect,
  onStatusChange,
  onDelete,
}: HeroBannerListItemProps) {
  return (
    <Box
      position="relative"
      sx={{
        display: "flex",
        alignItems: "center",
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
            padding: "none",
          },
          "&.Mui-checked .MuiSvgIcon-root": {
            color: "var(--button-bg-blue)",
          },
        }}
      />

      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          width: "clamp(8rem, 32vw, 18rem)",
          height: "clamp(2rem, 9vw, 5rem)",
          borderRadius: 1,
          objectFit: "cover",
          flexShrink: 0,
          backgroundColor: "#dbe7f1",
        }}
      />

      <Box
        sx={{
          minWidth: 0,
          flexGrow: 1,
          alignSelf: "flex-start",
          pt: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: ".85rem",
            color: "var(--text-blue-dark2)",
            fontStyle: "italic",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            mt: 0.4,
            fontSize: "0.7rem",
            color: "var(--text-grey-dark)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {remarks}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1.4} sx={{ ml: "auto" }}>
        <Select
          size="small"
          value={status}
          onChange={(event: SelectChangeEvent<HeroBannerStatus>) =>
            onStatusChange(event.target.value as HeroBannerStatus)
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

        <Link href={HEROBANNER_ROUTES.entryEdit(id)}>
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
