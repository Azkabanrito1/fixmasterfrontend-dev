import { Link } from "react-router-dom";
import GlobalBtn from "../GlobalBtn";
import GlobalInput from "../GlobalInput";
import { Fields, FormGroup } from "../Utilities";
import PasswordToggleInput from "../GlobalPwdToggleInput";

const LoginFormGroup = ({ formikHandlers, isLoading }) => {
  const { values, errors, touched, handleBlur, handleChange } = formikHandlers;

  return (
    <Fields>
      <FormGroup columns="1">
        <GlobalInput
          labelText={"Email"}
          inputName={"email"}
          inputValue={values.email}
          inputPlaceholder={"Enter your email"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.email && errors.email}
          errorMessage={errors.email}
          required={true}
        />

        <PasswordToggleInput
          formikHandlers={formikHandlers}
          inputName="password"
          labelText="Password"
        />

        <Link className="fw-bold" to="/forgot-password">
          Forgot Password?
        </Link>

        <GlobalBtn type="submit" disabled={isLoading} className="mx-auto">
          Log In
        </GlobalBtn>
      </FormGroup>
    </Fields>
  );
};

export default LoginFormGroup;
