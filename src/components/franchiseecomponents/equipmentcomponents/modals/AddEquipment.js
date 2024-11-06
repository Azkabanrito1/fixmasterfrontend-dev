import { useFormik } from "formik";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import { FormGroup } from "../../../globalcomponents/Utilities";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import GlobalModal from "../../../../components/globalcomponents/GlobalModal";
import AltModalHeader from "../../../../components/layouts/modal/AltModalHeader";
import GlobalFullScreenLoader from "../../../globalcomponents/GlobalFullScreenLoader";

const AddEquipment = ({
  isOpen,
  closeModal,
  createEqp,
  updateEqp,
  eqpId,
  equipment,
  isLoading,
}) => {
  const addNewEquipment = (values) => {
    const payload = {
      equipmentName: values.equipmentName,
      quantity: values.quantity,
      rateCharged: values.rateCharged,
      description: values.description,
    };
    createEqp(payload);
  };

  const updateEquipment = (values) => {
    const payload = {
      equipmentName: values.equipmentName,
      quantity: values.quantity,
      rateCharged: values.rateCharged,
      description: values.equipmentName,
      availability: values.availability,
      equipmentId: eqpId,
    };

    updateEqp(payload);
  };

  const { values, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      equipmentName: equipment?.name || "",
      quantity: equipment?.quantity || 1,
      rateCharged: equipment?.rateCharged || 0,
      description: equipment?.description || "",
      availability: equipment?.availabilty || "",
    },
    onSubmit: equipment?.name ? updateEquipment : addNewEquipment,
  });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        heading={equipment?.name ? "Update Equipment" : "Add Equipment"}
        closeModal={closeModal}
      />

      <form onSubmit={handleSubmit}>
        <FormGroup columns="2" className="mb-5">
          <GlobalInput
            labelText={"Equipment Name"}
            labelColor="var(--clr-primary)"
            inputType={"text"}
            inputPlaceholder="Enter Equipment Name"
            inputName={"equipmentName"}
            inputValue={values.equipmentName}
            handleBlur={handleBlur}
            handleChange={handleChange}
            required
          />
          <GlobalInput
            labelText={"Rate/hr"}
            labelColor="var(--clr-primary)"
            inputType={"number"}
            inputPlaceholder="0.00"
            inputName={"rateCharged"}
            inputValue={values.rateCharged}
            handleBlur={handleBlur}
            handleChange={handleChange}
            required
          />
          <GlobalInput
            labelText={"Quantity"}
            labelColor="var(--clr-primary)"
            inputType={"number"}
            inputPlaceholder="1"
            inputName={"quantity"}
            inputValue={values.quantity}
            handleBlur={handleBlur}
            handleChange={handleChange}
            min={1}
            required
          />
          <GlobalInput
            labelText={"Description"}
            labelColor="var(--clr-primary)"
            inputType={"text"}
            inputPlaceholder="Description of equipment"
            inputName={"description"}
            inputValue={values.description}
            handleBlur={handleBlur}
            handleChange={handleChange}
            required
          />
          {equipment?.name && (
            <GlobalInput
              labelText={"Availability"}
              labelColor="var(--clr-primary)"
              inputType={"text"}
              inputPlaceholder="Availability of equipment"
              inputName={"availability"}
              inputValue={values.availability}
              handleBlur={handleBlur}
              handleChange={handleChange}
              required
            />
          )}
        </FormGroup>

        <GlobalBtn mx="auto" disabled={isLoading} type="submit">
          {equipment?.name ? "Update Equipment" : "Add Equipment"}
        </GlobalBtn>
      </form>

      <GlobalFullScreenLoader open={isLoading} />
    </GlobalModal>
  );
};

export default AddEquipment;
