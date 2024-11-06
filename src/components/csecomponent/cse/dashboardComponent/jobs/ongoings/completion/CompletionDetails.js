import styled from "styled-components";
import {
  Fields,
  FormGroup,
  GroupHeading,
  SectionHeading,
} from "../../../../../../globalcomponents/Utilities";
import GlobalBtn from "../../../../../../globalcomponents/GlobalBtn";
import { useFormik } from "formik";

const CompletionDetails = ({
  isSubmitting,
  fixId,
  days,
  hours,
  minutes,
  seconds,
  logCompletion,
}) => {
  //funtion to submit form
  const onSubmit = (values) => {
    const payload = {
      fixId,
      completionTime: `${hours}:${minutes}:${seconds}`,
      isCompleted: Boolean(values.completed),
      isTidied: Boolean(values.tided),
    };
    logCompletion(payload);
  };

  //formik for handle form
  const { values, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      completed: false,
      tided: false,
      notice: "",
    },
    onSubmit,
  });

  // console.log(values);
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <SectionHeading className="d-flex justify-content-between mt-5">
          Completion Details
          {/* <Jobs>
            <p>Place Job on Hold</p>
            <i className="fa fa-flag" aria-hidden="true"></i>
          </Jobs> */}
        </SectionHeading>
        <Fields>
          <GroupHeading className="mt-3">
            Can you confirm that this job has been completed and tested?
            <span className="text-danger">*</span>
          </GroupHeading>
          <FormGroup columns="1" className="mt-2">
            <div>
              <div role="group" aria-labelledby="completed-radio-group">
                <label>
                  <input
                    type="radio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="completed"
                    value={"true"}
                    checked={values.completed === "true"}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="completed"
                    value={"false"}
                    checked={values.completed === "false"}
                  />
                  No
                </label>
              </div>
            </div>
          </FormGroup>

          <GroupHeading className="mt-3">
            Can you confirm that the fix venue has been tidied up?
            <span className="text-danger">*</span>
          </GroupHeading>
          <FormGroup columns="1" className="mt-2">
            <div>
              <div role="group" aria-labelledby="tided-radio-group">
                <label>
                  <input
                    type="radio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="tided"
                    value={"true"}
                    checked={values.tided === "true"}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="tided"
                    value={"false"}
                    checked={values.tided === "false"}
                  />
                  No
                </label>
              </div>
            </div>
          </FormGroup>

          <GroupHeading className="mt-3">
            Having completed the job, tested the fix and tidied up the venue,
            Proceed to initiate notice of job completion to customer?
            <span className="text-danger">*</span>
          </GroupHeading>
          {values.tided === "true" && (
            <FormGroup columns="1" className="mt-2">
              <div>
                <div role="group" aria-labelledby="completed-radio-group">
                  <label>
                    <input
                      type="radio"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="notice"
                      value={"true"}
                      checked={values.notice === "true"}
                    />
                    Yes, Proceed
                  </label>
                  <label>
                    <input
                      type="radio"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="notice"
                      value={"false"}
                      checked={values.notice === "false"}
                    />
                    No
                  </label>
                </div>
              </div>
            </FormGroup>
          )}
        </Fields>
        {values.notice === "true" &&
          values.tided === "true" &&
          values.completed === "true" && (
            <GlobalBtn
              className="m-auto"
              type="submit"
              disabled={
                (!values.notice && !values.value && !values.completed) ||
                isSubmitting
              }
            >
              Save Notification
            </GlobalBtn>
          )}
      </form>
    </section>
  );
};

export default CompletionDetails;

const Jobs = styled.div`
  width: 220px;
  height: 40px;
  border: 2px solid var(--clr-primary);
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 5px;
  p {
    text-align: center;
    font-size: 20px;
    color: var(--clr-primary);
  }
  i {
    color: var(--clr-primary);
  }
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const RadioButton = styled.div`
  input {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    border: 2px solid var(--clr-primary);
    border-radius: 0;
    accent-color: var(--clr-primary);
    margin-top: 3px;
  }
  label {
    font-family: 20px;
    font-weight: 800px;
  }
`;

const FormHeader = styled.h2`
  display: inline-flex;
  align-items: center;
  font-size: 20px;
`;
