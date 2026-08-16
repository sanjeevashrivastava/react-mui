import { useReducer } from "react";
import { BreadcrumbsItem } from "../../../custom-components/MyBreadcrumbs";

type StateType = {
  breadcrumbsItems: BreadcrumbsItem[];
};
const INITIAL_STATE: StateType = Object.freeze({
  breadcrumbsItems: [
    { label: "Users", href: "/users/list" },
    { label: "Edit User" },
  ],
});

const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
  return { ...state, ...action };
};

const useEditUser = () => {
  const [state] = useReducer(reducer, INITIAL_STATE);

  return {
    state,
  };
};

export default useEditUser;
