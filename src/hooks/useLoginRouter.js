import { useNavigate } from "react-router-dom";
import {
  PATH_ADMIN,
  PATH_CCO,
  PATH_CSE,
  PATH_CSEADMIN,
  PATH_CUSADMIN,
  PATH_CUSTOMER,
  PATH_FRANCHISEE,
  PATH_HRADMIN,
  PATH_PUBLIC,
  PATH_QAMASTER,
  PATH_SUPPLIER,
  PATH_SUPADMIN,
  PATH_TECHADMIN,
  PATH_TECHNICIAN,
} from "../routes/paths";

const useLoginRouter = () => {
  const navigate = useNavigate();

  const loginRouter = (user) => {
    const role = user?.role?.toLowerCase();
    const stageId = user?.onboarding?.stageId;
    const isCompleted = user?.onboarding?.isCompleted;

    switch (role) {
      case "customer":
        navigate(PATH_CUSTOMER.dashboard);
        break;
      case "franchisee":
        if (isCompleted) {
          navigate(PATH_FRANCHISEE.dashboard);
        } else {
          navigate(getFranchiseePath(stageId));
        }
        break;
      case "cse":
        if (isCompleted) {
          navigate(PATH_CSE.dashboard);
        } else {
          navigate(getCsePath(stageId));
        }
        break;
      case "qa":
        if (isCompleted) {
          navigate(PATH_QAMASTER.dashboard);
        } else {
          navigate(getQaPath(stageId));
        }
        break;
      case "supplier":
        if (isCompleted) {
          navigate(PATH_SUPPLIER.dashboard);
        } else {
          navigate(getSupplierPath(stageId));
        }
        break;
      case "technician":
        if (isCompleted) {
          navigate(PATH_TECHNICIAN.dashboard);
        } else {
          navigate(getTechnicianPath(stageId));
        }
        break;
      case "cco":
        if (isCompleted) {
          navigate(PATH_CCO.dashboard);
        } else {
          navigate(getCcoPath(stageId));
        }
        break;
      // ===============admin users =============================
      case "customer admin":
        navigate(PATH_CUSADMIN.dashboard);
        break;
      case "cse admin":
        navigate(PATH_CSEADMIN.dashboard);
        break;
      case "technician admin":
        navigate(PATH_TECHADMIN.dashboard);
        break;
      case "suppplier admin":
        navigate(PATH_SUPADMIN.dashboard);
        break;
      case "hr admin":
        navigate(PATH_HRADMIN.dashboard);
        break;
      case "super admin":
        navigate(PATH_ADMIN.dashboard);
        break;
      default:
        navigate(PATH_CUSTOMER.dashboard);
        break;
    }
  };

  const getFranchiseePath = (stageId) => {
    switch (stageId) {
      case 1:
        return PATH_FRANCHISEE.welcome;
      case 2:
        return PATH_FRANCHISEE.declarations;
      case 3:
        return PATH_FRANCHISEE.profile;
      case 4:
        return PATH_FRANCHISEE.guarantorInfo;
      case 5:
        return PATH_FRANCHISEE.training;
      case 6:
        return PATH_FRANCHISEE.training;
      case 7:
        return PATH_FRANCHISEE.training;
      case 8:
        return PATH_FRANCHISEE.postDeclarations;
      case 9:
        return PATH_PUBLIC.unauthorized;
      case 11:
        return PATH_FRANCHISEE.onboardingWelcome;
      case 10:
        return PATH_FRANCHISEE.dashboard;
      default:
        return PATH_PUBLIC.awaitingApproval;
    }
  };

  const getCsePath = (stageId) => {
    switch (stageId) {
      case 2:
        return PATH_CSE.stage2ExamWelcome;
      case 3:
        return PATH_PUBLIC.unauthorized;
      case 4:
        return PATH_PUBLIC.unauthorized;
      case 5:
        return PATH_CSE.startInterview;
      case 7:
        return PATH_PUBLIC.unauthorized;
      case 8:
        return PATH_CSE.welcome;
      case 19:
        return PATH_CSE.declarations;
      case 9:
        return PATH_CSE.profile;
      case 10:
        return PATH_CSE.guarantorInfo;
      case 11:
        return PATH_CSE.training;
      case 12:
        return PATH_CSE.training;
      case 14:
        return PATH_CSE.training;
      case 13:
        return PATH_PUBLIC.unauthorized;
      case 15:
        return PATH_CSE.postDeclarations;
      case 18:
        return PATH_CSE.onboardingWelcome;
      case 17:
        return PATH_CSE.dashboard;
      default:
        return PATH_PUBLIC.awaitingApproval;
    }
  };

  const getQaPath = (stageId) => {
    switch (stageId) {
      case 1:
        return PATH_QAMASTER.welcome;
      case 2:
        return PATH_QAMASTER.declarations;
      case 3:
        return PATH_QAMASTER.profile;
      case 4:
        return PATH_QAMASTER.guarantorInfo;
      case 5:
        return PATH_QAMASTER.training;
      case 6:
        return PATH_QAMASTER.training;
      case 7:
        return PATH_QAMASTER.training;
      case 8:
        return PATH_QAMASTER.postDeclarations;
      case 9:
        return PATH_PUBLIC.unauthorized;
      case 11:
        return PATH_QAMASTER.onboardingWelcome;
      case 10:
        return PATH_QAMASTER.dashboard;
      default:
        return PATH_PUBLIC.awaitingApproval;
    }
  };

  const getSupplierPath = (stageId) => {
    switch (stageId) {
      case 1:
        return PATH_SUPPLIER.welcome;
      case 2:
        return PATH_SUPPLIER.declarations;
      case 3:
        return PATH_SUPPLIER.profile;
      case 4:
        return PATH_SUPPLIER.manageAddress;
      case 5:
        return PATH_SUPPLIER.trustedCustomer;
      case 6:
        return PATH_SUPPLIER.training;
      case 7:
        return PATH_SUPPLIER.training;
      case 8:
        return PATH_PUBLIC.unauthorized;
      case 9:
        return PATH_PUBLIC.training;
      case 10:
        return PATH_SUPPLIER.postDeclarations;
      case 11:
        return PATH_PUBLIC.unauthorized;
      case 14:
        return PATH_SUPPLIER.onboardingWelcome;
      case 12:
        return PATH_SUPPLIER.dashboard;
      default:
        return PATH_PUBLIC.awaitingApproval;
    }
  };

  const getCcoPath = (stageId) => {
    switch (stageId) {
      case 1:
        return PATH_CCO.stage2ExamWelcome;
      case 3:
        return PATH_CCO.startInterview;
      case 4:
        return PATH_PUBLIC.unauthorized;
      case 6:
        return PATH_CCO.welcome;
      case 2:
        return PATH_CCO.declarations;
      case 7:
        return PATH_PUBLIC.unauthorized;
      case 8:
        return PATH_CCO.profile;
      case 9:
        return PATH_CCO.guarantorInfo;
      case 10:
        return PATH_CCO.training;
      case 11:
        return PATH_CCO.training;
      case 12:
        return PATH_CCO.training;
      case 13:
        return PATH_CCO.postDeclarations;
      case 17:
        return PATH_CCO.onboardingWelcome;
      case 14:
        return PATH_PUBLIC.unauthorized;
      case 15:
        return PATH_CCO.dashboard;
      default:
        return PATH_PUBLIC.awaitingApproval;
    }
  };

  const getTechnicianPath = (stageId) => {
    switch (stageId) {
      case 2:
        return PATH_TECHNICIAN.stage2ExamWelcome;
      case 4:
        return PATH_PUBLIC.unauthorized;
      case 6:
        return PATH_TECHNICIAN.welcome;
      case 7:
        return PATH_PUBLIC.unauthorized;
      case 8:
        return PATH_TECHNICIAN.declarations;
      case 9:
        return PATH_TECHNICIAN.profile;
      case 10:
        return PATH_TECHNICIAN.guarantorInfo;
      case 11:
        return PATH_TECHNICIAN.training;
      case 12:
        return PATH_TECHNICIAN.training;
      case 13:
        return PATH_TECHNICIAN.training;
      case 14:
        return PATH_PUBLIC.unauthorized;
      case 15:
        return PATH_PUBLIC.training;
      case 16:
        return PATH_TECHNICIAN.postDeclarations;
      case 17:
        return PATH_PUBLIC.unauthorized;
      case 18:
        return PATH_TECHNICIAN.dashboard;
      case 19:
        return PATH_TECHNICIAN.onboardingWelcome;
      default:
        return PATH_PUBLIC.awaitingApproval;
    }
  };

  return loginRouter;
};

export default useLoginRouter;
