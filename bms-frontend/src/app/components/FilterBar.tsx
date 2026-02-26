import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

interface FilterDefinition {
  key: string;
  label: string;
  options?: string[];
}

interface FilterBarProps {
  keyword: string;
  dropdownFilters: FilterDefinition[];
  checkboxFilters: FilterDefinition[];
  onApplyFilters: (values: Record<string, string | boolean>) => void;
}

export default function FilterBar({
  keyword,
  dropdownFilters,
  checkboxFilters,
  onApplyFilters,
}: FilterBarProps) {
  const [values, setValues] = React.useState<Record<string, string | boolean>>(
    {}
  );

  const handleChange = (key: string, val: string | boolean) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      sx={{
        p: 3,
        bgcolor: "var(--background-custom-blue-light-1)",
        color: "var(--text-blue-dark2)",
        borderRadius: "calc(0.5rem * (200 / 400))",
      }}
    >
      {(dropdownFilters.length > 0 || checkboxFilters.length > 0) && (
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={1}>
            <Typography sx={{ fontSize: ".8rem", mt: 1.1 }}>Filter:</Typography>
          </Grid>
          <Grid item xs={10}>
            <Box display="flex" flexDirection="column" gap={1.5}>
              {/* Dropdowns */}
              {dropdownFilters.length > 0 && (
                <Box display="flex" gap={1.5} flexWrap="wrap">
                  {dropdownFilters.map((f) => (
                    <Select
                      key={f.key}
                      name={f.key}
                      id={`select-${f.key}`}
                      value={(values[f.key] as string) || ""}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      displayEmpty
                      IconComponent={ExpandMoreOutlinedIcon}
                      sx={{
                        height: "2.4rem",
                        minWidth: "7rem",
                        fontSize: ".8rem",
                        color: "var(--text-blue-dark2)",
                        bgcolor: "white",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiSelect-icon": {
                          color: "var(--text-light)",
                        },
                        boxShadow: "0px 0px 3px var(--box-shadow)",
                        borderRadius: 1,
                      }}
                      MenuProps={{
                        disableScrollLock: true,
                        disablePortal: true,
                        PaperProps: {
                          sx: {
                            boxShadow: "0px 0px 3px var(--box-shadow)",
                            borderRadius: 1,
                          },
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>{f.label}</em>
                      </MenuItem>
                      {f.options?.map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </Select>
                  ))}
                </Box>
              )}

              {/* Checkboxes */}
              {checkboxFilters.length > 0 && (
                <Box
                  display="flex"
                  gap={2}
                  flexWrap="wrap"
                  sx={{
                    height: "2.4rem",
                    width: "fit-content",
                    bgcolor: "white",
                    boxShadow: "0px 0px 3px var(--box-shadow)",
                    borderRadius: 1,
                    px: 3,
                  }}
                >
                  {checkboxFilters.map((f) => (
                    <FormControlLabel
                      key={f.key}
                      control={
                        <Checkbox
                          sx={{
                            p: 0,
                            pr: 0.8,
                            "& .MuiSvgIcon-root": {
                              fontSize: 20,
                              strokeWidth: 0.2,
                              color: "var(--border-color-custom-1)",
                            },
                            "&.Mui-checked .MuiSvgIcon-root": {
                              color: "var(--button-bg-blue)",
                            },
                          }}
                          checked={Boolean(values[f.key])}
                          onChange={(e) =>
                            handleChange(f.key, e.target.checked)
                          }
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: ".8rem" }}>
                          {f.label}
                        </Typography>
                      }
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      )}

      {/* Keyword Section */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={1}>
          <Typography sx={{ fontSize: ".8rem" }}>Keyword:</Typography>
        </Grid>
        <Grid item xs={10}>
          <Box display="flex" gap={1.5}>
            <TextField
              key={keyword}
              value={(values[keyword] as string) || ""}
              onChange={(e) => handleChange(keyword, e.target.value)}
              sx={{
                bgcolor: "white",
                boxShadow: "0px 0px 3px var(--box-shadow)",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                borderRadius: 1,
                height: "2.4rem",
                "& .MuiInputBase-input": {
                  p: 1,
                },
              }}
            />
            <Button
              variant="contained"
              onClick={() => onApplyFilters(values)}
              sx={{
                bgcolor: "var(--button-bg-blue)",
                textTransform: "none",
                fontSize: ".8rem",
              }}
              startIcon={<FilterListOutlinedIcon />}
            >
              Apply Filters
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
