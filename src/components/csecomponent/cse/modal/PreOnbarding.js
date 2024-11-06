import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalModal from "../../../globalcomponents/GlobalModal";

const PreOnboarding = ({ isOpen, closeModal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    closeModal();
    return navigate("/franchisee/dashboard/training");
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal} width="500px">
      <SuccessContainer>
        <img src="/images/success.png" alt="successful submission" />
        <p>
          Your information has successfully been submitted. Please click
          ‘Proceed’ to commence your training program
        </p>
        <GlobalBtn onClick={handleClick}>Proceed</GlobalBtn>
      </SuccessContainer>
    </GlobalModal>
  );
};

export default PreOnboarding;

export const SuccessContainer = styled.div`
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
