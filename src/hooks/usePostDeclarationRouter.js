import { useNavigate } from "react-router-dom";
import {
  PATH_CSE,
  PATH_FRANCHISEE,
  PATH_QAMASTER,
  PATH_TECHNICIAN,
  PATH_SUPPLIER,
  PATH_CCO,
} from "../routes/paths";

const usePostDeclarationRouter = () => {
  const navigate = useNavigate();

  const declarationRouter = (role) => {
    switch (role?.toLowerCase()) {
      case "franchisee":
        navigate(PATH_FRANCHISEE.welcome);
        break;
      case "cse":
        navigate(PATH_CSE.welcome);
        break;
      case "qa":
        navigate(PATH_QAMASTER.welcome);
        break;
      case "technician":
        navigate(PATH_TECHNICIAN.welcome);
        break;
      case "supplier":
        navigate(PATH_SUPPLIER.welcome);
        break;
      case "cco":
        navigate(PATH_CCO.welcome);
        break;
      default:
        break;
    }
  };

  return declarationRouter;
};

export default usePostDeclarationRouter;
