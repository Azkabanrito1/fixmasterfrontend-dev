import GlobalInput, { FieldError } from "../GlobalInput";
import { Fields, FormGroup, GroupHeading } from "../Utilities";

const SupplierAnswers = ({ formikHandlers }) => {
  const { values, errors, touched, handleChange, handleBlur } = formikHandlers;

  return (
    <Fields>
      <GroupHeading>Answer the following questions</GroupHeading>

      <FormGroup columns="1" mb="24px">
        <div>
          <div className="description" id="trading-radio-group">
            How many years have you been trading as a supplier?
            <span className="text-danger">*</span>
          </div>
          <div role="group" aria-labelledby="trading-radio-group">
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="trading"
                value={"0 - 2 year"}
              />
              0-2 years
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="trading"
                value={"3 - 5 years"}
              />
              3-5 years
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="trading"
                value={"5 and more years"}
              />
              5 and More years
            </label>
            {errors.trading && touched.trading && (
              <FieldError>{errors.trading}</FieldError>
            )}
          </div>
        </div>
      </FormGroup>

      <FormGroup columns="1" mb="24px">
        <div>
          <div className="description" id="branch-radio-group">
            How many branches do you have?
            <span className="text-danger">*</span>
          </div>
          <div role="group" aria-labelledby="branch-radio-group">
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="branch"
                value={"1"}
              />
              1 branch
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="branch"
                value={"2 - 4"}
              />
              2-4 branches
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="branch"
                value={"5 - 10"}
              />
              5-10 branches
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="branch"
                value={">10"}
              />
              More than 10 branches
            </label>
            {errors.branch && touched.branch && (
              <FieldError>{errors.branch}</FieldError>
            )}
          </div>
        </div>
      </FormGroup>

      <FormGroup columns="1" mb="24px">
        <div>
          <div className="description" id="corporateCustomer-radio-group">
            Do you have corporate customers that can confirm of your service?
            <span className="text-danger">*</span>
          </div>
          <div role="group" aria-labelledby="corporateCustomer-radio-group">
            {/* <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="corporateCustomer"
                value={"never"}
              />
              0-1 year
            </label> */}
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="corporateCustomer"
                value={"Yes"}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="corporateCustomer"
                value={"No"}
              />
              No
            </label>
            {/* <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="corporateCustomer"
                value={"1 - 3 times a year"}
              />
              3-5 years
            </label> */}
            {/* <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="corporateCustomer"
                value={"more than 5 times a year"}
              />
              5 and More years
            </label> */}
            {errors.corporateCustomer && touched.corporateCustomer && (
              <FieldError>{errors.corporateCustomer}</FieldError>
            )}
          </div>
        </div>
      </FormGroup>

      <FormGroup columns="2" mb="24px">
        {/* <div>
          <div className="description" id="warranty-radio-group">
            How many months warranty do you give for the products you sell ?
            <span className="text-danger">*</span>
          </div>
          <div role="group" aria-labelledby="warranty-radio-group">
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="warranty"
                value={"none"}
              />
              None
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="warranty"
                value={"1 - 3 months"}
              />
              1-3 months
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="warranty"
                value={"3 - 6 months"}
              />
              3-5 months
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="warranty"
                value={"6 - 12 months"}
              />
              6-12 months
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="warranty"
                value={"> 12 months"}
              />
              12 months or more
            </label>
            {errors.warranty && touched.warranty && (
              <FieldError>{errors.warranty}</FieldError>
            )}
          </div> 
        </div> */}

        <GlobalInput
          labelText="How many months warranty do you give for the products you sell? (in Months)"
          inputType="number"
          inputName="warranty"
          handleChange={handleChange}
          handleBlur={handleBlur}
          inputValue={values.warranty}
          error={errors.warranty && touched.warranty}
          errorMessage={errors.warranty}
          required
        />
      </FormGroup>
    </Fields>
  );
};

export default SupplierAnswers;
