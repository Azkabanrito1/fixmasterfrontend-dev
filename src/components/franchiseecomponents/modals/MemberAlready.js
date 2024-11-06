import GlobalModal from "../../globalcomponents/GlobalModal";
import { useFormik } from "formik";
import GlobalInput from "../../globalcomponents/GlobalInput";
import { useState } from "react";
import { loginSchema } from "../../../Validations/loginValidations";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useSnackbar } from "notistack";
import ModalHeader from "../../layouts/modal/ModalHeader";
import { Fields } from "../../globalcomponents/Utilities";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { useLogin } from "../../../hooks/useQueries/useIdentity";
import PasswordToggleInput from "../../globalcomponents/GlobalPwdToggleInput";

const MemberAlready = ({
  isOpen,
  closeModal,
  openApplicationModal,
  destination,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const onLoginSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    gotoApplication();
  };
  const onLoginFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: login, isLoading } = useLogin(onLoginSuccess, onLoginFailure);

  const onSubmit = async () => {
    const payload = {
      username: values.email,
      password: values.password,
    };

    login(payload);
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: { password: "", email: "" },
      validationSchema: loginSchema,
      onSubmit,
    });

  const formikHandler = { errors, values, touched, handleBlur, handleChange };

  // go to the correct application form
  const gotoApplication = () => {
    const openApplication = openApplicationModal[destination];
    openApplication();
    closeModal();
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal} width="600px">
      <ModalHeader
        closeModal={closeModal}
        title="Sign In"
        subHeading="If you already have an account. You can sign in to continue"
      />
      <GlobalBallBeat loading={isLoading} />

      <form onSubmit={handleSubmit}>
        <Fields style={{ marginBottom: "1rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <GlobalInput
              labelText={"Email"}
              inputName={"email"}
              inputValue={values.email}
              inputPlaceholder="Please enter your email"
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.email && errors.email}
              errorMessage={errors.email}
              required
            />
          </div>
          <PasswordToggleInput
            formikHandlers={formikHandler}
            inputName={"password"}
            labelText="Password"
          />
        </Fields>
        <a
          href="#"
          style={{
            color: "var(--clr-primary)",
            display: "inline-block",
            marginBottom: "0.8rem",
            textDecoration: "none",
          }}
        >
          Forgot Password
        </a>
        <GlobalBtn
          disabled={errors.password && errors.email ? true : false}
          mx="auto"
          width="100%"
          type="submit"
        >
          Log In
        </GlobalBtn>
      </form>

      <div
        style={{
          display: "flex",
          marginTop: "16px",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <span>Don't have an account? </span>
        <GlobalBtn
          width="max-content"
          height="auto"
          fs="16px"
          py="8px"
          px="12px"
          bgClr="white"
          color="var(--clr-primary)"
          hoverBg="rgb(242 98 34 / 0.3)"
          hoverClr="var(--clr-primary)"
          onClick={gotoApplication}
        >
          Start a New Application
        </GlobalBtn>
      </div>
    </GlobalModal>
  );
};

export default MemberAlready;
