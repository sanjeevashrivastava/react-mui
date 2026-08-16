import { memo } from 'react';
import MyBox from './MyBox';
import eq from 'lodash/eq';
import { Fade } from '@mui/material';

interface MyTabPanelProps {
  index: number;
  value: number;
  children: React.ReactNode;
  [key: string]: any;
}

const MyTabPanel = ({ children, value, index, sx, ...other }: MyTabPanelProps) => {
  console.log('MyTabPanel rendered');

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Fade in timeout={250}>
          <MyBox
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.background.default
                  : theme.palette.grey[50],
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'inset 0 0 0 1px rgba(255,255,255,0.08)'
                  : 'inset 0 0 0 1px rgba(0,0,0,0.06)',
              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
              ...sx,
            }}
          >
            {children}
          </MyBox>
        </Fade>
      )}
    </div>
  );
};

export default memo(MyTabPanel, (prevProps, nextProps) => eq(prevProps, nextProps));
