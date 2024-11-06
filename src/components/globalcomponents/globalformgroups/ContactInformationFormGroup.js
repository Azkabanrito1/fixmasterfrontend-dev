import GlobalInput from "../GlobalInput";
import GlobalPhoneInput from "../GlobalPhoneInput";
import { Fields, FormGroup, GroupHeading } from "../Utilities";

const ContactInfoFormGroup = ({
  formikHandlers,
  user,
  country,
  setCountry,
  heading,
}) => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    formikHandlers;

  return (
    <Fields>
      {heading && <GroupHeading>{heading}</GroupHeading>}
      <FormGroup columns="2">
        <GlobalInput
          labelText="Email Address"
          inputType="email"
          inputName="email"
          inputPlaceholder="hello@FixMaster.com.ng"
          inputValue={values.email}
          handleBlur={handleBlur}
          handleChange={handleChange}
          error={errors.email && touched.email}
          errorMessage={errors.email}
          disabled={user?.email ? true : false}
          required={true}
        />

        <GlobalPhoneInput
          labelText="Phone Number"
          inputName="phoneNo"
          inputPlaceholder="803 112 2334"
          inputValue={values.phoneNo}
          handleBlur={handleBlur}
          handleChange={setFieldValue}
          error={errors.phoneNo && touched.phoneNo}
          errorMessage={errors.phoneNo}
          selectedCountry={country}
          setSelectedCountry={setCountry}
          disabled={user?.phoneNumber && country ? true : false}
          required={true}
        />
      </FormGroup>
    </Fields>
  );
};

export default ContactInfoFormGroup;
