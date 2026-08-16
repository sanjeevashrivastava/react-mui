import { GlobalStyles, useTheme, emphasize } from '@mui/material';

export default function DataGridQuickFilterStyles() {
  const theme = useTheme();
  const hoverBg = emphasize(
    theme.palette.background.paper,
    theme.palette.mode === 'light' ? 0.04 : 0.15
  );
  const focusBorder = theme.palette.primary.main;

  return (
    <GlobalStyles
      styles={{
        /* Container */
        '.MuiDataGrid-toolbarContainer .MuiDataGrid-toolbarQuickFilter': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: theme.palette.background.paper,
          borderRadius: 1.5,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[0],
          minWidth: 180,
          maxWidth: 260,
          paddingLeft: theme.spacing(1.2),
          transition: 'all 0.25s ease-in-out',
        },

        /* Hover effect */
        '.MuiDataGrid-toolbarQuickFilter:hover': {
          backgroundColor: hoverBg,
          boxShadow: theme.shadows[0],
        },

        /* Focused input */
        '.MuiDataGrid-toolbarQuickFilter .MuiInputBase-root.Mui-focused': {
          borderColor: focusBorder,
          boxShadow: `${focusBorder}33 0 0 0 2px`,
        },

        /* Input field */
        '.MuiDataGrid-toolbarQuickFilter .MuiInputBase-root': {
          fontSize: '0.875rem',
          fontWeight: 400,
          color: theme.palette.text.primary,
          padding: theme.spacing(0.2, 0.5),
          borderRadius: 1.5,
          transition: 'all 0.25s ease-in-out',
        },

        /* Placeholder color */
        '.MuiDataGrid-toolbarQuickFilter .MuiInputBase-input::placeholder': {
          color: theme.palette.text.secondary,
          opacity: 0.7,
        },

        /* Search icon */
        '.MuiDataGrid-toolbarQuickFilter .MuiSvgIcon-root': {
          color: theme.palette.text.secondary,
          fontSize: '1.2rem',
          marginRight: theme.spacing(0.5),
          transition: 'color 0.2s ease',
        },

        '.MuiDataGrid-toolbarQuickFilter:hover .MuiSvgIcon-root': {
          color: theme.palette.primary.main,
        },

        /* Disabled */
        '.MuiDataGrid-toolbarQuickFilter.Mui-disabled': {
          backgroundColor: theme.palette.action.disabledBackground,
          color: theme.palette.text.disabled,
        },
      }}
    />
  );
}
