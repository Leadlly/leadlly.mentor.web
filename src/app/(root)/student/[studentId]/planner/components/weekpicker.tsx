// components/WeekPicker.js
"use client"
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { Popover, TextField, Box } from '@mui/material';

dayjs.extend(isBetweenPlugin);
dayjs.extend(weekOfYear);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  isSelected: boolean;
  isHovered: boolean;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})<CustomPickerDayProps>(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: '#9654F4', // Updated color for selected
    color: theme.palette.primary.contrastText,
    '&:hover, &:focus': {
      backgroundColor: '#E8DAFE', // Updated color for hover
    },
  }),
  ...(isHovered && {
    backgroundColor: '#E8DAFE', // Updated color for hover
    '&:hover, &:focus': {
      backgroundColor: '#E8DAFE', // Updated color for hover
    },
  }),
  ...(day.day() === 0 && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(day.day() === 6 && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
})) as React.ComponentType<CustomPickerDayProps>;

const isInSameWeek = (dayA: Dayjs, dayB: Dayjs | null | undefined) => {
  if (dayB == null) {
    return false;
  }

  return dayA.isSame(dayB, 'week');
};

function Day(
  props: PickersDayProps<Dayjs> & {
    selectedDay?: Dayjs | null;
    hoveredDay?: Dayjs | null;
  },
) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  );
}

export default function WeekPicker() {
  const [hoveredDay, setHoveredDay] = React.useState<Dayjs | null>(null);
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'calendar-popover' : undefined;

  const getWeekDisplay = (date: Dayjs | null) => {
    return date ? `${date.year()} ${date.format('MMMM')} Week ${date.week()}` : '';
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TextField
        value={getWeekDisplay(value)}
        onClick={handleClick}
        label="Select Week"
        variant="outlined"
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2 }}>
          <DateCalendar
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              handleClose();
            }}
            showDaysOutsideCurrentMonth
            displayWeekNumber
            slots={{ day: Day }}
            slotProps={{
              day: (ownerState) =>
                ({
                  selectedDay: value,
                  hoveredDay,
                  onPointerEnter: () => setHoveredDay(ownerState.day),
                  onPointerLeave: () => setHoveredDay(null),
                }) as any,
            }}
          />
        </Box>
      </Popover>
    </LocalizationProvider>
  );
}
