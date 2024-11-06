import { BsArrowLeftRight, BsBarChartFill } from "react-icons/bs";
import { PageHeading } from "../../components/globalcomponents/Utilities";
import { Stack } from "@mui/material";
import { formatNumberWithCommas } from "../../utils/utilityFxns";
import GlobalInput from "../../components/globalcomponents/GlobalInput";
// import CustomerLoyaltyTable from "../../components/customercomponents/loyalty/LoyaltyTable";

const Loyalty = () => {
  const earned = 400000;

  return (
    <>
      <PageHeading className="mb-4">Loyalty</PageHeading>

      <Stack spacing={2} alignItems={"center"} marginBottom={3}>
        <BsBarChartFill color="var(--clr-primary)" fontSize={"3rem"} />
        <p className="fs-4 fw-bold">
          Total Loyalty Earned: {formatNumberWithCommas(earned)}
        </p>
      </Stack>

      <Stack direction={"row"} marginBottom={3}>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <GlobalInput labelText="From" inputType="date" inputName="from" />
          <BsArrowLeftRight color="var(--clr-primary)" fontSize={"1.5rem"} />
          <GlobalInput labelText="To" inputType="date" inputName="to" />
        </Stack>
      </Stack>

      {/* <CustomerLoyaltyTable data={[]} /> */}
    </>
  );
};

export default Loyalty;
