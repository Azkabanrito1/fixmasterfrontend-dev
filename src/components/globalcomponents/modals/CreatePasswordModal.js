import { useEffect } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import GlobalModal from "../../globalcomponents/GlobalModal";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { createPasswordSchema } from "../../../Validations/registerValidations";
import { useCreatePassword } from "../../../hooks/useQueries/useIdentity";
import ModalHeader from "../../layouts/modal/ModalHeader";
import { Fields, FormGroup } from "../Utilities";
import GlobalBallBeat from "../GlobalBallBeat";
import PasswordToggleInput from "../GlobalPwdToggleInput";
import { PATH_PUBLIC } from "../../../routes/paths";
import GlobalInput from "../GlobalInput";

const CreatePassWordModal = ({ isOpen, closeModal, userData }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async () => {
    const payload = {
      email: values.email,
      newPassword: values.password,
      userRole: userData.userRole,
    };

    createPassword(payload);
  };

  useEffect(() => {
    setFieldValue("email", userData.userEmailAddress);
  }, [userData]);

  const onSuccessPasswordCreation = () => {
    enqueueSnackbar("Password created successfully. You can now sign in", {
      variant: "success",
    });
    return navigate(PATH_PUBLIC.login);
  };
  const onFailedPasswordCreation = (error) => {
    enqueueSnackbar(error.message, { variant: "error" });
  };

  const { mutate: createPassword, isLoading } = useCreatePassword(
    onSuccessPasswordCreation,
    onFailedPasswordCreation
  );

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: { password: "", email: "", confirmPassword: "" },
    validationSchema: createPasswordSchema,
    onSubmit,
  });

  const formikHandlers = { values, errors, touched, handleChange, handleBlur };

  return (
    <GlobalModal
      isOpen={isOpen}
      closeModal={closeModal}
      shouldCloseOnOverlayClick={false}
      width="500px"
    >
      <ModalHeader title="Create Password" />
      <GlobalBallBeat loading={isLoading} />
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup gap=".8rem">
            <div>
              <GlobalInput
                labelText={"Email"}
                inputName={"email"}
                inputValue={values.email}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={touched.email && errors.email}
                errorMessage={errors.email}
                required={true}
                disabled={true}
              />
            </div>
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
          </FormGroup>
        </Fields>

        <GlobalBtn
          disabled={
            errors.password || errors.email || errors.confirmPassword
              ? true
              : false
          }
          mx="auto"
          width="100%"
          type="submit"
        >
          Create
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default CreatePassWordModal;
