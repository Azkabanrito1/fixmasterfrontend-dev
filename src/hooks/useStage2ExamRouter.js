import { useNavigate } from "react-router-dom";
import {
  PATH_CCO,
  PATH_CSE,
  PATH_PUBLIC,
  PATH_TECHNICIAN,
} from "../routes/paths";

const useStage2ExamRouter = () => {
  const navigate = useNavigate();

  const examRouter = (role) => {
    switch (role?.toLowerCase()) {
      case "cse":
        navigate(PATH_CSE.stage2Exam);
        break;
      case "technician":
        navigate(PATH_TECHNICIAN.stage2Exam);
        break;
      case "cco":
        navigate(PATH_CCO.stage2Exam);
        break;
      default:
        navigate(PATH_PUBLIC.unauthorized);
        break;
    }
  };

  return examRouter;
};

export default useStage2ExamRouter;
