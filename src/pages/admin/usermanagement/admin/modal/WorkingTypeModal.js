import styled from "styled-components";
import GlobalModal from "../../../../../components/globalcomponents/GlobalModal";
import { MdOutlineCheckCircle } from "react-icons/md";
import GlobalFullScreenLoader from "../../../../../components/globalcomponents/GlobalFullScreenLoader";

const closeIconStyle = { width: "50px", height: "50px", color: "green" };

const WorkingTypeModal = ({
  open,
  close,
  onDelete,
  pText,
  labelText,
  actionText,
  isLoading,
}) => {
  return (
    <>
      <GlobalModal width="380px" isOpen={open} closeModal={close}>
        <ModalBody>
          <MdOutlineCheckCircle style={closeIconStyle} />
          <h2 className="text-center">{labelText}</h2>
          <p>{pText}</p>
          <CancelAccept>
            <CancelButton onClick={close}>Cancel</CancelButton>
            <AcceptButton onClick={onDelete}>{actionText}</AcceptButton>
          </CancelAccept>
        </ModalBody>

        {isLoading && <GlobalFullScreenLoader open={isLoading} />}
      </GlobalModal>
    </>
  );
};
export default WorkingTypeModal;
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
  background: #000;
  color: #fff;
  transition: all 0.3s linear;
  &:hover {
    background-color: #d9d9d9;
    color: #000;
  }
`;

const AcceptButton = styled.button`
  background: green;
`;
