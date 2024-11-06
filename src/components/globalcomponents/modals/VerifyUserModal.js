import styled from "styled-components";
import GlobalBtn from "../GlobalBtn";
import GlobalModal from "../GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";

const VerifyUserModal = ({ isOpen, closeModal, verifyToken, isVerified }) => {
  return (
    <GlobalModal
      isOpen={isOpen}
      closeModal={closeModal}
      shouldCloseOnOverlayClick={false}
      width="500px"
    >
      <AltModalHeader heading={"Verify User"} closeModal={closeModal} />
      <VerifyContainer>
        {isVerified ? (
          <>
            <img src="/images/success.png" alt="successful verification" />
            <p>You have been successfully verified.</p>
          </>
        ) : (
          <>
            <img src="/images/hourglass.png" alt="not yet verified" />
            <p>
              Congratulations on your selection. Please click below to verify
              your account
            </p>
          </>
        )}
        <GlobalBtn onClick={verifyToken}>Verify</GlobalBtn>
      </VerifyContainer>
    </GlobalModal>
  );
};

export default VerifyUserModal;

const VerifyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-top: 1rem;
    margin-bottom: 1rem;
    max-width: 40ch;
    font-size: 16px;
    text-align: center;
    line-height: 1.8;
  }
`;
