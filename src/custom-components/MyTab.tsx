import { memo } from 'react';
import Tab, { TabProps } from '@mui/material/Tab';
import eq from 'lodash/eq';

interface MyTabProps extends TabProps {
  icon?: React.ReactElement;
  label: string;
}

const MyTab = ({ sx, ...props }: MyTabProps) => {
  console.log('MyTab rendered');
  return (
    <Tab
      iconPosition="start"
      disableRipple
      sx={{
        minHeight: 38,
        textTransform: 'none',
        fontWeight: 500,
        borderRadius: 2,
        px: 2,
        mr: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: (theme) =>
          theme.palette.mode === 'dark'
            ? theme.palette.grey[300]
            : theme.palette.text.secondary,
        transition: 'all 0.25s ease-in-out',

        '&.Mui-selected': {
          color: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.primary.light
              : theme.palette.primary.main,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(25,118,210,0.08)',
          fontWeight: 600,
        },

        '&:hover': {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(0,0,0,0.04)',
        },

        '&.Mui-focusVisible': {
          outline: 'none',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 0 0 2px rgba(144,202,249,0.4)'
              : '0 0 0 2px rgba(25,118,210,0.3)',
        },

        '& .MuiTab-iconWrapper': {
          mr: 1,
          fontSize: '1.2rem',
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default memo(MyTab, (prevProps, nextProps) => eq(prevProps, nextProps));
