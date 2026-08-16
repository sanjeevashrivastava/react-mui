import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyViewColumnIconProps extends SvgIconProps {}
const MyViewColumnIcon = ({ ...props }: MyViewColumnIconProps) => {
  console.log('MyViewColumnIcon render');
  return <ViewColumnIcon {...props}></ViewColumnIcon>;
};
export default memo(MyViewColumnIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
