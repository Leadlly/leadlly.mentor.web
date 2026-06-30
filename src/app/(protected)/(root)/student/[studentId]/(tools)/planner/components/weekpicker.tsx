"use client";

import * as React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Box, Popover, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import dayjs, { Dayjs } from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(isBetweenPlugin);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

// ─── Types ───────────────────────────────────────────────────────────

interface CustomPickerDayProps extends PickersDayProps {
  isSelected: boolean;
  isHovered: boolean;
}

// ─── Static constants (stable references, never recreated) ──────────

const daySx = { px: 2.5 } as const;

const popoverAnchorOrigin = {
  vertical: "bottom" as const,
  horizontal: "left" as const,
};

const boxSx = { p: 2 } as const;

const inputSlotProps = {
  input: { readOnly: true, sx: { cursor: "pointer" } },
} as const;

// ─── Styled day cell ────────────────────────────────────────────────

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isHovered",
})<CustomPickerDayProps>(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: "#9654F4",
    color: theme.palette.primary.contrastText,
    "&:hover, &:focus": {
      backgroundColor: "#E8DAFE",
    },
  }),
  ...(isHovered && {
    backgroundColor: "#E8DAFE",
    "&:hover, &:focus": {
      backgroundColor: "#E8DAFE",
    },
  }),
  // Monday = first day (isoWeekday 1)
  ...(day.isoWeekday() === 1 && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  // Sunday = last day (isoWeekday 7)
  ...(day.isoWeekday() === 7 && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
})) as React.ComponentType<CustomPickerDayProps>;

// ─── Helpers ────────────────────────────────────────────────────────

const isInSameWeek = (dayA: Dayjs, dayB: Dayjs | null | undefined) => {
  if (dayB == null) return false;
  return dayA.isoWeek() === dayB.isoWeek() && dayA.year() === dayB.year();
};

/**
 * Compute Monday–Sunday boundaries for a given date (ISO week).
 */
const getWeekRange = (date: Dayjs) => ({
  startDate: date.startOf("isoWeek").format("YYYY-MM-DD"),
  endDate: date.endOf("isoWeek").format("YYYY-MM-DD"),
});

// ─── Day slot (memoized — 42 cells rendered per month) ──────────────

const Day = React.memo(function Day(
  props: PickersDayProps & {
    selectedDay?: Dayjs | null;
    hoveredDay?: Dayjs | null;
  }
) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={daySx}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  );
});

// ─── WeekPicker ─────────────────────────────────────────────────────

export default function WeekPicker() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialise from URL if startDate param exists, otherwise default to today
  const initialDate = React.useMemo(() => {
    const sp = searchParams.get("startDate");
    return sp && dayjs(sp).isValid() ? dayjs(sp) : dayjs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // read once on mount — intentionally empty deps

  const [value, setValue] = React.useState<Dayjs>(initialDate);
  const [hoveredDay, setHoveredDay] = React.useState<Dayjs | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  // ── Sync startDate / endDate query params to URL ──────────────────
  React.useEffect(() => {
    const { startDate, endDate } = getWeekRange(value);
    const params = new URLSearchParams(searchParams.toString());

    if (
      params.get("startDate") !== startDate ||
      params.get("endDate") !== endDate
    ) {
      params.set("startDate", startDate);
      params.set("endDate", endDate);
      router.replace(`${pathname}?${params.toString()}`);
    }
    // We intentionally omit searchParams from deps to avoid an infinite loop:
    // this effect *writes* to searchParams, and re-running when they change
    // would create a cycle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, pathname, router]);

  // ── Popover handlers (stable refs) ────────────────────────────────
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleDateChange = React.useCallback(
    (newValue: Dayjs | null) => {
      if (newValue) {
        setValue(newValue);
      }
      handleClose();
    },
    [handleClose]
  );

  // ── Derived / memoized values ─────────────────────────────────────
  const open = Boolean(anchorEl);
  const popoverId = open ? "calendar-popover" : undefined;

  const weekDisplay = React.useMemo(
    () =>
      `${value.isoWeekYear()} ${value.format("MMMM")} Week ${value.isoWeek()}`,
    [value]
  );

  // Stable slotProps.day factory — avoids new object ref each render
  const daySlotProps = React.useCallback(
    (ownerState: PickersDayProps) => ({
      selectedDay: value,
      hoveredDay,
      onPointerEnter: () => setHoveredDay(ownerState.day),
      onPointerLeave: () => setHoveredDay(null),
    }),
    [value, hoveredDay]
  );

  const slotProps = React.useMemo(
    () => ({ day: daySlotProps }),
    [daySlotProps]
  );

  const slots = React.useMemo(() => ({ day: Day }), []);

  return (
    <div className="md:h-full">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TextField
          value={weekDisplay}
          onClick={handleClick}
          label="Select Week"
          variant="outlined"
          size="small"
          slotProps={inputSlotProps}
          className="w-full md:w-auto border-primary text-primary"
        />

        <Popover
          id={popoverId}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={popoverAnchorOrigin}
        >
          <Box sx={boxSx}>
            <DateCalendar
              value={value}
              onChange={handleDateChange}
              showDaysOutsideCurrentMonth
              displayWeekNumber
              slots={slots}
              slotProps={slotProps as any}
            />
          </Box>
        </Popover>
      </LocalizationProvider>
    </div>
  );
}
