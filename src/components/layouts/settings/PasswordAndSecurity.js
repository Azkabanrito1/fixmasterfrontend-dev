import { useState } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import {
  BackBtn,
  FormGroup,
  PageHeading,
  SectionHeading,
} from "../../globalcomponents/Utilities";
import { changePwdSchema } from "../../../Validations/changePasswordValidation";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import ConfirmDeleteModal from "../../globalcomponents/modals/ConfirmDeleteModal";
import useLoginDetails from "../../../hooks/useLoginDetails";
import {
  useChangePassword,
  useDeactivateAccount,
} from "../../../hooks/useQueries/useIdentity";
import PasswordToggleInput from "../../globalcomponents/GlobalPwdToggleInput";

function PasswordAndSecurity() {
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const { username } = useLoginDetails();
  const { enqueueSnackbar } = useSnackbar();

  //----------------------------mutate fn ----------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    resetForm();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: changePassword } = useChangePassword(onSuccess, onFailure);

  //----------------------------end mutate fn ----------------------------
  const onSuccessDeactivation = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    resetForm();
  };
  const onFailureDeactivation = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: deactivateAccount } = useDeactivateAccount(
    onSuccessDeactivation,
    onFailureDeactivation
  );

  const onSubmit = async () => {
    const payload = {
      userName: username,
      currentPassword: values.password,
      newPassword: values.newPassword,
      confirmNewPassword: values.confirmPassword,
    };
    changePassword(payload);
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePwdSchema,
    onSubmit,
  });

  const formikHandlers = {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
  };

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Password & Security</PageHeading>
      </div>

      <section>
        <SectionHeading>Password Update</SectionHeading>
        <form onSubmit={handleSubmit}>
          <FormGroup columns="3">
            <PasswordToggleInput
              formikHandlers={formikHandlers}
              inputName="password"
              labelText="Password"
            />
            <PasswordToggleInput
              formikHandlers={formikHandlers}
              inputName="newPassword"
              labelText="New Password"
            />
            <PasswordToggleInput
              formikHandlers={formikHandlers}
              inputName="confirmPassword"
              labelText="Confirm Password"
            />
          </FormGroup>

          <GlobalBtn
            type="submit"
            my="1.5rem"
            mx="auto"
            px="2.5rem"
            width="max-content"
          >
            Save
          </GlobalBtn>
        </form>
      </section>

      <section>
        <SectionHeading>Deactivate Account</SectionHeading>
        <GlobalBtn
          my="1.5rem"
          mx="auto"
          px="2.5rem"
          width="max-content"
          onClick={() => setShowDeactivateModal(true)}
        >
          Deactivate Account
        </GlobalBtn>
      </section>

      {showDeactivateModal && (
        <ConfirmDeleteModal
          open={showDeactivateModal}
          close={() => setShowDeactivateModal(false)}
          pText="Are you sure you want to deactivate this account?"
          labelText="Deactivate this account?"
          actionText="Deactive"
          onDelete={deactivateAccount}
        />
      )}
    </>
  );
}

export default PasswordAndSecurity;
