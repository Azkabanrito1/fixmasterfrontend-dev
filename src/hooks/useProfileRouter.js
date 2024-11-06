import { useNavigate } from "react-router-dom";
import {
  PATH_CSE,
  PATH_FRANCHISEE,
  PATH_QAMASTER,
  PATH_TECHNICIAN,
  PATH_SUPPLIER,
  PATH_CCO,
} from "../routes/paths";

const useProfileRouter = () => {
  const navigate = useNavigate();

  const profileRouter = (role) => {
    switch (role?.toLowerCase()) {
      case "franchisee":
        navigate(PATH_FRANCHISEE.guarantorInfo);
        break;
      case "cse":
        navigate(PATH_CSE.guarantorInfo);
        break;
      case "qa":
        navigate(PATH_QAMASTER.guarantorInfo);
        break;
      case "technician":
        navigate(PATH_TECHNICIAN.guarantorInfo);
        break;
      case "supplier":
        navigate(PATH_SUPPLIER.manageAddress);
        break;
      case "cco":
        navigate(PATH_CCO.guarantorInfo);
        break;
      default:
        break;
    }
  };

  return profileRouter;
};

export default useProfileRouter;
