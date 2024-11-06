import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { PaymentContent } from "../PaymentUtilities";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import {
  useGetCustomerSubscriptions,
  useSubForJob,
} from "../../../../hooks/useQueries/useJobs";
import { PATH_CUSTOMER } from "../../../../routes/paths";
import GlobalBallBeat from "../../../globalcomponents/GlobalBallBeat";
import differenceInDays from "date-fns/differenceInDays";

const PayWithSubscription = ({
  isOpen,
  closeModal,
  fixId,
  openPaymentOptions,
}) => {
  const { data: activeSubsData, isLoading } = useGetCustomerSubscriptions();
  const activeSubs = activeSubsData?.data;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // ------------------callbacks ----------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
    navigate(PATH_CUSTOMER.newFix);
  };
  const onFailure = (response) =>
    enqueueSnackbar(response.message, { variant: "error" });

  const { mutate: payForBookingWithSub, isLoading: isSubmitting } =
    useSubForJob(onSuccess, onFailure);

  const payWithSub = async (subId) => {
    const payload = {
      fixId: fixId,
      subscriptionId: subId,
    };

    payForBookingWithSub(payload);
  };

  return (
    <GlobalModal
      isOpen={isOpen}
      closeModal={() => {
        closeModal();
        openPaymentOptions();
      }}
      shouldCloseOnOverlayClick={false}
    >
      <AltModalHeader
        closeModal={() => {
          closeModal();
          openPaymentOptions();
        }}
      />

      <PaymentContent>
        <div className="fee">
          By using your subscription, there is no booking fee
        </div>

        <div className="total">
          <h3>Total</h3>
          <span>N 0.00</span>
        </div>
      </PaymentContent>

      <GlobalBallBeat loading={isLoading} />

      {!isLoading &&
        (activeSubs?.length > 0 ? (
          activeSubs?.map((plan) => {
            const today = new Date();
            const expiryDate = new Date(plan.endDate);

            const daysToExpiry = differenceInDays(expiryDate, today);

            return (
              <div
                key={plan.subscriptionPlanId}
                className="d-flex justify-content-between align-items-center p-3 mb-4 rounded"
                style={{ cursor: "pointer", backgroundColor: "#feefe9" }}
              >
                <div>
                  <h3 className="fs-5 fw-bold">{plan.longName}</h3>
                  <span className="text-muted">
                    {daysToExpiry} days remaining
                  </span>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <span className="mb-3">{plan.jobsLeft} jobs left</span>
                  <Button
                    sx={{
                      textTransform: "none",
                      color: "#fff",
                      backgroundColor: "var(--clr-primary)",
                      ":hover": {
                        backgroundColor: "#333",
                      },
                    }}
                    disabled={isSubmitting}
                    onClick={() => payWithSub(plan.id)}
                  >
                    {isSubmitting ? "Loading" : "Pay with Subscription"}
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <p className="text-muted text-center mb-1">
              You do not have any active subscription plan.
            </p>
            <p className="text-muted text-center mb-4">
              You can either buy a new plan or close this modal to change your
              payment option.
            </p>
            <GlobalBtn
              onClick={() => navigate("/buy-subscription")}
              className="mt-4"
              mx="auto"
              width="auto"
              px="2.5em"
            >
              Buy Subscripton
            </GlobalBtn>
          </>
        ))}
    </GlobalModal>
  );
};

export default PayWithSubscription;
