import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosJobs from "../../config/axios/axiosJobs";
import { jobs } from "../../config/endpoints/jobs";
import { jobTypes } from "../../utils/selectOptions";

export const useAddCollaboratorBankAccount = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosJobs.post(jobs.banks.addBankAccount, payload),
    onSuccess: (data) => {
      if (data.data?.data?.toLowerCase() === "success") {
        if (onSuccess) {
          onSuccess(data.data);
          queryClient.invalidateQueries("bank-details");
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
export const useGetBankDetailsByCollab = (collab, options) =>
  useQuery(
    ["bank-details-by-collab", collab],
    () => axiosJobs.get(`${jobs.banks.getBankDetailsByCollab}/${collab}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useRequestWithdrawal = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.wallet.requestWithdrawal, payload),
    onSuccess: (data) => {
      if (data.data?.data?.toLowerCase() === "success") {
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

export const useGetWithdrawalRequests = (options) =>
  useQuery(
    "withdrawal-requests",
    () => axiosJobs.get(jobs.wallet.getWithdrawalRequests),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetBankDetails = (options) =>
  useQuery(
    "user-bank-details",
    () => axiosJobs.get(jobs.banks.getBankAccounts),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useRespondToBankDetails = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.banks.respondToBankDetails, payload),
    onSuccess: (data) => {
      if (data.data?.data?.toLowerCase() === "success") {
        if (onSuccess) {
          onSuccess(data.data);
          queryClient.invalidateQueries("user-bank-details");
          queryClient.invalidateQueries("bank-details-by-collab");
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

export const useGetBookingType = (options) =>
  useQuery("fix-type", () => axiosJobs(jobs.values.fix), {
    select: (data) => data.data,
    ...options,
  });

export const useGetFixCategories = (options) =>
  useQuery("fix-categories", () => axiosJobs(jobs.values.fixCategories), {
    select: (data) => data.data,
    ...options,
  });

export const useGetFixClass = (options) =>
  useQuery("fix-classes", () => axiosJobs(jobs.values.fixClasses), {
    select: (data) => data.data,
    ...options,
  });

export const useGetMeasurementUnits = (options) =>
  useQuery(
    "unit-of-measurement",
    () => axiosJobs(jobs.values.getMeasurementsUnit),
    {
      select: (data) => data.data,
      ...options,
    }
  );

// =======================CUSTOMERS ACTIONS =======================
export const useGetCustomerSubscriptions = (options) =>
  useQuery(
    "customer-active-subscriptions",
    () => axiosJobs(jobs.jobs.customerSubscriptions),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetCustomerNewJobs = (options) =>
  useQuery("new-jobs", () => axiosJobs(jobs.jobs.customerNewJobs), {
    select: (data) => data.data,
    ...options,
  });

export const useGetCustomerOngoingJobs = (options) =>
  useQuery("ongoing-jobs", () => axiosJobs(jobs.jobs.customerOngoingJobs), {
    select: (data) => data.data,
    ...options,
  });

export const useGetCustomerCompletedJobs = (options) =>
  useQuery("completed-jobs", () => axiosJobs(jobs.jobs.customerCompletedJobs), {
    select: (data) => data.data,
    ...options,
  });

export const useGetFixBookingFee = (fixId, options) =>
  useQuery(
    ["booking-fee", fixId],
    () => axiosJobs.get(`${jobs.jobs.bookingFee}/${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useAcknowledgeJobCompletion = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.jobs.acknowledgeCompletion, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries(["collaborator-jobs", jobTypes.ongoing]);
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

export const useSubForJob = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosJobs.post(jobs.jobs.bookJobWithSub, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("all-active-subs");
        queryClient.invalidateQueries("new-jobs");
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

export const useWalletForJob = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.wallet.bookJobWithWallet, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("new-jobs");
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

export const useBookaFix = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosJobs.post(jobs.jobs.bookNewJob, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("collaborator-jobs");
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

export const useCancelFix = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosJobs.post(jobs.jobs.cancelFix, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("collaborator-jobs");
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

// ======================= FRANCHISEE AND CSE =================================

export const useGetCseUnassignedJobs = (options) =>
  useQuery("cse-new-jobs", () => axiosJobs(jobs.jobs.getCseUnacceptedJobs), {
    select: (data) => data.data,
    ...options,
  });

export const useGetTechAssignedJobs = (options) =>
  useQuery(
    "tech-assigned-jobs",
    () => axiosJobs(jobs.jobs.technicianUnacceptedJobs),
    {
      select: (data) => data.data,
      ...options,
    }
  );
export const useGetCseAndTechNewJobs = (options) =>
  useQuery(
    "collaborator-jobs",
    () => axiosJobs(jobs.technician.getTechnicianNewJob),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetJobDetails = (fixId, options) =>
  useQuery(
    ["job-details", fixId],
    () => axiosJobs.get(`${jobs.jobs.getJobDetails}/${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useAcceptOrRejectJob = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.jobs.acceptOrRejectJob, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("collaborator-jobs");
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

export const useGetJobCounts = (fixStatus, options) =>
  useQuery(
    ["job-counts", fixStatus],
    () => axiosJobs.get(`${jobs.jobs.getJobCount}${fixStatus}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetFranchiseAndCseRejectedJobs = (options) =>
  useQuery(
    "franchisee-cse-rejected-jobs",
    () => axiosJobs.get(jobs.jobs.getFranchiseAndCseRejectedJob),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetAllCse = (options) =>
  useQuery(
    "cse-in-territory",
    () => axiosJobs.get(jobs.collaborators.getAllCse),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetTechRejectedJobs = (options) =>
  useQuery(
    "tech-rejected-jobs",
    () => axiosJobs.get(jobs.jobs.technicianRejectedJobs),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetTechOngoingJobs = (options) =>
  useQuery(
    "ongoing-tech-jobs",
    () => axiosJobs.get(jobs.jobs.technicianOngoingJobs),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetFranchiseAndCseOngoingJobs = (options) =>
  useQuery(
    "ongoing-franchisee-cse-jobs",
    () => axiosJobs.get(jobs.jobs.getFranchiseAndCseOngoingJob),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetHireRequestJobs = (options) =>
  useQuery(
    "hire-request-jobs",
    () => axiosJobs.get(jobs.jobs.jobsWithHireRequest),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetWarrantyAndCompletedJobsForCseAndFranchise = (
  fixStatus,
  options
) =>
  useQuery(
    ["cse-franchisee-warranty-completed-jobs", fixStatus],
    () =>
      axiosJobs.get(
        `${jobs.jobs.getFranchiseeAndCseForWarrantyAndCompleted}${fixStatus}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetWarrantyAndCompletedJobsForTech = (fixStatus, options) =>
  useQuery(
    ["technician-warranty-completed-jobs", fixStatus],
    () => axiosJobs.get(`${jobs.jobs.technicianJobByStatus}${fixStatus}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetFixEquipments = (categoryId, options) =>
  useQuery(
    ["fix-equipment", categoryId],
    () => axiosJobs.get(`${jobs.jobs.getAllFixEquipment}/${categoryId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useSetJobVisitDate = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) => axiosJobs.post(jobs.jobs.setJobVisitDate, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
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

export const useLogCompletionObservation = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.jobs.logCompletionObservation, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
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

export const useUpdateCategory = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosJobs.put(jobs.jobs.updateCategory, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("fix-categories");
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
export const useAddEquipment = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosJobs.post(jobs.jobs.addEquipment, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("customer-equipment");
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
export const useDeleteEquipment = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosJobs.post(jobs.jobs.deleteItemToFix, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("customer-equipment");
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

export const useGetCustomerEquipment = (fixId, options) =>
  useQuery(
    ["customer-equipment", fixId],
    () => axiosJobs.get(`${jobs.jobs.getFixEquipment}${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useCreateServiceListen = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosJobs.post(jobs.jobs.createServices, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("customer-service");
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

export const useGetCustomerServicesListing = (fixId, options) =>
  useQuery(
    "customer-service",
    () => axiosJobs.get(`${jobs.jobs.getService}${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetUnassignedJobs = (options) =>
  useQuery(
    "territory-unassigned-jobs",
    () => axiosJobs(jobs.jobs.getUnassignedJobs),
    {
      select: (data) => data.data,
      ...options,
    }
  );
export const useDeleteCustomerServicesListing = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => axiosJobs.delete(`${jobs.jobs.deleteService}/${id}`),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("customer-service");
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
export const useDeleteHireEquipment = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      axiosJobs.delete(`${jobs.equipment.deleteJobWithHireRequest}/${id}`),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("hire-equipments");
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

export const useAssignJobToCse = (jobType, onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosJobs.post(jobs.jobs.assignJobsToCse, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("ongoing-franchisee-cse-jobs");
        queryClient.invalidateQueries("territory-unassigned-jobs");
        queryClient.invalidateQueries(["collaborator-jobs", jobType]);
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

export const useAssignJobToSelf = (jobType, onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.jobs.assignJobsToSelf, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("ongoing-franchisee-cse-jobs");
        queryClient.invalidateQueries("territory-unassigned-jobs");
        queryClient.invalidateQueries(["collaborator-jobs", jobType]);
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

export const useUpdateFix = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.jobs.updateFix, payload, {
        headers: { "Content-type": "multipart/form-data" },
      }),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("job-details");
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
//================================technician=============================
export const useGetAllTechnicians = (fixId, options) =>
  useQuery(
    "technicians",
    () => axiosJobs(`${jobs.technician.getAllTechnicians}/${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useAssignJobsToTechnician = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.technician.assignJobsToTechnician, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries(["assign-technician"]);
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

export const useGetTechnicianAssigned = (fixId, options) =>
  useQuery(
    ["assign-technician", fixId],
    () =>
      axiosJobs.get(`${jobs.technician.getTechnicianAssignByFixId}/${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );
export const useGetTechnicianAssignByFixId = (fixId, options) =>
  useQuery(
    ["technician-fix", fixId],
    () =>
      axiosJobs.get(`${jobs.technician.getTechnicianAssignByFixId}/${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useTechnicianShowInterest = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.get(`${jobs.technician.showJobInterest}${payload}`),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries(["tech-unassign-jobs"]);
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

//========================diagnosis===============================
export const useSetDiagnosisVisit = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.diagnosis.setDiagnoisiVisit, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("diagnosis-visit");
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

export const useGetDiagnosisTime = (options) =>
  useQuery("diagnosis-time", () => axiosJobs(jobs.diagnosis.getDiagnosisTime), {
    select: (data) => data.data,
    ...options,
  });

export const useGetExtenedDiagnosisTime = (options) =>
  useQuery(
    "extended-time",
    () => axiosJobs(jobs.diagnosis.getExtendedDiagnosisTime),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useCheckDiagnosisStatus = (fixId, options) =>
  useQuery(
    "diagnosis-status",
    () => axiosJobs(jobs.diagnosis.checkDiagnosis + `/${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useExtendDiagnosisTime = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.diagnosis.extendDiagnosisTime, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
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

export const useLogDiagnosisStart = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.diagnosis.logDiagStartTime, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 201) {
        queryClient.invalidateQueries("diagnosis-status");
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

export const useLogDiagnosisEnd = (onSuccess, onFailed, fixId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.diagnosis.logDiagEndTime, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("diagnosis-status");
        queryClient.invalidateQueries(["diagnosis-log", fixId]);
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

export const useCloseDiagnosisVisit = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.jobs.closeDiagnosisVisit, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
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

export const useLogCompletionStart = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.jobs.logCompletionStartTime, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 201) {
        queryClient.invalidateQueries("completion-status");
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

export const useLogCompletionEnd = (onSuccess, onFailed, fixId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.jobs.logCompletionEndTime, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("completion-status");
        queryClient.invalidateQueries(["completion-log", fixId]);
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

export const useGetCompletionLog = (fixId, options) =>
  useQuery(
    ["completion-log", fixId],
    () => axiosJobs.get(`${jobs.jobs.getCompletionStartEndStatus}/${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useCreateRecommendationAndFinding = (
  fixId,
  onSuccess,
  onFailed
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.diagnosis.createRecommendationAndFinding, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries(["diagnosis-report", fixId]);
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

export const useGetDiagnosisReport = (fixId, options) =>
  useQuery(
    ["diagnosis-report", fixId],
    () =>
      axiosJobs(`${jobs.diagnosis.getIssueAndRecommendationByFixId}${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetDiagnosisLog = (fixId, options) =>
  useQuery(
    ["diagnosis-log", fixId],
    () => axiosJobs(`${jobs.diagnosis.diagnosisLogStatus}/${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetDiagnosisVisitTime = (fixId, options) =>
  useQuery(
    ["diagnosis-visit", fixId],
    () => axiosJobs(`${jobs.diagnosis.getDiagnosisVisitTime}${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

//==================================================Warranty===========================================
export const useGetWarrantyFix = (fixId, options) =>
  useQuery(
    ["warranty-fix", fixId],
    () => axiosJobs.get(`${jobs.warranty.getWarrantyJob}${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useLogWarrantyClaim = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.warranty.logWarrantyClaim, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
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

//===========================================================supplies========================================================
export const useRequestSupplies = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.supplies.supplyRequest, payload, {
        headers: { "Content-type": "multipart/form-data" },
      }),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("supplies");
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

export const useGetSupplyByFixId = (fixId, options) =>
  useQuery(
    ["supplies", fixId],
    () => axiosJobs.get(`${jobs.supplies.getSupplyByFixId}/${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetSupplyRfq = (options) =>
  useQuery("supply-rfq", () => axiosJobs(jobs.supplies.getSupplyRfq), {
    select: (data) => data.data,
    ...options,
  });
export const useGetNewPurchaseOrder = (options) =>
  useQuery("new-purchase", () => axiosJobs(jobs.supplies.getNewPurchaseOrder), {
    select: (data) => data.data,
    ...options,
  });

export const useAcceptOrRejectPo = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.supplies.acceptOrRejetPO, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("new-purchase");
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

export const useGetPurchaseOrderByStatus = (status, options) =>
  useQuery(
    ["purchase-order-by-status", status],
    () => axiosJobs.get(`${jobs.supplies.getPurchaseOrderByStatus}/${status}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );
export const useGetReplacementByStatus = (status, options) =>
  useQuery(
    ["replace-order", status],
    () => axiosJobs.get(`${jobs.supplies.getReplacementByStatus}/${status}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useDispatchSupplies = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.supplies.recordDispatch, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("purchase-order-by-status");
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
export const useConfirmDeliveryCode = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.supplies.confirmDeliveryCode, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("supplies-item");
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

export const useAcceptOrRejectDelivery = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.supplies.acceptOrRejectDelivery, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("supplies-item");
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
export const useAgreedOrDisagreeReplacement = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.supplies.agreedOrDisagreeReplacements, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("replace-order");
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

export const useGetSuppliesByFixId = (fixId, options) =>
  useQuery(
    ["supplies-item", fixId],
    () => axiosJobs(`${jobs.supplies.getSuppliesDispatchByFixId}/${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

// =================================================equipment==========================================
export const useGetAllEquipments = (options) =>
  useQuery("all-equipment", () => axiosJobs(jobs.equipment.viewAllEquipments), {
    select: (data) => data.data,
    ...options,
  });

export const useGetHireEquipments = (fixId, options) =>
  useQuery(
    "hire-equipments",
    () => axiosJobs(`${jobs.equipment.getHireEquipments}/${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetHireRequestDetails = (fixId, options) =>
  useQuery(
    ["hire-request-detail", fixId],
    () => axiosJobs(jobs.equipment.viewHireRequest + fixId),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetEqpActivities = (options) =>
  useQuery(
    ["equipment-activities"],
    () => axiosJobs(jobs.equipment.eqpActivities),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetEqpHistory = (fixId, options) =>
  useQuery(
    ["equipment-history", fixId],
    () => axiosJobs(`${jobs.equipment.eqpHistory}/${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );
export const useGetEqpDeliveredByFixId = (fixId, options) =>
  useQuery(
    ["equipment-delivered", fixId],
    () => axiosJobs(`${jobs.equipment.viewDeliveredEquipment}/${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );
export const useGetEqpReadyForDispatch = (options) =>
  useQuery("equipment-dispatch", () => axiosJobs(jobs.equipment.eqpDispatch), {
    select: (data) => data.data,
    ...options,
  });

export const useDispatchEqupiment = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.equipment.dispatchEqp, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("equipment-dispatch");
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
export const useConfirmDispatchEqupiment = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.equipment.acceptEqpDispatched, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("equipment-delivered");
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

export const useAcceptOrRejectHire = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.equipment.approveOrRejectRequest, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
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

export const useCreateEquipment = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.equipment.createEquipment, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("all-equipment");
        if (onSuccess) onSuccess(data?.data);
      } else {
        console.log("error");
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useUpdateEquipment = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosJobs.post(jobs.equipment.updateEqp, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("all-equipment");
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

export const useHireEquipment = (fixId, onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosJobs.post(jobs.equipment.hireEqp, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries(["hire-request-detail", fixId]);
        queryClient.invalidateQueries("hire-equipments");
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

export const useCreateQuotation = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.supplies.createQuotation, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
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

export const useReturnEqupiment = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.equipment.returnEquipment, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("equipment-delivered");
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
//============================================================================qamaster============================================================================
export const useGetSupportRequest = (options) =>
  useQuery(
    "support-request",
    () => axiosJobs(jobs.qamaster.getSupportRequest),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetSupportRequestByRequesId = (requestId, options) =>
  useQuery(
    ["support-request-by-id", requestId],
    () =>
      axiosJobs.get(
        `${jobs.qamaster.getSupportRequestByRequestId}${requestId}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useCreateQamasterResponseToRequest = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.qamaster.responseToSupport, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("qamaster-feed-back");
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

export const useCreateQamasterRequest = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.qamaster.creatQamasterRequest, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("support-request");
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

export const useGetQaSupportRequestByFixId = (fixId, phaseEnum, options) =>
  useQuery(
    ["support-request", fixId, phaseEnum],
    () =>
      axiosJobs.get(
        `${jobs.qamaster.getQaResponse}${fixId}&phase=${phaseEnum}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

//---------------------------------------collaborator job--------------------------------

export const useGetCollaboratorJobCount = (options) =>
  useQuery(
    "collaborator-job",
    () => axiosJobs(jobs.collaborators.getCollaboratorJobsCount),
    {
      select: (data) => data.data,
      ...options,
    }
  );
export const useGetCollaboratorJobs = (jobType, options) =>
  useQuery(
    ["collaborator-jobs", jobType],
    () => axiosJobs(`${jobs.collaborators.getCollaboratorJobs}/${jobType}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

// -----------------------quotes---------------------------
export const useGetQuoteDetails = (fixId, options) =>
  useQuery(
    ["quote-details", fixId],
    () => axiosJobs(`${jobs.quotes.quoteDetails}/${fixId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetAllQuotations = (options) =>
  useQuery(
    ["customer-quotations"],
    () => axiosJobs(`${jobs.quotes.allCustomerQuotes}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useAcceptOrRejectQuote = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.quotes.acceptOrReject, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("quote-details");
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
export const useDeleteMaterialFromQuote = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.quotes.deleteMaterial, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("customer-quotations");
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

export const usePayQuoteWithWallet = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosJobs.post(jobs.quotes.payQuoteWithWallet, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("quote-details");
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

//----------------------------------------------------amount earnings----------------------------------------------------
export const useGetAmountEarning = (options) =>
  useQuery(
    "collaborator-earnings",
    () => axiosJobs(jobs.earnings.getEarnings),
    {
      select: (data) => data.data,
      ...options,
    }
  );
// wallet
export const useGetWalletTransactions = (options) =>
  useQuery(
    ["wallet-transactions"],
    () => axiosJobs(`${jobs.wallet.getWalletTransactions}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

//=========================================================rating===================================================

export const useGetCollboratorRating = (options) =>
  useQuery(
    "rating-collaborator",
    () => axiosJobs(jobs.rating.getCollaboratorRating),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useCreateCollaboratorRating = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosJobs.post(jobs.rating.createRating, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("rating-collaborator");
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
