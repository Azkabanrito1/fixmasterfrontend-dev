import { useNavigate } from "react-router-dom";
import {
  PATH_CCO,
  PATH_CSE,
  PATH_FRANCHISEE,
  PATH_QAMASTER,
  PATH_TECHNICIAN,
} from "../routes/paths";

const useGuarantorRouter = () => {
  const navigate = useNavigate();

  const guarantorRouter = (role) => {
    switch (role?.toLowerCase()) {
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
      case "cco":
        navigate(PATH_CCO.training);
        break;
      default:
        break;
    }
  };

  return guarantorRouter;
};

export default useGuarantorRouter;
