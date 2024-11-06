import { useState } from "react";
import SiteNavbar from "../../components/landingpagecomponents/SiteNavbar";
import { LoginRegWrapper } from "./Login";
import { Fields, FormGroup } from "../../components/globalcomponents/Utilities";
import GlobalInput from "../../components/globalcomponents/GlobalInput";
import GlobalBtn from "../../components/globalcomponents/GlobalBtn";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import ModalHeader from "../../components/layouts/modal/ModalHeader";
import PasswordToggleInput from "../../components/globalcomponents/GlobalPwdToggleInput";
import { createPasswordSchema } from "../../Validations/registerValidations";
import GlobalBallBeat from "../../components/globalcomponents/GlobalBallBeat";
import { useResetPassword } from "../../hooks/useQueries/useIdentity";

const SubmitPwdResetToken = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    navigate("/login");
  };

  const onError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: resetPassword, isLoading } = useResetPassword(
    onSuccess,
    onError
  );

  const token = searchParams.get("token").trim().split(" ").join("+");
  const email = searchParams.get("email").trim().split(" ").join("+");

  const onSubmit = async (values) => {
    const payload = {
      token: token,
      email: email,
      password: values.password,
    };
    resetPassword(payload);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: email,
        password: "",
        confirmPassword: "",
      },
      validationSchema: createPasswordSchema,
      onSubmit,
    });

  const formikHandlers = { values, errors, touched, handleBlur, handleChange };

  return (
    <>
      <SiteNavbar
        isOpen={isNavOpen}
        toggleIsOpen={() => {
          setIsNavOpen((prev) => !prev);
        }}
      />
      <LoginRegWrapper>
        <div style={{ width: "600px" }} className="bg-white rounded p-4">
          <ModalHeader
            title="Recover Password"
            subHeading="Change your password"
          />

          <GlobalBallBeat loading={isLoading} />

          <form onSubmit={handleSubmit}>
            <Fields>
              <FormGroup columns="1">
                <GlobalInput
                  labelText={"Email"}
                  inputType={"email"}
                  inputValue={values.email}
                  inputName="email"
                  disabled
                  required
                />
                <PasswordToggleInput
                  formikHandlers={formikHandlers}
                  inputName="password"
                  labelText="Password"
                />
                <PasswordToggleInput
                  formikHandlers={formikHandlers}
                  inputName="confirmPassword"
                  labelText="Confirm Password"
                />
                <GlobalBtn
                  disabled={errors.length === 0}
                  className="mx-auto"
                  width="max-content"
                  px="3.5em"
                  type="submit"
                >
                  Change Password
                </GlobalBtn>
              </FormGroup>
            </Fields>
          </form>
        </div>
      </LoginRegWrapper>
    </>
  );
};

export default SubmitPwdResetToken;
