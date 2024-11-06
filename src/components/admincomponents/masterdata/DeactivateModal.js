import React, { useState } from "react";
import GlobalModal from "../../globalcomponents/GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalFullScreenLoader from "../../globalcomponents/GlobalFullScreenLoader";
import { MdOutlineCancel } from "react-icons/md";
import {
  CancelButton,
  CancelDelete,
  DeleteButton,
  ModalBody,
} from "../../globalcomponents/modals/ConfirmDeleteModal";

const closeIconStyle = { width: "50px", height: "50px", color: "red" };

const DeactivateModal = ({
  isOpen,
  closeModal,
  heading,
  labelText,
  onSubmit,
  isLoading,
  pText,
  actionText,
}) => {
  const [date, setDate] = useState("");
  const [showDateInput, setShowDateInput] = useState(false);

  const handleSubmit = function (event) {
    event.preventDefault();

    const payload = {
      date,
    };
    onSubmit(payload);
  };

  const today = new Date().toISOString().split("T").at(0);

  const onDelete = () => {
    setShowDateInput(true);
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal} width="500px">
      <AltModalHeader heading={heading} closeModal={closeModal} />
      {!showDateInput && (
        <ModalBody>
          <MdOutlineCancel style={closeIconStyle} />
          <p>{pText}</p>
          <CancelDelete>
            <CancelButton onClick={closeModal}>No</CancelButton>
            <DeleteButton onClick={onDelete}>{actionText}</DeleteButton>
          </CancelDelete>
        </ModalBody>
      )}
      {showDateInput && (
        <>
          <GlobalInput
            inputType="date"
            inputValue={date}
            handleChange={(e) => setDate(e.target.value)}
            labelText={labelText}
            min={today}
            required
          />

          <GlobalBtn
            className="m-auto mt-3"
            width="200px"
            type="submit"
            onClick={handleSubmit}
            disabled={!date}
          >
            Submit
          </GlobalBtn>
        </>
      )}
      <GlobalFullScreenLoader open={isLoading} />
    </GlobalModal>
  );
};

export default DeactivateModal;
