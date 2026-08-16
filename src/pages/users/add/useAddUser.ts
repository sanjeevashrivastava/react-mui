import { useReducer } from "react";
import { BreadcrumbsItem } from "../../../custom-components/MyBreadcrumbs";

type StateType = {
  breadcrumbsItems: BreadcrumbsItem[];
};
const INITIAL_STATE: StateType = Object.freeze({
  breadcrumbsItems: [
    { label: "Users", href: "/users/list" },
    { label: "Add User" },
  ],
});

const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
  return { ...state, ...action };
};

const useAddUser = () => {
  const [state] = useReducer(reducer, INITIAL_STATE);

  return {
    state,
  };
};

export default useAddUser;
