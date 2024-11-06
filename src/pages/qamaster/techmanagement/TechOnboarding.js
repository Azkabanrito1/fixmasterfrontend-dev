import { useState } from "react";
import { PageHeading } from "../../../components/globalcomponents/Utilities";
import StageOne from "./StageOne";
import TechnicianStageNav from "../../../components/qamastercomponent/techmanagement/TechnicianStageNav";
import StageTwo from "./StageTwo";
import StageThree from "./StageThree";
import StageFour from "./StageFour";
import StageFive from "./StageFive";

const TechOnboarding = () => {
  const [stageNo, setStageNo] = useState(1);
  const setStage = (stageId) => {
    setStageNo(stageId);
  };

  const setBodyContent = (stage) => {
    switch (stage) {
      case 1:
        return <StageOne />;
      case 2:
        return <StageTwo />;
      case 3:
        return <StageThree />;
      case 4:
        return <StageFour />;
      case 5:
        return <StageFive />;
      default:
        break;
    }
  };
  const Template = setBodyContent(stageNo);
  return (
    <div>
      <PageHeading style={{ marginBottom: "32px" }}>
        Technician Onboarding
      </PageHeading>
      <TechnicianStageNav stageNo={stageNo} setStage={setStage} />
      {Template}
    </div>
  );
};

export default TechOnboarding;
