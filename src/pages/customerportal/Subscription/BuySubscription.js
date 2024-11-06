import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useReducer } from "react";
import { useSnackbar } from "notistack";
import { useGetUserProfile } from "../../../hooks/useQueries/useIdentity";
import SubscriptionBenefits from "../../../components/customercomponents/subscription/SubscriptionBenefits";
import SubscriptionPlans from "../../../components/customercomponents/subscription/SubscriptionPlanCard";
import { useInitPayStack } from "../../../hooks/useQueries/usePayment";
import GlobalFullScreenLoader from "../../../components/globalcomponents/GlobalFullScreenLoader";
import { useGetSubPlansByStatus } from "../../../hooks/useQueries/useAdmin";

const initPaymentState = {
  price: "",
  subPlanId: "",
  planCode: "",
};

const paymentStateReducer = (state, action) => {
  const { price, planCode, planId } = action.payload;
  switch (action.type) {
    case "update":
      return {
        price,
        planCode,
        subPlanId: planId,
      };
    default:
      return state;
  }
};

const BuySubscription = () => {
  const { data: profile } = useGetUserProfile();
  const { data: allSubPlansData, isLoading } = useGetSubPlansByStatus("Active");
  const allSubPlans = allSubPlansData?.data;
  const { enqueueSnackbar } = useSnackbar();
  const [paymentState, setPaymentState] = useReducer(
    paymentStateReducer,
    initPaymentState
  );
  const onSuccess = (response) =>
    (window.location.href = response.data.data.authorization_url);

  const onError = (response) =>
    enqueueSnackbar(response.message, { variant: "error" });

  const { mutate: initPayment, isLoading: isInitiating } = useInitPayStack(
    onSuccess,
    onError
  );

  const email = profile?.user?.email;

  const buySubPlan = async () => {
    const payload = {
      email,
      gifteeEmail: "",
      amount: String(paymentState.price),
      planCode: paymentState.planCode,
      subscriptionPlanId: +paymentState.subPlanId,
      fixId: 0,
      paymentTypes: 2,
    };

    initPayment(payload);
  };

  const usablePlans = allSubPlans?.filter(
    (plan) => plan.plans.length > 0 && plan.plans.length < 4
  );

  return (
    <>
      <BackBtn />
      <PageHeading>Account Subscription</PageHeading>
      <img
        src="/images/note-icon.png"
        alt=""
        className="mx-auto d-block mb-4"
      />

      <h2 className="fs-5 mb-3 fw-bold">
        Why not take out a subscription with FixMaster and enjoy the following
        benefits
      </h2>
      <SubscriptionBenefits />

      {!isLoading && (
        <SubscriptionPlans
          allSubPlans={usablePlans}
          buySubPlan={buySubPlan}
          planId={paymentState.subPlanId}
          updatePaymentState={setPaymentState}
          type={"buy"}
        />
      )}

      <GlobalFullScreenLoader open={isInitiating} />
    </>
  );
};

export default BuySubscription;
