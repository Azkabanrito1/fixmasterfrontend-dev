import React from "react";
import styled from "styled-components";
import GlobalModal from "../GlobalModal";
import { MdOutlineCancel } from "react-icons/md";
import GlobalFullScreenLoader from "../GlobalFullScreenLoader";

const closeIconStyle = { width: "50px", height: "50px", color: "red" };

function ConfirmDeleteModal({
  open,
  close,
  pText,
  labelText,
  actionText,
  pText2,
  onDelete,
  isLoading,
  irreversible,
}) {
  return (
    <GlobalModal width="380px" isOpen={open} closeModal={close}>
      <ModalBody>
        <MdOutlineCancel style={closeIconStyle} />
        <h2>{labelText}</h2>
        <p>
          {pText}
          {irreversible && (
            <span>
              <br /> This process cannot be reversed.
            </span>
          )}
          {pText2 && (
            <>
              <br />
              <br />
              <span>
                <span style={{ fontWeight: "bold" }}>Note: </span>
                {pText2}
              </span>
            </>
          )}
        </p>
        <CancelDelete>
          <CancelButton onClick={close}>Cancel</CancelButton>
          <DeleteButton onClick={onDelete}>{actionText}</DeleteButton>
        </CancelDelete>
      </ModalBody>

      {isLoading && <GlobalFullScreenLoader open={isLoading} />}
    </GlobalModal>
  );
}

export default ConfirmDeleteModal;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & h2 {
    margin-top: 20px;
    font-size: 25px;
  }

  & p {
    text-align: center;
    margin-top: 20px;
    font-size: 18px;
  }

  & button {
    appearance: none;
    border: none;
    padding: 0.6rem 2.5rem;
    cursor: pointer;
    border-radius: 8px;

    color: white;
  }
`;

export const CancelDelete = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
`;

export const CancelButton = styled.button`
  background: #444;
`;

export const DeleteButton = styled.button`
  background: #e60000;
`;
