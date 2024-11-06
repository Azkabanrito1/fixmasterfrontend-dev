import styled from "styled-components";

const InterviewTimer = ({ minutes, seconds }) => {
  const timeText = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return <Timer>{timeText}</Timer>;
};

export default InterviewTimer;

const Timer = styled.div`
  padding: 0.5em 1em;
  text-align: center;
  color: var(--clr-primary);
  font-size: 1.4rem;
  font-weight: bold;
`;
