import { memo } from 'react';
import Tabs, { TabsProps } from '@mui/material/Tabs';

import eq from 'lodash/eq';
import {useTheme} from '@mui/material/styles';

interface MyTabsProps extends TabsProps {
  children: React.ReactNode;
  value: number;
  onChange(event: React.SyntheticEvent<Element, Event>, newValue: number): void;
}

const MyTabs = ({ ...props }: MyTabsProps) => {
  const theme = useTheme();
  console.log('MyTabs rendered');
  return (
    <Tabs
      //indicatorColor="primary"
      //textColor="primary"
      variant="scrollable"
      
      sx={{
        mb: 2,
        '& a': {
          minHeight: 'auto',
          minWidth: 10,
          py: 1.5,
          px: 1,
          mr: 2.25,
          color: theme.palette.grey[600],          
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
          
        },
        '& a.Mui-selected': {
          color: theme.palette.primary.main
        },
        '& .MuiTabs-indicator': {
          bottom: 2
        },
        '& a > svg': {
          marginBottom: '0px !important',
          mr: 1.25
        },
        // "& .MuiTab-root": {
        //   textTransform: "none",
        //   minWidth: 60,
        //   borderBottom: "2px solid transparent", // default
        // },
        "& .Mui-selected": {
          borderBottom: "2px solid linear-gradient(135deg, #1f3b73, #233e8b, #f2c94c)", // selected border
          color: "#1976d2",
        },
        minHeight: 36, // affects Tabs container
        "& .MuiTab-root": {
          minHeight: 36, // affects each Tab
          paddingY: 0.5, // optional: tighter vertical spacing
        },
      }}
      {...props}
      onChange={props.onChange}
    />
  );
};

export default memo(MyTabs, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
