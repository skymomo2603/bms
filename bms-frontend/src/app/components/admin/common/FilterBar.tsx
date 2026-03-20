import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
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
  dropdownFilters?: FilterDefinition[];
  checkboxFilters?: FilterDefinition[];
  onApplyFilters: (values: Record<string, string | boolean>) => void;
}

export default function FilterBar({
  keyword,
  dropdownFilters,
  checkboxFilters,
  onApplyFilters,
}: FilterBarProps) {
  const [values, setValues] = React.useState<Record<string, string | boolean>>(
    () =>
      (dropdownFilters ?? []).reduce<Record<string, string | boolean>>(
        (acc, filter) => {
          acc[filter.key] = filter.options?.[0] ?? "";
          return acc;
        },
        {}
      )
  );

  React.useEffect(() => {
    if (!dropdownFilters?.length) return;

    setValues((prev) => {
      const next = { ...prev };
      let hasChanges = false;

      dropdownFilters.forEach((filter) => {
        if (next[filter.key] === undefined) {
          next[filter.key] = filter.options?.[0] ?? "";
          hasChanges = true;
        }
      });

      return hasChanges ? next : prev;
    });
  }, [dropdownFilters]);

  const handleChange = (key: string, val: string | boolean) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const commonShadow = "0px 0px 3px var(--box-shadow)";
  const inputHeight = "2.4rem";

  const selectSx = {
    height: inputHeight,
    minWidth: "120px",
    fontSize: ".8rem",
    color: "var(--text-blue-dark2)",
    bgcolor: "white",
    boxShadow: commonShadow,
    borderRadius: 1,
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
    "& .MuiSelect-icon": { color: "var(--text-light)" },
  };

  const textFieldSx = {
    bgcolor: "white",
    boxShadow: commonShadow,
    borderRadius: 1,
    height: inputHeight,
    flexGrow: 0.25,
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
    "& .MuiInputBase-root": { width: "100%" },
    "& .MuiInputBase-input": { p: 1.3, fontSize: "0.8rem" },
  };

  const labelSx = { fontSize: ".8rem", mt: 1.1 };

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "var(--background-custom-blue-light-1)",
        color: "var(--text-blue-dark2)",
        borderRadius: "calc(0.5rem * (200 / 400))",
      }}
    >
      <Grid container spacing={2} alignItems="flex-start" rowGap={0}>
        {/* Filter Section */}
        <Grid item xs={11}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {dropdownFilters && (
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                {dropdownFilters.map((f) => (
                  <FormControl
                    key={f.key}
                    size="small"
                    sx={{
                      minWidth: "120px",
                      bgcolor: "white",
                      boxShadow: commonShadow,
                      borderRadius: 1,
                    }}
                  >
                    <InputLabel
                      id={`label-${f.key}`}
                      sx={{
                        fontSize: "0.7rem",
                        color: "var(--text-blue-dark2)",
                        backgroundColor: "white",
                        letterSpacing: "0.07rem",
                        display: "inline-flex",
                        alignItems: "center",
                        lineHeight: 1.1,
                        py: 0,
                        px: 0.28,
                        ml: -0.6,
                        mt: 0.58,
                      }}
                    >
                      {f.label}
                    </InputLabel>
                    <Select
                      labelId={`label-${f.key}`}
                      name={f.key}
                      id={`select-${f.key}`}
                      value={(values[f.key] as string) || ""}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      label={f.label}
                      IconComponent={ExpandMoreOutlinedIcon}
                      sx={{
                        height: inputHeight,
                        fontSize: ".8rem",
                        color: "var(--text-blue-dark2)",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiSelect-icon": { color: "var(--text-light)" },
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
                      {f.options?.map((opt) => (
                        <MenuItem
                          key={opt}
                          value={opt}
                          sx={{ fontSize: "0.88rem" }}
                        >
                          {opt}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ))}
              </Box>
            )}

            {checkboxFilters && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  height: inputHeight,
                  width: "fit-content",
                  bgcolor: "white",
                  boxShadow: commonShadow,
                  borderRadius: 1,
                  px: 3,
                }}
              >
                {checkboxFilters.map((f) => (
                  <FormControlLabel
                    key={f.key}
                    control={
                      <Checkbox
                        checked={Boolean(values[f.key])}
                        onChange={(e) => handleChange(f.key, e.target.checked)}
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

        {/* Keyword Section */}
        <Grid item xs={11}>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <TextField
              label="Keyword"
              InputLabelProps={{
                shrink: true,
                sx: {
                  fontSize: "0.75rem",
                  color: "var(--text-blue-dark2)",
                  backgroundColor: "white",
                  letterSpacing: "0.078rem",
                  display: "inline-flex",
                  alignItems: "center",
                  lineHeight: 1.1,
                  py: 0,
                  px: 0.28,
                  ml: -0.6,
                  mt: 0.58,
                },
              }}
              value={(values[keyword] as string) || ""}
              onChange={(e) => handleChange(keyword, e.target.value)}
              sx={textFieldSx}
            />
            <Button
              variant="contained"
              onClick={() => onApplyFilters(values)}
              sx={{
                bgcolor: "var(--button-bg-blue)",
                textTransform: "none",
                fontSize: ".8rem",
                boxShadow: commonShadow,
                "&:hover": {
                  bgcolor: "var(--button-bg-blue-hover)",
                  boxShadow: commonShadow,
                },
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
