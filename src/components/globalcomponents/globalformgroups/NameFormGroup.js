import GlobalInput from "../GlobalInput";
import { Fields, FormGroup } from "../Utilities";

const NameFormGroup = ({ formikHandlers, user }) => {
  const { values, errors, touched, handleChange, handleBlur } = formikHandlers;

  return (
    <Fields>
      <FormGroup columns="2">
        <GlobalInput
          labelText="First Name"
          inputType="text"
          inputName="firstName"
          inputPlaceholder="Enter first name"
          inputValue={values.firstName}
          handleBlur={handleBlur}
          handleChange={handleChange}
          error={errors.firstName && touched.firstName}
          errorMessage={errors.firstName}
          disabled={user?.firstName ? true : false}
          required={true}
        />

        <GlobalInput
          labelText="Last Name"
          inputType="text"
          inputName="lastName"
          inputPlaceholder="Enter last name"
          inputValue={values.lastName}
          handleBlur={handleBlur}
          handleChange={handleChange}
          error={errors.lastName && touched.lastName}
          errorMessage={errors.lastName}
          disabled={user?.lastName ? true : false}
          required={true}
        />
      </FormGroup>
    </Fields>
  );
};

export default NameFormGroup;
