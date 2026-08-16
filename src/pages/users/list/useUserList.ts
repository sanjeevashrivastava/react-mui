import { useCallback, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useMutation, useLazyQuery } from '@apollo/client';
import {
  GridEventListener,
  GridFilterModel,
  GridRowSelectionModel,
  GridSortModel,
  useGridApiRef,
  GridInitialState,
  GridRowId,
} from "@mui/x-data-grid";
import toast from "react-hot-toast";
import {
  SortDirectionType,
  ContextMenuType,
  defaultPageSize,
} from "../../../common/Configuration";
import UserDTO from "../../../types/UserDTO";
import { BreadcrumbsItem } from "../../../custom-components/MyBreadcrumbs";
import UserService from "../../../services/UserService";
//import { USER_LIST, DELETE_USER } from '../../../graphql/User';

type visibleDialog1Type = { id: string; visibility: boolean };

type StateType = {
  isLoading: boolean;
  arrUserDTO: UserDTO[];
  total_records: number;
  filter_text: string;
  sort_field: string;
  sort_direction: SortDirectionType;
  visibleDialog: boolean;
  visibleDialog1: visibleDialog1Type;
  selectedRow: string;
  arrSelectedId: string[];
  contextMenu: ContextMenuType | null;
  initialState: GridInitialState;
  breadcrumbsItems: BreadcrumbsItem[];
};
const INITIAL_STATE: StateType = Object.freeze({
  isLoading: false,
  arrUserDTO: [],
  total_records: 0,
  filter_text: "",
  sort_field: "id",
  sort_direction: "desc",
  visibleDialog: false,
  visibleDialog1: { id: "", visibility: false },
  selectedRow: "",
  arrSelectedId: [],
  contextMenu: null,
  initialState: {
    columns: {
      columnVisibilityModel: { id: false },
    },
    pinnedColumns: { left: ["first_name", "last_name"] },
  },
  breadcrumbsItems: [{ label: "Users" }],
});

const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
  return { ...state, ...action };
};

const useUserList = () => {
  const navigate = useNavigate();
  const apiRef = useGridApiRef();

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize,
  });
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>({ type: "include", ids: new Set() });

  const getData = useCallback(async (): Promise<void> => {
    setState({ isLoading: true } as StateType);
    let arrUserDTO: UserDTO[] = [];
    let total_records: number = 0;
    const result = await UserService.GetPage(
      state.filter_text,
      state.sort_field,
      state.sort_direction as string,
      paginationModel.page * paginationModel.pageSize,
      paginationModel.pageSize,
    );

    arrUserDTO = result.users.map((item: UserDTO) => {
      return { ...item, id: item.id.toString() };
    });

    total_records = result.totalRecords;

    setState({
      arrUserDTO: arrUserDTO,
      total_records: total_records,
      isLoading: false,
      arrSelectedId: [] as GridRowId[],
    } as StateType);
  }, [
    state.filter_text,
    state.sort_field,
    state.sort_direction,
    paginationModel.page,
    paginationModel.pageSize,
  ]);

  useEffect(() => {
    getData();
  }, [
    getData,
    state.filter_text,
    state.sort_field,
    state.sort_direction,
    paginationModel,
  ]);

  const handleClose = useCallback(async (): Promise<void> => {
    setState({ contextMenu: null } as StateType);
  }, []);

  const toggleDialog = useCallback(async (): Promise<void> => {
    setState({ visibleDialog: !state.visibleDialog } as StateType);
  }, [state.visibleDialog]);

  const toggleDialog1 = useCallback(
    async (id: string): Promise<void> => {
      setState({
        visibleDialog1: {
          id: id,
          visibility: !state.visibleDialog1.visibility,
        },
      } as StateType);
    },
    [state.visibleDialog1.visibility],
  );

  const onSortChange = useCallback(
    async (model: GridSortModel): Promise<void> => {
      if (model.length > 0) {
        setState({
          sort_field: model[0].field,
          sort_direction: model[0].sort?.toString() as SortDirectionType,
        } as StateType);
      } else {
        setState({
          sort_field: state.sort_field,
          sort_direction: "asc",
        } as StateType);
      }
      setPaginationModel({ ...paginationModel, page: 0 });
    },
    [state.sort_field, paginationModel],
  );

  const handleContextMenu = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      setState({
        selectedRow: event.currentTarget.getAttribute("data-id"),
        contextMenu:
          state.contextMenu === null
            ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
            : null,
      } as StateType);
    },
    [state.contextMenu],
  );

  const onRowDoubleClick: GridEventListener<"rowDoubleClick"> = useCallback(
    async (
      params, // GridRowParams
      //event, // MuiEvent<React.MouseEvent<HTMLElement>>
      //details // GridCallbackDetails
    ) => {
      navigate("/users/edit/" + params.row.id);
    },
    [navigate],
  );

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      navigate("/users/edit/" + state.selectedRow);
    },
    [navigate, state.selectedRow],
  );

  const onDeleteClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      await toggleDialog1(state.selectedRow);
      await handleClose();
    },
    [toggleDialog1, handleClose, state.selectedRow],
  );

  const DeleteSingle = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      try {
        event.preventDefault();
        const params = [state.visibleDialog1.id];
        const result = await UserService.Delete(params);
        await toggleDialog1("");
        if (result) {
          getData();
          toast.success("record(s) deleted successfully");
        } else {
          toast.error("Error occured while deleting record(s)");
        }
      } catch {
        toast.error("Error occured while deleting record(s)");
      }
    },
    [
      //deleteUser,
      getData,
      state.visibleDialog1.id,
      toggleDialog1,
    ],
  );

  const onCheckChange = useCallback(
    async (
      model: GridRowSelectionModel,
      //details: GridCallbackDetails<any>
    ): Promise<void> => {
      setState({ arrSelectedId: [...model.ids] as string[] } as StateType);
    },
    [],
  );

  const onAddClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      navigate("/users/add");
    },
    [navigate],
  );

  const onDeleteAllClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      event.preventDefault();
      await toggleDialog();
    },
    [toggleDialog],
  );

  const DeleteSelected = useCallback(
    async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
      try {
        event.preventDefault();
        const result = await UserService.Delete([...rowSelectionModel.ids]);
        await toggleDialog();
        if (result) {
          getData();
          toast.success("record(s) deleted successfully");
        } else {
          toast.error("Error occured while deleting record(s)");
        }
      } catch {
        toast.error("Error occured while deleting record(s)");
      }
    },
    [
      //deleteUser,
      getData,
      state.arrSelectedId,
      toggleDialog,
    ],
  );

  const onContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      handleClose();
    },
    [handleClose],
  );

  const onFilterModelChange = useCallback(
    async (newFilterModel: GridFilterModel): Promise<void> => {
      let filterText = "";
      if (newFilterModel.quickFilterValues) {
        filterText = newFilterModel.quickFilterValues[0] ?? "";
      }
      setState({ filter_text: filterText } as StateType);
      setPaginationModel({ ...paginationModel, page: 0 });
    },
    [paginationModel],
  );

  const onDeleteSingleClose = useCallback(async () => {
    toggleDialog1("");
  }, [toggleDialog1]);

  return {
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
  };
};

export default useUserList;
