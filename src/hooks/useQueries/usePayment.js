import axiosPayment from "../../config/axios/axiosPayment";
import { useMutation, useQueryClient } from "react-query";
import payment from "../../config/endpoints/payment";

export const useInitPayStack = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (payload) =>
      axiosPayment.post(payment.initiatePayment, payload),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful && data?.data?.statusCode === 200) {
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (data) => onFailed(data.data),
  });
};

export const useVerifyPayment = (onSuccess, onFailed) => {
  return useMutation({
    mutationFn: (refId) =>
      axiosPayment.get(`${payment.verifyPayment}?referenceId=${refId}`),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful && data?.data?.statusCode === 200) {
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (data) => onFailed(data.data),
  });
};

export const useEnableDisableSub = (onSuccess, onFailed) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axiosPayment.post(payment.enableDisableSub, payload),
    onSuccess: (data) => {
      if (data?.data?.isSuccessful && data?.data?.statusCode === 200) {
        queryClient.invalidateQueries("customer-active-subscriptions");
        if (onSuccess) onSuccess(data.data);
      } else {
        if (onFailed) onFailed(data.data);
      }
    },
    onError: (data) => onFailed(data.data),
  });
};
