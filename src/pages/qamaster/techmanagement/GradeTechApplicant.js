import styled from "styled-components";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import GlobalModal from "../../../components/globalcomponents/GlobalModal";
import AltModalHeader from "../../../components/layouts/modal/AltModalHeader";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import GlobalFullScreenLoader from "../../../components/globalcomponents/GlobalFullScreenLoader";

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

const GradeTechApplicant = ({
  isOpen,
  closeModal,
  criteriaData,
  isLoading,
  gradeApplicant,
  isGrading,
}) => {
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const criteria = criteriaData?.data || [];

  useEffect(() => {
    if (!!criteria.length) {
      criteria.forEach((criterion) => {
        setFieldValue(criterion.id, 0);
      });
    }
  }, [criteriaData]);

  const onSubmit = (values) => {
    const ratings = Object.keys(values).map((key) => ({
      ratingId: +key,
      ratingValue: +values[key],
    }));

    const payload = {
      ratings,
    };

    gradeApplicant(payload);
  };

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {},
    onSubmit,
  });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading="Grade Applicant" closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        <Content>
          <GlobalBallBeat loading={isLoading} />
          {criteria.length === 0 && (
            <p className="text-center">
              There are no set criteria for grading applicants in this role
            </p>
          )}

          {!isLoading &&
            criteria.map((criterion) => (
              <GradeInput
                key={criterion.id}
                gradeName={criterion.id}
                labelText={criterion.name}
                minScore={criterion.minimumValue}
                maxScore={criterion.maximumValue}
                inputValue={values[criterion.id]}
                setFieldValue={setFieldValue}
                disabled={isSubmitClicked}
              />
            ))}
        </Content>

        {isSubmitClicked ? (
          <div style={{ textAlign: "center" }}>
            <p>Are you sure you want to submit</p>

            <div className="d-flex justify-content-center mt-3">
              <GlobalBtn
                type="submit"
                mx="0.5rem"
                width="max-content"
                // height="auto"
                py="0.7rem"
                px="1rem"
                fs="18px"
                fw="400"
              >
                Yes
              </GlobalBtn>
              <GlobalBtn
                type="button"
                mx="0.5rem"
                color="#fff"
                bgClr="#d9d9d9"
                width="max-content"
                py="0.7rem"
                px="1rem"
                fs="18px"
                fw="400"
                onClick={() => setIsSubmitClicked(false)}
              >
                No
              </GlobalBtn>
            </div>
          </div>
        ) : (
          <GlobalBtn
            type="button"
            width="80%"
            mx="auto"
            height="auto"
            disabled={criteria.length === 0}
            py="1rem"
            onClick={() => setIsSubmitClicked(true)}
          >
            Submit
          </GlobalBtn>
        )}
      </form>

      <GlobalFullScreenLoader open={isGrading} />
    </GlobalModal>
  );
};

export default GradeTechApplicant;

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
