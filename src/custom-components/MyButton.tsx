'use client'
import React, { FC, memo, useMemo } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import eq from 'lodash/eq';
import MyCalendarIcon from './MyCalendarIcon';
import MyDashboardIcon from './MyDashboardIcon';
import { emphasize, useTheme } from '@mui/material/styles';

interface MyButtonProps extends ButtonProps {
  startIconText?: 'CalendarMonth' | 'DashboardIcon' | string;
  target?: string;
}

const MyButton: FC<MyButtonProps> = ({ startIconText, sx, ...rest }) => {
  console.log('MyButton rendered');
  const theme = useTheme();
const baseColor =
    theme.palette.mode === 'light'
      ? '#2a5298'
      : theme.palette.primary.light;

  // 🧠 Memoized icon generation to avoid re-renders
  const startIcon = useMemo(() => {
    switch (startIconText) {
      case 'CalendarMonth':
        return <MyCalendarIcon fontSize="small" />;
      case 'DashboardIcon':
        return <MyDashboardIcon fontSize="small" />;
      default:
        return undefined;
    }
  }, [startIconText]);

  return (
    <Button
      variant="contained"
      size="small"
      startIcon={startIcon}
      sx={{
        textTransform: 'none',
        fontWeight: 'bold',
        //fontSize: '15px',
        borderRadius: 4,
        minWidth: 90,
        px: 2,
        py: 0.7,
        letterSpacing: 0.3,
        transition: 'all 0.25s ease-in-out',
        background: 'linear-gradient(135deg, #1f3b73, #233e8b, #f2c94c)',
        color: theme.palette.getContrastText(baseColor),
        boxShadow: theme.shadows[1],
        '&:hover': {
           backgroundColor: emphasize(baseColor, theme.palette.mode === 'light' ? 0.2 : 0.4),
                transform: 'translateY(-1px)',
                boxShadow: theme.shadows[2]
        },
        '&:disabled': {
          backgroundColor: theme.palette.action.disabledBackground,
          color: theme.palette.text.disabled,
        },
        ...sx, // Allow custom overrides
      }}
      {...rest}
    />
  );
};

export default memo(MyButton, (prevProps, nextProps) => eq(prevProps, nextProps));
