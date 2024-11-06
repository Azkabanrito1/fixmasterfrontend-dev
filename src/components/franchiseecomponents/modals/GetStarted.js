import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalModal from "../../globalcomponents/GlobalModal";
import { SuccessContainer } from "./PreboardingSuccess";

const GetStarted = ({ isOpen, closeModal }) => {
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal} width="600px">
      <SuccessContainer>
        <img src="/images/hourglass.png" alt="get started" />
        <p>
          Please note that the duration for your training is 7days. You will be
          required to take on MCQ examination afterwards.
        </p>
        <GlobalBtn
          onClick={() => {
            closeModal();
            localStorage.setItem("started", "true");
          }}
        >
          Proceed
        </GlobalBtn>
      </SuccessContainer>
    </GlobalModal>
  );
};

export default GetStarted;
