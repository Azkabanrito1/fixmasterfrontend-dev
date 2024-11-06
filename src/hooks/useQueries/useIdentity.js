import axiosIdentity from "../../config/axios/axiosIdentity";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { identity } from "../../config/endpoints/identity";

export const useLogin = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(identity.account.login, payload),
    onSuccess: (data) => {
      const { status } = data.data;

      if (status.toLowerCase() === "success") {
        localStorage.setItem("loginDetails", JSON.stringify(data.data));
        queryClient.refetchQueries("user-profile");
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

export const useRegister = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(identity.account.register, payload),
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

export const useCreatePassword = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(identity.account.createPwd, payload),
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

export const useResetPassword = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(identity.account.resetPwd, payload),
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

export const useChangePassword = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(identity.account.changePwd, payload),
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

export const useConfirmEmail = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(identity.account.confirmEmail, payload),
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

export const useSetUserLogSession = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(identity.account.setUserLogSession, payload),
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

export const useGetUserLogSession = (role, options) =>
  useQuery(
    ["userLogSession-by-role", role],
    () => axiosIdentity.get(`${identity.account.getUserLogSession}/${role}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useDeactivateAccount = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: () => axiosIdentity.post(identity.account.deactivate),
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

export const useStartPasswordRecover = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (uid) =>
      axiosIdentity.post(`${identity.account.pwdRecovery}/${uid}`),
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

export const useResendVerificationToken = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (email) =>
      axiosIdentity.post(`${identity.account.resendToken}${email}`),
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

export const useSwitchAccount = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (role) =>
      axiosIdentity.post(`${identity.account.switchAccount}${role}`),
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

export const useGetUserProfile = (options) =>
  useQuery(
    "user-profile",
    () => axiosIdentity.get(identity.account.userProfile),
    {
      cacheTime: Infinity,
      staleTime: 36000000, // user-profile becomes stale after 10 minutes
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetUserMenu = () =>
  useQuery("user-menu", () => axiosIdentity.get(identity.account.userMenu), {
    cacheTime: Infinity,
    staleTime: Infinity,
    select: (data) => data.data,
  });

export const useGetUserId = (options) =>
  useQuery("user-id", () => axiosIdentity.get(identity.account.userId), {
    select: (data) => data.data,
    ...options,
  });

export const useGetUserById = (id, options) =>
  useQuery(
    ["user-by-id", id],
    () => axiosIdentity.get(`${identity.account.userById}${id}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetUserDashboard = (options) =>
  useQuery(
    "user-dashboard",
    () => axiosIdentity.get(identity.account.userDashboard),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetAdminRoles = (options) =>
  useQuery(
    "admin-roles",
    () => axiosIdentity.get(identity.account.adminRoles),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetCollaboratorRoles = (options) =>
  useQuery(
    "collaborator-roles",
    () => axiosIdentity.get(identity.account.allCollaboratorRoles),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetCustomerTypes = (options) =>
  useQuery(
    "customer-types",
    () => axiosIdentity.get(identity.account.customerTypes),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetUsersByCategory = (categoryName, options, queryParams) =>
  useQuery(
    ["users-by-category", categoryName, queryParams],
    () =>
      axiosIdentity.get(`${identity.account.usersByCategory}/${categoryName}`, {
        params: queryParams,
      }),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useSuspendUser = (onSuccess, onFailed, role) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(identity.account.suspend, payload),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
        queryClient.invalidateQueries(["users-by-category", role]);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useUnsuspendUser = (onSuccess, onFailed, role) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      axiosIdentity.get(`${identity.account.unsuspend}/${id}`),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
        queryClient.invalidateQueries(["users-by-category", role]);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGiftSubscription = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(identity.account.giftSub, payload),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful && data?.data?.statusCode === 201) {
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

export const useGetUserIdCard = (options) =>
  useQuery(
    "user-card",
    () => axiosIdentity.get(identity.account.getUserIdCard),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useCreateFMUser = (onSuccess, onFailed, role) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(`${identity.account.createFmUser}`, payload),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful && data?.data?.statusCode === 201) {
        queryClient.invalidateQueries("users-by-category", role);
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

export const useValidateGuarantor = (gid, options) =>
  useQuery(
    ["guarantee-details", gid],
    () => axiosIdentity.get(`${identity.account.validateGuarantor}${gid}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGuarantorResponse = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(`${identity.account.guarantorResponse}`, payload),
    onSuccess: (data) => {
      if (data?.data?.status.toLowerCase() === "success") {
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

export const useGetReferral = (options) =>
  useQuery(
    "referral",
    () => axiosIdentity.get(`${identity.account.useReferral}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );
// =============================BILLING =============================
export const useAddCard = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(`${identity.billing.newCard}`, payload),
    onSuccess: (data) => {
      if (data?.data?.status.toLowerCase() === "success") {
        queryClient.invalidateQueries("debit-cards");
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

export const useDeleteCard = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cardId) =>
      axiosIdentity.post(`${identity.billing.deleteCard}${cardId}`),
    onSuccess: (data) => {
      if (data?.data?.status.toLowerCase() === "success") {
        queryClient.invalidateQueries("debit-cards");
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

export const useUpdateDefaultCard = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      axiosIdentity.post(`${identity.billing.updateDefaultCard}${id}`),
    onSuccess: (data) => {
      if (data?.data?.status.toLowerCase() === "success") {
        queryClient.invalidateQueries("debit-cards");
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

export const useGetCards = (options) =>
  useQuery(
    "debit-cards",
    () => axiosIdentity.get(identity.billing.getUserCards),
    {
      select: (data) => data.data,
      ...options,
    }
  );

// ===========================User Addresses =========================

export const useCreateAddressOnRequest = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(`${identity.userAddress.createAddress}`, payload),
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

export const useCreateCustomerAddress = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(
        `${identity.userAddress.createCustomerAddress}`,
        payload
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
        queryClient.invalidateQueries("customer-addresses");
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useSetDefaultAddress = ({ onSuccess, onFailed }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (addId) =>
      axiosIdentity.put(`${identity.userAddress.setDefaultAddress}${addId}`),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
        queryClient.invalidateQueries("customer-addresses");
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useUpdateCustomerAddress = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.put(
        `${identity.userAddress.updateCustomerAddress}`,
        payload
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
        queryClient.invalidateQueries("customer-addresses");
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useDeleteCustomerAddress = ({ addId, onSuccess, onFailed }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      axiosIdentity.delete(
        `${identity.userAddress.deleteCustomerAddress}${addId}`
      ),
    onSuccess: (data) => {
      if (
        data?.data?.status &&
        data?.data?.status?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
        queryClient.invalidateQueries("customer-addresses");
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (error) => {
      if (onFailed) onFailed(error);
    },
  });
};

export const useGetCustomerAddresses = (options) =>
  useQuery(
    "customer-addresses",
    () => axiosIdentity.get(identity.userAddress.getCustomerAddress),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetAddressDetailsById = (addId, options) =>
  useQuery(
    ["customer-address", addId],
    () => axiosIdentity.get(`${identity.userAddress.addressById}${addId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

// ================================Values============================

export const useGetStates = (options) =>
  useQuery("states", () => axiosIdentity.get(identity.values.getStates), {
    select: (data) => data.data,
    ...options,
  });

export const useGetCitiesByLga = (lgaId, options) =>
  useQuery(
    ["cities-by-lga", lgaId],
    () => axiosIdentity.get(`${identity.values.getCitiesByLgaId}/${lgaId}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useGetLgaByStateName = (stateName, options) =>
  useQuery(
    ["lgas-by-state-name", stateName],
    () =>
      axiosIdentity.get(`${identity.values.getLgasByStateName}${stateName}`),
    {
      select: (data) => data.data,
      enabled: !!stateName,
      ...options,
    }
  );

export const useGetLgaByStateId = (stateId, options) =>
  useQuery(
    ["lgas-by-state-id", stateId],
    () => axiosIdentity.get(`${identity.values.getLgasByStateId}${stateId}`),
    {
      select: (data) => data.data,
      refetchOnWindowFocus: false,
      ...options,
    }
  );

export const useUpdateLiveLocation = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(identity.values.updateLiveAddress, payload),
    onSuccess: (data) => {
      if (data?.data?.data && data?.data?.data?.toLowerCase() === "success") {
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

export const useNotificationPreference = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(
        identity.preferences.saveNotificationPreferences,
        payload
      ),
    onSuccess: (data) => {
      if (data?.data?.data && data?.data?.data?.toLowerCase() === "success") {
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
export const useSaveContactPreference = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(identity.preferences.saveContact, payload),
    onSuccess: (data) => {
      if (data?.data?.data && data?.data?.data?.toLowerCase() === "success") {
        queryClient.invalidateQueries("contact-preference");
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
export const useSaveNotificationsPreference = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(identity.preferences.saveNotifications, payload),
    onSuccess: (data) => {
      if (data?.data?.data && data?.data?.data?.toLowerCase() === "success") {
        queryClient.invalidateQueries("contact-notifications-preference");
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

export const useGetContactAndNotificationsPreference = (options) =>
  useQuery(
    "contact-notifications-preference",
    () => axiosIdentity.get(`${identity.preferences.contactAndNotifications}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );
export const useGetWorkingType = (options) =>
  useQuery(
    "working-type",
    () => axiosIdentity.get(`${identity.preferences.getWorkingType}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useGetUserRole = (options) =>
  useQuery(
    "user-role",
    () => axiosIdentity.get(`${identity.values.getUserRole}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );

export const useSaveNotificationPreference = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(identity.preferences.saveWorkingNotification, payload),
    onSuccess: (data) => {
      if (data?.data?.data && data?.data?.data?.toLowerCase() === "success") {
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
export const useSaveLocationPreference = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(identity.preferences.saveLocationPreference, payload),
    onSuccess: (data) => {
      if (data?.data?.data && data?.data?.data?.toLowerCase() === "success") {
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

// ======================= upload ======================
export const useUploadImage = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (image) =>
      axiosIdentity.post("Upload/UploadImage", image, {
        // headers: { "Content-type": "multipart/form-data" },
      }),
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
  });
};

export const useUploadVideo = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (video) => axiosIdentity.post("Upload/UploadVideo", video),
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
  });
};

export const useUploadDoc = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (doc) => axiosIdentity.post("Upload/UploadDocument", doc),
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
  });
};

export const useDeleteUpload = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (docId) =>
      axiosIdentity.post(`Upload/DeleteUploadedFile?publicId=${docId}`),
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
  });
};

export const useGetMessagesToFmAdmin = (options) => {
  useQuery(
    "messages-to-fm-admin",
    () => axiosIdentity.get(`${identity.userManageMent.viewFmMessages}`),
    {
      select: (data) => data?.data,
      ...options,
    }
  );
};

export const useViewTickets = (options) => {
  const payload = {
    userRole: null,
    messageType: null,
  };
  return useQuery(
    "comment-tickets",
    () => axiosIdentity.post(identity.userManageMent.viewTickets, payload),
    {
      select: (data) => data?.data,
      ...options,
    }
  );
};

export const useSendMessageToFmAdmin = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(identity.userManageMent.sendMessageToFmAdmin, payload),
    onSuccess: (data) => {
      if (data?.data?.data && data?.data?.data?.toLowerCase() === "success") {
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
  });
};
export const useGetPromotions = (options) =>
  useQuery(
    "available-promotions",
    () => axiosIdentity.get(identity.promotion.getPromotions),
    {
      select: (data) => data?.data,
      ...options,
    }
  );
export const useReplyTicket = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosIdentity.post(identity.userManageMent.replyTicket, payload),
    onSuccess: (data) => {
      if (
        data?.data?.message &&
        data?.data?.message?.toLowerCase() === "success"
      ) {
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
  });
};

export const useGetTicketInfo = (id, options) =>
  useQuery(
    ["ticket-info", id],
    () => axiosIdentity.get(`${identity.userManageMent.ticketResponses}/${id}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );
