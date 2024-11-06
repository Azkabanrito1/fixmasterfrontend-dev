import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import CustomerWalletTable from "../../../components/customercomponents/wallet/WalletTable";

const BookingHistory = () => {
  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Booking History</PageHeading>
      </div>

      <CustomerWalletTable />
    </>
  );
};

export default BookingHistory;
