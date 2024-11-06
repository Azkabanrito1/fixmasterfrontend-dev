import { useState } from "react";
import GlobalInput from "../../../../../globalcomponents/GlobalInput";
import GlobalModal from "../../../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../../../layouts/modal/AltModalHeader";
import GlobalBtn from "../../../../../globalcomponents/GlobalBtn";

const ConfirmCode = ({ isOpen, closeModal, activeId, confirm }) => {
  const [deliveryCode, setDeliveryCode] = useState(null);

  const handleChange = (event) => setDeliveryCode(event.target.value);

  const handleSubmit = () => {
    const payload = {
      dispatchId: activeId,
      deliveryCode: deliveryCode,
    };
    confirm(payload);
  };

  return (
    <GlobalModal width="400px" isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading="Confirm Delivery Code" closeModal={closeModal} />
      <GlobalInput
        inputName="deliveryCode"
        inputPlaceholder="Please enter your delivery code"
        labelText="Delivery Code"
        inputType="Number"
        handleChange={handleChange}
        required
      />
      <GlobalBtn
        type="submit"
        onClick={handleSubmit}
        width="80%"
        className="m-auto mt-3"
      >
        Confirm
      </GlobalBtn>
    </GlobalModal>
  );
};

export default ConfirmCode;
