import { useState, useEffect } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  getThirdStageRatingCriteria,
  gradeCseThirdStage,
} from "../../../../redux/franchisee/actions";
import { BallBeat } from "react-pure-loaders";
import { useSnackbar } from "notistack";

const GradeInput = ({
  labelText,
  gradeName,
  maxScore,
  minScore,
  inputValue,
  setFieldValue,
  disabled,
}) => {
  return (
    <StyledInput>
      <label htmlFor={gradeName}>{labelText}</label>
      <div>
        <input
          type="number"
          value={inputValue}
          min={minScore}
          max={maxScore}
          name={gradeName}
          id={gradeName}
          onChange={(e) => setFieldValue(gradeName, e.target.value)}
          disabled={disabled}
        />
        <span>/ {maxScore}</span>
        <div className="controls">
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              if (inputValue < maxScore) {
                setFieldValue(gradeName, inputValue + 1);
              }
            }}
          >
            +
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              if (inputValue > minScore) {
                setFieldValue(gradeName, inputValue - 1);
              }
            }}
          >
            -
          </button>
        </div>
      </div>
    </StyledInput>
  );
};

const GradeApplicant = ({ isOpen, closeModal, applicantId }) => {
  const [scoringCriteria, setScoringCriteria] = useState([]);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading } = useSelector((state) => state.auth);

  const getCriteria = async () => {
    const response = await dispatch(getThirdStageRatingCriteria());
    setScoringCriteria(response.data);
  };

  useEffect(() => {
    getCriteria();
  }, []);

  useEffect(() => {
    if (scoringCriteria.length) {
      scoringCriteria.forEach((criterion) => {
        setFieldValue(criterion.name, 0);
      });
    }
  }, [scoringCriteria]);

  const onSubmit = async (values) => {
    setIsSubmitClicked(false);

    const payload = {
      cseId: applicantId.toString(),
      ratings: scoringCriteria.map((criterion) => {
        return {
          ratingId: criterion.id,
          ratingValue: values[criterion.name],
        };
      }),
    };

    const response = await dispatch(gradeCseThirdStage(payload));
    enqueueSnackbar(response.message);
  };

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {},
    onSubmit,
  });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal} width="500px">
      <AltModalHeader heading={"Grade Applicant"} closeModal={closeModal} />

      <form onSubmit={handleSubmit}>
        <Content style={{ opacity: isSubmitClicked ? "0.8" : "1" }}>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <BallBeat color="var(--clr-primary)" loading={isLoading} />
            </div>
          ) : (
            scoringCriteria.map((criterion) => (
              <GradeInput
                key={criterion.id}
                gradeName={criterion.name}
                labelText={criterion.name}
                minScore={criterion.minimumValue}
                maxScore={criterion.maximumValue}
                inputValue={values[criterion.name]}
                setFieldValue={setFieldValue}
                disabled={isSubmitClicked}
              />
            ))
          )}
        </Content>
        {isSubmitClicked ? (
          <div style={{ textAlign: "center" }}>
            Are you sure you want to submit
            <GlobalBtn
              display="inline-flex"
              type="submit"
              mx="1rem"
              width="max-content"
              height="auto"
              py="0.5rem"
              px="0.6rem"
              fs="18px"
            >
              Yes
            </GlobalBtn>
            <GlobalBtn
              display="inline-flex"
              type="button"
              color="var(--clr-primary)"
              bgClr="transparent"
              border="1px solid var(--clr-primary)"
              width="max-content"
              height="auto"
              py="0.5rem"
              px="0.6rem"
              fs="18px"
              onClick={() => setIsSubmitClicked(false)}
            >
              No
            </GlobalBtn>
          </div>
        ) : (
          <GlobalBtn
            type="button"
            width="80%"
            mx="auto"
            height="auto"
            py="1rem"
            onClick={() => setIsSubmitClicked(true)}
          >
            Submit
          </GlobalBtn>
        )}
      </form>
    </GlobalModal>
  );
};

export default GradeApplicant;

const Content = styled.div`
  margin-bottom: 36px;
`;

const StyledInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-inline: 32px;
  margin-bottom: 24px;

  label {
    width: 40%;
    color: var(--clr-primary);
    font-size: 1.2rem;
  }

  & > div {
    display: flex;
    align-items: center;
    padding: 0.8rem 0.5rem;
    width: 50%;
    border: 1px solid #ddd;
  }

  input {
    width: 12%;
    border: none;
    outline: none;
    font-size: 18px;
    font-weight: 400;
  }

  /* hide arrows
 Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield !important;
  }

  span {
    font-size: 18px;
    font-weight: 400;
  }

  .controls {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;
    margin-left: auto;

    button {
      appearance: none;
      border: none;
      padding: 0;
      background-color: transparent;
      font-size: 32px;
      color: var(--clr-primary);
      line-height: 12px;
      cursor: pointer;

      &:first-child {
        margin-bottom: 6px;
      }
    }
  }
`;
