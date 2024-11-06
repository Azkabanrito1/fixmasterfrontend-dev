import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import SiteNavbar from "../../components/landingpagecomponents/SiteNavbar";
import { loginSchema } from "../../Validations/loginValidations";
import styled from "styled-components";
import {
  useLogin,
  useSetUserLogSession,
} from "../../hooks/useQueries/useIdentity";
import ModalHeader from "../../components/layouts/modal/ModalHeader";
import useLoginRouter from "../../hooks/useLoginRouter";
import LoginFormGroup from "../../components/globalcomponents/globalformgroups/LoginFormGroup";
import GlobalBallBeat from "../../components/globalcomponents/GlobalBallBeat";

const Login = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const ballLoader = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const routeChange = useLoginRouter();

  // Login Details
  // const onLogSuccess = (response) => {
  //   console.log(response.message);
  // };
  // const onLogError = (response) => {
  //   console.log(response.message);
  // };

  const { mutate: setUserSession } =
    useSetUserLogSession();
    // onLogSuccess,
    // onLogError

  const currentDateAndTime = new Date();
  const formattedDateAndTime = currentDateAndTime.toISOString();

  // Login
  const onLoginSuccess = (response) => {
    enqueueSnackbar("Login successful", { variant: "success" });

    const logPayload = {
      dateLog: formattedDateAndTime,
      type: "login",
    };
    setUserSession(logPayload);

    return routeChange(response);
  };

  const onLoginFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: login, isLoading } = useLogin(onLoginSuccess, onLoginFailure);

  const onSubmit = async (values) => {
    const payload = {
      username: values.email,
      password: values.password,
    };

    login(payload);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  useEffect(() => {
    if (isLoading) {
      ballLoader.current?.scrollIntoView({ block: "nearest" });
    }
  }, [isLoading]);

  const formikHandlers = {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
  };

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
            title="Welcome Back"
            subHeading="Login to your account to have unlimited access to FixMaster
              services"
          />

          <GlobalBallBeat loading={isLoading} />

          <form onSubmit={handleSubmit}>
            <LoginFormGroup
              formikHandlers={formikHandlers}
              isLoading={isLoading}
            />
          </form>

          <p className="text-center" style={{ color: "var(--clr-primary)" }}>
            Don't have an account?{" "}
            <Link className="fw-bold" to={"/sign-up"}>
              Sign Up
            </Link>
          </p>
        </div>
      </LoginRegWrapper>
    </>
  );
};

export default Login;

export const LoginRegWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  min-height: calc(100dvh - 100px);
  min-height: calc(100svh - 100px);
  padding: 1rem;
  background-color: #e6e6e6;

  a {
    width: max-content;
    color: var(--clr-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
