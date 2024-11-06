import { Link, useNavigate } from "react-router-dom";
import useLoginDetails from "../../../hooks/useLoginDetails";
import { BsFillBarChartFill } from "react-icons/bs";
import { FaChartPie } from "react-icons/fa";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { formatNumberWithCommas } from "../../../utils/utilityFxns";

const DashboardWalletSummary = ({
  accountData,
  openFundWallet,
  accountBalance,
  dashboardSummary = false,
  accountSummary = false,
  customAccountSummary = false,
}) => {
  const { role } = useLoginDetails();
  const navigate = useNavigate();

  if (role.toLowerCase() === "customer") {
    return (
      <div className="account">
        {customAccountSummary ? (
          <span className="balance">
            &#8358;{accountBalance?.toLocaleString()}
          </span>
        ) : accountData?.walletBalance ? (
          <span className="balance">
            &#8358;{formatNumberWithCommas(accountData?.walletBalance)}
          </span>
        ) : null}
        {customAccountSummary ? null : (
          <GlobalBtn
            fs="0.9rem"
            px="1.8em"
            py="0.6em"
            width="max-content"
            height="auto"
            onClick={openFundWallet}
          >
            Fund Wallet
          </GlobalBtn>
        )}

        <div className="loyalty">
          <Link to="/customer/loyalty">
            <BsFillBarChartFill />
            Loyalty
          </Link>
          <Link to="/customer/referral">
            <FaChartPie />
            Referrals
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="account" style={{ height: "160px", width: "220px" }}>
        {dashboardSummary && (
          <span className="balance">
            {accountData?.walletBalance?.toLocaleString()}
          </span>
        )}

        {accountSummary && (
          <span className="balance">{accountBalance?.toLocaleString()}</span>
        )}

        <div style={{ marginTop: "40px" }}>
          {accountSummary ? null : (
            <GlobalBtn
              fs="0.9rem"
              px="1.8em"
              py="0.6em"
              width="max-content"
              height="auto"
              onClick={() => navigate("../wallet/")}
            >
              Withdraw
            </GlobalBtn>
          )}
        </div>
      </div>
    );
  }
};

export default DashboardWalletSummary;
