import { AssignmentContainer } from "../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import FilteredTech from "./FilteredTech";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import StageTwo from "../../../pages/qamaster/techmanagement/StageTwo";
import StageThree from "../../../pages/qamaster/techmanagement/StageThree";
import StageFour from "../../../pages/qamaster/techmanagement/StageFour";
import StageFive from "../../../pages/qamaster/techmanagement/StageFive";
import { useState } from "react";
import TechStage1 from "./TechStage1";
import TechStage2 from "./TechStage2";

const TechnicianOnboarding = ({ data, isLoading }) => {
  const [stageNumber, setStageNumber] = useState(1);

  const setFilterStage = (stageId) => {
    setStageNumber(Number(stageId));
  };

  const setOnboardingStageContent = (stage) => {
    switch (stage) {
      case 1:
        return <TechStage1 />;
      case 2:
        return <TechStage2 />;
      case 3:
        return <StageThree data={data} />;
      case 4:
        return <StageFour data={data} />;
      case 5:
        return <StageFive data={data} />;
      default:
        break;
    }
  };

  const onboardingTemplate = setOnboardingStageContent(stageNumber);
  return (
    <AssignmentContainer>
      <GlobalBallBeat loading={isLoading} />
      <div className="d-flex justify-content-between">
        <h2 style={{ fontSize: "20px", fontWeight: "800px" }}>
          Technician onboarding
        </h2>
        <FilteredTech
          stageNumber={stageNumber}
          filterResults={setFilterStage}
        />
      </div>
      {onboardingTemplate}
    </AssignmentContainer>
  );
};

export default TechnicianOnboarding;
