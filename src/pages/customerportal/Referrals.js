import { Stack } from "@mui/material";
import { PageHeading } from "../../components/globalcomponents/Utilities";
import { FaPaperPlane } from "react-icons/fa";
import { formatNumberWithCommas } from "../../utils/utilityFxns";
import GlobalInputWithBtn from "../../components/globalcomponents/GlobalInputWithBtn";
import { useOutletContext } from "react-router-dom";
// import CustomerReferralsTable from "../../components/customercomponents/referrals/ReferralTable";

const linkBtnOptions = {
  btnText: "Share",
  bgColor: "var(--clr-primary)",
};
const codeBtnOptions = {
  btnText: "Copy",
  bgColor: "var(--clr-primary)",
};

const linkInputOptions = {
  readOnly: true,
  border: "1px solid var(--clr-primary)",
  labelText: "Your Referral Link",
};

const Referrals = (data) => {
  const referralIncome = 30000;
  const { dashboardData } = useOutletContext();
  const referralCode = dashboardData?.userReferralCode;

  return (
    <>
      <PageHeading>Referrals</PageHeading>

      <Stack spacing={2} alignItems={"center"} marginBottom={3}>
        <FaPaperPlane color="var(--clr-primary)" fontSize={"3rem"} />
        <h2 className="fs-3 fw-bold">Refer A Friend, Get A Reward</h2>
        <p className="text-center" style={{ maxWidth: "55ch" }}>
          Refer your friends and family using your referral link or code to get
          a 5% bonus from their first booking
        </p>
      </Stack>

      <p className="text-center fs-4 fw-bold">
        Total Referral Income: {formatNumberWithCommas(referralIncome)}
      </p>

      <Stack
        marginTop={2}
        marginBottom={3}
        spacing={2}
        direction={"row"}
        alignItems={"top"}
        justifyContent={"start"}
      >
        {/* <GlobalInputWithBtn
          inputOptions={linkInputOptions}
          btnOptions={linkBtnOptions}
        />
        <GlobalInputWithBtn
          inputOptions={{ ...linkInputOptions, value: referralCode }}
          btnOptions={codeBtnOptions}
        /> */}
        {/* <DateFilters
          dateQueries={dateQueries}
          setDateQueries={setDateQueries}
        /> */}
      </Stack>

      {/* <CustomerReferralsTable data={[]} /> */}
    </>
  );
};

export default Referrals;
