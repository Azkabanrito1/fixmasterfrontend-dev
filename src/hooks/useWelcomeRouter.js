import { useNavigate } from "react-router-dom";
import {
  PATH_CSE,
  PATH_FRANCHISEE,
  PATH_QAMASTER,
  PATH_TECHNICIAN,
  PATH_SUPPLIER,
  PATH_CCO,
} from "../routes/paths";
import { useGetStageId } from "./useQueries/useOnboarding";

const useWelcomeRouter = () => {
  const { data: onboardingData, refetch: refetchOnboardingData } =
    useGetStageId({ staleTime: 0 });
  const navigate = useNavigate();

  const welcomeRouter = (role) => {
    const isCompleted = onboardingData?.data?.isCompleted;

    if (isCompleted) {
      navigate(getDashboardPath(role));
    } else {
      navigate(getDeclarationsPath(role));
    }
  };

  const getDashboardPath = (role) => {
    switch (role?.toLowerCase()) {
      case "franchisee":
        return PATH_FRANCHISEE.dashboard;
      case "cse":
        return PATH_CSE.dashboard;
      case "qa":
        return PATH_QAMASTER.dashboard;
      case "technician":
        return PATH_TECHNICIAN.dashboard;
      case "supplier":
        return PATH_SUPPLIER.dashboard;
      case "cco":
        return PATH_CCO.dashboard;
      default:
        return "/";
    }
  };

  const getDeclarationsPath = (role) => {
    switch (role?.toLowerCase()) {
      case "franchisee":
        return PATH_FRANCHISEE.declarations;
      case "cse":
        return PATH_CSE.declarations;
      case "qa":
        return PATH_QAMASTER.declarations;
      case "technician":
        return PATH_TECHNICIAN.declarations;
      case "supplier":
        return PATH_SUPPLIER.declarations;
      case "cco":
        return PATH_CCO.declarations;
      default:
        return "/";
    }
  };

  return { welcomeRouter, refetchOnboardingData };
};

export default useWelcomeRouter;
