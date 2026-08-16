import { memo } from 'react';
import Divider, { DividerProps } from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import eq from 'lodash/eq';

interface MyDividerProps extends DividerProps {
  /**
   * Optional text label in the middle of the divider
   */
  label?: string;
}

const MyDivider = ({ label, sx, ...props }: MyDividerProps) => {
  const theme = useTheme();
  return (
    <Divider
      textAlign={label ? 'center' : undefined}
      sx={{
        my: 1,
        borderWidth: '1px',
        borderColor: theme.palette.mode === 'light'
          ? 'rgba(0, 0, 0, 0.1)'
          : 'rgba(255, 255, 255, 0.1)',
        background:
          'linear-gradient(to right, transparent, rgba(0,0,0,0.1), transparent)',
        '&::before, &::after': {
          borderTopColor:
            theme.palette.mode === 'light'
              ? 'rgba(0, 0, 0, 0.12)'
              : 'rgba(255, 255, 255, 0.12)',
        },
        fontWeight: 500,
        letterSpacing: 0.5,
        color: theme.palette.text.secondary,
        ...sx, // allow overrides
      }}
      {...props}
    >
      {label}
    </Divider>
  );
};

export default memo(MyDivider, (prevProps, nextProps) => eq(prevProps, nextProps));
