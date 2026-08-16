import CustomerLayout from "../layouts/customer-layout/CustomerLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/client-dashboard";
import Users from "../pages/users/list/client-user-list";
import AddUser from "../pages/users/add/client-add-user";
import EditUser from "../pages/users/edit/client-edit-user";
import ViewUser from "../pages/users/view/client-view-user";
import NoMatch from "../pages/NoMatch";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route path={"/"} element={<Users />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/users/list"} element={<Users />} />
        <Route path={"/users/add"} element={<AddUser />} />
        <Route path={"/users/edit/:id"} element={<EditUser />} />
        <Route path={"/users/view/:id"} element={<ViewUser />} />
      </Route>
      <Route path="*" element={<NoMatch />}></Route>
    </Routes>
  </BrowserRouter>
);
export default Router;
