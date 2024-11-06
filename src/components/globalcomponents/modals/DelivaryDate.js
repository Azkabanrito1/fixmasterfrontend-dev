import { useFormik } from "formik";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalBtn from "../GlobalBtn";
import GlobalInput, { FieldError } from "../GlobalInput";
import GlobalModal from "../GlobalModal";
import { FormGroup } from "../Utilities";
import { useState } from "react";
import { getToday } from "../../../utils/utilityFxns";
import moment from "moment";

const DelivaryDate = ({
  isOpen,
  closeModal,
  heading,
  confirmDispatch,
  isConfirm,
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
      date: values.date,
      time: values.time,
    };
    confirmDispatch(payload);
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
      <AltModalHeader heading={heading} closeModal={closeModal} />
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

        <GlobalBtn
          mx="auto"
          disabled={(!values.time && !values.date) || isConfirm}
          type="submit"
        >
          Proceed
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default DelivaryDate;
