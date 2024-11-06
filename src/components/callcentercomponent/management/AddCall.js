import { useFormik } from "formik";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalModal from "../../globalcomponents/GlobalModal";
import { Fields, FormGroup } from "../../globalcomponents/Utilities";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import GlobalTextArea from "../../globalcomponents/GlobalTextArea";
import { useEffect } from "react";

const AddCall = ({ isOpen, closeModal, activeCaller, activeCallerId }) => {
  //   console.log(activeCaller);
  const onSubmit = async (values) => {
    const payload = {
      trainingType: values.training,
      comment: values.comment,
    };
    // console.log(payload);
  };
  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    errors,
    touched,
    handleSubmit,
  } = useFormik({
    initialValues: {
      customerName: "",
      time: "",
      date: "",
      training: "",
      comment: "",
    },
    onSubmit,
  });
  const trainings = [
    {
      id: 1,
      name: "FixMaster",
    },
    {
      id: 2,
      name: "Office Politices",
    },
    {
      id: 3,
      name: "Work Ethnice",
    },
  ];
  const activeUser = activeCaller.filter(
    (caller) => caller.callerId === activeCallerId
  );

  useEffect(() => {
    if (activeUser && activeUser.length > 0) {
      setFieldValue("customerName", activeUser[0].name);
    }
  }, [activeUser]);

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading="Add call details" closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup columns="2">
            <GlobalInput
              labelText="Customer Name"
              inputName="customerName"
              inputValue={values.customerName}
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputPlaceholder="Joe Doe"
              labelColor="var(--clr-primary)"
              disabled={true}
            />
            <GlobalInput
              labelText="Date"
              inputName="date"
              inputValue={values.date}
              inputType="date"
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputPlaceholder="Joe Doe"
              labelColor="var(--clr-primary)"
              disabled={true}
            />
            <GlobalInput
              labelText="Time"
              inputName="time"
              inputValue={values.time}
              inputType="time"
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputPlaceholder="Joe Doe"
              labelColor="var(--clr-primary)"
              disabled={true}
            />
            <GlobalSelect
              labelText="Training Type"
              selectName="training"
              defaultOption="Select Training Type"
              options={trainings}
              handleChange={handleChange}
              handleBlur={handleBlur}
              labelColor="var(--clr-primary)"
              errorMessage={errors.training}
              error={errors.training && touched.training}
              required
            />
          </FormGroup>
        </Fields>
        <Fields>
          <FormGroup columns="1">
            <GlobalTextArea
              labelText="Customer’s Message (optional)"
              labelColor="var(--clr-primary)"
              inputName="comment"
              inputValue={values.comment}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </FormGroup>
        </Fields>
      </form>
    </GlobalModal>
  );
};

export default AddCall;
