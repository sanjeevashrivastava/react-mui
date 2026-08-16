'use client'
import { memo } from 'react';
import CardContent, { CardContentProps } from '@mui/material/CardContent';
import eq from 'lodash/eq';

interface MyCardContentProps extends CardContentProps {}

const MyCardContent = ({ sx, ...props }: MyCardContentProps) => {
  console.log('MyCardContent rendered');
  return (
    <CardContent
      sx={{
        m: 0,
        p: 1.5,       
        borderRadius: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? theme.palette.background.default
            : '#e9e9e9' ,//theme.palette.grey[50],
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? 'inset 0 0 0 1px rgba(255,255,255,0.1)'
            : 'inset 0 0 0 1px rgba(0,0,0,0.05)',
        transition: 'background-color 0.3s, box-shadow 0.3s',
        '&:hover': {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.grey[900]
              : theme.palette.grey[100],
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? 'inset 0 0 0 1px rgba(255,255,255,0.2)'
              : 'inset 0 0 0 1px rgba(0,0,0,0.1)',
        },
        '&:last-child': {
          pb:1.5
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default memo(MyCardContent, (prevProps, nextProps) => eq(prevProps, nextProps));
