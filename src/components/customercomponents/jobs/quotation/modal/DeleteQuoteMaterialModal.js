import { MdOutlineCheckCircle } from "react-icons/md";
import GlobalFullScreenLoader from "../../../../globalcomponents/GlobalFullScreenLoader";
import GlobalModal from "../../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../../layouts/modal/AltModalHeader";
import styled from "styled-components";


const closeIconStyle = { width: "50px", height: "50px", color: "green" };
const DeleteQuoteMaterialModal = ({ open,
    close,
    onDelete,
    pText,
    labelText,
    actionText,
    isLoading,
    activeId,
    irreversible = true,}) => {
  return (
    <GlobalModal
      isOpen={open}
      width={`380px`}
      closeModal={close}
      shouldCloseOnOverlayClick={true}
    >
      <ModalBody>
        <MdOutlineCheckCircle style={closeIconStyle} />
        <h2 className="text-center">{labelText}</h2>
        <p>
          {pText}
          {irreversible && (
            <>
              <br /> <span>This process cannot be reversed.</span>
            </>
          )}
        </p>
        <CancelAccept>
          <CancelButton onClick={close}>Cancel</CancelButton>
          <AcceptButton onClick={onDelete}>{actionText}</AcceptButton>
        </CancelAccept>
      </ModalBody>

      {isLoading && <GlobalFullScreenLoader open={isLoading} />}
    </GlobalModal>
  );
};
export default DeleteQuoteMaterialModal;
const ModalBody = styled.div`
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

const CancelAccept = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  background: #d9d9d9;
`;

const AcceptButton = styled.button`
  background: green;
`;
