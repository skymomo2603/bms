"use client";

import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { mergeSx } from "@/components/common/fields/commonFieldStyles";
import {
  publicFieldContainerSx,
  publicFieldLabelSx,
  publicMenuPaperSx,
  publicSelectShellSx,
  publicSelectSx,
} from "@/components/common/fields/publicFieldStyles";

interface CommonSelectFieldProps {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
}

export default function CommonSelectField({
  label,
  options,
  value,
  onChange,
  fullWidth = false,
  sx,
}: CommonSelectFieldProps) {
  return (
    <Box
      sx={mergeSx(
        publicFieldContainerSx,
        fullWidth ? { width: "100%" } : null,
        sx
      )}
    >
      <Typography component="span" sx={publicFieldLabelSx}>
        {label}
      </Typography>
      <FormControl size="small" sx={{ width: "100%" }}>
        <Select
          value={value}
          displayEmpty
          onChange={(event: SelectChangeEvent<string>) =>
            onChange(event.target.value)
          }
          IconComponent={ExpandMoreOutlinedIcon}
          sx={mergeSx(publicSelectShellSx, publicSelectSx)}
          MenuProps={{
            disableScrollLock: true,
            PaperProps: {
              sx: publicMenuPaperSx,
            },
            MenuListProps: {
              dense: true,
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option} sx={{ fontSize: "0.8rem" }}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
