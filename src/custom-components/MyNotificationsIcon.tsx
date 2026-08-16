import NotificationsIcon from '@mui/icons-material/Notifications';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
interface MyNotificationsIconProps extends SvgIconProps {}
const MyNotificationsIcon = ({ ...props }: MyNotificationsIconProps) => {
  console.log('MyNotificationsIcon render');
  return <NotificationsIcon {...props}></NotificationsIcon>;
};
export default memo(MyNotificationsIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
