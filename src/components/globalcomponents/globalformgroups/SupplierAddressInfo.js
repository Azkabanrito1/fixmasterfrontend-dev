import React from "react";
import { FormGroup } from "../Utilities";
import GlobalInput, { FieldError, InputGroup } from "../GlobalInput";
import GlobalPhoneInput from "../GlobalPhoneInput";

const SupplierAddressInfo = ({
  formikHandlers,
  inputRef,
  selectedCountry,
  setSelectedCountry,
}) => {
  const { values, handleChange, handleBlur, setFieldValue, errors, touched } =
    formikHandlers;
  return (
    <div>
      <FormGroup columns="2" className="mb-3">
        <InputGroup>
          <label htmlFor="branchAddress">
            Branch Address
            <span className="text-danger">*</span>
          </label>
          <div className="input-block">
            <input
              className={
                errors.branchAddress && touched.branchAddress ? "invalid" : ""
              }
              type="text"
              id="branchAddress"
              name="branchAddress"
              defaultValue={values.branchAddress}
              placeholder="Enter your address"
              ref={inputRef}
            />
          </div>
          {errors.branchAddress && touched.branchAddress && (
            <FieldError>{errors.branchAddress}</FieldError>
          )}
        </InputGroup>
        <GlobalPhoneInput
          labelText="Branch Phone Number"
          inputName="phoneNumber"
          inputPlaceholder="803 334 4556"
          inputValue={values.phoneNumber}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          handleBlur={handleBlur}
          handleChange={setFieldValue}
          error={errors.phoneNumber && touched.phoneNumber}
          errorMessage={errors.phoneNumber}
        />

        <GlobalInput
          inputType="email"
          inputName="branchEmail"
          labelText="Branch Email"
          inputValue={values.branchEmail}
          inputPlaceholder="hello@FixMaster.com.ng"
          handleBlur={handleBlur}
          handleChange={handleChange}
          error={errors.branchEmail && touched.branchEmail}
          errorMessage={errors.branchEmail}
        />
      </FormGroup>
    </div>
  );
};

export default SupplierAddressInfo;
