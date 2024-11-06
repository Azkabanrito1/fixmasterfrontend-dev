import { useNavigate } from "react-router-dom";
import {
  PATH_CSE,
  PATH_FRANCHISEE,
  PATH_QAMASTER,
  PATH_TECHNICIAN,
  PATH_SUPPLIER,
  PATH_CCO,
} from "../routes/paths";

const useRouteToMaterials = () => {
  const navigate = useNavigate();

  const returnToMaterials = (role) => {
    switch (role.toLowerCase()) {
      case "franchisee":
        navigate(PATH_FRANCHISEE.training);
        break;
      case "cse":
        navigate(PATH_CSE.training);
        break;
      case "qa":
        navigate(PATH_QAMASTER.training);
        break;
      case "technician":
        navigate(PATH_TECHNICIAN.training);
        break;
      case "supplier":
        navigate(PATH_SUPPLIER.training);
        break;
      case "cco":
        navigate(PATH_CCO.training);
        break;
      default:
        break;
    }
  };

  return returnToMaterials;
};

export default useRouteToMaterials;
