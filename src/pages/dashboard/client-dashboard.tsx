import MyBreadcrumbs from "../../custom-components/MyBreadcrumbs";
import useDashboard from "./useDashboard";

const ClientDashboard = () => {
  const { state } = useDashboard();
  return <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>;
};
export default ClientDashboard;
