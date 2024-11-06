import { ProgressBar, Step } from "react-step-progress-bar";
import styled from "styled-components";
import { progressStages } from "../../../utils/selectOptions";
import { getActiveProgressBarStatus } from "../../../utils/utilityFxns";

const JobStatusProgress = ({ fixStatus }) => {
  const activeStatus = getActiveProgressBarStatus(fixStatus);
  const percentage = (100 / (progressStages.length - 1)) * activeStatus;

  return (
    <StyledProgress>
      <ProgressBar percent={percentage}>
        {progressStages.map((stage, i) => (
          <Step key={i}>
            {({ accomplished }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
              >
                <i className="fa fa-check"></i>
                <label>{stage.name}</label>
              </div>
            )}
          </Step>
        ))}
      </ProgressBar>
    </StyledProgress>
  );
};

export default JobStatusProgress;

const StyledProgress = styled.div`
  .indexedStep {
    position: relative;
    display: grid;
    place-items: center;
    width: 30px;
    aspect-ratio: 1;
    border-radius: 50%;
    font-size: 1em;
    background-color: #c4c4c4;
    color: white;
    cursor: pointer;

    label {
      position: absolute;
      top: 110%;
      left: 50%;
      transform: translateX(-50%);
      color: #bbb;
      font-size: 12px;
    }

    &.accomplished {
      background-color: #11e981;

      label {
        color: #11e981;
      }
    }
  }

  .RSPBprogressBar {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px auto;
    height: 2px;
    width: 95%;
    line-height: 1;
    border-radius: 10px;
    background-color: rgb(207, 207, 207);
    z-index: 0;

    .RSPBstep {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      z-index: 0;
      transition-property: all;
      transition-timing-function: ease;
    }

    .RSPBprogressBarText {
      color: white;
      font-size: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .RSPBprogression {
      position: absolute;
      transition: width 0.3s ease;
      left: 0;
      top: 0;
      bottom: 0;
      border-radius: 10px;
      background: #11e981;
      z-index: -1;
    }
  }

  @media only screen and (max-width: 768px) {
    .RSPBprogressBar {
      flex-direction: column;
      width: 2px;
      height: auto;
      gap: 2rem;
      margin: 0 auto 0 2rem;
    }

    .indexedStep {
      width: 50px;

      label {
        position: absolute;
        inset: 50% auto auto 125%;
        transform: translateY(-50%);
      }
    }
  }
`;
