import { Box, Paper, Stack } from "@mui/material";
import { BiSolidCheckboxChecked } from "react-icons/bi";
import styled from "styled-components";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { formatNumberWithCommas } from "../../../utils/utilityFxns";

export const NoOfJobs = ({ paymentPlan }) => (
  <Stack direction={"row"} justifyContent={"space-between"}>
    <span>{paymentPlan.duration}</span>
    <span className="fw-bold">{paymentPlan.numberOfJobs}</span>
  </Stack>
);

export const BookingTypes = ({ type }) => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <span>{type}</span>
      <span>
        <BiSolidCheckboxChecked color="#37b34a" fontSize={"2rem"} />
      </span>
    </Stack>
  );
};

const SubPlansCardAlt = ({ plan, type, action }) => {
  const yearlyPlan = plan?.plans?.filter(
    (plan) => plan.duration.toLowerCase() === "yearly"
  );

  const bookingClasses = plan?.jobClasses?.map(
    (bookClass) => bookClass.longName
  );

  return (
    <Paper
      sx={{
        position: "relative",
        paddingInline: "1rem",
        paddingBlock: "1.5rem 5rem",
        borderRadius: "1rem",
      }}
    >
      <div>
        <h3 className="fs-3 fw-bold">{plan.longName}</h3>
        <span className="fs-4 fw-bold" style={{ color: "var(--clr-primary)" }}>
          &#8358;{formatNumberWithCommas(yearlyPlan[0].amount || 0)}
        </span>
      </div>

      <Stack spacing={2} p={[1, 2]} borderRadius={2} my={2} bgcolor={"#f8e9e2"}>
        <h3 className="fs-6 fw-bold">No of Jobs</h3>
        {yearlyPlan.map((item) => (
          <NoOfJobs paymentPlan={item} key={item.id} />
        ))}
      </Stack>

      <Stack spacing={2} marginBottom={3}>
        {[...new Set(bookingClasses)].map((jobClass, index) => (
          <BookingTypes type={jobClass} key={index * Math.random()} />
        ))}
      </Stack>

      <Box
        sx={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          translate: "-50% 0",
        }}
      >
        <GlobalBtn
          width="max-content"
          px="2rem"
          mx="auto"
          onClick={() => action(plan.id)}
        >
          {type === "buy" ? "Buy Subscription" : "Gift Subscription"}
        </GlobalBtn>
      </Box>
    </Paper>
  );
};

const SubPlansAlt = ({
  allSubPlans = [],
  action,
  planId,
  updatePaymentState,
  type,
}) => {
  return (
    <PlanContainer>
      {allSubPlans?.map((plan) => (
        <SubPlansCardAlt
          key={plan.id}
          action={action}
          plan={plan}
          selectedPlanId={planId}
          type={type}
          updatePaymentState={updatePaymentState}
        />
      ))}
    </PlanContainer>
  );
};

export default SubPlansAlt;

const PlanContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;
