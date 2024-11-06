import { useState } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import PersonalInfoFormGroup from "../../../globalcomponents/globalformgroups/PersonalInformation";
import ContactInfoFormGroup from "../../../globalcomponents/globalformgroups/ContactInformationFormGroup";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalBallBeat from "../../../globalcomponents/GlobalBallBeat";
import { createAdminUserSchema } from "../../../../Validations/createAdminUserValidation";
import { useCreateFMUser } from "../../../../hooks/useQueries/useIdentity";

const CreateAdmins = ({ isOpen, closeModal, role }) => {
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (values) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      genderId: Number(values.gender),
      dateOfBirth: values.dob,
      phoneNumber: values.phoneNo
        ? `${selectedCountry.code} ${values.phoneNo}`
        : "",
      email: values.email,
      userRole: role,
    };
    // console.log(payload);
    createUser(payload);
  };

  // mutation callback
  const onSuccess = () => {
    enqueueSnackbar("User created successfully", {
      variant: "success",
    });
    closeModal();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: createUser, isLoading: isApplying } = useCreateFMUser(
    onSuccess,
    onFailure,
    role
  );

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      gender: "",
      dob: "",
    },
    validationSchema: createAdminUserSchema,
    onSubmit,
  });

  const formikHandlers = {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader closeModal={closeModal} heading={`Create ${role}`} />

      <GlobalBallBeat loading={isApplying} />

      <form onSubmit={handleSubmit}>
        <PersonalInfoFormGroup formikHandlers={formikHandlers} />

        <ContactInfoFormGroup
          formikHandlers={formikHandlers}
          country={selectedCountry}
          setCountry={setSelectedCountry}
          heading="Candidate’s Contact Information"
        />

        <GlobalBtn
          width="100%"
          type="submit"
          disabled={
            Object.keys(errors).length > 0 ||
            (Object.keys(errors).length === 0 &&
              Object.keys(touched).length === 0)
          }
        >
          {isApplying ? "Loading..." : "Submit"}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default CreateAdmins;
