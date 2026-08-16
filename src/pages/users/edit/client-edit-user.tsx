import { memo } from "react";
import eq from "lodash/eq";
import MyBreadcrumbs from "../../../custom-components/MyBreadcrumbs";
import UserEntry from "../user-entry";
import useEditUser from "./useEditUser";

const ClientEditUser = () => {
  const { state } = useEditUser();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <UserEntry />
    </>
  );
};

export default memo(ClientEditUser, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
