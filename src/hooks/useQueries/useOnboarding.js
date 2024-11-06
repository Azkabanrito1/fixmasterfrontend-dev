import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosOnboarding from "../../config/axios/axiosOnboarding";
import onboarding from "../../config/endpoints/onboarding";
import axios from "axios";

// ======================COLLABORATOR ONBOARDING======================
export const useApproveCollaboratorOnboarding = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId) =>
      axiosOnboarding.post(
        `${onboarding.admin.approveCollaboratorOnboarding}${userId}`
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("final-discussion");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

// ======================QA======================
export const useGetQaApplicants = (options) =>
  useQuery(
    "franchisee-qa-applicants",
    () => axiosOnboarding.get(onboarding.admin.getQaApplicants),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useApproveQaApplication = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (acceptApplicant) =>
      axiosOnboarding.post(
        `${onboarding.admin.approveQaApplication}?applicantId=${acceptApplicant.id}`
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("qa-applicants");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useRejectQaApplication = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (rejectApplicant) =>
      axiosOnboarding.post(
        `${onboarding.admin.rejectQaApplicant}?applicantId=${rejectApplicant.id}`
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("qa-applicants");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetQaDiscussionStage = (options) =>
  useQuery(
    "qa-discussion-stage",
    () => axiosOnboarding.get(onboarding.admin.getQaForDiscussion),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useQaDiscussionDate = (onSuccess, onFailed) => {
  const queryClient = new useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(
        `${onboarding.admin.setDiscussionDateForQA}`,
        payload
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("qa-discussion-stage");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetQaForFinalApproval = (options) =>
  useQuery(
    "final-discussion",
    () => axiosOnboarding.get(onboarding.admin.getQaForFinalApproval),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

// =======================CSE=====================
export const useCSEApplicationAuth = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.cse.authAppication, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useCreateCseByAdmin = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.admin.createCseByAdmin, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useCSEApplication = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.cse.appication, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

// =====================FRANCHISEE==================

export const useGetFranchiseeApplicants = (options) =>
  useQuery(
    "franchisee-qa-applicants",
    () => axiosOnboarding.get(onboarding.admin.getFranchiseeApplicants),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useApproveFranchiseeAndQaApplication = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.franchisee.approveFranchisee, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("franchisee-qa-applicants");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useRejectFranchiseeAndQaApplication = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(
        onboarding.franchisee.rejectFranchisee,
        payload //THERES NO FRANCHISEE REJECTION ENDPOINT
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("franchisee-applicants");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useFranchiseeApplicationAuth = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.franchisee.authApplication, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useCreateFranchiseeByAdmin = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.admin.createFranchiseeByAdmin, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useFranchiseeApplication = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.franchisee.application, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data?.data);
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetAllCSEApplicants = (options) =>
  useQuery(
    "cse-first-stage-applicants",
    () => axiosOnboarding.get(onboarding.cse.cseAllStages),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetCSESecondApplicants = (options) =>
  useQuery(
    "cse-second-stage-applicants",
    () => axiosOnboarding.get(onboarding.cse.cseSecondStages),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetCSEThirdStageApplicants = (options) =>
  useQuery(
    "cse-third-stage-applicants",
    () => axiosOnboarding.get(onboarding.cse.getCSEThirdStageApplication),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetCSESecondMcq = (options) =>
  useQuery(
    "cse-fourth-stage-applicants",
    () => axiosOnboarding.get(onboarding.cse.getCseFinalMcq),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetCSEFifthStageApplicants = (options) =>
  useQuery(
    "cse-fifth-stage-applicants",
    () => axiosOnboarding.get(onboarding.cse.getCSEFifthStage),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useApproveCSEFirstStage = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (appId) =>
      axiosOnboarding.post(`${onboarding.cse.approveCSEApplication}${appId}`),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("cse-all-applicants");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useCseDiscussionDate = (onSuccess, onFailed) => {
  const queryClient = new useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.cse.setDiscussionDate, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("cse-last-stage");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGradeCSEInterview = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(`${onboarding.cse.gradeCSEThirdStage}`, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("cse-third-stage-applicants");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useApproveCSEFifthStage = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cseId) =>
      axiosOnboarding.post(`${onboarding.cse.approveCSEFifthStage}${cseId}`),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("cse-fifth-stage-applicants");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useRejectCSEFifthStage = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.cse.rejectCSEFifthStage, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("cse-fifth-stage-applicants");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useSetCSEFifthStageInterview = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(
        `${onboarding.cse.createCSEFifthStageInterview}`,
        payload
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("cse-fifth-stage-applicants");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetCSEThirdStageRatingCriteria = (options) =>
  useQuery(
    "cse-third-stage-rating-criteria",
    () => axiosOnboarding.get(onboarding.cse.getCSEThirstStageRating),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetCseFinalMcqResult = (cseId, options) =>
  useQuery(
    ["cse-mcq-result", cseId],
    () =>
      axiosOnboarding.get(`${onboarding.cse.getCseFinalMcqUserById}${cseId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetCseInterviewById = (cseId, options) =>
  useQuery(
    ["cse-interview-video", cseId],
    () =>
      axiosOnboarding.get(
        `${onboarding.franchisee.getCseInterviewVideos}${cseId}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useRejectionCseApplication = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.cse.rejectFirstStage, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("cse-all-applicants");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetFranchiseeAndQaStageTwo = (role, options) =>
  useQuery(
    ["rate-collaborator", role],
    () =>
      axiosOnboarding.get(
        `${onboarding.admin.getFranchiseeAndQaStage2}${role}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );
// =====================ADMIN==================
export const useAcceptFranchisee = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (appId) =>
      axiosOnboarding.post(
        `${onboarding.franchisee.approveFranchisee}${appId}`
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("franchisee-applicants");
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useViewApplication = (roleTypes, ApplicantId, options) =>
  useQuery(
    "view-application",
    () =>
      axiosOnboarding.get(
        `${onboarding.admin.viewApplication}?roleTypes=${roleTypes}&ApplicantId=${ApplicantId}`
      ),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetSupplierApplicants = (options) =>
  useQuery(
    "supplier-applicants",
    () => axiosOnboarding.get(onboarding.admin.getSupplierApplicants),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useApproveSupplier = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (acceptApplicant) =>
      axiosOnboarding.post(
        `${onboarding.admin.approveSupplierApplication}${acceptApplicant.id}`
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("supplier-applicants");
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useRejectSupplier = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (rejectApplicant) =>
      axiosOnboarding.post(
        `${onboarding.admin.rejectSupplierApplication}${rejectApplicant.id}`
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("supplier-applicants");
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetSupplierDiscussionStage = (options) =>
  useQuery(
    "supplier-discussion-stage",
    () => axiosOnboarding.get(onboarding.admin.getSupplierForDiscussion),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useSupplierDiscussionDate = (onSuccess, onFailed) => {
  const queryClient = new useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(
        `${onboarding.admin.setDiscussionDateBySupplier}`,
        payload
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("qa-franchisee-supplier-mcqss");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetFinalSupplier = (options) =>
  useQuery(
    "final-discussion",
    () => axiosOnboarding.get(onboarding.admin.getSupplierForFinalApproval),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetCCOApplicants = (options) =>
  useQuery(
    "cco-applicants",
    () => axiosOnboarding.get(onboarding.admin.getCCOApplicants),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useApproveCCO = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (appId) =>
      axiosOnboarding.post(`${onboarding.admin.approveCCOApplication}${appId}`),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("cco-applicants");
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useRejectCCO = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (appId) =>
      axiosOnboarding.post(`${onboarding.admin.rejectCCOApplication}${appId}`),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("cco-applicants");
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
export const useGetCCOSecondApplicants = (options) =>
  useQuery(
    "cco-all-applicants",
    () => axiosOnboarding.get(onboarding.admin.getCcoFirstMcq),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetCCODiscussionStage = (options) =>
  useQuery(
    "cco-discussion-stage",
    () => axiosOnboarding.get(onboarding.admin.getCCOforDiscussion),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useSetCCODiscussionDate = (onSuccess, onFailed) => {
  const queryClient = new useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(`${onboarding.admin.setCCODiscussionDate}`, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("qa-discussion-stage");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetCCOThirdStageApplicants = (options) =>
  useQuery(
    "cco-interview-stage",
    () => axiosOnboarding.get(onboarding.admin.getCCOInterviewStage),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useCCODiscussionDate = (onSuccess, onFailed) => {
  const queryClient = new useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.admin.setCCODiscussionDate, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("cco-discussion-stage");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
export const useGetCCOSecondMcq = (options) =>
  useQuery(
    "cco-fourth-stage-applicants",
    () => axiosOnboarding.get(onboarding.admin.getCCOSecondMcq),
    {
      select: (data) => data?.data,
      ...options,
    }
  );
export const useGetCCOFinalMcqResult = (ccoId, options) =>
  useQuery(
    ["cco-mcq-result", ccoId],
    () => axiosOnboarding.get(`${onboarding.admin.getCCOSecondMcq}/${ccoId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetRejectedCollaborators = (role, type, options) =>
  useQuery(
    ["rejected-collaborators", role, type],
    () =>
      axiosOnboarding.get(
        `${onboarding.admin.rejectedCollaborators}?Role=${role}&type=${type}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useApproveCCOFifthStage = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ccoId) =>
      axiosOnboarding.post(
        `${onboarding.admin.approveCollaboratorOnboarding}${ccoId}`
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("cco-fifth-stage-applicants");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetCCOFifthStageApplicants = (options) =>
  useQuery(
    "cco-fifth-stage-applicants",
    () => axiosOnboarding.get(onboarding.admin.getCCOFifthStage),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useRejectCollaboratorFinalStage = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(
        onboarding.admin.rejectCollaboratorOnboarding,
        payload
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("collaborator-final-stage");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGradeApplicantInterview = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.admin.gradeApplicantInterview, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("collaborator-final-stage");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

// =====================VALUES==================
export const useCollaborTokenVerification = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (token) =>
      axiosOnboarding.post(`${onboarding.values.verifyToken}${token}`),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful) {
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGuarantorInfoSubmit = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.values.createGuaratorInfo, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
        queryClient.invalidateQueries("guarantor-info");
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGuarantorInfoUpdate = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ guarantorId, payload }) =>
      axiosOnboarding.post(
        `${onboarding.values.updateGuaratorInfo}?id=${guarantorId}`,
        payload
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
        queryClient.invalidateQueries("guarantor-info");
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetGuarantorInfo = (options) =>
  useQuery(
    "guarantor-info",
    () => axiosOnboarding.get(onboarding.values.getGuaratorInfo),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetQualifications = (options) =>
  useQuery(
    "academic-qualifications",
    () => axiosOnboarding.get(onboarding.values.qualifications),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetLanguage = (options) =>
  useQuery(
    "languages",
    () => axiosOnboarding.get(`${onboarding.values.getLanguage}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetCategories = (options) =>
  useQuery(
    "category",
    () => axiosOnboarding.get(`${onboarding.values.getCategories}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetSubCategories = (categoryId, options) =>
  useQuery(
    ["sub-categories", categoryId],
    () =>
      axiosOnboarding.get(
        `${onboarding.values.getSubCategories}/${categoryId}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetStageId = (options) =>
  useQuery(
    "stage-details",
    () => axiosOnboarding.get(`${onboarding.values.getStageId}`),
    {
      cacheTime: 0,
      staleTime: 0,
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetBankNames = (options) =>
  useQuery("nigeria-banks", () => axios.get(onboarding.values.getBankNames), {
    select: (data) => data?.data,
    ...options,
  });

export const useUpdateCreateCollaboratorBankAccount = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bankId) =>
      axiosOnboarding.put(`${onboarding.values.setDefaultCard}${bankId}`),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
        queryClient.invalidateQueries("bank-details");
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
export const useDeleteCollaboratorBankAccount = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bankId) =>
      axiosOnboarding.put(`${onboarding.values.deletBankAccount}${bankId}`),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
        queryClient.invalidateQueries("bank-details");
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetCollaboratorRating = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.admin.rateCollaborator, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGradeCCoApplicant = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.admin.gradeCcoApplicant, payload),
    onSuccess: (data) => {
      if (data?.data?.status?.toLowerCase() === "success") {
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
//===================Course=======================
export const useGetTestTypeByStageId = (stageId, options) =>
  useQuery(
    ["test-type", stageId],
    () =>
      axiosOnboarding.get(`${onboarding.course.getFolderByStageId}${stageId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetTrainingFolder = (testTypeId, options) =>
  useQuery(
    ["folders", testTypeId],
    () =>
      axiosOnboarding.get(
        `${onboarding.course.getTrainingFolders}${testTypeId}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetMcq = (folderId, options) =>
  useQuery(
    ["test-questions", folderId],
    () =>
      axiosOnboarding.get(`${onboarding.course.getTestQuestions}${folderId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetMcqQuestions = (testTypeId, options) =>
  useQuery(
    ["general-mcq-questions", testTypeId],
    () =>
      axiosOnboarding.get(
        `${onboarding.course.getAptitudeQuestions}${testTypeId}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetTrainingInterviewQuestions = (testTypeId, options) =>
  useQuery(
    ["offline-interview-questions", testTypeId],
    () =>
      axiosOnboarding.get(
        `${onboarding.course.getTrainingInterviewQuestions}${testTypeId}&isFirstQuestion=true`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useSubmitMCQAnswer = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.course.submitTestQuestions, payload),
    onSuccess: (data) => {
      if (data?.data && data?.data?.status?.toLowerCase() === "success") {
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useSubmitInterviewAnswers = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.course.submitInterviewQuestions, payload),
    onSuccess: (data) => {
      if (data?.data) {
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetInterviewQuestion = (folderId, options) =>
  useQuery(
    "interview-foldeId",
    () =>
      axiosOnboarding.get(
        `${onboarding.course.getInterviewQuestions}${folderId}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetCourses = (folderId, options) =>
  useQuery(
    ["courses", folderId],
    () => axiosOnboarding.get(`${onboarding.course.getCourses}${folderId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

// ==========================Technician=========================

export const useTechnicianApplication = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.technician.application, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data?.data);
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useCreateTechnicianByAdmin = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.admin.createTechnicianByAdmin, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data?.data);
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetTechnicianApplicantStageOne = (options) =>
  useQuery(
    "technician-applicants",
    () =>
      axiosOnboarding.get(onboarding.qamaster.getTechnicianApplicantStageOne),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetTechnicianMapping = (options) =>
  useQuery(
    "technicians-with-mapping",
    () => axiosOnboarding.get(onboarding.admin.getTechnicianMapping),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useAcceptTechnician = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (applicantId) =>
      axiosOnboarding.post(
        `${onboarding.qamaster.approvedTechnicianApplicantStageOne}${applicantId}`
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("technician-applicants");
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useRejectTechnician = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(
        onboarding.qamaster.rejectTechnicianApplicant,
        payload
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) {
          queryClient.invalidateQueries("technician-applicants");
          onSuccess(data.data);
        }
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useSetTechnicianInterview = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(`${onboarding.qamaster.setDiscussionDate}`, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("tech-discussion");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetTechnicianThirdStageRatingCriteria = (options) =>
  useQuery(
    "technician-third-stage-rating-criteria",
    () => axiosOnboarding.get(onboarding.qamaster.getTechThirdRatings),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetTechnicianSecondMcqResult = (options) =>
  useQuery(
    "tech-discussion",
    () => axiosOnboarding.get(onboarding.qamaster.technicianSecondMcq),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGradeTechnicianDiscussion = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(
        `${onboarding.qamaster.gradeTechThirdRatings}`,
        payload
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("technician-third-stage-applicants");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetTechnicianDiscussion = (discussionType, options) =>
  useQuery(
    ["rate-collaborator", discussionType],
    () =>
      axiosOnboarding.get(
        `${onboarding.qamaster.getTechInterview}${discussionType}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );
export const useGetTechnicianFinalMcqResult = (technicianId, options) =>
  useQuery(
    ["tech-mcq-result", technicianId],
    () =>
      axiosOnboarding.get(
        `${onboarding.qamaster.getTechnicialMcqResultLastStage}${technicianId}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useTechnicianFinalDiscussion = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(
        `${onboarding.qamaster.technicianFinalInterview}`,
        payload
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("tech-discussion");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useAcceptTechnicianFinalApproval = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (applicantId) =>
      axiosOnboarding.post(
        `${onboarding.qamaster.technicianFinalAproval}${applicantId}`
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("rate-collaborator");
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useRejectTechnicianFinalApproval = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(
        onboarding.qamaster.technicianRejectApproval,
        payload
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("rate-collaborator");
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

// ============================Supplier=========================
export const useSupplierApplication = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.supplier.application, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data?.data);
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useCreateSupplierByAdmin = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.admin.createSupplierByAdmin, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data?.data);
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useCreateSupplierBranchAddress = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.supplier.createBranchesAddress, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("branch-address");
        if (onSuccess) onSuccess(data?.data);
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
export const useUpdateSupplierBranchAddress = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.supplier.updateBranchAddress, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("branch-address");
        if (onSuccess) onSuccess(data?.data);
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetSupplierBranchAddress = (options) =>
  useQuery(
    "branch-address",
    () => axiosOnboarding.get(`${onboarding.supplier.getBranchesAddress}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useDeleteSupplierBranchAddress = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (branchId) =>
      axiosOnboarding.post(
        `${onboarding.supplier.deleteTrustedCustomer}${branchId}`
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
        queryClient.invalidateQueries("branch-address");
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useTrustedCustomer = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.supplier.trustedCustomer, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
        queryClient.invalidateQueries("customer-info");
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
export const useUpdateTrustedCustomer = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.supplier.updateTrustedCustomer, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data?.data);
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetTrustedCustomer = (options) =>
  useQuery(
    "customer-info",
    () => axiosOnboarding.get(`${onboarding.supplier.getTrustedCustomer}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

//============================CallCenter====================
export const useCallCenterApplication = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.callcenter.application, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data?.data);
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useCreateCcoByAdmin = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.admin.createCcoByAdmin, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data?.data);
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
// ============================Values=========================
export const useAcceptDeclarationMessage = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: () => axiosOnboarding.post(onboarding.values.acceptDeclaration),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetPreboardingWelcome = (options) =>
  useQuery(
    "preboarding-welcome",
    () => axiosOnboarding.get(onboarding.values.getPreboardingMsg),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetOnboardingWelcome = (options) =>
  useQuery(
    "onboarding-welcome",
    () => axiosOnboarding.get(onboarding.values.getOnboardingMsg),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetPreboardingDeclarations = (options) =>
  useQuery(
    "declarations",
    () => axiosOnboarding.get(onboarding.values.getPreboardingDeclarations),
    {
      select: (data) =>
        data?.data?.data?.map((value) => ({
          id: value.id,
          name: value.name,
        })),
      ...options,
    }
  );

export const useAcceptOnboardingDecOrMsg = ({
  onSuccess,
  onFailed,
  category,
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      axiosOnboarding.get(
        `${onboarding.values.acceptOnboardingMsgorDec}/${category}`
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("stage-details");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetUserProfile = (options) =>
  useQuery(
    "user-profile",
    () => axiosOnboarding.get(onboarding.values.getProfile),
    {
      cacheTime: Infinity,
      staleTime: 36000000, // user-profile becomes stale after 10 minutes
      select: (data) => data.data,
      ...options,
    }
  );

export const useUpdateUserProfile = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.values.updateProfile, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("user-profile");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetSocialMediaPlatforms = (options) =>
  useQuery(
    "social-media-platforms",
    () => axiosOnboarding.get(onboarding.values.socialMediaPlatforms),
    {
      staleTime: Infinity,
      select: (data) => data.data,
      ...options,
    }
  );

//=============================Qamaster=================================

export const useQaMasterApplication = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.qamaster.application, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data?.data);
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useQaMasterApplicationAuth = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.qamaster.authApplication, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data?.data);
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useCreateQaByAdmin = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.admin.createQaByAdmin, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data?.data);
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetTechnicianApplicantStageTwo = (options) =>
  useQuery(
    "tech-discussion",
    () =>
      axiosOnboarding.get(onboarding.qamaster.getTechnicianApplicantStageTwo),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useRateApplicantInterview = ({ onSuccess, onFailed, roleId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(onboarding.admin.gradeApplicantInterviews, payload),
    onSuccess: (data) => {
      if (data?.data?.status?.toLowerCase() === "success") {
        queryClient.invalidateQueries(["rate-collaborator", roleId]);
        if (onSuccess) onSuccess(data?.data);
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetQaAndFranchiseeMcq = (role, options) =>
  useQuery(
    ["qa-franchisee-supplier-mcq", role],
    () =>
      axiosOnboarding.get(`${onboarding.admin.getQaAndFranchiseeMcq}${role}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );
export const useGetQaAndFranchiseeMcqByUserId = ({ userId, options, roleId }) =>
  useQuery(
    ["qa-franchisee-supplier-mcq", userId],
    () =>
      axiosOnboarding.get(
        `${onboarding.admin.getQaAndFranchiseeMcqByUserId}?userId=${userId}&role=${roleId}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useFranchiseeFinalDiscussionDate = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(
        `${onboarding.admin.setDiscussionDateForFranchisee}`,
        payload
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("qa-franchisee-supplier-mcq");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
export const useQaFinalDiscussionDate = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(
        `${onboarding.admin.setDiscussionDateForQA}`,
        payload
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        queryClient.invalidateQueries("qa-franchisee-supplier-mcq");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetFranchiseeForFinalApproval = (options) =>
  useQuery(
    "final-discussion",
    () => axiosOnboarding.get(onboarding.admin.getFranchiseeForFinalApproval),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

// admin working type
export const useGetCollaboratorForAssignment = (role, options) =>
  useQuery(
    ["collaborator-working-type", role],
    () =>
      axiosOnboarding.get(
        `${onboarding.admin.getCollaboratorForAssignMent}/${role}`
      ),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetWorkTypeHistory = (id, options) =>
  useQuery(
    ["collaborator-working-type-history", id],
    () =>
      axiosOnboarding.get(`${onboarding.admin.getWorkingTypeHistory}/${id}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );
export const useAssignWorkingTypeToCollaborator = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosOnboarding.post(`${onboarding.admin.assignWorkingType}`, payload),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful && data?.data?.isSuccessful === true) {
        queryClient.invalidateQueries("collaborator-working-type");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
