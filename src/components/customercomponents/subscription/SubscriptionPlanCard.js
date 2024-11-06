import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import styled from "styled-components";
import { BookingTypes, NoOfJobs } from "./SubPlansAlt";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { formatNumberWithCommas } from "../../../utils/utilityFxns";
import SubscriptionInfoModal from "../../../pages/customerportal/Subscription/modal/SubscriptionInfoModal";
import { Fragment } from "react";
import { useGetSubPlanDetails } from "../../../hooks/useQueries/useAdmin";

const InfoTooltip = ({ id }) => {
  const { data: subscriptionDetails, isLoading } = useGetSubPlanDetails(id);
  return (
    <Tooltip
      title={
        <Fragment>
          {subscriptionDetails?.subscription?.jobCategories.length > 0
            ? subscriptionDetails?.subscription?.jobCategories.map(
                (category) => {
                  return <p>{category.longName}</p>;
                }
              )
            : "no categories currently available"}
        </Fragment>
      }
    >
      <IconButton>
        <i
          style={{ fontSize: "1rem", color: "blue" }}
          className="fa-solid fa-info"
        ></i>
      </IconButton>
    </Tooltip>
  );
};

const SubPlanCard = ({
  plan,
  type,
  selectedPlanId,
  buySub,
  updatePaymentState,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [price, setPrice] = useState();

  useEffect(() => {
    setPrice(
      plan?.plans?.[2]?.amount ||
        plan?.plans?.[1]?.amount ||
        plan?.plans?.[0]?.amount
    );
  }, []);

  const handleChange = (event) => {
    const activePlan = plan.plans.filter(
      (item) => Number(item.id) === Number(event.target.value)
    );

    const price = activePlan?.[0]?.amount;
    setPrice(price);
    const planCode = activePlan?.[0]?.planCode;
    const value = Number(event.target.value);
    updatePaymentState({
      type: "update",
      payload: { planCode, planId: value, price },
    });
  };

  const subIds = plan?.plans?.map((item) => item.id);
  const bookingClasses = plan?.jobClasses?.map(
    (bookClass) => bookClass.longName
  );

  return (
    <div className="p-3 py-4 rounded bg-white shadow position-relative">
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h3 className="fs-2 fw-bold">{plan.longName}</h3>
        <InfoTooltip id={plan.id} />
      </div>
      <span className="fs-4 fw-bold" style={{ color: "var(--clr-primary)" }}>
        &#8358;{formatNumberWithCommas(+price || 0)}
      </span>
      <div className="d-flex flex-wrap gap-4 my-4">
        {plan?.plans?.map((item) => (
          <StyledLabel key={item.id}>
            <input
              type="radio"
              name={`price`}
              checked={item.id === selectedPlanId}
              value={item.id}
              onChange={handleChange}
              disabled={!updatePaymentState}
            />
            <span>{item.duration}</span>
          </StyledLabel>
        ))}
      </div>

      <Stack spacing={2} p={[1, 2]} borderRadius={2} my={2} bgcolor={"#f8e9e2"}>
        <h3 className="fs-6 fw-bold">No of Jobs</h3>
        {plan?.plans?.map((item) => (
          <NoOfJobs paymentPlan={item} key={item.id} />
        ))}
      </Stack>

      <Box spacing={2} marginBottom={8}>
        {[...new Set(bookingClasses)].map((jobClass, index) => (
          <BookingTypes type={jobClass} key={index * Math.random()} />
        ))}
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          translate: "-50% 0",
        }}
      >
        {type === "buy" && (
          <GlobalBtn
            disabled={selectedPlanId === "" || !subIds.includes(selectedPlanId)}
            width="max-content"
            mx="auto"
            px="2.5rem"
            onClick={() => setOpenModal(true)}
          >
            Buy
          </GlobalBtn>
        )}
      </Box>
      {openModal && (
        <SubscriptionInfoModal
          open={openModal}
          close={() => setOpenModal(false)}
          buySub={() => buySub()}
        />
      )}
    </div>
  );
};

const SubscriptionPlans = ({
  allSubPlans = [],
  buySubPlan,
  planId,
  updatePaymentState,
  type,
}) => {
  return (
    <PlanContainer>
      {allSubPlans?.map((plan) => (
        <SubPlanCard
          key={plan.id}
          buySub={buySubPlan}
          plan={plan}
          selectedPlanId={planId}
          type={type}
          updatePaymentState={updatePaymentState}
        />
      ))}
    </PlanContainer>
  );
};

export default SubscriptionPlans;

const PlanContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  color: #555;
  cursor: pointer;

  input {
    position: relative;
    appearance: none;
    width: 24px;
    aspect-ratio: 1;
    margin-right: 8px;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;

    &:checked {
      background-color: #37b34a;
    }

    &:checked::before {
      content: "\\2713";
      position: absolute;
      top: -4%;
      left: 0;
      display: grid;
      place-items: center;
      width: 100%;
      height: 100%;
      color: #fff;
      font-weight: bolder;
      background-color: #37b34a;
    }

    &[type="checkbox"] {
      width: 18px;
      margin-right: 0;
      cursor: auto;
    }

    &[type="checkbox"]:checked::before {
      top: 0;
    }

    &[type="checkbox"]:checked::before {
      font-size: 0.7rem;
    }
  }
`;
