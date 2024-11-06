
import { useState } from "react";
import CSEStage1Table from "../../../onboardingcomponents/cseonboarding/CSEStage1Table";
import CSEStage2Table from "../../../onboardingcomponents/cseonboarding/CSEStage2Table";
import CSEStage3Table from "../../../onboardingcomponents/cseonboarding/CSEStage3Table";
import CSEStage4Table from "../../../onboardingcomponents/cseonboarding/CSEStage4Table";
import CSEStage5Table from "../../../onboardingcomponents/cseonboarding/CSEStage5Table";
import StageNav from "../../../globalcomponents/StageNav";
import { BackBtn } from "../../../globalcomponents/Utilities";

const NewCseManaged = () => {
  const [stageNo, setStageNo] = useState(1);
  const setStage = (stageId) => {
    setStageNo(stageId);
  };

  const setBodyContent = (stage) => {
    switch (stage) {
      case 1:
        return <CSEStage1Table />;
      case 2:
        return <CSEStage2Table />;
      case 3:
        return <CSEStage3Table />;
      case 4:
        return <CSEStage4Table />;
      case 5:
        return <CSEStage5Table />;
      default:
        break;
    }
  };
  const Template = setBodyContent(stageNo);
  return (
    <div>
      <BackBtn />
      <StageNav stageNo={stageNo} setStage={setStage} />
      {Template}
    </div>
  );
      }

export default NewCseManaged;
