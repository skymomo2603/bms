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
import { useEffect, useState } from "react";

import { filterBarStyles } from "@/components/admin/common/FilterBar.styles";
import type { AdminFilterDefinition, AdminFilterValues } from "@/types/admin";

interface FilterBarProps {
  keyword: string;
  dropdownFilters?: AdminFilterDefinition[];
  checkboxFilters?: AdminFilterDefinition[];
  onApplyFilters: (values: AdminFilterValues) => void;
}

export default function FilterBar({
  keyword,
  dropdownFilters,
  checkboxFilters,
  onApplyFilters,
}: FilterBarProps) {
  const [values, setValues] = useState<AdminFilterValues>(() =>
    (dropdownFilters ?? []).reduce<AdminFilterValues>((acc, filter) => {
      acc[filter.key] = filter.options?.[0] ?? "";
      return acc;
    }, {})
  );

  useEffect(() => {
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

  return (
    <Box sx={filterBarStyles.container}>
      <Grid container spacing={2} alignItems="flex-start" rowGap={0}>
        <Grid item xs={11}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {dropdownFilters && (
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                {dropdownFilters.map((f) => (
                  <FormControl
                    key={f.key}
                    sx={filterBarStyles.selectContainer}
                    size="small"
                  >
                    <InputLabel
                      id={`label-${f.key}`}
                      sx={filterBarStyles.inputLabel}
                    >
                      {f.label}
                    </InputLabel>
                    <Select
                      labelId={`label-${f.key}`}
                      value={(values[f.key] as string) || ""}
                      onChange={(event) =>
                        handleChange(f.key, event.target.value)
                      }
                      label={f.label}
                      sx={filterBarStyles.select}
                      MenuProps={{
                        disableScrollLock: true,
                        disablePortal: true,
                        PaperProps: {
                          sx: filterBarStyles.menuPaper,
                        },
                      }}
                    >
                      {(f.options ?? []).map((option) => (
                        <MenuItem
                          key={option}
                          value={option}
                          sx={{ fontSize: "0.88rem" }}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ))}
              </Box>
            )}

            {checkboxFilters && (
              <Box sx={filterBarStyles.checkboxContainer}>
                {checkboxFilters.map((f) => (
                  <FormControlLabel
                    key={f.key}
                    control={
                      <Checkbox
                        checked={Boolean(values[f.key])}
                        onChange={(e) => handleChange(f.key, e.target.checked)}
                        sx={filterBarStyles.checkbox}
                      />
                    }
                    label={
                      <Typography sx={filterBarStyles.checkboxLabel}>
                        {f.label}
                      </Typography>
                    }
                  />
                ))}
              </Box>
            )}
          </Box>
        </Grid>

        <Grid item xs={11}>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <TextField
              label="Keyword"
              InputLabelProps={{
                shrink: true,
                sx: filterBarStyles.keywordLabel,
              }}
              value={(values[keyword] as string) || ""}
              onChange={(e) => handleChange(keyword, e.target.value)}
              sx={filterBarStyles.keywordField}
            />
            <Button
              onClick={() => onApplyFilters(values)}
              sx={filterBarStyles.applyButton}
              variant="contained"
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
