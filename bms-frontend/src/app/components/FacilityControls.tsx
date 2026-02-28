import {
  ControlPointOutlined as ControlPointOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
  EditOutlined as EditOutlinedIcon,
  ExpandMoreOutlined as ExpandMoreOutlinedIcon,
  SelectAllTwoTone as SelectAllTwoToneIcon,
} from "@mui/icons-material";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";

type FacilityAction = () => void;
type FacilityStatusAction = (status: string) => void;

interface FacilityControlProps {
  labelSingular: string;
  labelPlural: string;
  onCreate?: FacilityAction;
  onSelectAll?: FacilityAction;
  onEditAll?: FacilityAction;
  onSetStatusAll?: FacilityStatusAction;
  onDeleteAll?: FacilityAction;
  statusOptions?: string[];
}

const buttonStyleBase = {
  width: "100%",
  height: "3rem",
  fontSize: "0.8rem",
  textTransform: "none",
  boxShadow: "0px 0px 3px var(--box-shadow)",
};

const buttonStyle_1 = {
  ...buttonStyleBase,
  bgcolor: "white",
  color: "var(--text-blue-dark2)",
  display: "flex",
  justifyContent: "flex-start",
  gap: 1.5,
  "&:hover": {
    bgcolor: "var(--button-bg-blue-light-hover)",
    boxShadow: "0px 0px 3px var(--box-shadow)",
  },
  "& .MuiSvgIcon-root": { fontSize: "1.7rem" },
  mb: 1.2,
};

const buttonStyle_2 = {
  ...buttonStyleBase,
  textAlign: "center",
  bgcolor: "white",
  color: "var(--text-blue-dark2)",
  "&:hover": {
    bgcolor: "var(--button-bg-blue-light-hover)",
    boxShadow: "0px 0px 3px var(--box-shadow)",
  },
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
        <Button
          variant="contained"
          onClick={onCreate}
          sx={{ ...buttonStyle_1, mb: 3 }}
        >
          <ControlPointOutlinedIcon />
          <span>New {labelSingular}</span>
        </Button>
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
        <Button variant="contained" onClick={onSelectAll} sx={buttonStyle_1}>
          <SelectAllTwoToneIcon />
          <span>Select All</span>
        </Button>
      )}

      {onEditAll && (
        <Button variant="contained" onClick={onEditAll} sx={buttonStyle_1}>
          <EditOutlinedIcon />
          <span>Edit {labelPlural}</span>
        </Button>
      )}

      {onSetStatusAll && (
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Button
            variant="contained"
            onClick={() => status && onSetStatusAll(status)}
            disabled={!status}
            sx={{ ...buttonStyle_2, width: "33%" }}
          >
            Set
          </Button>

          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            IconComponent={ExpandMoreOutlinedIcon}
            sx={{
              ...buttonStyle_2,
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
                boxShadow: "0px 0px 3px var(--box-shadow)",
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
          variant="contained"
          onClick={onDeleteAll}
          sx={{
            ...buttonStyle_1,
            mt: 4,
            bgcolor: "var(--info-bgcolor-delete)",
            "&:hover": {
              bgcolor: "var(--info-bgcolor-delete-light)",
              boxShadow: "0px 0px 3px var(--box-shadow)",
            },
          }}
        >
          <DeleteOutlinedIcon sx={{ color: "white" }} />
          <span className="text-white">Delete {labelPlural}</span>
        </Button>
      )}
    </Box>
  );
}
