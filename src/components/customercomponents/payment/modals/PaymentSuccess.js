import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalModal from "../../../globalcomponents/GlobalModal";

const PayWithTransfer = ({ isOpen, closeModal }) => {
  const bookingNo = "booking is fine";

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingNo);
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <div className="text-center pb-3 mb-5 border-bottom">
        <img src="/images/success.png" alt="payment success" />
      </div>

      <p className="text-center mb-2" style={{ fontSize: "1.2rem" }}>
        Your payment with ref no: xxxxx was successful
      </p>

      <p className="text-center mb-4" style={{ fontSize: "1.2rem" }}>
        Your booking number is: xxxx
        <i
          className="fa fa-copy ms-3"
          style={{ fontSize: "1.4rem", color: "var(--clr-primary)" }}
          onClick={handleCopy}
        ></i>
      </p>

      <GlobalBtn mx="auto">Proceed</GlobalBtn>
    </GlobalModal>
  );
};

export default PayWithTransfer;
