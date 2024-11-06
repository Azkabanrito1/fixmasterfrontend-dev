import styled from "styled-components";
import { Back } from "../../globalcomponents/Utilities";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";

const Questions = ({
  activeQuestion,
  controlQuestion,
  handleChange,
  allAnswers,
  isLoading,
}) => {
  const parseEntities = (txt) =>
    new DOMParser().parseFromString(txt, "text/html").body.innerText;

  const optionTemplate = activeQuestion?.question?.options.map(
    (option, index) => {
      return (
        <Options key={option.optionId}>
          <span>{index + 1 + "."}</span>
          <input
            type="radio"
            name={activeQuestion.question.question}
            value={option.optionId}
            onChange={(e) =>
              handleChange(e, activeQuestion.index, option.optionData)
            }
            checked={
              allAnswers[activeQuestion.question.question]?.optionId ===
              String(option.optionId)
            }
          />

          <span className="w-75">{parseEntities(option.optionData)}</span>
        </Options>
      );
    }
  );

  return (
    <QuestionContainer>
      <GlobalBallBeat loading={isLoading} />

      {activeQuestion?.question?.question && (
        <>
          <QuestionNum role={"group"}>
            <h2>Question {activeQuestion.index + 1}</h2>
            <span>
              {activeQuestion.index + 1}/{activeQuestion.total}
            </span>
          </QuestionNum>

          <div>
            <p>{parseEntities(activeQuestion?.question?.question)}</p>
          </div>

          <div>{optionTemplate}</div>

          <Navs>
            <QuestionsNav
              disabled={activeQuestion.index === 0 ? true : false}
              onClick={() => controlQuestion(activeQuestion.index - 1)}
            >
              Back
            </QuestionsNav>
            <QuestionsNav
              disabled={
                activeQuestion.index === activeQuestion.total - 1 ? true : false
              }
              onClick={() => controlQuestion(activeQuestion?.index + 1)}
            >
              Next
            </QuestionsNav>
          </Navs>
        </>
      )}
    </QuestionContainer>
  );
};

export default Questions;

const QuestionContainer = styled.div`
  width: 70%;
  height: 100%;
  aspect-ratio: 1;
  padding-inline: 4rem !important;
  overflow-y: scroll;

  & > div {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  p {
    font-size: 18px;
  }

  &::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: #eee; /* color of the tracking area */
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-primary); /* color of the scroll thumb */
    border-radius: 10px; /* roundness of the scroll thumb */
    border: 3px solid #eee;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    aspect-ratio: unset;
  }
`;

const QuestionsNav = styled(Back)`
  position: relative;
  inset: auto;
`;

const QuestionNum = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: bold;
  }
`;

const Navs = styled.div`
  display: flex;
  justify-content: end;
  gap: 1.5rem;
`;

const Options = styled.label`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 18px;

  input[type="radio"] {
    width: 24px;
    height: 24px;
    margin-right: 4px;
    border: 2px solid var(--clr-primary);
    border-radius: 0;
    accent-color: var(--clr-primary);
  }
`;
