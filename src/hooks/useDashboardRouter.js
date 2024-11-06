import { useNavigate } from "react-router-dom";
import {
  PATH_CCO,
  PATH_CSE,
  PATH_FRANCHISEE,
  PATH_QAMASTER,
  PATH_SUPPLIER,
  PATH_TECHNICIAN,
} from "../routes/paths";

const useDashboardRouter = () => {
  const navigate = useNavigate();

  const dashboardRouter = (role) => {
    switch (role?.toLowerCase()) {
      case "franchisee":
        navigate(PATH_FRANCHISEE.welcome);
        break;
      case "cse":
        navigate(PATH_CSE.welcome);
        break;
      case "technician":
        navigate(PATH_TECHNICIAN.welcome);
        break;
      case "cco":
        navigate(PATH_CCO.welcome);
        break;
      case "supplier":
        navigate(PATH_SUPPLIER.welcome);
        break;
      case "qa":
        navigate(PATH_QAMASTER.welcome);
        break;
      default:
        break;
    }
  };
  return dashboardRouter;
};

export default useDashboardRouter;
