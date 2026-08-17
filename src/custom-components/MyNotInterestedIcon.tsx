import NotInterestedIcon from '@mui/icons-material/NotInterested';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyNotInterestedIconProps extends SvgIconProps {}
const MyNotInterestedIcon = ({ ...props }: MyNotInterestedIconProps) => {
  console.log('MyNotInterestedIcon render');
  return <NotInterestedIcon {...props}></NotInterestedIcon>;
};
export default memo(MyNotInterestedIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
