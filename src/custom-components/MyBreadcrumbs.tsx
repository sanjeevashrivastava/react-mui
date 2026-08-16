import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import MyHomeIcon from './MyHomeIcon';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {Link} from 'react-router-dom';
import MyTypography from './MyTypography';
import { Box, Stack } from '@mui/material';

export interface BreadcrumbsItem {
  label: string;
  href?: string;
}

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const baseColor =
    theme.palette.mode === 'light'
      ? '#2a5298'
      : theme.palette.primary.light;

  return {
    background: 'linear-gradient(135deg, #1f3b73, #233e8b, #f2c94c)',
    color: theme.palette.getContrastText(baseColor),
    height: theme.spacing(3.5),
    fontWeight: 500,
    borderRadius: 16, //theme.shape.borderRadius * 4,
    transition: 'all 0.25s ease-in-out',

    '& .MuiChip-label': {
      px: 1,
      fontSize: '0.85rem',
    },
    '& .MuiChip-icon': {
      color: 'inherit',
      marginLeft: theme.spacing(0.5),
    },
    '&:hover, &:focus': {
      backgroundColor: emphasize(baseColor, theme.palette.mode === 'light' ? 0.2 : 0.4),
      transform: 'translateY(-1px)',
      boxShadow: theme.shadows[2],
    },
    '&:active': {
      transform: 'scale(0.98)',
      boxShadow: theme.shadows[1],
    },
  };
}) as typeof Chip;

export default function MyBreadcrumbs({
  items,
  secondary,
}: {
  items: BreadcrumbsItem[];
  secondary?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        pb: 1,
        mb: 1.5,
        borderBottom: (theme) =>
          theme.palette.mode === 'dark'
            ? '1px solid rgba(255,255,255,0.1)'
            : '1px solid #E0E0E0',
        width: '100%',
      }}
    >
       <MyTypography
        sx={{ fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid #CED0CE', marginTop: '-10px', marginBottom: '5px', paddingBottom: '5px' }}
      >
        {items[items.length - 1].label}
      </MyTypography>
      <Stack
      component="div"
        direction="row"
        //alignItems="center"
        //justifyContent="space-between"
        spacing={1}
        sx={{ width: '100%' }}
      >
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{
        // Target the list items that are children of the breadcrumbs
        '& a': {
          padding: '0 0px', // Adjust padding on list items
        },
        // Target the separator itself
        '& .MuiBreadcrumbs-separator': {
          marginLeft: '0px', // Reduce margin on the left
          marginRight: '0px', // Reduce margin on the right
        },
      }}
          
        >
          <Link to="/dashboard">
            <StyledBreadcrumb
              label="Home"
              icon={<MyHomeIcon fontSize="small" />}
              sx={{ cursor: 'pointer' }}
              component="div"
            />
          </Link>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            if (!isLast && item.href) {
              return (
                <Link key={item.label} to={item.href}>
                  <StyledBreadcrumb
                    label={item.label}
                    sx={{ cursor: 'pointer' }}
                    component="div"
                  />
                </Link>
              );
            }

            return (
              <MyTypography
                key={item.label}
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: (theme) =>
                    theme.palette.mode === 'dark'
                      ? theme.palette.grey[300]
                      : theme.palette.text.primary,
                }}
              >
                {item.label}
              </MyTypography>
            );
          })}
        </Breadcrumbs>

        {secondary && <Box>{secondary}</Box>}
      </Stack>
    </Box>
  );
}
