import { useNavigate } from "react-router-dom";
import {
  PATH_CSE,
  PATH_FRANCHISEE,
  PATH_QAMASTER,
  PATH_TECHNICIAN,
  PATH_SUPPLIER,
  PATH_CCO,
} from "../routes/paths";

const useDeclarationRouter = () => {
  const navigate = useNavigate();

  const declarationRouter = (role) => {
    switch (role?.toLowerCase()) {
      case "franchisee":
        navigate(PATH_FRANCHISEE.profile);
        break;
      case "cse":
        navigate(PATH_CSE.profile);
        break;
      case "qa":
        navigate(PATH_QAMASTER.profile);
        break;
      case "technician":
        navigate(PATH_TECHNICIAN.profile);
        break;
      case "supplier":
        navigate(PATH_SUPPLIER.profile);
        break;
      case "cco":
        navigate(PATH_CCO.profile);
        break;
      default:
        break;
    }
  };

  return declarationRouter;
};

export default useDeclarationRouter;
