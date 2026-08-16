import { memo } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import eq from 'lodash/eq';

interface MyTypographyProps extends TypographyProps {
  href?: string ;
  target?: string;
  underline?: string;
}

const MyTypography = ({ ...props }: MyTypographyProps) => {
  console.log('MyTypography rendered');
  return <Typography variant="body2" {...props}></Typography>;
};

export default memo(MyTypography, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
