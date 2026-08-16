import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
interface MyArrowRightIconProps extends SvgIconProps {}
const MyArrowRightIcon = ({ ...props }: MyArrowRightIconProps) => {
  console.log('MyArrowRightIcon render');
  return <ArrowRightIcon {...props}></ArrowRightIcon>;
};
export default memo(MyArrowRightIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
