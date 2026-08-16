import { GlobalStyles, useTheme, emphasize } from '@mui/material';

export default function DataGridColumnsPanelStyles() {
  const theme = useTheme();
  const baseBg = theme.palette.background.paper;
  const hoverBg = emphasize(baseBg, theme.palette.mode === 'light' ? 0.06 : 0.2);

  return (
    <GlobalStyles
      styles={{
        /* Panel container */
        '.MuiDataGrid-columnsManagement': {
          backgroundColor: baseBg,
          borderRadius: 12,
          boxShadow: theme.shadows[5],
          padding: theme.spacing(1.5, 2),
          minWidth: 280,
          maxHeight: 480,
          overflow: 'auto',
          transition: 'all 0.25s ease-in-out',
        },

        '.MuiDataGrid-columnsManagement:hover': {
          boxShadow: theme.shadows[8],
        },

        /* Header section (title, search) */
        '.MuiDataGrid-columnsManagement .MuiDataGrid-panelHeader': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme.palette.divider}`,
          paddingBottom: theme.spacing(1),
          marginBottom: theme.spacing(1),
        },

        '.MuiDataGrid-columnsManagement .MuiTypography-root': {
          fontWeight: 600,
          fontSize: '0.95rem',
          color: theme.palette.text.primary,
        },

        '.MuiDataGrid-columnsManagement .MuiInputBase-root': {
          borderRadius: 8,
          backgroundColor: theme.palette.action.hover,
          paddingLeft: theme.spacing(1),
          transition: 'background-color 0.2s ease',
        },

        '.MuiDataGrid-columnsManagement .MuiInputBase-root:hover': {
          backgroundColor: hoverBg,
        },

        /* Column items */
        '.MuiDataGrid-columnsManagement div[role="button"]': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: theme.palette.text.primary,
          padding: theme.spacing(0.75, 1),
          borderRadius: 6,
          marginBottom: 2,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        },

        '.MuiDataGrid-columnsManagement div[role="button"]:hover': {
          backgroundColor: hoverBg,
          color: theme.palette.primary.main,
        },

        /* Checkbox */
        '.MuiDataGrid-columnsManagement .MuiCheckbox-root': {
          color: theme.palette.primary.main,
        },

        /* Divider */
        '.MuiDataGrid-columnsManagement .MuiDivider-root': {
          margin: theme.spacing(1, 0),
        },

        /* Footer */
        '.MuiDataGrid-columnsManagementFooter': {         
          color: theme.palette.text.primary,
        },
        '.MuiDataGrid-columnsManagementFooter .MuiDataGrid-panelFooter': {
          borderTop: `1px solid ${theme.palette.divider}`,
          marginTop: theme.spacing(1.5),
          paddingTop: theme.spacing(1),
          display: 'flex',
          justifyContent: 'flex-end',
          gap: theme.spacing(1),         
        },

        '.MuiDataGrid-columnsManagement .MuiButton-root': {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 1.5,
          px: 2,
          py: 0.7,
          boxShadow: theme.shadows[1],
          transition: 'all 0.25s ease-in-out',
        },

        '.MuiDataGrid-columnsManagement .MuiButton-root:hover': {
          boxShadow: theme.shadows[2],
          transform: 'translateY(-1px)',
        },
      }}
    />
  );
}
