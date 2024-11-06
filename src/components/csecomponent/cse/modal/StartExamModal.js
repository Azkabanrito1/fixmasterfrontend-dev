import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import useStage2ExamRouter from "../../../../hooks/useStage2ExamRouter";

const StartExamModal = ({ isOpen, closeModal }) => {
  const router = useStage2ExamRouter();

  let loginDetails = localStorage.getItem("loginDetails");
  if (loginDetails) loginDetails = JSON.parse(loginDetails);
  const role = loginDetails?.role;

  const handleClick = () => {
    router(role);
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal} width="500px">
      <AltModalHeader heading="MCQ TEST" closeModal={closeModal} />
      <p> By clicking the start button, your test start immediately</p>
      <GlobalBtn className="m-auto mt-3" type="submit" onClick={handleClick}>
        Start
      </GlobalBtn>
    </GlobalModal>
  );
};

export default StartExamModal;
