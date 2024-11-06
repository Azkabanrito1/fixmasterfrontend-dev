import { useLocation, Navigate, Outlet } from "react-router-dom";
import { PATH_QAMASTER, PATH_PUBLIC } from "../routes/paths";
import { useGetStageId } from "../hooks/useQueries/useOnboarding";

const QaMasterOnboardingGuard = ({ stageId }) => {
  const { data: stageData } = useGetStageId();

  if (stageData?.data?.isCompleted) {
    return <Navigate to={PATH_QAMASTER.dashboard} />;
  } else {
    if (stageId === stageData?.data?.stageId) {
      return <Outlet />;
    } else {
      switch (stageData?.data?.stageId) {
        case 1:
          return <Navigate to={PATH_QAMASTER.welcome} />;
        case 2:
          return <Navigate to={PATH_QAMASTER.declarations} />;
        case 3:
          return <Navigate to={PATH_QAMASTER.profile} />;
        case 4:
          return <Navigate to={PATH_QAMASTER.guarantorInfo} />;
        case 5:
          return <Navigate to={PATH_QAMASTER.training} />;
        case 6:
          return <Navigate to={PATH_QAMASTER.training} />;
        case 7:
          return <Navigate to={PATH_QAMASTER.training} />;
        case 8:
          return <Navigate to={PATH_QAMASTER.postDeclarations} />;
        case 9:
          return <Navigate to={PATH_PUBLIC.unauthorized} />;
        case 11:
          return <Navigate to={PATH_QAMASTER.onboardingWelcome} />;
        case 10:
          return <Navigate to={PATH_QAMASTER.dashboard} />;
        default:
          return null;
      }
    }
  }
};

export default QaMasterOnboardingGuard;
