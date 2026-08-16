import { memo } from 'react';
import Grid, { GridProps } from '@mui/material/Grid';
import eq from 'lodash/eq';

interface MyGridProps extends GridProps {}

const MyGrid = ({ children, ...props }: MyGridProps) => {
  console.log('MyGrid rendered');
  return <Grid {...props}> {children}</Grid>;
};

export default memo(MyGrid, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
