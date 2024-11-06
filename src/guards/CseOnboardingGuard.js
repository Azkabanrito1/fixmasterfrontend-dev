// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import { PATH_CSE } from "../routes/paths";

// const CseOnboardingGuard = ({ stageId, stageCategory }) => {
//   let loginDetails = localStorage.getItem("loginDetails");
//   if (loginDetails) loginDetails = JSON.parse(loginDetails);
//   const location = useLocation();

//   const onboarding = loginDetails?.onboarding;
//   const stageRouter = () => {
//     switch (onboarding.stageId) {
//       case 2:
//         return PATH_CSE.csewelcome;
//       case 1:
//         return PATH_CSE.declarations;
//       case 2:
//         return PATH_CSE.profile;
//       case 3:
//         return PATH_CSE.guarantorInformation;
//       case 4:
//         return PATH_CSE.training;
//     }
//   };

//   const to = stageRouter();

//   if (!onboarding.isCompleted) {
//     if (onboarding.stageId === stageId) {
//       return <Outlet />;
//     } else if (
//       onboarding.stageId !== stageId ||
//       stageCategory !== "onboarding"
//     ) {
//       return <Navigate to={to} />;
//     }
//   } else {
//     if (stageCategory === "complete") {
//       return <Outlet />;
//     } else {
//       return (
//         <Navigate to={PATH_CSE.dashboard} state={{ from: location }} replace />
//       );
//     }
//   }

//   return <Outlet />;
// };

// export default CseOnboardingGuard;

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { PATH_CSE, PATH_PUBLIC } from "../routes/paths";
import { useGetStageId } from "../hooks/useQueries/useOnboarding";

const CseOnboardingGuard = ({ stageId }) => {
  const { data: stageData } = useGetStageId();

  if (stageData?.data?.isCompleted) {
    return <Navigate to={PATH_CSE.dashboard} />;
  } else {
    if (stageId === stageData?.data?.stageId) {
      return <Outlet />;
    } else {
      switch (stageData?.data?.stageId) {
        case 1:
          return <Navigate to={PATH_PUBLIC.awaitingApproval} />;
        case 2:
          return <Navigate to={PATH_CSE.stage2ExamWelcome} />;
        case 3:
          return <Navigate to={PATH_PUBLIC.unauthorized} />;
        case 4:
          return <Navigate to={PATH_PUBLIC.unauthorized} />;
        case 5:
          return <Navigate to={PATH_CSE.startInterview} />;
        case 6:
          return <Navigate to={PATH_PUBLIC.awaitingApproval} />;
        case 7:
          return <Navigate to={PATH_PUBLIC.unauthorized} />;
        case 8:
          return <Navigate to={PATH_CSE.welcome} />;
        case 19:
          return <Navigate to={PATH_CSE.declarations} />;
        case 9:
          return <Navigate to={PATH_CSE.profile} />;
        case 10:
          return <Navigate to={PATH_CSE.guarantorInfo} />;
        case 11:
          return <Navigate to={PATH_CSE.training} />;
        case 12:
          return <Navigate to={PATH_CSE.training} />;
        case 14:
          return <Navigate to={PATH_CSE.training} />;
        case 13:
          return <Navigate to={PATH_PUBLIC.unauthorized} />;
        case 15:
          return <Navigate to={PATH_CSE.postDeclarations} />;
        case 18:
          return <Navigate to={PATH_CSE.onboardingWelcome} />;
        case 17:
          return <Navigate to={PATH_CSE.dashboard} />;
        default:
          return null;
      }
    }
  }
};

export default CseOnboardingGuard;
