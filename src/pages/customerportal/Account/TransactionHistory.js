import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import CustomerWalletTable from "../../../components/customercomponents/wallet/WalletTable";

const TransactionHistory = () => {
  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Transaction History</PageHeading>
      </div>

      <CustomerWalletTable />
    </>
  );
};

export default TransactionHistory;
