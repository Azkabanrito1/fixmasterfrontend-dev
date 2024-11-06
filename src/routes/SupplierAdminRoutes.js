import { Routes, Route } from "react-router-dom";
import CollaboratorsDashboard from "../components/layouts/dashboard/CollaboratorDashboard";
import AuthGuard from "../guards/AuthGuard";

const Home = () => {
  return (
    <div>
      <h1>Supplier Admin Routes</h1>
    </div>
  );
};

const SupplierAdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthGuard authRole="supplier admin" />}>
        <Route path="/" element={<CollaboratorsDashboard />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default SupplierAdminRoutes;
