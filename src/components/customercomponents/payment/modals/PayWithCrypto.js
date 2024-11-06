import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { PaymentContent, PaymentHeader } from "../PaymentUtilities";

const PayWithCrypto = ({ isOpen, closeModal }) => {
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader closeModal={closeModal} />

      <PaymentHeader>
        <h2>Crypto Currency</h2>
        <p>Pay via cryptocurrency</p>
      </PaymentHeader>

      <PaymentContent>
        <div className="fee">
          <h3>Booking fee</h3>
          <span>N 3000</span>
        </div>

        <div className="total">
          <h3>Total</h3>
          <span>N 0.00</span>
        </div>
      </PaymentContent>

      <GlobalBtn mx="auto">Proceed</GlobalBtn>
    </GlobalModal>
  );
};

export default PayWithCrypto;
