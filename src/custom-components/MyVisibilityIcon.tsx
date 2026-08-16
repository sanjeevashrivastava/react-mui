import Visibility from '@mui/icons-material/Visibility';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyVisibilityIconProps extends SvgIconProps {}
const MyVisibilityIcon = ({ ...props }: MyVisibilityIconProps) => {
  console.log('MyVisibilityIcon render');
  return <Visibility {...props}></Visibility>;
};
export default memo(MyVisibilityIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
