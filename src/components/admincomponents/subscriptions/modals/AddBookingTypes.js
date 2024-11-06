import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { BallBeat } from "react-pure-loaders";
import { useFormik } from "formik";
import { FormGroup } from "../../../globalcomponents/Utilities";
import GlobalCheckbox from "../../../globalcomponents/GlobalCheckbox";
import { useEffect } from "react";
import { useGetFixClass } from "../../../../hooks/useQueries/useJobs";

const AddBookingType = ({
  isOpen,
  closeModal,
  initValues,
  addServiceType,
  subId,
  isSubmitting,
}) => {
  // service type is also the same thing as fix class
  const { data: serviceTypeData } = useGetFixClass({
    refetchOnWindowRefocus: false,
  });

  useEffect(() => {
    setFieldValue("fixClassId", initValues);
  }, []);

  const onSubmit = () => {
    const payload = {
      subscriptionId: parseInt(subId),
      fixClassId: values.fixClassId.map((value) => parseInt(value)),
    };

    addServiceType(payload);
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      fixClassId: [],
    },
    onSubmit,
  });

  return (
    <GlobalModal closeModal={closeModal} isOpen={isOpen}>
      <AltModalHeader heading="Select Booking Type" closeModal={closeModal} />
      {isSubmitting && (
        <div className="text-center mb-3">
          <BallBeat loading={isSubmitting} color="var(--clr-primary)" />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormGroup columns="3" className="mb-5">
          {serviceTypeData?.data?.map((type) => (
            <GlobalCheckbox
              key={type.id}
              labelText={type.name}
              inputId={type.name}
              inputName="fixClassId"
              inputValue={type.id}
              handleChange={handleChange}
              checked={values.fixClassId.includes(String(type.id))}
            />
          ))}
        </FormGroup>

        <GlobalBtn
          className="mt-3"
          mx="auto"
          type="submit"
          disabled={values.fixClassId.length === 0 || isSubmitting}
        >
          {isSubmitting ? "Submitting" : "Add"}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default AddBookingType;
