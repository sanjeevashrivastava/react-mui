import { memo, useCallback, useState } from 'react';
import { TablePaginationProps } from '@mui/material/TablePagination';

import {
  DataGrid,
  DataGridProps,

  GridToolbarProps,
  gridPageCountSelector,
  GridPagination,
  useGridSelector,
  useGridApiContext,
  Toolbar,
 
  ToolbarButton,

  QuickFilter,
  QuickFilterTrigger,
  QuickFilterControl,
  QuickFilterClear
} from '@mui/x-data-grid';
import { defaultPageSize, density, pageSizes } from '../common/Configuration';
//import {} from '@mui/material';

import MyAddIcon from './MyAddIcon';
import MyClearIcon from './MyClearIcon';
import MyButton from './MyButton';
import {styled, ThemeProvider, useTheme} from '@mui/material/styles';
import eq from 'lodash/eq';
import MyMuiPagination from './MyMuiPagination';
import MyMenu from './MyMenu';
import MyMenuItem from './MyMenuItem';
import DataGridColumnsPanelStyles from './DataGridColumnsPanelStyles';
import DataGridQuickFilterStyles from './DataGridQuickFilterStyles';
import { InputAdornment, ScopedCssBaseline, TextField, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';

interface MyDataGridProps extends DataGridProps {
  rowCount?: number;
  handleContextMenu?(e: React.MouseEvent): void;
  onChangePage?(e: React.ChangeEvent<unknown>, page: number): void;
  customToolbar?: any;
  onAddClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  showAddButton?: boolean;
  showAddDropdownButton?: boolean;
  arrAddDropdownMenu?: any[];
  onDeleteClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  showDeleteButton?: boolean;
  initialStateModel?: any;
  filterModel1?: any;
  toolbar?: boolean;
}

interface MyToolbarProps extends GridToolbarProps {
  onAddClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  showAddButton?: boolean;
  showAddDropdownButton?: boolean;
  arrAddDropdownMenu?: any[];
  onDeleteClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  showDeleteButton?: boolean;
  toolbar?: boolean;
}

const GridToolbarAddButton = memo(
  function (props: any) {
    console.log('GridToolbarAddButton rendered');
    return (
      <MyButton variant="text" startIcon={<MyAddIcon />} title="Add" onClick={props.onAddClick}>
        Add
      </MyButton>
    );
  },
  (prevProps, nextProps) => {
    return eq(prevProps, nextProps); // Don't re-render!
  }
);
GridToolbarAddButton.displayName = 'GridToolbarAddButton';

const GridToolbarAddDropdownButton = memo(
  function (props: any) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <MyButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          variant="text"
          startIcon={<MyAddIcon />}
        >
          Add
        </MyButton>
        <MyMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          // MenuListProps={{
          //   'aria-labelledby': 'basic-button'
          // }}
        >
          {props.arrAddDropdownMenu?.map((item: any, index: number) => (
            <MyMenuItem
              key={index}
              onClick={() => {
                item.onClick();
                handleClose();
              }}
            >
              {item.text}
            </MyMenuItem>
          ))}
        </MyMenu>
      </>
    );
  },
  (prevProps, nextProps) => {
    return eq(prevProps, nextProps); // Don't re-render!
  }
);
GridToolbarAddDropdownButton.displayName = 'GridToolbarAddDropdownButton';

const GridToolbarDeleteButton = memo(
  function (props: any) {
    console.log('GridToolbarDeleteButton rendered');
    return (
      <MyButton variant="text" startIcon={<MyClearIcon />} title="Delete" color="error" onClick={props.onDeleteClick}>
        Delete
      </MyButton>
    );
  },
  (prevProps, nextProps) => {
    return eq(prevProps, nextProps); // Don't re-render!
  }
);
GridToolbarDeleteButton.displayName = 'GridToolbarDeleteButton';
type OwnerState = {
  expanded: boolean;
};

const StyledQuickFilter = styled(QuickFilter)({
  display: 'grid',
  alignItems: 'center',
  marginLeft: 'auto'
});
// const StyledToolbarButton = styled(ToolbarButton)<{ ownerState: OwnerState }>(({ theme, ownerState }) => ({
//   gridArea: '1 / 1',
//   width: 'min-content',
//   height: 'min-content',
//   zIndex: 1,
//   opacity: ownerState.expanded ? 0 : 1,
//   pointerEvents: ownerState.expanded ? 'none' : 'auto',
//   transition: theme.transitions.create(['opacity'])
// }));
type StyledToolbarButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToolbarButton>,
  'ownerState'
> & {
  ownerState: OwnerState;
};

const StyledToolbarButton = styled(
  ({ ownerState, ...props }: StyledToolbarButtonProps) => (
    <ToolbarButton {...props} />
  ),
  {
    shouldForwardProp: (prop) => prop !== 'ownerState',
  }
)(({ theme, ownerState }: { theme: any; ownerState: OwnerState }) => ({
  gridArea: '1 / 1',
  width: 'min-content',
  height: 'min-content',
  zIndex: 1,
  opacity: ownerState.expanded ? 0 : 1,
  pointerEvents: ownerState.expanded ? 'none' : 'auto',
  transition: theme.transitions.create(['opacity']),
}));
const StyledTextField = styled(TextField)<{
  ownerState: OwnerState;
}>(({ theme, ownerState }) => ({
  gridArea: '1 / 1',
  overflowX: 'clip',
  width: ownerState.expanded ? 260 : 'var(--trigger-width)',
  opacity: ownerState.expanded ? 1 : 0,
  transition: theme.transitions.create(['width', 'opacity'])
}));

const CustomToolbar = memo(
  function ({ showAddButton = false, showAddDropdownButton = false, showDeleteButton = false, ...props }: MyToolbarProps) {
    console.log('CustomToolbar rendered');
    //const theme = useTheme();
   // const baseColor = theme.palette.mode === 'light' ? '#2a5298' : theme.palette.primary.light;
   

    return (
       <Toolbar className="gap-2! p-2!"  style={{
    display: 'flex',
    width: '100%',
  }}>
        {showAddButton && <GridToolbarAddButton onAddClick={props.onAddClick} />}
        {showAddDropdownButton && <GridToolbarAddDropdownButton arrAddDropdownMenu={props.arrAddDropdownMenu} />}
        {showDeleteButton && <GridToolbarDeleteButton onDeleteClick={props.onDeleteClick} />}
        {/* <ColumnsPanelTrigger render={<ToolbarButton render={<MyButton startIcon={<ViewColumnIcon fontSize="small"/>}>Columns</MyButton>} />} /> */}
        {/* <FilterPanelTrigger render={<ToolbarButton render={<MyButton>Filter</MyButton>} />} /> */}
{/*       
        {showPrintButton && <ExportPrint render={<ToolbarButton render={<Button>Print</Button>} />} />}
        {showExpandButton && <GridToolbarExpandButton expandAll={expandAll} onExpandClick={props.onExpandClick} />}
        {showViewTypeButton && <GridToolbarViewTypeButton arrMenu={props.arrMenu} />}
        {showExportButton && <ExportCsv render={<ToolbarButton render={<Button>Export</Button>} />} />} */}
        <StyledQuickFilter>
          <QuickFilterTrigger
            render={(triggerProps, state) => (
              <Tooltip title="Search" enterDelay={0}>
                <StyledToolbarButton
                  {...triggerProps}
                  ownerState={{ expanded: state.expanded }}
                  color="default"
                  aria-disabled={state.expanded}
                >
                  <SearchIcon fontSize="small" />
                </StyledToolbarButton>
              </Tooltip>
            )}
          />
          <QuickFilterControl
            render={({ ref, ...controlProps }, state) => (
              <StyledTextField
                {...controlProps}
                ownerState={{ expanded: state.expanded }}
                inputRef={ref}
                aria-label="Search"
                placeholder="Search..."
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: state.value ? (
                      <InputAdornment position="end">
                        <QuickFilterClear
                          edge="end"
                          size="small"
                          aria-label="Clear search"
                          //material={{ sx: { marginRight: -0.75 }  }}
                        >
                          <CancelIcon fontSize="small" />
                        </QuickFilterClear>
                      </InputAdornment>
                    ) : null,
                    ...controlProps.slotProps?.input
                  },
                  ...controlProps.slotProps
                }}
              />
            )}
          />
        </StyledQuickFilter>

         {/* <ColumnsPanelTrigger
        render={<ToolbarButton render={<Button>Columns</Button>} />}
      />
      <FilterPanelTrigger
        render={<ToolbarButton render={<Button>Filter</Button>} />}
      />
      <ExportCsv render={<ToolbarButton render={<Button>Export</Button>} />} />
      <ExportPrint render={<ToolbarButton render={<Button>Print</Button>} />} />

      <QuickFilter
        render={(props, state) => (
          <div {...props} className="ml-auto flex overflow-clip">
            <QuickFilterTrigger
              className={state.expanded ? 'rounded-r-none border-r-0' : ''}
              render={
                <ToolbarButton
                  render={
                    <Button aria-label="Search">
                      <SearchIcon fontSize="small" />
                    </Button>
                  }
                />
              }
            />
            <div
              className={clsx(
                'flex overflow-clip transition-all duration-300 ease-in-out',
                state.expanded ? 'w-48' : 'w-0',
              )}
            >
              <QuickFilterControl
                aria-label="Search"
                placeholder="Search"
                render={({ slotProps, size, ...controlProps }) => (
                  <TextInput
                    {...controlProps}
                    {...slotProps?.htmlInput}
                    className={clsx(
                      'flex-1 rounded-l-none',
                      state.expanded && state.value !== '' && 'rounded-r-none',
                    )}
                  />
                )}
              />
              {state.expanded && state.value !== '' && (
                <QuickFilterClear
                  render={
                    <Button aria-label="Clear" className="rounded-l-none">
                      <CancelIcon fontSize="small" />
                    </Button>
                  }
                />
              )}
            </div>
          </div>
        )}
      /> */}
      {/* <MyGrid container>
        <MyGrid size={{ xs: 12, md: 9, lg: 9 }}>
          <MyBox display="flex" gap={0.5} sx={{ p: 1 }}>
            {showAddButton && <GridToolbarAddButton onAddClick={props.onAddClick} />}
            {showAddDropdownButton && <GridToolbarAddDropdownButton arrAddDropdownMenu={props.arrAddDropdownMenu} />}
            {showDeleteButton && <GridToolbarDeleteButton onDeleteClick={props.onDeleteClick} />}
            <GridToolbarColumnsButton
              slotProps={{
                button: {
                  style: {
                    textTransform: 'none',
                    fontWeight: 'bold',
                    //fontSize: '15px',
                    borderRadius: 4,
                    minWidth: 90,
                    paddingLeft: 2,
                    paddingTop: 0.7,
                    letterSpacing: 0.3,
                    transition: 'all 0.25s ease-in-out',
                    background: 'linear-gradient(135deg, #1f3b73, #233e8b, #f2c94c)',
                    color: theme.palette.getContrastText(baseColor),
                    boxShadow: theme.shadows[1],
                    // '&:hover': {
                    //   backgroundColor: emphasize(baseColor, theme.palette.mode === 'light' ? 0.2 : 0.4),
                    //   transform: 'translateY(-1px)',
                    //   boxShadow: theme.shadows[2]
                    // },
                    // '&:disabled': {
                    //   backgroundColor: theme.palette.action.disabledBackground,
                    //   color: theme.palette.text.disabled
                    // }
                  }
                },
                // tooltip: {
                //   title: 'Show / Hide Columns',
                //   componentsProps: {
                //     tooltip: {
                //       sx: {
                //         bgcolor: emphasize(baseColor, 0.3),
                //         color: '#fff',
                //         fontSize: '0.75rem',
                //         px: 1.2,
                //         py: 0.6,
                //         borderRadius: 1,
                //         boxShadow: theme.shadows[2]
                //       }
                //     },
                //     popper: {
                //       sx: {
                //         zIndex: theme.zIndex.tooltip + 2, // ensure it's above DataGrid header
                //         bgcolor: emphasize(baseColor, 0.3),
                //         color: '#fff',
                //         fontSize: '0.75rem',
                //         px: 1.2,
                //         py: 0.6,
                //         borderRadius: 1,
                //         boxShadow: theme.shadows[2]
                //       },
                //       modifiers: [
                //         {
                //           name: 'offset',
                //           options: {
                //             offset: [0, 8] // X, Y offset in pixels
                //           }
                //         },
                //         {
                //           name: 'preventOverflow',
                //           options: {
                //             boundary: 'viewport'
                //           }
                //         }
                //       ]
                //     }
                //   }
                // }
              }}
            />
          </MyBox>
        </MyGrid>
        <MyGrid size={{ xs: 12, md: 3, lg: 3 }}>
          <MyBox display="flex" gap={1} sx={{ p: 1 }}>
            <GridToolbarQuickFilter />
          </MyBox>
        </MyGrid>
      </MyGrid> */}
      </Toolbar>
    );
  },
  (prevProps, nextProps) => {
    return eq(prevProps, nextProps); // Don't re-render!
  }
);
CustomToolbar.displayName = 'CustomToolbar';

const Pagination = memo(
  function ({ page, onPageChange, className }: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    console.log('Pagination rendered');
    return (
      <MyMuiPagination
        color="standard"
        className={className}
        count={pageCount}
        showFirstButton
        showLastButton
        page={page + 1}
        onChange={useCallback(
          (event: any, newPage: number) => {
            onPageChange(event as any, newPage - 1);
          },
          [onPageChange]
        )}
      />
    );
  },
  (prevProps, nextProps) => {
    return eq(prevProps, nextProps); // Don't re-render!
  }
);
Pagination.displayName = 'Pagination';

const CustomPagination = memo(
  function (props: any) {
    console.log('CustomPagination rendered');
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  },
  (prevProps, nextProps) => {
    return eq(prevProps, nextProps); // Don't re-render!
  }
);
CustomPagination.displayName = 'CustomPagination';

const MyDataGrid = ({ showAddButton = false, showDeleteButton = false, initialStateModel, toolbar = true, ...props }: MyDataGridProps) => {
  const theme = useTheme();
  const compact = true;
  console.log('MyDataGrid rendered');

  return (
    <>
    <ScopedCssBaseline enableColorScheme>
      <ThemeProvider theme={theme}>

      <DataGridColumnsPanelStyles />
      <DataGridQuickFilterStyles/>
      {/* <div style={{ height: 500, width: '100%' }}> */}
      <DataGrid
        checkboxSelection
        disableRowSelectionOnClick
        density={density}
        slots={{
          toolbar: (toolbar ? CustomToolbar: null) as any,
          pagination: CustomPagination
        }}
       
        showToolbar
        pageSizeOptions={pageSizes}
        pagination
        paginationMode="server"
        filterMode="server"
        slotProps={{
          loadingOverlay: {
      variant: 'skeleton',
      noRowsVariant: 'skeleton',
      
    },
     basePagination: {
      material: {
        ActionsComponent: Pagination,
      },
    },
          toolbar: {
            showAddButton: showAddButton,
            showAddDropdownButton: props.showAddDropdownButton,
            arrAddDropdownMenu: props.arrAddDropdownMenu,
            showDeleteButton: showDeleteButton,
            onAddClick: props.onAddClick,
            onDeleteClick: props.onDeleteClick
          } as MyToolbarProps,
          row: {
            onContextMenu: props.handleContextMenu,
            style: { cursor: 'context-menu' }
          }
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: defaultPageSize } },
          ...initialStateModel
        }}
        {...props}
        sx={{
          borderRadius: 2,
          boxShadow: theme.palette.mode === 'light' ? '0 2px 10px rgba(0,0,0,0.05)' : '0 2px 10px rgba(0,0,0,0.4)',
          backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1a1f36',
          border: 'none',
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : '#252c48',
            borderBottom: `1px solid ${theme.palette.mode === 'light' ? theme.palette.divider : '#333a56'}`,
            color: theme.palette.mode === 'light' ? '#333' : '#e0e0e0',
            fontWeight: 600,
            //fontSize: compact ? '0.75rem' : '0.875rem',
            letterSpacing: 0.3
          },
  //         '& .MuiDataGrid-columnHeaders': {
  //   position: 'sticky',
  //   top: 0, // Stick to the top of its parent container
  //   backgroundColor: theme.palette.background.paper, // Or any other desired background color
  //   zIndex: 1, // Ensure the header stays above other content when scrolling
  // },
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : '#2a314e'}`,
            color: theme.palette.mode === 'light' ? '#444' : '#d3d3d3',
            //fontSize: compact ? '0.8rem' : '0.9rem',
            py: compact ? 0.4 : 1,
            display: 'flex',
            alignItems: 'center'
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.08)'
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : '#2a314e'}`,
            backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#20263c',
            minHeight: compact ? 40 : 56
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            background: 'linear-gradient(135deg, #1f3b73, #233e8b, #f2c94c)',
            color: '#fff'
          },
          '& .MuiPaginationItem-root.Mui-selected:hover': {
            backgroundColor: 'linear-gradient(135deg, #1f3b73, #233e8b, #f2c94c)'
          },
          '& .MuiDataGrid-row.Mui-selected': {
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.primary.light + '33' // 20% opacity
          : theme.palette.primary.dark + '55', // 33% opacity
      '&:hover': {
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.primary.light + '55'
            : theme.palette.primary.dark + '77',
      },
    },
    '& .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
    ...props.sx
        }}
        
      />
      {/* </div> */}
      </ThemeProvider>
      </ScopedCssBaseline>
    </>
  );
};

export default memo(MyDataGrid, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
