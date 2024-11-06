import moment from "moment";
import { ModalBody } from "../../../csecomponent/cse/dashboardComponent/comment/Comment";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import { FormGroup } from "../../../globalcomponents/Utilities";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { useFormik } from "formik";
import { techDiscussionSchema } from "../../../../Validations/discussionValidation";
import { getToday } from "../../../../utils/dateRanges";

const Readiness = ({
  isOpen,
  closeModal,
  techId,
  confirmAproval,
  isSubmitting,
}) => {
  console.log(techId);
  const onSubmit = (values, action) => {
    const payload = {
      userId: techId,
      discussionDate: moment(`${values.date} ${values.time}`).toISOString(),
    };
    confirmAproval(payload);
    action.resetForm();
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        time: "",
        date: "",
      },
      validationSchema: techDiscussionSchema,
      onSubmit,
    });
  const today = getToday();

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        heading="Confirm Candidate’s  Readiness"
        closeModal={closeModal}
      />
      <ModalBody>
        <p>
          Please set up a discussion date and time with the candidate and click
          confirm to proceed
        </p>
        <form onSubmit={handleSubmit}>
          <FormGroup columns="2" className="mt-3">
            <GlobalInput
              inputType="date"
              labelText="Discussion Date"
              labelColor="var(--clr-primary)"
              inputName="date"
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputValue={values.date}
              min={today}
              error={errors.date && touched.date}
              errorMessage={errors.date}
            />
            <GlobalInput
              inputType="time"
              labelText="Time"
              labelColor="var(--clr-primary)"
              inputName="time"
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputValue={values.time}
              error={errors.time && touched.time}
              errorMessage={errors.time}
            />
          </FormGroup>
          <GlobalBtn
            mx="auto"
            className="mt-4"
            disabled={(!values.time && !values.date) || isSubmitting}
            type="submit"
          >
            Confirm
          </GlobalBtn>
        </form>
      </ModalBody>
    </GlobalModal>
  );
};

export default Readiness;
