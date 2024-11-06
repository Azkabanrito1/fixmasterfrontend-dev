import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { Fields, FormGroup } from "../../components/globalcomponents/Utilities";
import SiteNavbar from "../../components/landingpagecomponents/SiteNavbar";
import GlobalBtn from "../../components/globalcomponents/GlobalBtn";
import { LoginRegWrapper } from "./Login";
import GlobalInput from "../../components/globalcomponents/GlobalInput";
import ModalHeader from "../../components/layouts/modal/ModalHeader";
import { useStartPasswordRecover } from "../../hooks/useQueries/useIdentity";

const forgotPwdSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please add a valid email")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = (values) => {
    startResetPassword(values.email.replace(" ", "+"));
  };

  const onSuccess = (res) => {
    enqueueSnackbar(res.message, { variant: "success" });
    navigate("/login");
  };

  const onError = (res) => {
    enqueueSnackbar(res.message, { variant: "success" });
  };

  const { mutate: startResetPassword } = useStartPasswordRecover(
    onSuccess,
    onError
  );

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: forgotPwdSchema,
      onSubmit,
    });

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
            subHeading="Recover your forgotten password"
          />
          <form onSubmit={handleSubmit}>
            <Fields>
              <FormGroup columns="1">
                <GlobalInput
                  labelText={"Email"}
                  inputName={"email"}
                  inputType={"email"}
                  inputValue={values.email}
                  inputPlaceholder={"Enter your email"}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={touched.email && errors.email}
                  errorMessage={errors.email}
                  required
                />
                <GlobalBtn
                  disabled={errors.length === 0}
                  className="mx-auto"
                  width="max-content"
                  px="3.5em"
                  type="submit"
                >
                  Recover
                </GlobalBtn>
              </FormGroup>
            </Fields>
          </form>
        </div>
      </LoginRegWrapper>
    </>
  );
};

export default ForgotPassword;
