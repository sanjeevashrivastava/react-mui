import { memo, useCallback, useMemo } from "react";
import eq from "lodash/eq";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import MyDataGrid from "../../../custom-components/MyDataGrid";
import MyLink from "../../../custom-components/MyLink";
import MyConfirmDialog from "../../../custom-components/MyConfirmDialog";
import MyCardContent from "../../../custom-components/MyCardContent";
import MyTypography from "../../../custom-components/MyTypography";
import MyMenu from "../../../custom-components/MyMenu";
import MyMenuItem from "../../../custom-components/MyMenuItem";
import MyBreadcrumbs from "../../../custom-components/MyBreadcrumbs";
import MyEditIcon from "../../../custom-components/MyEditIcon";
import MyClearIcon from "../../../custom-components/MyClearIcon";
import useUserList from "./useUserList";

const ClientUserList = () => {
  const {
    state,
    apiRef,
    paginationModel,
    setPaginationModel,
    onCheckChange,
    onDeleteClick,
    onEditClick,
    onAddClick,
    onDeleteAllClick,
    onSortChange,
    toggleDialog,
    DeleteSingle,
    DeleteSelected,
    handleContextMenu,
    handleClose,
    onContextMenu,
    onFilterModelChange,
    onRowDoubleClick,
    onDeleteSingleClose,
    rowSelectionModel,
    setRowSelectionModel,
  } = useUserList();

  const renderCellFirstName = useCallback(
    (params: GridRenderCellParams) => (
      <MyLink to={"/users/view/" + params.row.id}>
        {params.row.first_name}
      </MyLink>
    ),
    [],
  );
  const renderCellStatus = useCallback(
    (params: GridRenderCellParams) => (
      <MyTypography
        className={"user-status-" + params.row.status.toLowerCase()}
      >
        {params.row.status}
      </MyTypography>
    ),
    [],
  );
  const columns: GridColDef[] = useMemo(
    (): GridColDef[] => [
      {
        field: "id",
        headerName: "Id",
        flex: 1,
      },
      {
        field: "first_name",
        headerName: "First Name",
        flex: 1,
        renderCell: renderCellFirstName,
      },
      {
        field: "last_name",
        headerName: "Last Name",
        flex: 1,
      },
      {
        field: "email",
        headerName: "E-Mail",
        flex: 1,
      },
      {
        field: "mobile_no",
        headerName: "Mobile #",
        flex: 1,
      },
      {
        field: "user_name",
        headerName: "Username",
        flex: 1,
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: renderCellStatus,
      },
    ],
    [renderCellFirstName, renderCellStatus],
  );
  const sortModel = useMemo(
    () => [{ field: state.sort_field, sort: state.sort_direction }],
    [state.sort_field, state.sort_direction],
  );
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <>
        <MyCardContent>
          <MyDataGrid
            apiRef={apiRef}
            // rowSelectionModel={state.arrSelectedId}
            initialStateModel={state.initialState}
            sortModel={sortModel}
            onSortModelChange={onSortChange}
            //onRowSelectionModelChange={onCheckChange}
            rows={state.arrUserDTO}
            rowCount={state.total_records}
            columns={columns}
            loading={state.isLoading}
            handleContextMenu={handleContextMenu}
            onAddClick={onAddClick}
            showAddButton={true}
            onDeleteClick={onDeleteAllClick}
            // showDeleteButton={state.arrSelectedId.length > 0}
            showDeleteButton={rowSelectionModel.ids.size > 0}
            onFilterModelChange={onFilterModelChange}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            onRowDoubleClick={onRowDoubleClick}
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
              console.log("hi", newRowSelectionModel);
              setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
            disableRowSelectionExcludeModel
          />

          <MyMenu
            open={state.contextMenu !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
              state.contextMenu !== null
                ? {
                    top: state.contextMenu.mouseY,
                    left: state.contextMenu.mouseX,
                  }
                : undefined
            }
            slotProps={{
              root: {
                onContextMenu: onContextMenu,
              },
            }}
          >
            <MyMenuItem onClick={onEditClick}>
              <MyEditIcon />
              Edit
            </MyMenuItem>
            <MyMenuItem onClick={onDeleteClick}>
              <MyClearIcon />
              Delete
            </MyMenuItem>
          </MyMenu>
        </MyCardContent>
      </>
      {state.visibleDialog && (
        <MyConfirmDialog
          open={state.visibleDialog}
          title="Confirm User Removal"
          onNoClick={toggleDialog}
          onYesClick={DeleteSelected}
          onClose={toggleDialog}
        >
          <MyTypography variant="body1">
            {" "}
            Are you sure you want to delete this item? This cannot be undone.
          </MyTypography>
        </MyConfirmDialog>
      )}
      {state.visibleDialog1.visibility && (
        <MyConfirmDialog
          open={state.visibleDialog1.visibility}
          title="Confirm User Removal"
          onNoClick={onDeleteSingleClose}
          onYesClick={DeleteSingle}
          onClose={onDeleteSingleClose}
        >
          <MyTypography variant="body1">
            Are you sure you want to delete this item? This cannot be undone.
          </MyTypography>
        </MyConfirmDialog>
      )}
    </>
  );
};

export default memo(ClientUserList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
