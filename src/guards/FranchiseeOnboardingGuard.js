import { useLocation, Navigate, Outlet } from "react-router-dom";
import { PATH_FRANCHISEE, PATH_PUBLIC } from "../routes/paths";
import { useGetStageId } from "../hooks/useQueries/useOnboarding";

const FranchiseeOnboardingGuard = ({ stageId }) => {
  const { data: stageData } = useGetStageId();

  if (stageData?.data?.isCompleted) {
    return <Navigate to={PATH_FRANCHISEE.dashboard} />;
  } else {
    if (stageId === stageData?.data?.stageId) {
      return <Outlet />;
    } else {
      switch (stageData?.data?.stageId) {
        case 1:
          return <Navigate to={PATH_FRANCHISEE.welcome} />;
        case 2:
          return <Navigate to={PATH_FRANCHISEE.declarations} />;
        case 3:
          return <Navigate to={PATH_FRANCHISEE.profile} />;
        case 4:
          return <Navigate to={PATH_FRANCHISEE.guarantorInfo} />;
        case 5:
          return <Navigate to={PATH_FRANCHISEE.training} />;
        case 6:
          return <Navigate to={PATH_FRANCHISEE.training} />;
        case 7:
          return <Navigate to={PATH_FRANCHISEE.training} />;
        case 8:
          return <Navigate to={PATH_FRANCHISEE.postDeclarations} />;
        case 9:
          return <Navigate to={PATH_PUBLIC.unauthorized} />;
        case 11:
          return <Navigate to={PATH_FRANCHISEE.onboardingWelcome} />;
        case 10:
          return <Navigate to={PATH_FRANCHISEE.dashboard} />;
        default:
          return null;
      }
    }
  }
};

export default FranchiseeOnboardingGuard;
