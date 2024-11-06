import { FieldError } from "../GlobalInput";
import { Fields, FormGroup, GroupHeading } from "../Utilities";

const FranchiseeXPFormGroup = ({ formikHandlers }) => {
  const { errors, touched, handleBlur, handleChange, values } = formikHandlers;

  return (
    <Fields>
      <GroupHeading>Candidate’s Experience Evaluation</GroupHeading>
      <FormGroup columns="1" mb="24px">
        <div>
          <div className="description" id="run-business-radio-group">
            Are you currently runing a business/Have you ever run a business?
          </div>
          <div role="group" aria-labelledby="run-business-radio-group">
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="runBusiness"
                value={1}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="runBusiness"
                value={0}
              />
              No
            </label>
            {errors.runBusiness && touched.runBusiness && (
              <FieldError>{errors.runBusiness}</FieldError>
            )}
          </div>
        </div>
      </FormGroup>

      <FormGroup columns="1" mb="24px">
        <div>
          <div className="description" id="management-radio-group">
            How many years of provable staff management experience do you have?
          </div>
          <div role="group" aria-labelledby="management-radio-group">
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="management"
                value={"0 - 1 year"}
              />
              0 - 1 year
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="management"
                value={"1 - 3 years"}
              />
              1 - 3 years
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="management"
                value={"3 years and above"}
              />
              3 years and above
            </label>
            {errors.management && touched.management && (
              <FieldError>{errors.management}</FieldError>
            )}
          </div>
        </div>
      </FormGroup>

      <FormGroup columns="1" mb="24px">
        <div>
          <div className="description" id="marketing-radio-group">
            Do you believe you have the marketing skills and can you demonstrate
            this?
          </div>
          <div role="group" aria-labelledby="marketing-radio-group">
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="marketing"
                value={1}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="marketing"
                value={0}
              />
              No
            </label>
            {errors.marketing && touched.marketing && (
              <FieldError>{errors.marketing}</FieldError>
            )}
          </div>
        </div>
      </FormGroup>

      <FormGroup columns="1" mb="24px">
        <div>
          <div className="description" id="do-you-have-funds-group">
            Do you have funds to invest in your franchise?
          </div>
          <div role="group" aria-labelledby="do-you-have-funds-group">
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="haveFunds"
                // value={1}
                value={"1"}
                checked={values.haveFunds === "1"}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="haveFunds"
                value={"0"}
                checked={values.haveFunds === "0"}
              />
              No
            </label>
            {errors.haveFunds && touched.haveFunds && (
              <FieldError>{errors.haveFunds}</FieldError>
            )}
          </div>
        </div>
      </FormGroup>

      {values.haveFunds === "1" && (
        <FormGroup columns="1" mb="24px">
          <div>
            <div className="description" id="how-much-group">
              Kindly give an indication of how much you can invest
            </div>
            <div role="group" aria-labelledby="how-much-group">
              <label>
                <input
                  type="radio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="howMuch"
                  value={"Less than 1 million"}
                />
                Less than 1 million
              </label>
              <label>
                <input
                  type="radio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="howMuch"
                  value={"Between 1 and 4 million"}
                />
                Between 1 and 4 million
              </label>
              <label>
                <input
                  type="radio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="howMuch"
                  value={"Above 4 million"}
                />
                Above 4 million
              </label>
              {errors.howMuch && touched.howMuch && (
                <FieldError>{errors.howMuch}</FieldError>
              )}
            </div>
          </div>
        </FormGroup>
      )}
    </Fields>
  );
};

export default FranchiseeXPFormGroup;
