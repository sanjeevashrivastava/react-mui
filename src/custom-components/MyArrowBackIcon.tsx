import ArrowBack from '@mui/icons-material/ArrowBack';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyArrowBackIconProps extends SvgIconProps {}
const MyArrowBackIcon = ({ ...props }: MyArrowBackIconProps) => {
  console.log('MyArrowBackIcon render');
  return <ArrowBack {...props}></ArrowBack>;
};
export default memo(MyArrowBackIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
