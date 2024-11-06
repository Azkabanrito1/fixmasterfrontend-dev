import { axiosAuth } from "../../config/axios/axiosConfig";
import { useMutation } from "react-query";

export const useSendMessage = (onSuccess, onFailed) => {
  useMutation({
    mutationFn: (payload) =>
      axiosAuth.post("UserMessaging/SendMessage", payload),
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
