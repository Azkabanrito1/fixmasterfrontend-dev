import { Outlet } from "react-router-dom";
import Header from "./CollaboratorDashboardHeader";

const PreDashboard = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default PreDashboard;
