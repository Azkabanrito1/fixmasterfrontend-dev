import GlobalModal from "../GlobalModal";
import { Fields, FormGroup } from "../Utilities";
import GlobalTextArea from "../GlobalTextArea";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalBtn from "../GlobalBtn";
import { useState } from "react";
import GlobalFullScreenLoader from "../GlobalFullScreenLoader";

const ConfirmRejectionModal = ({
  isOpen,
  closeModal,
  labelText,
  onReject,
  pText,
  isLoading,
  placeholder = "State the reason for rejecting applicant",
}) => {
  const [reason, setReason] = useState();

  const handleChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = () => {
    const payload = {
      reason,
    };
    onReject(payload);
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal} width="500px">
      <AltModalHeader heading={labelText} closeModal={closeModal} />

      <Fields>
        <h6 style={{ fontSize: "20px" }}>{pText}</h6>
        <span>
          <strong style={{ fontWeight: "bold" }}>Please note, </strong>this
          process cannot be reversed.
        </span>
        <FormGroup columns="1" style={{ marginTop: "1rem" }}>
          <GlobalTextArea
            labelText="State reason for rejection"
            inputName={"reason"}
            inputPlaceholder={placeholder}
            inputValue={reason}
            handleChange={handleChange}
          />
        </FormGroup>
        <GlobalBtn onClick={handleSubmit} className="m-auto mt-3">
          Reject
        </GlobalBtn>
      </Fields>
      {isLoading && <GlobalFullScreenLoader open={isLoading} />}
    </GlobalModal>
  );
};

export default ConfirmRejectionModal;
