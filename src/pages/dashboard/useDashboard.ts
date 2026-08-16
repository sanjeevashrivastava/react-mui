import { useReducer } from "react";
import { BreadcrumbsItem } from "../../custom-components/MyBreadcrumbs";

type StateType = {
  breadcrumbsItems: BreadcrumbsItem[];
};
const INITIAL_STATE: StateType = Object.freeze({
  breadcrumbsItems: [{ label: "Dashboard" }],
});

const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
  return { ...state, ...action };
};

const useDashboard = () => {
  const [state] = useReducer(reducer, INITIAL_STATE);

  return {
    state,
  };
};

export default useDashboard;
