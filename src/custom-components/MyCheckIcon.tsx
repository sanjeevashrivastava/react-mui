import CheckIcon from '@mui/icons-material/Check';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyCheckIconProps extends SvgIconProps {}
const MyCheckIcon = ({ ...props }: MyCheckIconProps) => {
  console.log('MyCheckIcon render');
  return <CheckIcon {...props}></CheckIcon>;
};
export default memo(MyCheckIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
