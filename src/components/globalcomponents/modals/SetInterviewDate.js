import { useFormik } from "formik";
import GlobalInput, { FieldError } from "../GlobalInput";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalModal from "../GlobalModal";
import GlobalBtn from "../GlobalBtn";
import { FormGroup } from "../Utilities";
import { getToday } from "../../../utils/dateRanges";
import { useState } from "react";
import moment from "moment";

const SetInterviewDate = ({
  isOpen,
  closeModal,
  setInterview,
  isSubmitting,
  interviewType, // "interview" or "readiness"
  applicant,
  address,
}) => {
  const [error, setError] = useState("");
  const today = getToday();

  const onSubmit = (values) => {
    setError("");

    const now = moment();
    const chosenDate = moment(`${values.date} ${values.time}`);

    if (now.isAfter(chosenDate)) {
      setError("Please choose a later date/time");

      return;
    }

    const payload = {
      interviewDate: moment(`${values.date} ${values.time}`).toISOString(true),
      interviewLink: values.meetingLink,
    };
    setInterview(payload);
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      date: "",
      time: "",
      meetingLink: "",
    },
    onSubmit,
  });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={"Set Interview Date"} closeModal={closeModal} />

      {interviewType === "readiness" ? null : (
        <p className="mb-3">
          Are you sure you want to approve{" "}
          <strong>{`${applicant?.firstName || applicant?.name}`}'s</strong>{" "}
          application.
        </p>
      )}

      {interviewType === "readiness" ? (
        <p>
          Please set up a discussion date and time with the candidate and click confirm to proceed
        </p>
      ) : (
        <p>
          Please set the date and time for the interview and click confirm to
          proceed
        </p>
      )}
      <form onSubmit={handleSubmit}>
        {!!error && (
          <FieldError className="fs-6 mb-3 text-center">{error}</FieldError>
        )}

        <FormGroup columns="2" className="my-3">
          <GlobalInput
            inputType="date"
            inputName="date"
            inputValue={values.date}
            labelText="Date"
            handleChange={handleChange}
            min={today}
            required
          />
          <GlobalInput
            inputType="time"
            inputName="time"
            inputValue={values.time}
            labelText="Time"
            handleChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup className="mb-4">
          <GlobalInput
            inputName="meetingLink"
            inputValue={values.meetingLink}
            labelText={address}
            handleChange={handleChange}
            required={true}
          />
        </FormGroup>

        <GlobalBtn
          mx="auto"
          disabled={(!values.time && !values.date) || isSubmitting}
          type="submit"
        >
          Proceed
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default SetInterviewDate;
