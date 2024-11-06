import { Navigate, Outlet } from "react-router-dom";
import { PATH_CCO, PATH_PUBLIC } from "../routes/paths";
import { useGetStageId } from "../hooks/useQueries/useOnboarding";

const CcoOnboardingGuard = ({ stageId }) => {
  const { data: stageData } = useGetStageId();

  if (stageData?.data?.isCompleted) {
    return <Navigate to={PATH_CCO.dashboard} />;
  } else {
    if (stageId === stageData?.data?.stageId) {
      return <Outlet />;
    } else {
      switch (stageData?.data?.stageId) {
        case 1:
          return <Navigate to={PATH_CCO.stage2ExamWelcome} />;
        case 3:
          return <Navigate to={PATH_CCO.startInterview} />;
        case 4:
          return <Navigate to={PATH_PUBLIC.unauthorized} />;
        case 5:
          return <Navigate to={PATH_PUBLIC.awaitingApproval} />;
        case 6:
          return <Navigate to={PATH_CCO.welcome} />;
        case 2:
          return <Navigate to={PATH_CCO.declarations} />;
        case 7:
          return <Navigate to={PATH_PUBLIC.unauthorized} />;
        case 8:
          return <Navigate to={PATH_CCO.profile} />;
        case 9:
          return <Navigate to={PATH_CCO.guarantorInfo} />;
        case 10:
          return <Navigate to={PATH_CCO.training} />;
        case 11:
          return <Navigate to={PATH_CCO.training} />;
        case 12:
          return <Navigate to={PATH_CCO.training} />;
        case 13:
          return <Navigate to={PATH_CCO.postDeclarations} />;
        case 17:
          return <Navigate to={PATH_CCO.onboardingWelcome} />;
        case 14:
          return <Navigate to={PATH_PUBLIC.unauthorized} />;
        case 15:
          return <Navigate to={PATH_CCO.dashboard} />;
        default:
          return null;
      }
    }
  }
};

export default CcoOnboardingGuard;
