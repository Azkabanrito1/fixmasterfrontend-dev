import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalModal from "../../../globalcomponents/GlobalModal";

const QaMasterApplicationSuccess = ({ isOpen, closeModal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    closeModal();
    return navigate("/");
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal} width="500px">
      <SuccessContainer>
        <img src="/images/success.png" alt="" />
        <h2>Success</h2>
        <p>
          Your application has been submitted successfully. A message will be
          sent to you shortly on how to proceed
        </p>
        <GlobalBtn onClick={handleClick}>Continue</GlobalBtn>
      </SuccessContainer>
    </GlobalModal>
  );
};

export default QaMasterApplicationSuccess;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  h2 {
    font-size: 2rem;
    color: #37b34a;
  }

  p {
    color: #242426;
    font-size: 20px;
    text-align: center;
  }
`;
