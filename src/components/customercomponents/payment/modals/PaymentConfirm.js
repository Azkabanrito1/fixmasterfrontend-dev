import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { PATH_CUSTOMER } from "../../../../routes/paths";
import { useVerifyPayment } from "../../../../hooks/useQueries/usePayment";

const PaymentConfirm = () => {
  const [paymentType, setPaymentType] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const searchParams = new URLSearchParams(window.location.search);
  const reference = searchParams.get("reference");
  function onSuccess(response) {
    enqueueSnackbar(response.message, { variant: "success" });
    setIsLoading(false);
    setPaymentType(response.data);
  }
  function onFail(response) {
    enqueueSnackbar(response.message, { variant: "error" });
    setPaymentType(response.data);
  }

  const { mutate: verifyPayment } = useVerifyPayment(onSuccess, onFail);

  useEffect(() => {
    verifyPayment(reference);
  }, []);

  function routePayment(paymentPurpose) {
    switch (paymentPurpose?.toLowerCase()) {
      case "fix":
        return <Navigate to={PATH_CUSTOMER.newFix} />;
      case "subscription":
        return <Navigate to={PATH_CUSTOMER.subHome} />;
      case "wallet":
        return <Navigate to={PATH_CUSTOMER.walletHome} />;
      case "gift":
        return (
          <Navigate
            to={`${PATH_CUSTOMER.giftSubForm}?email=${paymentType.email}&reference=${reference}`}
          />
        );
      default:
        return <Navigate to={PATH_CUSTOMER.dashboard} />;
    }
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    routePayment(paymentType?.paymentPurpose)
  );
};

export default PaymentConfirm;
