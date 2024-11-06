import { useNavigate } from "react-router-dom";
import { PATH_CCO, PATH_CSE, PATH_PUBLIC } from "../routes/paths";

const useInterviewRouter = () => {
  const navigate = useNavigate();

  const interviewRouter = (role) => {
    switch (role?.toLowerCase()) {
      case "cse":
        navigate(PATH_CSE.interview);
        break;
      case "cco":
        navigate(PATH_CCO.interview);
        break;
      default:
        navigate(PATH_PUBLIC.unauthorized);
        break;
    }
  };
  return interviewRouter;
};

export default useInterviewRouter;
