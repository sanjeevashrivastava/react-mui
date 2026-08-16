import React, { useCallback, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { useLazyQuery } from '@apollo/client';
import UserDTO, { USER } from "../../../types/UserDTO";
import { BreadcrumbsItem } from "../../../custom-components/MyBreadcrumbs";
import UserService from "../../../services/UserService";
//import { GET_USER } from '../../../graphql/User';
type StateType = {
  dtoUser: UserDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

const INITIAL_STATE: StateType = Object.freeze({
  dtoUser: { ...USER },
  breadcrumbsItems: [
    { label: "Users", href: "/users/list" },
    { label: "View User" },
  ],
});

const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
  return { ...state, ...action };
};

const useViewUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const getData = useCallback(async (): Promise<void> => {
    const dtoUser: UserDTO = await UserService.Get(id as string);

    setState({ dtoUser: dtoUser } as StateType);
  }, [id]);

  useEffect(() => {
    if (id?.trim() !== "") {
      getData();
    }
  }, [id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      navigate("/users/edit/" + state.dtoUser.id);
    },
    [navigate, state.dtoUser.id],
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      navigate("/users/list");
    },
    [navigate],
  );
  return {
    state,
    onEditClick,
    onCancelClick,
  };
};

export default useViewUser;
