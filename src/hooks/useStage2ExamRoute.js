import { useNavigate } from "react-router-dom";
import { PATH_CCO } from "../routes/paths";

const useStage2ExamRoute = () => {
  const navigate = useNavigate();
  const stage2ExamRoute = (role) => {
    switch (role.toLowerCase()) {
      case "cco": {
        navigate(PATH_CCO.stage2Exam);
        break;
      }
      default:
        break;
    }
  };
  return stage2ExamRoute;
};

export default useStage2ExamRoute;
