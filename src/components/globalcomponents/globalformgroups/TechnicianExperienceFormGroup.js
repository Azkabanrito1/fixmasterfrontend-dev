import { FieldError } from "../GlobalInput";
import { Fields, FormGroup, GroupHeading } from "../Utilities";

const TechnicianExperienceFormGroup = ({ formikHandlers }) => {
  const { errors, touched, handleChange, handleBlur, values } = formikHandlers;

  return (
    <Fields>
      <GroupHeading>Candidate’s Experience Evaluation</GroupHeading>
      <FormGroup columns="1" mb="24px">
        <div>
          <div className="description" id="yearsOfExperience-radio-group">
            How many years experience do you have in primary specialization?
            <span className="text-danger">*</span>
          </div>
          <div role="group" aria-labelledby="yearsOfExperience-radio-group">
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="yearsOfExperience"
                value={"0 - 1 year"}
              />
              0 - 1 year
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="yearsOfExperience"
                value={"3 - 5 years"}
              />
              3 - 5 years
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="yearsOfExperience"
                value="5 years and above"
              />
              5 years and above
            </label>
            {errors.yearsOfExperience && touched.yearsOfExperience && (
              <FieldError>{errors.yearsOfExperience}</FieldError>
            )}
          </div>
        </div>
        {values?.otherCategory && (
          <div>
            <div
              className="description"
              id="secondaryYearsOfExpertise-radio-group"
            >
              How many years experience do you have in secondary specialization?
              <span className="text-danger">*</span>
            </div>
            <div
              role="group"
              aria-labelledby="secondaryYearsOfExpertise-radio-group"
            >
              <label>
                <input
                  type="radio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="secondaryYearsOfExpertise"
                  value={"0 - 1 year"}
                />
                0 - 1 year
              </label>
              <label>
                <input
                  type="radio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="secondaryYearsOfExpertise"
                  value={"3 - 5 years"}
                />
                3 - 5 years
              </label>
              <label>
                <input
                  type="radio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="secondaryYearsOfExpertise"
                  value="5 years and above"
                />
                5 years and above
              </label>
              {errors.secondaryYearsOfExpertise &&
                touched.secondaryYearsOfExpertise && (
                  <FieldError>{errors.secondaryYearsOfExpertise}</FieldError>
                )}
            </div>
          </div>
        )}
      </FormGroup>

      <FormGroup columns="1" mb="24px">
        <div>
          <div className="description" id="attendTraining-radio-group">
            How often do you attend technical training?
            <span className="text-danger">*</span>
          </div>
          <div role="group" aria-labelledby="attendTraining-radio-group">
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="attendTraining"
                value="More than 5 times a year"
              />
              More than 5 times a year
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="attendTraining"
                value="1 - 3 times a year"
              />
              1 - 3 times a year
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="attendTraining"
                value="Never"
              />
              Never
            </label>
            {errors.attendTraining && touched.attendTraining && (
              <FieldError>{errors.attendTraining}</FieldError>
            )}
          </div>
        </div>
      </FormGroup>

      <FormGroup columns="1" mb="24px">
        <div>
          <div className="description" id="trainedOthers-business-radio-group">
            Have you trained others to do technical work before?
            <span className="text-danger">*</span>
          </div>
          <div role="group" aria-labelledby="trainedOthers-radio-group">
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="trainedOthers"
                value={1}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="trainedOthers"
                value={0}
              />
              No
            </label>
            {errors.trainedOthers && touched.trainedOthers && (
              <FieldError>{errors.trainedOthers}</FieldError>
            )}
          </div>
        </div>
      </FormGroup>

      <FormGroup columns="1">
        <div>
          <div className="description" id="openTraining-business-radio-group">
            Are you open to ongoing training and professional development
            opportunities?
            <span className="text-danger">*</span>
          </div>
          <div role="group" aria-labelledby="openTraining-radio-group">
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="openTraining"
                value={1}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="openTraining"
                value={0}
              />
              No
            </label>
            {errors.openTraining && touched.openTraining && (
              <FieldError>{errors.openTraining}</FieldError>
            )}
          </div>
        </div>
      </FormGroup>
    </Fields>
  );
};

export default TechnicianExperienceFormGroup;
