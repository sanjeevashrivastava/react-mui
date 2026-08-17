import SaveIcon from '@mui/icons-material/Save';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MySaveIconProps extends SvgIconProps {}
const MySaveIcon = ({ ...props }: MySaveIconProps) => {
  console.log('MySaveIcon render');
  return <SaveIcon {...props}></SaveIcon>;
};
export default memo(MySaveIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
