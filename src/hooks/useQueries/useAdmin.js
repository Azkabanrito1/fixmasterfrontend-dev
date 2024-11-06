import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosAdmin from "../../config/axios/axiosAdmin";
import { admin } from "../../config/endpoints/admin";

// =======================TERRITORY =======================
export const useGetAllTerritories = ({ options, params }) =>
  useQuery(
    ["admin-all-territories", params],
    () =>
      axiosAdmin.get(admin.territory.all, {
        params: {
          ...params,
        },
      }),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetTerritoryDetails = (id, options) =>
  useQuery(
    ["territory-details", id],
    () => axiosAdmin.get(`${admin.territory.details}${id}`),
    {
      select: (data) => data.data.data,
      enabled: !!id,
      ...options,
    }
  );

export const useCreateTerritory = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosAdmin.post(admin.territory.create, payload),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful) {
        queryClient.invalidateQueries("admin-all-territories");
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

export const useActivateDeactivateTerritory = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ territoryId, action }) =>
      axiosAdmin.get(
        `${admin.territory.activateOrDeactivateTerritory}/${territoryId}/${action}`
      ),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful) {
        queryClient.invalidateQueries("admin-all-territories");
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

export const useGetAllCountries = (options) =>
  useQuery(
    "admin-all-countries",
    () => axiosAdmin.get(admin.territory.countries),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useCreateTerritoryWithCities = ({ id, onSuccess, onFailed }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.territory.createUpdateCites, payload),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful) {
        queryClient.invalidateQueries("admin-all-territories");
        queryClient.invalidateQueries("territory-details", id);
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

export const useDeactivateCity = (territoryId, onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (recId) =>
      axiosAdmin.get(`${admin.territory.deactivateCity}/${recId}`),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful) {
        queryClient.invalidateQueries("territory-details", territoryId);
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

export const useGetTerritoriesByGeolocation = (
  { lgaId, longitude, latituded, collaborator },
  options
) =>
  useQuery(
    [
      "territories-by-geolocation",
      { lgaId, longitude, latituded, collaborator },
    ],
    () =>
      axiosAdmin.get(admin.territory.territoryByGeolocation, {
        params: { lgaId, longitude, latituded, collaborator },
      }),
    {
      select: (data) => data.data,
      enabled: !!lgaId && !!longitude && !!latituded && !!collaborator,
      ...options,
    }
  );

export const useCheckCityExistence = (cityId, options) =>
  useQuery(
    ["city-existence", cityId],
    () => axiosAdmin.get(`${admin.territory.checkCityExistence}/${cityId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useEditCityDate = (id, onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.territory.editCityDate, payload),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful) {
        queryClient.invalidateQueries(["territory-details", id]);
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

export const useGetAllTerritoryCategories = ({ options, queryParams }) =>
  useQuery(
    ["territory-categories", queryParams],
    () =>
      axiosAdmin.get(`${admin.territoryCategory.allTerritoryCategory}`, {
        params: queryParams,
      }),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetTerritoryCategoriesById = (id, options) =>
  useQuery(
    ["territory-categories", id],
    () =>
      axiosAdmin.get(`${admin.territoryCategory.territoryCategoryById}${id}`),
    {
      select: (data) => data.data,
      enabled: !!id,
      ...options,
    }
  );

export const useCreateTerritoryCategory = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.territoryCategory.createTerritoryCategory, payload),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful) {
        queryClient.invalidateQueries(["territory-categories"]);
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

export const useUpdateTerritoryCategory = (id, onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.territory.updateTerritoryCategory, payload),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful) {
        queryClient.invalidateQueries(["territory-categories"]);
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

// ======================Territory Collaborators =================

export const useCreateCollabBonus = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.territorySettings.createBonus, payload),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful) {
        queryClient.invalidateQueries("all-collab-bonuses");
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

export const useCreateCollabTarget = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.territorySettings.createTarget, payload),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful) {
        queryClient.invalidateQueries("all-collab-targets");
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

export const useCreateCollabRateUplift = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.territorySettings.createCollabUplift, payload),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful) {
        queryClient.invalidateQueries("all-collab-uplifts");
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

export const useCreateTerritoryUplift = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.territorySettings.createTerritoryUplift, payload),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful) {
        queryClient.invalidateQueries("all-collab-uplifts");
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

export const useGetAllBonuses = (territoryId, options, queryParams) =>
  useQuery(
    ["all-collab-bonuses", territoryId, queryParams],
    () =>
      axiosAdmin.get(
        `${admin.territorySettings.bonusesByTerritory}/${territoryId}`,
        {
          params: queryParams,
        }
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetAllTargets = (territoryId, options, queryParams) =>
  useQuery(
    ["all-collab-targets", territoryId, queryParams],
    () =>
      axiosAdmin.get(
        `${admin.territorySettings.targetsByTerritory}/${territoryId}`,
        {
          params: queryParams,
        }
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetAllUplifts = (territoryId, options) =>
  useQuery(
    ["all-collab-uplifts", territoryId],
    () =>
      axiosAdmin.get(
        `${admin.territorySettings.upliftsByTerritory}/${territoryId}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetCollabRateUplifts = (territoryId, collaboratorId, options) =>
  useQuery(
    ["all-collab-rate-uplifts", territoryId],
    () =>
      axiosAdmin.get(
        `${admin.territorySettings.collabUpliftDetails}/${territoryId}`,
        {
          params: {
            collaboratorId,
          },
        }
      ),
    {
      select: (data) => data.data?.data,
      enabled: !!territoryId && !!collaboratorId,
      ...options,
    }
  );

export const useGetBonusDetails = (bonusId, options) =>
  useQuery(
    ["bonus-details", bonusId],
    () => axiosAdmin.get(`${admin.territorySettings.bonusDetails}/${bonusId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetTargetDetails = (targetId, options) =>
  useQuery(
    ["target-details", targetId],
    () =>
      axiosAdmin.get(`${admin.territorySettings.targetDetails}/${targetId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetUpliftDetails = (upliftId, options) =>
  useQuery(
    ["uplift-details", upliftId],
    () =>
      axiosAdmin.get(
        `TerritorySettings/GetAllCollaboratorRateUpLiftDetails?rateId=${upliftId}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useUpdateBonus = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.territorySettings.updateBonus, payload),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful) {
        queryClient.invalidateQueries("all-collab-bonuses");
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

export const useUpdateTargets = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.territorySettings.updateTarget, payload),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful) {
        queryClient.invalidateQueries("all-collab-targets");
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

export const useUpdateCollabUplift = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.territorySettings.updateTarget, payload),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful) {
        queryClient.invalidateQueries("all-collab-uplifts");
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

// export const useGetColloboratorEarning = () => useQuery("earning" =>)

// ======================Discounts =====================

export const useGetDiscounts = (options) =>
  useQuery("all-discounts", () => axiosAdmin.get(admin.discount.allDiscounts), {
    select: (data) => data.data,
    ...options,
  });

export const useCreateDiscount = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.discount.newDiscount, payload),
    onSuccess: (data) => {
      if (data?.data?.status === "000") {
        queryClient.invalidateQueries("all-discounts");
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

export const useGetPromos = (options) =>
  useQuery("all-promos", () => axiosAdmin.get(admin.discount.allPromos), {
    select: (data) => data.data,
    ...options,
  });

export const useCreatePromo = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosAdmin.post(admin.discount.newPromo, payload),
    onSuccess: (data) => {
      if (data?.data?.status === "000") {
        queryClient.invalidateQueries("all-promos");
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

export const useGetLoyalties = (options) =>
  useQuery("all-loyalties", () => axiosAdmin.get(admin.discount.allLoyalty), {
    select: (data) => data.data,
    ...options,
  });

export const useCreateLoyalty = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.discount.newLoyalty, payload),
    onSuccess: (data) => {
      if (data?.data?.status === "000") {
        queryClient.invalidateQueries("all-loyalties");
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

export const useGetDiscountInvoiceComponent = (discountId, options) =>
  useQuery(
    ["discount-invoice-component", discountId],
    () =>
      axiosAdmin.get(
        `${admin.discount.discountInvoiceComponent}/${discountId}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetAudienceByCategory = (categoryName, options) =>
  useQuery(
    ["all-audience", categoryName],
    () =>
      axiosAdmin.get(
        `${admin.discount.audienceListByCategory}/${categoryName}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetDiscountAudience = (discountId, options) =>
  useQuery(
    ["discount-audience", discountId],
    () => axiosAdmin.get(`${admin.discount.discountAudience}/${discountId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

// ============================QUOTATIONS===========================

export const useGetQuotationParamsSettings = (typeId, options) =>
  useQuery(
    ["quotation/logistics-params-settings", typeId],
    () =>
      axiosAdmin.get(`${admin.common.allQuotationParam}?updateType=${typeId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useCreateQuotationParamSetting = ({
  typeId,
  onSuccess,
  onFailed,
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(
        `${admin.common.newQuotationParam}?createType=${typeId}`,
        payload
      ),
    onSuccess: (data) => {
      if (data?.data?.status === "000") {
        queryClient.invalidateQueries("quotation/logistics-params-settings");
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
export const useUpdateQuotationParamSetting = ({
  typeId,
  onSuccess,
  onFailed,
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.put(
        `${admin.common.updateQuotationParam}?updateType=${typeId}`,
        payload
      ),
    onSuccess: (data) => {
      if (data?.data?.status === "000") {
        queryClient.invalidateQueries("quotation/logistics-params-settings");
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

// ============================SUBSCRIPTIONS===========================

export const useGetSubPlansByStatus = (status, options) =>
  useQuery(
    ["all-subs-by-status", status],
    () => axiosAdmin.get(`${admin.subscription.plansByStatus}/${status}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetSubPlanDetails = (subId, options) =>
  useQuery(
    ["sub-details", subId],
    () => axiosAdmin.get(`${admin.subscription.plansById}/${subId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetSubscribers = (subId, options) =>
  useQuery(
    ["view-subs", subId],
    () => axiosAdmin.get(`${admin.subscription.subsById}/${subId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetCustomerSubs = (options) =>
  useQuery(
    ["customer-subs"],
    () => axiosAdmin.get(admin.subscription.activeCustomerSubs),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useCreateSub = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.subscription.createSubscription, payload),
    onSuccess: (data) => {
      if (data?.data?.status === "000") {
        queryClient.invalidateQueries(["all-subs-by-status", "all"]);
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

export const useCreateSubPlan = (subId, onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.subscription.createPlanWithSub, payload),
    onSuccess: (data) => {
      if (data?.data?.status === "000") {
        queryClient.invalidateQueries(["sub-details", subId]);
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

export const useAddCategoryToPlan = (subId, onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.subscription.addCategoryToPlan, payload),
    onSuccess: (data) => {
      if (data?.data?.status === "000") {
        queryClient.invalidateQueries(["sub-details", subId]);
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

export const useAddClassToPlan = (subId, onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.subscription.addClassToPlan, payload),
    onSuccess: (data) => {
      if (data?.data?.status === "000") {
        queryClient.invalidateQueries(["sub-details", subId]);
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

// ==============================WARRANTY=============================

export const useGetAllWarranty = (options) =>
  useQuery("all-warranties", () => axiosAdmin.get(admin.warranty.all), {
    select: (data) => data.data,
    ...options,
  });

export const useAddWarranty = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosAdmin.post(admin.warranty.new, payload),
    onSuccess: (data) => {
      if (data?.data?.status === "000") {
        queryClient.invalidateQueries("all-warranties");
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

// =============================== USER MANAGEMENT =============================
//==========================ManageTechnician================================
export const useGetAllTechnician = (options) =>
  useQuery(
    "qamaster-all-technician",
    () => axiosAdmin.get(admin.manageTechnician.getAllTechnician),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useUpdateTechnician = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.manageTechnician.updateTechnician, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("qamaster-all-technician");
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

export const useGetTechnicianFixAnalysis = (userId, options) =>
  useQuery(
    ["fix-count", userId],
    () =>
      axiosAdmin.get(
        `${admin.manageTechnician.getAllTechnicianFixAnalysis}${userId}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetTechnicianRating = (userId, options) =>
  useQuery(
    ["tech-rating", userId],
    () =>
      axiosAdmin.get(`${admin.manageTechnician.getTechnicianRating}${userId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetAllAssignTechnician = (options) =>
  useQuery(
    "technician-training",
    () =>
      axiosAdmin.get(admin.manageTechnician.getTrainingAssingnToAllTechnician),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

// ========================manage supplier================
export const useGetFormValues = (options) =>
  useQuery("form-values", () => axiosAdmin.get(admin.supplier.formValues), {
    select: (data) => data?.data,
    ...options,
    staleTime: Infinity,
  });

export const useCreateSupplier = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.supplier.createSupplier, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries(["users-by-category", "supplier"]);
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

// =========================training======================
export const useGetTrainigType = (options) =>
  useQuery(
    "trainingType",
    () => axiosAdmin.get(admin.training.getTrainingType),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetTrainigReminder = (options) =>
  useQuery(
    "trainingReminder",
    () => axiosAdmin.get(admin.training.getTrainingReminder),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetTrainig = (options) =>
  useQuery("training", () => axiosAdmin.get(admin.training.getTraining), {
    select: (data) => data?.data,
    ...options,
  });

export const useCreateTraining = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.training.createTraining, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("technician-training");
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

// =============================customers============================

// ==============================messages/declarations============================
export const useCreateMsgorDec = ({
  onSuccess,
  onFailed,
  type,
  collaboratorId,
  category,
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.common.createMsgorDec, payload),
    onSuccess: (data) => {
      if (data?.data?.status === "000") {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries([
            "msgordec",
            collaboratorId,
            category,
            type,
          ]);
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useUpdateMsgorDec = ({
  onSuccess,
  onFailed,
  type,
  collaboratorId,
  category,
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.common.updateMsgorDec, payload),
    onSuccess: (data) => {
      if (data?.data?.status === "000") {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries([
            "msgordec",
            collaboratorId,
            category,
            type,
          ]);
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useDeleteMsgorDec = ({
  onSuccess,
  onFailed,
  type,
  collaboratorId,
  category,
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.common.deleteMsgorDec, payload),
    onSuccess: (data) => {
      if (data?.data?.status === "000") {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries([
            "msgordec",
            collaboratorId,
            category,
            type,
          ]);
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetCollaboratorMsgorDec = ({
  collaboratorId,
  category,
  type,
  options,
}) =>
  useQuery(
    ["msgordec", collaboratorId, category, type],
    () =>
      axiosAdmin.get(
        `${admin.common.collaboratorMsgorDec}/${collaboratorId}/${category}/${type}`
      ),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetUserMsgorDec = ({ category, type, options }) =>
  useQuery(
    ["user-msgordec", category, type],
    () => axiosAdmin.get(`${admin.common.userMsgorDec}/${category}/${type}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

// ============================declarations============================
export const useCreateGlobalPreboardingDeclarations = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(
        admin.preboardingDeclarations.createPreboardingDecs,
        payload
      ),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200 && data?.data?.isSuccessful) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("preboarding-declarations");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useUpdateGlobalPreboardingDeclarations = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(
        admin.preboardingDeclarations.updatePreboardingDecs,
        payload
      ),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200 && data?.data?.isSuccessful) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("preboarding-declarations");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

// ============================mcq & training============================
export const useGetAllCollabTrainingMCQ = (collabId, options) =>
  useQuery(
    ["get-all-collab-training-mcq", collabId],
    () => axiosAdmin.get(`${admin.mcq.getAllCollabTrainingMCQ}/${collabId}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useUpdateMcqTrainingGlobalSettings = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.mcq.updateMcqTrainingGlobalSettings, payload),
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

export const useGetMcqCollaboratorsSettingbycollab = (
  collabId,
  trainingType,
  options
) =>
  useQuery(
    ["get-mcq-settings-by-collab", collabId, trainingType],
    () =>
      axiosAdmin.get(
        `${admin.mcq.getMcqCollaboratorsSettingbycollab}/${collabId}/${trainingType}`
      ),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useUploadTrainingMCQ = ({ onSuccess, onFailed, folderId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.mcq.uploadQuestions, payload, {
        // headers: { "Content-type": "multipart/form-data" },
      }),
    onSuccess: (data) => {
      if (data?.data?.status === "000") {
        queryClient.invalidateQueries(["mcqs", folderId]);
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

export const useCreateFolder = ({ testTypeId, onSuccess, onFailed }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosAdmin.post(admin.mcq.addFolder, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200 && data?.data?.isSuccessful) {
        queryClient.invalidateQueries(["mcq-folders", testTypeId]);
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

export const useCreateMaterial = ({ folderId, onSuccess, onFailed }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.mcq.addMaterial, payload, {}),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200 && data?.data?.isSuccessful) {
        queryClient.invalidateQueries(["training-materials", folderId]);
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

export const useUpdateTrainingMaterial = ({
  folderId,
  onSuccess,
  onFailed,
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosAdmin.put(admin.mcq.updateMaterial, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200 && data?.data?.isSuccessful) {
        queryClient.invalidateQueries(["training-materials", folderId]);
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

export const useDeleteTrainingMaterial = ({
  folderId,
  onSuccess,
  onFailed,
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.delete(
        `${admin.mcq.deleteMaterial}/${payload.id}/${payload.folderID}`
      ),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200 && data?.data?.isSuccessful) {
        queryClient.invalidateQueries(["training-materials", folderId]);
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

export const useUpdateFolder = ({ testTypeId, onSuccess, onFailed }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosAdmin.post(admin.mcq.updateFolder, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200 && data?.data?.isSuccessful) {
        queryClient.invalidateQueries(["mcq-folders", testTypeId]);
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

export const useManageFolder = ({ testTypeId, onSuccess, onFailed }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.mcq.manageMcqFolder, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200 && data?.data?.isSuccessful) {
        queryClient.invalidateQueries(["mcq-folders", testTypeId]);
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

export const useCreateMcqQuestion = ({ folderId, onSuccess, onFailed }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axiosAdmin.post(admin.mcq.addMcq, payload),
    onSuccess: (data) => {
      if (data?.data?.status === "000") {
        queryClient.invalidateQueries(["mcqs", folderId]);
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

export const useGetFoldersByType = (testTypeId, options) =>
  useQuery(
    ["mcq-folders", testTypeId],
    () => axiosAdmin.get(`${admin.mcq.getFolders}/${testTypeId}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetTrainigMaterials = (options) =>
  useQuery(
    "all-training-materials",
    () => axiosAdmin.get(admin.mcq.getTrainingMaterial),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetMaterialsByFolder = (folderId, options) =>
  useQuery(
    ["training-materials", folderId],
    () => axiosAdmin.get(`${admin.mcq.getMaterialsByFolderId}/${folderId}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetMcqsByFolder = (folderId, options) =>
  useQuery(
    ["mcqs", folderId],
    () => axiosAdmin.get(`${admin.mcq.getMcqsByFolderId}/${folderId}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetMcqDetailsById = (questionId, options) =>
  useQuery(
    ["mcq-data", questionId],
    () => axiosAdmin.get(`${admin.mcq.getMcqDataById}/${questionId}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

// ===============================interview grading settings =============================
export const useCreateGradingSettings = ({ roleId, onSuccess, onFailed }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.mcq.createInterviewGrading, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200 && data?.data?.isSuccessful) {
        queryClient.invalidateQueries(["grading-settings-by-role", roleId]);
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

export const useUpdateGradingSettings = ({ roleId, onSuccess, onFailed }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.mcq.updateInterviewGrading, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200 && data?.data?.isSuccessful) {
        queryClient.invalidateQueries(["grading-settings-by-role", roleId]);
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

export const useGetGradingSettingsByRole = (roleId, options) =>
  useQuery(
    ["grading-settings-by-role", roleId],
    () =>
      axiosAdmin.get(`${admin.mcq.getInterviewGradingByRole}?RoleId=${roleId}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetGradingSettingsByRecord = (recordId, options) =>
  useQuery(
    ["grading-settings-by-record", recordId],
    () =>
      axiosAdmin.get(
        `${admin.mcq.getInterviewGradingByRecord}?RecordId=${recordId}`
      ),
    {
      select: (data) => data?.data,
      ...options,
    }
  );
// ============================services============================
export const useGetServicesByEquipment = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.services.getService, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("services-by-equipment");
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

// ============================wallet============================
export const useGetDebitCodes = (options) =>
  useQuery(
    "wallet-debit-codes",
    () => axiosAdmin.get(admin.wallet.getDebitCodes),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGenerateWalletPin = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: () => axiosAdmin.post(admin.wallet.generatePin),
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

export const useRespondToWithdrawalRequests = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.wallet.respondToWithdrawalRequest, payload),
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

//============================================preferences============================================
export const useGetCustomerTypesOptions = (options) =>
  useQuery(
    "customer-types",
    () => axiosAdmin.get(admin.specialCustomerType.customerTypes),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetCustomTypeSub = (id, options) =>
  useQuery(
    ["customer-type-sub", id],
    () => axiosAdmin.get(`${admin.specialCustomerType.customerSubType}/${id}`),

    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetDaysOfWeeks = (options) =>
  useQuery(
    "day-of-week",
    () => axiosAdmin.get(`${admin.preferences.getDaysofWeeks}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetEmploymentType = (options) =>
  useQuery(
    "employment-type",
    () => axiosAdmin.get(`${admin.preferences.getEmploymentType}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetCollaboratorPreferenceQuestion = (roleId, options) =>
  useQuery(
    ["preference-question", roleId],
    () =>
      axiosAdmin.get(`${admin.preferences.getCollaboratorQuestion}${roleId}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useCreatePreferenceQuestion = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.preferences.createQuestion, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("preference-question");
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
export const useCreatePreferenceQuestionOption = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.preferences.createQuestionOptions, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("preference-question-option ");
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

export const useActivateOrDeactivatePreferenceQuestionOption = (
  onSuccess,
  onFailed
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.preferences.activateOrDeactivatePref, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries(
          "preference-question-option, preference-question"
        );
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

export const useCreatePrefMaster = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.preferences.createPrefMaster, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("preference-master");
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

export const useGetPreferenceMaster = (options) =>
  useQuery(
    "preference-master",
    () => axiosAdmin.get(`${admin.preferences.getPrefMaster}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

// ========================Guarantor Settings =================
export const useSetGuarantorSettings = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.guarantorSettings.setGuarantorSettings, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("all-guarantor-settings");
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

export const useGetAllGuarantorSettings = (options) =>
  useQuery(
    "all-guarantor-settings",
    () => axiosAdmin.get(`${admin.guarantorSettings.getGuarantorSettings}`),
    {
      select: (data) => data.data.data,
      ...options,
    }
  );

export const useGetAllGuarantorInformation = (role, options) =>
  useQuery(
    ["all-guarantor-information", role],
    () =>
      axiosAdmin.get(
        `${admin.guarantorSettings.getGuarantorInformation}/${role}`
      ),
    {
      select: (data) => data.data.data,
      ...options,
    }
  );

export const useGetAllIdentityCards = (options) =>
  useQuery("all-ids", () => axiosAdmin.get(admin.common.identityCards), {
    select: (data) => data.data,
    ...options,
  });

export const useGetCollaboratorPreferenceOptionByQuestionId = (
  questionId,
  options
) =>
  useQuery(
    ["preference-question-option", questionId],
    () =>
      axiosAdmin.get(
        `${admin.preferences.getOptionsByQuestionId}${questionId}`
      ),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

// ============== User Management ===============

export const useGetSuspendedUsers = (role, options) =>
  useQuery(
    ["all-suspended-users", role],
    () => axiosAdmin.get(`${admin.userManagement.getSuspendedUsers}/${role}`),
    {
      select: (data) => data.data.data,
      ...options,
    }
  );

export const useUnsuspendedUsers = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.userManagement.unsuspendUsers, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200 && data?.data?.isSuccessful) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("all-suspended-users");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

// ============== About Fixmaster Upload ===============

export const useUploadFmFolder = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.aboutFixMasterUpload.uploadFolder, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200 && data?.data?.isSuccessful) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("upload-fm-folder");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetFmFolders = (options) =>
  useQuery(
    ["get-fm-folders"],
    () => axiosAdmin.get(`${admin.aboutFixMasterUpload.viewFolders}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useUploadFmFiles = ({ folderId, onSuccess, onFailed }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(
        `${admin.aboutFixMasterUpload.uploadFiles}/${folderId}`,
        payload
      ),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200 && data?.data?.isSuccessful) {
        queryClient.invalidateQueries(["upload-fm-files", folderId]);
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

export const useGetFmFiles = (folderId, options) =>
  useQuery(
    ["get-fm-files", folderId],
    () => axiosAdmin.get(`${admin.aboutFixMasterUpload.viewFiles}${folderId}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useUploadTermsAndConditions = ({
  collabId,
  onSuccess,
  onFailed,
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(
        `${admin.aboutFixMasterUpload.uploadTermsAndConditions}/${collabId}`,
        payload
      ),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200 && data?.data?.isSuccessful) {
        queryClient.invalidateQueries([
          "upload-terms-and-conditions",
          collabId,
        ]);
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

export const useViewTermsAndConditions = (collab, options) =>
  useQuery(
    ["view-terms-and-conditions", collab],
    () =>
      axiosAdmin.get(
        `${admin.aboutFixMasterUpload.viewTermsAndConditions}/${collab}`
      ),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useViewAllTermsAndConditions = (options) =>
  useQuery(
    "view-all-terms-and-conditions",
    () =>
      axiosAdmin.get(`${admin.aboutFixMasterUpload.viewAllTermsAndConditions}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

//=====================================================Accademics Settings================================================
export const useGetAcademicsQualifications = (options) =>
  useQuery(
    "academics",
    () => axiosAdmin.get(`${admin.qualifications.accademics}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useAcademicsQualification = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.qualifications.createQualifications, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("academics");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
export const useUpdateAcademicsQualification = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.put(admin.qualifications.updateQualifications, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("academics");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
export const useDeleteAcademicsQualification = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      axiosAdmin.delete(admin.qualifications.deleteQualifications, {
        data: { id },
      }),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("academics");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

//================================================customer================================================
export const useCreateCustomerType = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.customer.createCustomerType, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("customer-type");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
export const useDeleteCustomerType = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.put(`${admin.customer.deleteCustomerType}${payload}`),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("customer-type");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetCustomerTypeAndSubType = (options) =>
  useQuery(
    "customer-type",
    () => axiosAdmin.get(`${admin.customer.getCustomerTypeAndCustomerSubtype}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useUpdateCustomerType = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.put(admin.customer.updateCustomerType, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("customer-type");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
export const useCreateCustomerSubType = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.customer.createSubType, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("customer-sub-type");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useUpdateCustomerSubType = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.put(admin.customer.updateSubType, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("customer-sub-type");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
export const useDeleteCustomerSubType = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      axiosAdmin.delete(`${admin.customer.deleteSubTypeById}/${id}`),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("customer-type-sub");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useCreateLanguage = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.language.createLanguage, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("language");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
export const useUpdateLanguage = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.put(admin.language.updateLanguage, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("language");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
export const useDeleteLanguage = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      axiosAdmin.delete(`${admin.language.deleteLanguage}/${id}`),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("language");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetUserLanguage = (options) =>
  useQuery("language", () => axiosAdmin.get(`${admin.language.getLanguage}`), {
    select: (data) => data?.data,
    ...options,
  });

//================================================================fix category===================================================
export const useCreateFixCategory = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.category.createcategory, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("fix-category");
          queryClient.invalidateQueries("fix-category-name");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useUpdateFixCategory = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.put(admin.category.updateCategory, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("fix-category");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetFixCategory = (options) =>
  useQuery(
    "fix-category",
    () => axiosAdmin.get(`${admin.category.getFixCategory}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useActivateOrDeactivateFixCategory = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.category.activateOrDeactivateCategory, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("fix-category");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useCreateFixEquipment = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.category.createFixEquipment, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("fix-equipment");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetFixEquipment = (options) =>
  useQuery(
    "fix-equipment",
    () => axiosAdmin.get(`${admin.category.getFixEquipment}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useUpdateFixEquipment = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.put(admin.category.updateFixEquipment, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("fix-equipment");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useCreateServiceListing = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.category.createServiceListing, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("fix-services");
          queryClient.invalidateQueries("fix-category");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetServiceListing = (options) =>
  useQuery(
    "fix-services",
    () => axiosAdmin.get(admin.category.getServiceListing),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetFixClasses = (options) =>
  useQuery("fix-classes", () => axiosAdmin.get(admin.category.getFixClass), {
    select: (data) => data?.data,
    ...options,
  });

export const useUpdateServiceListing = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.put(admin.category.updateServiceListing, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("fix-services");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
export const useDeleteServiceListing = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.category.deactivateServiceListing, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("fix-services");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useCreateBookingClass = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.category.createBookingClass, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("fix-classes");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useUpdateBookingClass = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.put(admin.category.updateBookingClass, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("fix-classes");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useActivateOrDeactivatBookingTypeAndServiceType = (
  onSuccess,
  onFailed
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(
        admin.reactDeactivate.activateOrDeactivateCategory,
        payload
      ),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("fix-sub-category");
          queryClient.invalidateQueries("service-type");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useCreateFixSubCategory = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.category.createSubCategory, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("fix-sub-category");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetSubCategory = (options) =>
  useQuery(
    "fix-sub-category",
    () => axiosAdmin.get(admin.category.getSubCategory),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useUpdateFixSubCategory = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.category.updateSubCategory, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("fix-sub-category");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useDeleteFixSubCategory = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.category.deleteSubCategory, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("fix-sub-category");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetSubCategoryById = (id, options) =>
  useQuery(
    ["fix-sub-category", id],
    () => axiosAdmin.get(`${admin.category.getSubCategoryById}/${id}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetFixCategoryByName = (options) =>
  useQuery(
    ["fix-category-name"],
    () => axiosAdmin.get(`${admin.category.getFixCategoryBySearchName}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetCategoryDetailsById = (id, options) =>
  useQuery(
    ["fix-category", id],
    () => axiosAdmin.get(`${admin.category.getCategoryDetailsById}/${id}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );
export const useGetAllCategoryByPage = (pageNumber, pageSize, options) =>
  useQuery(
    ["fix-category", pageNumber, pageSize],
    () =>
      axiosAdmin.get(
        `${admin.category.getAllCategoryByPage}PageNumber=${pageNumber}&PageSize=${pageSize}`
      ),
    {
      select: (data) => data?.data,
      ...options,
    }
  );
export const useGetCategorySubById = (id, options) =>
  useQuery(
    ["fix-category-sub", id],
    () => axiosAdmin.get(`${admin.category.getCategorySubById}/${id}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetCategoryServiceById = (id, options) =>
  useQuery(
    ["fix-services", id],
    () => axiosAdmin.get(`${admin.category.getCategoryServiceById}/${id}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );
export const useGetRootCategories = (options) =>
  useQuery(
    "job-category",
    () => axiosAdmin.get(admin.category.getRootCategory),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetRootSubcatById = (id, options) =>
  useQuery(
    ["sub-category", id],
    () => axiosAdmin.get(`${admin.category.getRootSubcategoriesById}/${id}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

//================================================================services type================================================================
export const useCreateServieType = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.servicesType.createServicesType, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("service-type");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetFixServiceType = (options) =>
  useQuery(
    "service-type",
    () => axiosAdmin.get(`${admin.servicesType.getServicesType}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useUpdateFixService = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.put(admin.servicesType.updateServies, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("service-type");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useDeleteServices = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      axiosAdmin.delete(`${admin.servicesType.deleteServices}/${id}`),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("service-type");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useDeleteFixEquipment = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      axiosAdmin.delete(`${admin.category.deleteFixEquipment}/${id}`),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("fix-equipment");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

//==============================================================onboarding requirement===========================================
export const useCreateVideoTopics = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.onboardingRequirement.createVideoTopics, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("video-topic");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetVideoTopics = (roleId, options) =>
  useQuery(
    ["video-topic", roleId],
    () =>
      axiosAdmin.get(
        `${admin.onboardingRequirement.getVideoTopicsByRoleId}/${roleId}`
      ),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useDeleteVideoTopics = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      axiosAdmin.delete(
        `${admin.onboardingRequirement.deleteVideoTopics}/${id}`
      ),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("video-topic");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useUpdateVideoTopics = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.put(admin.onboardingRequirement.updateVideoTopics, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("video-topic");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetVideoTopicSetting = (options) =>
  useQuery(
    "video-topic-setting",
    () => axiosAdmin.get(`${admin.onboardingRequirement.getVideoTopicSetting}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useCreateVideoTopicSetting = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(
        admin.onboardingRequirement.createVideoTopicSetting,
        payload
      ),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("video-topic-setting");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useUpdateVideoTopicSetting = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.put(
        admin.onboardingRequirement.updateVideoTopicSetting,
        payload
      ),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("video-topic-setting");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useDeleteVideoTopicSetting = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      axiosAdmin.delete(
        `${admin.onboardingRequirement.deleteVideoTopicSetting}/${id}`
      ),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("video-topic-setting");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetJobSettings = (options) =>
  useQuery(
    "all-job-settings",
    () => axiosAdmin.get(`${admin.JobSetting.getJobSettings}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useUpdateJobSettings = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.put(admin.JobSetting.updateJobSetting, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("all-job-settings");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

// JOB BOOKING FEE

export const useGetJobBookingFee = (options) =>
  useQuery(
    "job-booking-fee",
    () => axiosAdmin.get(`${admin.bookingFee.getBookingFee}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useCreateJobBookingFee = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.bookingFee.createBookingFee, payload),
    onSuccess: (data) => {
      if (data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("job-booking-fee");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
export const useUpdateJobBookingFee = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.put(admin.bookingFee.updateBookingFee, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("job-booking-fee");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
export const useDeleteJobBookingFee = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      axiosAdmin.delete(`${admin.bookingFee.deleteBookingFee}${id}`),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("all-job-settings");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetSlaParams = (options) =>
  useQuery("sla-params", () => axiosAdmin.get(`${admin.common.getSlaParam}`), {
    select: (data) => data?.data,
    ...options,
  });

export const useUpdateSla = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.put(admin.common.updateSlaParam, payload),
    onSuccess: (data) => {
      if (data?.data?.status.toLowerCase() === "success") {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("sla-params");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useCreateSla = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.common.createSlaparam, payload),
    onSuccess: (data) => {
      console.log(data);
      if (data?.data?.status.toLowerCase() === "success") {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("sla-params");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

//===================================================Rating Parameters Setup =========================================================
export const useCreateRatingType = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.ratingType.createRatingType, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("rating-type");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetCollaboratorRatingParam = (options) =>
  useQuery(
    "rating-param",
    () => axiosAdmin.get(admin.ratingType.getCollaboratorRatingParameters),
    {
      select: (data) => data?.data,
      ...options,
    }
  );
export const useGetCollaboratorRatingType = (options) =>
  useQuery(
    "rating-type",
    () => axiosAdmin.get(admin.ratingType.getAllRatingTypes),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useUpdateRatingType = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.ratingType.updateRatingType, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("rating-type");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};



//====================== ratingBonus=========================



export const UseRatingBonusSetup = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.ratingBonusSetUp.createRatingBonus, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("rating-bonus");
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


export const useUpdateRatingBonusSetup = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.ratingBonusSetUp.updateRatingsBonus, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("rating-bonus");
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
export const useGetAllRatingBonusSetUp = (options) =>
  useQuery(
    "rating-bonus",
    () => axiosAdmin.get(admin.ratingBonusSetUp.getAllRatingBonus),
    {
      select: (data) => data.data,
      ...options,
    }
  );



  // ===============Rating Default=======================================
  export const useGetAllRatingDefaultSetup = (options) =>
    useQuery(
      "rating-default",
      () => axiosAdmin.get(admin.ratingDefaultSetUp.getallRatingDefault),
      {
        select: (data) => data.data,
        ...options,
      }
    );
  
    export const useUpdateRatingDefaultSetup = (onSuccess, onFailed) => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: (payload) =>
          axiosAdmin.post(admin.ratingDefaultSetUp.updateRatingDefault, payload),
        onSuccess: (data) => {
          if (data?.data?.statusCode === 200) {
            queryClient.invalidateQueries("rating-default");
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

    
export const UseRatingDefaultSetup = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.ratingDefaultSetUp.createRatingDefault, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("rating-default");
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

// ----------------------------------------------------------------user-accounts----------------------------------------------------------------
export const useGetCustomerType = (enumType, queryParams, options) =>
  useQuery(
    ["customer-type", enumType, queryParams],
    () =>
      axiosAdmin.get(`${admin.account.getUserAccounts}/${enumType}`, {
        params: queryParams,
      }),
    {
      select: (data) => data?.data,
      enabled: !!enumType,
      ...options,
    }
  );
// ----------------------------------------------------------------user-accounts----------------------------------------------------------------
export const useCreateCollaboratorEarnings = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.earnings.createCollaboratorEarnings, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("collaborator-earnings");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
export const useUpdateCollaboratorEarnings = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.put(admin.earnings.updateCollaboratorEarnings, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("collaborator-earnings");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};
export const useDeleteCollaboratorEarnings = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      axiosAdmin.delete(`${admin.earnings.deleteCollaboratorEarnings}/${id}`),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("collaborator-earnings");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetCollaboratorEarningsById = (id, options) =>
  useQuery(
    ["collaborator-earnings", id],
    () => axiosAdmin.get(`${admin.earnings.getCollaboratorEarningById}/${id}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetCollaboratorInterval = (id, options) =>
  useQuery(
    ["collaborator-earnings", id],
    () => axiosAdmin.get(admin.earnings.getInterval),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

//----------------------------------------------------------------mcq setup----------------------------------------------------------------

export const useGetMcqFlagStatus = (collaborator, options) =>
  useQuery(
    ["mcq-flag-status", collaborator],
    () => axiosAdmin.get(`${admin.mcq.getMcqFlagStatus}${collaborator}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );
export const useUpdateMcqFlagStatus = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.mcq.updateMcqFlagStatus, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        if (onSuccess) {
          onSuccess(data?.data);
          queryClient.invalidateQueries("mcq-flag-staus");
        }
      } else {
        if (onFailed) onFailed(data?.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

//----------------------------------------------------------------FixClasses----------------------------------------------------------------
export const useGetAllFixClasses = (options) =>
  useQuery(
    "fix-sub-category",
    () => axiosAdmin.get(admin.fixClasses.getAllFixClasses),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetTermsAndConditions = (collab, options) =>
  useQuery(
    [`${collab}-terms-and-conditions`, collab],
    () =>
      axiosAdmin.get(
        `${admin.aboutFixMasterUpload.viewTermsAndConditions}/${collab}`
      ),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetWithdrawalRequestsByStatus = ({ collabId, options }) =>
  useQuery(
    ["withdrawal-req-by-status", collabId],
    () =>
      axiosAdmin.get(
        `${admin.wallet.getWithdrawalRequestByStatus}/${collabId}`
      ),

    {
      select: (data) => data.data,
      ...options,
    }
  );

// ===================Referrals============================================
export const useGetAllreferralSetting = (options) =>
  useQuery("referrals", () => axiosAdmin.get(admin.referral.getAllReferral), {
    select: (data) => data.data,
    ...options,
  });

export const useGetAllreferralSettingRecords = (options) =>
  useQuery(
    "referrals",
    () => axiosAdmin.get(admin.referral.getAllReferralAdminRecord),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const UseCreateReferralSetup = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.post(admin.referral.createReferral, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("referrals");
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

export const useUpdateReferralSetup = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosAdmin.put(admin.referral.updateReferralSettings, payload),
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("referrals");
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

export const useGetNoficationByCategory = ({ categoryId, options }) =>
  useQuery(
    ["notificatio-by-category", categoryId],
    () =>
      axiosAdmin.get(
        `${admin.notification.getNotification}?Category=${categoryId}`
      ),

    {
      select: (data) => data.data,
      ...options,
    }
  );
