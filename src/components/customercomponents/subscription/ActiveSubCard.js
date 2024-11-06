import { Button, Tooltip } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import { useEnableDisableSub } from "../../../hooks/useQueries/usePayment";

const SubCard = ({ plan = {} }) => {
  const time = new Date(plan.endDate);
  const navigate = useNavigate();
  const { days, hours, minutes, seconds } = useTimer({
    expiryTimestamp: time,
  });
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
  };

  const onError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: unsubscribe } = useEnableDisableSub(onSuccess, onError);

  const unsubscribeAction = (e) => {
    e.stopPropagation();

    const unsubscribePayload = {
      token: plan.emailToken,
      code: plan.subscriptionCode,
      subActionType: 2,
    };

    unsubscribe(unsubscribePayload);
  };

  const subscribeAction = (e) => {
    e.stopPropagation();

    const unsubscribePayload = {
      token: plan.emailToken,
      code: plan.subscriptionCode,
      subActionType: 1,
    };

    unsubscribe(unsubscribePayload);
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center p-3 mb-4 bg-white rounded"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`jobs-done/${plan.subscriptionId}`)}
    >
      <div>
        <div className="mb-3" style={{ color: "var(--clr-primary)" }}>
          <div className="fs-3 fw-bold">
            {days} days : {hours}hr : {minutes}m : {seconds}s
          </div>
          <span className="d-block fw-bold">Remaining</span>
        </div>
        <small className="text-muted" style={{ fontSize: ".6rem" }}>
          *Tap to see all jobs done with this subscription
        </small>
      </div>
      <div>
        <h3
          className="text-right fw-bold fs-4"
          style={{ color: "var(--clr-primary)" }}
        >
          {plan.longName}
        </h3>
        <div className="d-flex mb-1 align-items-center">
          <h4 className="me-2 mb-0" style={{ fontSize: ".9rem" }}>
            Available Jobs:
          </h4>
          <span style={{ color: "var(--clr-primary)", fontSize: "1.2rem" }}>
            {plan.jobsNo}
          </span>
        </div>
        <div className="d-flex mb-1 align-items-center">
          <h4 className="me-2 mb-0" style={{ fontSize: ".9rem" }}>
            Used Jobs:
          </h4>
          <span style={{ color: "var(--clr-primary)", fontSize: "1.2rem" }}>
            {plan.jobsNo - plan.jobsLeft}
          </span>
        </div>

        {plan.status.toLowerCase() !== "non-renewing" ? (
          <Tooltip title="Unsubscribe to prevent a renewal of this subscription">
            <Button
              sx={{
                color: "#fff",
                backgroundColor: "var(--clr-primary)",
                fontWeight: 600,
              }}
              onClick={unsubscribeAction}
            >
              Unsubscribe
            </Button>
          </Tooltip>
        ) : (
          <Tooltip title="Subcribe to the renewal of this subscription">
            <Button
              sx={{
                color: "#fff",
                backgroundColor: "var(--clr-primary)",
                fontWeight: 600,
              }}
              onClick={subscribeAction}
            >
              Subscribe
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default SubCard;
