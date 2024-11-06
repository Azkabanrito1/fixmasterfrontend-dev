import { useFormik } from "formik";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import GlobalTextArea from "../../../globalcomponents/GlobalTextArea";
import { FormGroup, GroupHeading } from "../../../globalcomponents/Utilities";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { useSuspendUser } from "../../../../hooks/useQueries/useIdentity";
import { useSnackbar } from "notistack";

const SuspendUserModal = ({ isOpen, closeModal, activeId, role }) => {
  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
  };
  const onFail = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: suspendUser, isLoading } = useSuspendUser(
    onSuccess,
    onFail,
    role
  );

  const onSubmit = (values) => {
    suspendUser(values);
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        reason: "",
        userId: activeId,
        effectiveDate: "",
        effectiveTime: "",
      },
      onSubmit,
    });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={"Suspend User"} closeModal={closeModal} />

      <form onSubmit={handleSubmit}>
        <GlobalTextArea
          fullWidth={true}
          inputValue={values.reason}
          inputName={"reason"}
          error={errors.reason && touched.reason}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={errors.reason}
          labelText={"Reason for Suspension"}
          required={true}
        />

        <GroupHeading>Effective From</GroupHeading>
        <FormGroup columns="2" className="mb-4">
          <GlobalInput
            inputValue={values.effectiveDate}
            inputName={"effectiveDate"}
            error={errors.effectiveDate && touched.effectiveDate}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errorMessage={errors.effectiveDate}
            inputType="date"
            required={true}
            labelText="Date"
          />
          <GlobalInput
            inputValue={values.effectiveTime}
            inputName={"effectiveTime"}
            error={errors.effectiveTime && touched.effectiveTime}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errorMessage={errors.effectiveTime}
            inputType="time"
            required={true}
            labelText="Time"
          />
        </FormGroup>

        <GlobalBtn mx="auto" disabled={isLoading}>
          Proceed
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default SuspendUserModal;
