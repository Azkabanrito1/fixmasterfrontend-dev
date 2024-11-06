import { Routes, Route } from "react-router-dom";
import CollaboratorsDashboard from "../components/layouts/dashboard/CollaboratorDashboard";
import DasboardContent from "../pages/cse/dasboard/DasboardContent";
import CustomerManagementHome from "../pages/admin/usermanagement/customer/CustomerManagementHome";
import CustomerLogDetails from "../pages/admin/usermanagement/customer/CustomerLogDetails";
import IndividualCustomers from "../pages/admin/usermanagement/customer/Customers";
import CustomerAdminHome from "../pages/admin/usermanagement/customer-admin/CustomerAdminHome";
import ConfigureSubscription from "../pages/admin/subscriptions/ConfigureSubscription";
import AuthGuard from "../guards/AuthGuard";
import PromosHome from "../pages/admin/promos/PromosHome";
import CreatePromo from "../pages/admin/promos/CreatePromo";
import SubSettingsHome from "../pages/admin/subscriptions/SubSettingsHome";
import ViewSubscribers from "../pages/admin/subscriptions/ViewSubscribers";
import CommentToMgmt from "../components/hrcomponents/dashboard/CommentToMgmt";

const CustomerAdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthGuard authRole="customer admin" />}>
        <Route path="/" element={<CollaboratorsDashboard />}>
          <Route index element={<CustomerAdminHome />} />
          <Route path="dashboard" element={<CustomerAdminHome />} />
          <Route path="user-mgmt">
            <Route
              index
              element={<CustomerManagementHome customerAdmin={true} />}
            />
            <Route path="individual" element={<IndividualCustomers />} />
            <Route path="corporate/:type" element={<IndividualCustomers />} />
            <Route path="log" element={<CustomerLogDetails />} />
          </Route>
          <Route path="promos">
            <Route index element={<PromosHome />} />
            <Route path="create" element={<CreatePromo />} />
          </Route>
          <Route path="subscription">
            <Route index element={<SubSettingsHome />} />
            <Route
              path="view-subscribers/:subId"
              element={<ViewSubscribers />}
            />
          </Route>
          <Route
            path="comment-to-management"
            element={<CommentToMgmt rowNumber={20} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default CustomerAdminRoutes;
