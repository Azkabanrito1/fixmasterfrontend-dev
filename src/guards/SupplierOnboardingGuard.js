import { Navigate, Outlet } from "react-router-dom";
import { PATH_SUPPLIER, PATH_PUBLIC } from "../routes/paths";
import { useGetStageId } from "../hooks/useQueries/useOnboarding";

const SupplierOnboardingGuard = ({ stageId }) => {
  const { data: stageData } = useGetStageId();

  if (stageData?.data?.isCompleted) {
    return <Navigate to={PATH_SUPPLIER.dashboard} />;
  } else {
    // return <Outlet />;
    if (stageId === stageData?.data?.stageId) {
      return <Outlet />;
    } else {
      switch (stageData?.data?.stageId) {
        case 1:
          return <Navigate to={PATH_SUPPLIER.welcome} />;
        case 2:
          return <Navigate to={PATH_SUPPLIER.declarations} />;
        case 3:
          return <Navigate to={PATH_SUPPLIER.profile} />;
        case 4:
          return <Navigate to={PATH_SUPPLIER.manageAddress} />;
        case 5:
          return <Navigate to={PATH_SUPPLIER.trustedCustomer} />;
        case 6:
          return <Navigate to={PATH_SUPPLIER.training} />;
        case 7:
          return <Navigate to={PATH_SUPPLIER.training} />;
        case 8:
          return <Navigate to={PATH_PUBLIC.unauthorized} />;
        case 9:
          return <Navigate to={PATH_SUPPLIER.training} />;
        case 10:
          return <Navigate to={PATH_SUPPLIER.postDeclarations} />;
        case 11:
          return <Navigate to={PATH_PUBLIC.unauthorized} />;
        case 14:
          return <Navigate to={PATH_SUPPLIER.onboardingWelcome} />;
        case 12:
          return <Navigate to={PATH_SUPPLIER.dashboard} />;
        default:
          return null;
      }
    }
  }
};

export default SupplierOnboardingGuard;
