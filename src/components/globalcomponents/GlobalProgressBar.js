import { ProgressBar } from "react-step-progress-bar";
import styled from "styled-components";

const GlobalProgressBar = ({ bgColor, progressBarColor, ...rest }) => {
  return (
    <StyledProgress bgColor={bgColor} progressBarColor={progressBarColor}>
      <ProgressBar {...rest} />
    </StyledProgress>
  );
};

export default GlobalProgressBar;

const StyledProgress = styled.div`
  width: 100%;

  .RSPBprogressBar {
    display: flex;
    align-items: center;
    position: relative;
    height: 30px;
    border-radius: 10px;
    background-color: ${({ bgColor }) => bgColor || "#F26222"};
    overflow: hidden;
  }

  .RSPBprogression {
    height: 20px;
    border-radius: 10px;
    background-color: ${({ progressBarColor }) =>
      progressBarColor || "#F6E7E0"};
  }

  .RSPBprogressBarText {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: transparent;
  }
`;
