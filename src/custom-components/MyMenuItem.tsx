import { memo } from 'react';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import eq from 'lodash/eq';

interface MyMenuItemProps extends MenuItemProps {}

const MyMenuItem = ({ sx, ...props }: MyMenuItemProps) => {
  console.log('MyMenuItem rendered');
  return (
    <MenuItem
      sx={{
        borderRadius: 1.5,
        mx: 0.5,
        my: 0.25,
        py: 1,
        px: 1.5,
        fontSize: '0.9rem',
        fontWeight: 400,
        color: (theme) =>
          theme.palette.mode === 'dark'
            ? theme.palette.grey[200]
            : theme.palette.text.primary,
        transition: 'all 0.25s ease-in-out',

        '&:hover': {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(25,118,210,0.08)',
          transform: 'translateX(2px)',
        },

        '&.Mui-selected': {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(25,118,210,0.25)'
              : 'rgba(25,118,210,0.15)',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(25,118,210,0.35)'
                : 'rgba(25,118,210,0.25)',
          },
        },

        '&.Mui-focusVisible': {
          outline: 'none',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 0 0 2px rgba(144,202,249,0.4)'
              : '0 0 0 2px rgba(25,118,210,0.3)',
        },

        ...sx,
      }}
      {...props}
    />
  );
};

export default memo(MyMenuItem, (prevProps, nextProps) => eq(prevProps, nextProps));
