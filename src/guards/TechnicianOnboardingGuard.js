import { Navigate, Outlet } from "react-router-dom";
import { PATH_TECHNICIAN, PATH_PUBLIC } from "../routes/paths";
import { useGetStageId } from "../hooks/useQueries/useOnboarding";

const TechnicianOnboardingGuard = ({ stageId }) => {
  const { data: stageData } = useGetStageId();

  if (stageData?.data?.isCompleted) {
    return <Navigate to={PATH_TECHNICIAN.dashboard} />;
  } else {
    if (stageId === stageData?.data?.stageId) {
      return <Outlet />;
    } else {
      switch (stageData?.data?.stageId) {
        case 1:
          return <Navigate to={PATH_PUBLIC.awaitingApproval} />;
        case 2:
          return <Navigate to={PATH_TECHNICIAN.stage2ExamWelcome} />;
        case 3:
          return <Navigate to={PATH_PUBLIC.awaitingApproval} />;
        case 4:
          return <Navigate to={PATH_PUBLIC.unauthorized} />;
        case 5:
          return <Navigate to={PATH_PUBLIC.awaitingApproval} />;
        case 6:
          return <Navigate to={PATH_TECHNICIAN.welcome} />;
        case 7:
          return <Navigate to={PATH_PUBLIC.unauthorized} />;
        case 8:
          return <Navigate to={PATH_TECHNICIAN.declarations} />;
        case 9:
          return <Navigate to={PATH_TECHNICIAN.profile} />;
        case 10:
          return <Navigate to={PATH_TECHNICIAN.guarantorInfo} />;
        case 11:
          return <Navigate to={PATH_TECHNICIAN.training} />;
        case 12:
          return <Navigate to={PATH_TECHNICIAN.training} />;
        case 13:
          return <Navigate to={PATH_TECHNICIAN.training} />;
        case 14:
          return <Navigate to={PATH_PUBLIC.unauthorized} />;
        case 15:
          return <Navigate to={PATH_TECHNICIAN.training} />;
        case 16:
          return <Navigate to={PATH_TECHNICIAN.postDeclarations} />;
        case 17:
          return <Navigate to={PATH_PUBLIC.unauthorized} />;
        case 18:
          return <Navigate to={PATH_TECHNICIAN.dashboard} />;
        case 19:
          return <Navigate to={PATH_TECHNICIAN.onboardingWelcome} />;
        default:
          return null;
      }
    }
  }
};

export default TechnicianOnboardingGuard;
