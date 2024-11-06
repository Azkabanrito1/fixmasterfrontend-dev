import GlobalInput from "../GlobalInput";
import GlobalPhoneInput from "../GlobalPhoneInput";
import { Fields, FormGroup, GroupHeading } from "../Utilities";

const GuarantorContactFormGroup = ({
  title,
  formikHandlers,
  selectedCountry1,
  setSelectedCountry1,
  selectedCountry2,
  setSelectedCountry2,
  isEditingAllowed,
}) => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    formikHandlers;

  return (
    <Fields>
      <GroupHeading>{title}</GroupHeading>
      <FormGroup columns="3">
        <GlobalInput
          labelText={"Email Address"}
          inputType={"email"}
          inputName={"email"}
          inputPlaceholder={"hello@FixMaster.com.ng"}
          inputValue={values.email}
          handleBlur={handleBlur}
          handleChange={handleChange}
          error={errors.email && touched.email}
          errorMessage={errors.email}
          readOnly={!isEditingAllowed}
          required={true}
        />
        <GlobalPhoneInput
          labelText="Phone Number"
          inputName="phone"
          inputPlaceholder="803 334 4556"
          inputValue={values.phone}
          selectedCountry={selectedCountry1}
          setSelectedCountry={setSelectedCountry1}
          handleBlur={handleBlur}
          handleChange={setFieldValue}
          error={errors.phone && touched.phone}
          errorMessage={errors.phone}
          readOnly={!isEditingAllowed}
          required={true}
        />
        <GlobalPhoneInput
          labelText="Alternative Phone Number"
          inputName="altPhone"
          inputPlaceholder="803 334 4556"
          inputValue={values.altPhone}
          selectedCountry={selectedCountry2}
          setSelectedCountry={setSelectedCountry2}
          handleBlur={handleBlur}
          handleChange={setFieldValue}
          error={errors.altPhone && touched.altPhone}
          errorMessage={errors.altPhone}
          readOnly={!isEditingAllowed}
        />
      </FormGroup>
    </Fields>
  );
};

export default GuarantorContactFormGroup;
