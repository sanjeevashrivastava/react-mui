import { memo } from "react";
import eq from "lodash/eq";
import MyBreadcrumbs from "../../../custom-components/MyBreadcrumbs";
import UserEntry from "../user-entry";
import useAddUser from "./useAddUser";

const ClientAddUser = () => {
  const { state } = useAddUser();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <UserEntry />
    </>
  );
};

export default memo(ClientAddUser, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
