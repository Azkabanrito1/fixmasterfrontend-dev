import { FieldError } from "../GlobalInput";
import { Fields, FormGroup, GroupHeading } from "../Utilities";

const QAMasterExperienceFormGroup = ({ formikHandlers }) => {
  const { errors, touched, handleChange, handleBlur, values } = formikHandlers;

  return (
    <Fields>
      <GroupHeading>Candidate’s Experience Evaluation</GroupHeading>
      <FormGroup columns="1" mb="24px">
        <div>
          <div className="description" id="technicalTraining-radio-group">
            Please indicate number of years experience for your primary
            specialisation?
            <span className="text-danger">*</span>
          </div>
          <div role="group" aria-labelledby="technicalTraining-radio-group">
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="technicalTraining"
                value={"7 - 10 years"}
              />
              0 - 10 year
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="technicalTraining"
                value={"11 - 15 years"}
              />
              11 - 15 years
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="technicalTraining"
                value={"15 years and above"}
              />
              15 years and above
            </label>
            {errors.technicalTraining && touched.technicalTraining && (
              <FieldError>{errors.technicalTraining}</FieldError>
            )}
          </div>
        </div>
        {values.otherCategory && (
          <div>
            <div
              className="description"
              id="secondaryYearsofExperience-radio-group"
            >
              Please indicate number of years experience for your secondary
              specialisation?
              <span className="text-danger">*</span>
            </div>
            <div
              role="group"
              aria-labelledby="secondaryYearsofExperience-radio-group"
            >
              <label>
                <input
                  type="radio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="secondaryYearsofExperience"
                  value={"7 - 10 years"}
                />
                0 - 10 year
              </label>
              <label>
                <input
                  type="radio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="secondaryYearsofExperience"
                  value={"11 - 15 years"}
                />
                11 - 15 years
              </label>
              <label>
                <input
                  type="radio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="secondaryYearsofExperience"
                  value={"15 years and above"}
                />
                15 years and above
              </label>
              {errors.secondaryYearsofExperience &&
                touched.secondaryYearsofExperience && (
                  <FieldError>{errors.secondaryYearsofExperience}</FieldError>
                )}
            </div>
          </div>
        )}
      </FormGroup>

      <FormGroup columns="1" mb="24px">
        <div>
          <div className="description" id="specialization-business-radio-group">
            Do you have experience of giving technical training on your
            specialisation?
            <span className="text-danger">*</span>
          </div>
          <div role="group" aria-labelledby="specialization-radio-group">
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="specialization"
                value={"1"}
                checked={values.specialization === "1"}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="specialization"
                value={"0"}
                checked={values.specialization === "0"}
              />
              No
            </label>
            {errors.specialization && touched.specialization && (
              <FieldError>{errors.specialization}</FieldError>
            )}
          </div>
        </div>
      </FormGroup>

      {Boolean(+values.specialization) && (
        <FormGroup columns="1" mb="24px">
          <div>
            <div className="description" id="trainingOther-radio-group">
              How many years have you been training others for?
              <span className="text-danger">*</span>
            </div>
            <div role="group" aria-labelledby="trainingOther-radio-group">
              <label>
                <input
                  type="radio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="trainingOther"
                  value={"7 - 10 year"}
                />
                7 - 10 year
              </label>
              <label>
                <input
                  type="radio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="trainingOther"
                  value={"11 - 15 years"}
                />
                11 - 15 years
              </label>
              <label>
                <input
                  type="radio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="trainingOther"
                  value={"15 years and above"}
                />
                15 years and above
              </label>
              {errors.trainingOther && touched.trainingOther && (
                <FieldError>{errors.trainingOther}</FieldError>
              )}
            </div>
          </div>
        </FormGroup>
      )}
    </Fields>
  );
};

export default QAMasterExperienceFormGroup;
