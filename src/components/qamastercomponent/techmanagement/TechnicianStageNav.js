import { OnboardingStageNav } from "../../globalcomponents/Utilities";

const TechnicianStageNav = ({ stageNo, setStage }) => {
  return (
    <OnboardingStageNav>
      <button
        className={stageNo === 1 ? "active" : ""}
        onClick={() => setStage(1)}
      >
        Stage 1
      </button>
      <button
        className={stageNo === 2 ? "active" : ""}
        onClick={() => setStage(2)}
      >
        Stage 2
      </button>
      <button
        className={stageNo === 3 ? "active" : ""}
        onClick={() => setStage(3)}
      >
        Stage 3
      </button>
      <button
        className={stageNo === 4 ? "active" : ""}
        onClick={() => setStage(4)}
      >
        Stage 4
      </button>
      <button
        className={stageNo === 5 ? "active" : ""}
        onClick={() => setStage(5)}
      >
        Stage 5
      </button>
    </OnboardingStageNav>
  );
};

export default TechnicianStageNav;
