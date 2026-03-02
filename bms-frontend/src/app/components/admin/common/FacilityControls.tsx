import {
  ControlPointOutlined as ControlPointOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
  EditOutlined as EditOutlinedIcon,
  ExpandMoreOutlined as ExpandMoreOutlinedIcon,
  SelectAllTwoTone as SelectAllTwoToneIcon,
} from "@mui/icons-material";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

type FacilityAction = () => void;
type FacilityStatusAction = (status: string) => void;

interface FacilityControlProps {
  labelSingular: string;
  labelPlural: string;
  onCreate?: string;
  onSelectAll?: FacilityAction;
  onEditAll?: FacilityAction;
  onSetStatusAll?: FacilityStatusAction;
  onDeleteAll?: FacilityAction;
  statusOptions?: string[];
}

const buttonSx = {
  width: "100%",
  height: "3rem",
  fontSize: "0.8rem",
  textTransform: "none",
  boxShadow: "0px 0px 3px var(--box-shadow)",
  bgcolor: "white",
  color: "var(--text-blue-dark2)",
  "&:hover": {
    bgcolor: "var(--button-bg-blue-light-hover)",
    boxShadow: "0px 0px 3px var(--box-shadow)",
  },
};

const actionButtonSx = {
  ...buttonSx,
  display: "flex",
  justifyContent: "flex-start",
  gap: 1.5,
  "& .MuiSvgIcon-root": { fontSize: "1.7rem" },
  mb: 1.2,
};

export default function FacilityControl({
  labelSingular,
  labelPlural,
  onCreate,
  onSelectAll,
  onEditAll,
  onSetStatusAll,
  onDeleteAll,
  statusOptions = ["Active", "Inactive"],
}: FacilityControlProps) {
  const [status, setStatus] = useState(statusOptions[0] ?? "");

  return (
    <Box>
      {onCreate && (
        <Link href={onCreate} passHref>
          <Button sx={{ ...actionButtonSx, mb: 3 }}>
            <ControlPointOutlinedIcon />
            <Typography sx={{ ml: 1, fontSize: "0.8rem" }}>
              New {labelSingular}
            </Typography>
          </Button>
        </Link>
      )}

      <Typography
        sx={{
          mb: 2,
          mt: 1.2,
          color: "var(--text-grey-dark)",
          fontSize: "0.8rem",
        }}
      >
        {labelPlural} Selected:
      </Typography>

      {onSelectAll && (
        <Button onClick={onSelectAll} sx={actionButtonSx}>
          <SelectAllTwoToneIcon />
          <Typography sx={{ ml: 1, fontSize: "0.8rem" }}>Select All</Typography>
        </Button>
      )}

      {onEditAll && (
        <Button onClick={onEditAll} sx={actionButtonSx}>
          <EditOutlinedIcon />
          <Typography sx={{ ml: 1, fontSize: "0.8rem" }}>
            Edit {labelPlural}
          </Typography>
        </Button>
      )}

      {onSetStatusAll && (
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Button
            onClick={() => status && onSetStatusAll(status)}
            disabled={!status}
            sx={{ ...buttonSx, width: "33%", textAlign: "center" }}
          >
            Set
          </Button>

          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            IconComponent={ExpandMoreOutlinedIcon}
            sx={{
              ...buttonSx,
              flex: 1,
              bgcolor:
                status === "Active"
                  ? "var(--info-bgcolor-active)"
                  : "var(--info-bgcolor-inactive)",
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "& .MuiSelect-icon": { color: "white" },
              "&:hover": {
                bgcolor:
                  status === "Active"
                    ? "var(--info-bgcolor-active-light)"
                    : "var(--info-bgcolor-inactive-light)",
              },
            }}
            MenuProps={{
              disableScrollLock: true,
              disablePortal: true,
              PaperProps: {
                sx: {
                  color: "var(--text-blue-dark)",
                  boxShadow: "0px 0px 3px var(--box-shadow)",
                  borderRadius: 1,
                },
              },
            }}
          >
            {statusOptions.map((opt) => (
              <MenuItem key={opt} value={opt} sx={{ fontSize: "0.88rem" }}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}

      {onDeleteAll && (
        <Button
          onClick={onDeleteAll}
          sx={{
            ...actionButtonSx,
            mt: 4,
            bgcolor: "var(--info-bgcolor-delete)",
            color: "white",
            "&:hover": { bgcolor: "var(--info-bgcolor-delete-light)" },
          }}
        >
          <DeleteOutlinedIcon />
          <Typography sx={{ ml: 1, color: "white", fontSize: "0.8rem" }}>
            Delete {labelPlural}
          </Typography>
        </Button>
      )}
    </Box>
  );
}
