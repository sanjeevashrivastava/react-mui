import { memo } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyCancelIconProps extends SvgIconProps {}
const MyCancelIcon = ({ ...props }: MyCancelIconProps) => {
  console.log('MyCancelIcon rendered');
  return <CancelIcon {...props}></CancelIcon>;
};
export default memo(MyCancelIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
