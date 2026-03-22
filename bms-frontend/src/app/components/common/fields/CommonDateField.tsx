"use client";

import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import {
  Box,
  Button,
  IconButton,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";

import { mergeSx } from "@/components/common/fields/commonFieldStyles";
import {
  publicDateButtonSx,
  publicFieldContainerSx,
  publicFieldInputSx,
  publicFieldLabelSx,
  publicFieldShellSx,
} from "@/components/common/fields/publicFieldStyles";

interface CommonDateFieldProps {
  label: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  fullWidth?: boolean;
  minDate?: Date;
  sx?: SxProps<Theme>;
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

function formatDateValue(value: Date | null) {
  if (!value) {
    return "";
  }

  return `${pad(value.getMonth() + 1)}/${pad(value.getDate())}/${value.getFullYear()}`;
}

function parseDateValue(value: string) {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) {
    return null;
  }

  const month = Number(match[1]);
  const day = Number(match[2]);
  const year = Number(match[3]);

  const parsed = new Date(year, month - 1, day);

  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null;
  }

  return parsed;
}

function toStartOfDay(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

function addMonths(value: Date, amount: number) {
  return new Date(value.getFullYear(), value.getMonth() + amount, 1);
}

function areSameDay(left: Date | null, right: Date | null) {
  if (!left || !right) {
    return false;
  }

  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function isBeforeMinDate(candidate: Date, minDate?: Date) {
  if (!minDate) {
    return false;
  }

  return toStartOfDay(candidate) < toStartOfDay(minDate);
}

function buildCalendarDays(month: Date) {
  const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  const startOffset = firstDayOfMonth.getDay();
  const gridStart = new Date(
    firstDayOfMonth.getFullYear(),
    firstDayOfMonth.getMonth(),
    1 - startOffset
  );

  return Array.from(
    { length: 42 },
    (_, index) =>
      new Date(
        gridStart.getFullYear(),
        gridStart.getMonth(),
        gridStart.getDate() + index
      )
  );
}

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_LABEL = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

export default function CommonDateField({
  label,
  value,
  onChange,
  fullWidth = false,
  minDate,
  sx,
}: CommonDateFieldProps) {
  const inputId = useId();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [inputValue, setInputValue] = useState(formatDateValue(value));
  const [hasError, setHasError] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [displayMonth, setDisplayMonth] = useState<Date>(() => {
    const source = value ?? minDate ?? new Date();
    return new Date(source.getFullYear(), source.getMonth(), 1);
  });

  useEffect(() => {
    setInputValue(formatDateValue(value));
    setHasError(false);
  }, [value]);

  useEffect(() => {
    if (!calendarOpen) {
      return;
    }

    const source = value ?? minDate ?? new Date();
    setDisplayMonth(new Date(source.getFullYear(), source.getMonth(), 1));
  }, [calendarOpen, value, minDate]);

  const calendarDays = useMemo(
    () => buildCalendarDays(displayMonth),
    [displayMonth]
  );
  const today = useMemo(() => toStartOfDay(new Date()), []);

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value.replace(/[^\d/]/g, "").slice(0, 10);
    setInputValue(nextValue);

    if (!nextValue) {
      onChange(null);
      setHasError(false);
      return;
    }

    if (nextValue.length === 10) {
      const parsed = parseDateValue(nextValue);

      if (parsed) {
        onChange(parsed);
        setHasError(false);
        return;
      }

      setHasError(true);
      return;
    }

    setHasError(false);
  };

  const handleBlur = () => {
    if (!inputValue) {
      onChange(null);
      setHasError(false);
      return;
    }

    const parsed = parseDateValue(inputValue);

    if (!parsed) {
      setHasError(true);
      return;
    }

    setInputValue(formatDateValue(parsed));
    onChange(parsed);
    setHasError(false);
  };

  const openCalendar = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCalendarOpen(true);
  };

  const handleSelectDate = (nextValue: Date) => {
    onChange(nextValue);
    setInputValue(formatDateValue(nextValue));
    setHasError(false);
    setCalendarOpen(false);
  };

  const handleClear = () => {
    onChange(null);
    setInputValue("");
    setHasError(false);
    setCalendarOpen(false);
  };

  const handleToday = () => {
    const nextValue = isBeforeMinDate(today, minDate)
      ? toStartOfDay(minDate ?? today)
      : today;
    handleSelectDate(nextValue);
  };

  const isPreviousMonthDisabled = (() => {
    if (!minDate) {
      return false;
    }

    const previousMonth = addMonths(displayMonth, -1);
    return (
      previousMonth.getFullYear() < minDate.getFullYear() ||
      (previousMonth.getFullYear() === minDate.getFullYear() &&
        previousMonth.getMonth() < minDate.getMonth())
    );
  })();

  const popoverId = calendarOpen ? `${inputId}-calendar` : undefined;

  const renderDayButton = (day: Date) => {
    const isCurrentMonth = day.getMonth() === displayMonth.getMonth();
    const isSelected = areSameDay(day, value);
    const isToday = areSameDay(day, today);
    const isDisabled = isBeforeMinDate(day, minDate);

    return (
      <Button
        key={day.toISOString()}
        disabled={isDisabled}
        onClick={() => handleSelectDate(day)}
        sx={{
          minWidth: 0,
          width: "100%",
          height: { xs: 34, sm: 36 },
          borderRadius: "999px",
          p: 0,
          fontSize: { xs: "0.8rem", sm: "0.84rem" },
          fontWeight: isSelected ? 700 : 500,
          color: isSelected
            ? "white"
            : isCurrentMonth
              ? "var(--text-blue-dark)"
              : "rgba(4, 53, 93, 0.4)",
          bgcolor: isSelected
            ? "var(--button-bg-blue)"
            : isToday
              ? "rgba(4, 111, 195, 0.12)"
              : "transparent",
          border:
            isToday && !isSelected
              ? "1px solid rgba(4, 111, 195, 0.24)"
              : "1px solid transparent",
          boxShadow: "none",
          "&:hover": {
            bgcolor: isSelected
              ? "var(--button-bg-blue-hover)"
              : "rgba(4, 111, 195, 0.1)",
          },
          "&.Mui-disabled": {
            color: "rgba(4, 53, 93, 0.22)",
          },
        }}
      >
        {day.getDate()}
      </Button>
    );
  };

  return (
    <>
      <Box
        sx={mergeSx(
          publicFieldContainerSx,
          fullWidth ? { width: "100%" } : null,
          sx
        )}
      >
        <Typography component="label" htmlFor={inputId} sx={publicFieldLabelSx}>
          {label}
        </Typography>
        <Box
          sx={mergeSx(
            publicFieldShellSx,
            hasError ? { borderColor: "#d14343" } : null
          )}
        >
          <Box
            id={inputId}
            component="input"
            value={inputValue}
            onChange={handleTextChange}
            onBlur={handleBlur}
            placeholder="MM/dd/yyyy"
            inputMode="numeric"
            aria-label={label}
            sx={mergeSx(publicFieldInputSx, {
              color: hasError ? "#b22f2f" : "#161d24",
              "&::placeholder": {
                color: "#98a0a8",
                opacity: 1,
              },
            })}
          />
          <IconButton
            ref={buttonRef}
            type="button"
            aria-label={`Open ${label} calendar`}
            onClick={openCalendar}
            sx={publicDateButtonSx}
          >
            <CalendarMonthRoundedIcon sx={{ fontSize: "1.05rem" }} />
          </IconButton>
        </Box>
      </Box>

      <Popover
        id={popoverId}
        disableScrollLock
        open={calendarOpen}
        anchorEl={buttonRef.current}
        onClose={() => setCalendarOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            mt: 0.75,
            width: { xs: "min(92vw, 320px)", sm: 320 },
            borderRadius: "24px",
            border: "1px solid rgba(4, 53, 93, 0.08)",
            boxShadow: "none",
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            background: "#ffffff",
            p: 1.25,
          }}
        >
          <Box
            sx={{
              borderRadius: "18px",
              background:
                "linear-gradient(180deg, rgba(243, 248, 252, 0.96) 0%, rgba(255, 255, 255, 1) 100%)",
              border: "1px solid rgba(4, 53, 93, 0.06)",
              px: 1.1,
              py: 1,
              mb: 1,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 0.9 }}
            >
              <IconButton
                type="button"
                disabled={isPreviousMonthDisabled}
                onClick={() =>
                  setDisplayMonth((current) => addMonths(current, -1))
                }
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "999px",
                  color: "var(--text-blue-dark)",
                  bgcolor: "rgba(255, 255, 255, 0.92)",
                  border: "1px solid rgba(4, 53, 93, 0.08)",
                }}
              >
                <ChevronLeftRoundedIcon sx={{ fontSize: "1.15rem" }} />
              </IconButton>

              <Box sx={{ textAlign: "center", px: 1 }}>
                <Typography
                  sx={{
                    color: "var(--text-blue-dark)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    lineHeight: 1.1,
                  }}
                >
                  {MONTH_LABEL.format(displayMonth)}
                </Typography>
              </Box>

              <IconButton
                type="button"
                onClick={() =>
                  setDisplayMonth((current) => addMonths(current, 1))
                }
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "999px",
                  color: "var(--text-blue-dark)",
                  bgcolor: "rgba(255, 255, 255, 0.92)",
                  border: "1px solid rgba(4, 53, 93, 0.08)",
                }}
              >
                <ChevronRightRoundedIcon sx={{ fontSize: "1.15rem" }} />
              </IconButton>
            </Stack>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
              gap: 0.35,
              px: 0.15,
            }}
          >
            {WEEKDAY_LABELS.map((weekday) => (
              <Typography
                key={weekday}
                sx={{
                  pb: 0.35,
                  textAlign: "center",
                  color: "rgba(4, 53, 93, 0.62)",
                  fontSize: "0.64rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {weekday}
              </Typography>
            ))}

            {calendarDays.map(renderDayButton)}
          </Box>

          <Stack direction="row" spacing={0.8} sx={{ mt: 1.2 }}>
            <Button
              type="button"
              onClick={handleClear}
              sx={{
                flex: 1,
                minWidth: 0,
                minHeight: 36,
                borderRadius: "999px",
                border: "1px solid rgba(4, 53, 93, 0.12)",
                color: "rgba(4, 53, 93, 0.72)",
                fontSize: "0.78rem",
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Clear
            </Button>
            <Button
              type="button"
              onClick={handleToday}
              sx={{
                flex: 1,
                minWidth: 0,
                minHeight: 36,
                borderRadius: "999px",
                bgcolor: "rgba(4, 111, 195, 0.08)",
                color: "var(--button-bg-blue)",
                fontSize: "0.78rem",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "rgba(4, 111, 195, 0.14)",
                },
              }}
            >
              Today
            </Button>
          </Stack>
        </Box>
      </Popover>
    </>
  );
}
