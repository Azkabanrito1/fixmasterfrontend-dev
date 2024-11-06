import { useEffect } from "react";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalModal from "../../globalcomponents/GlobalModal";
import { FormGroup } from "../../globalcomponents/Utilities";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useFormik } from "formik";

const MasterOptions = ({
  isOpen,
  closeModal,
  heading,
  tName,
  submit,
  isAdding,
  placeHolder,
  customer,
  actionText = false,
}) => {
  const onSubmit = () => {
    //--------------------------------------------------customer subTypes------------------------------------------------
    const payload = {
      name: values.name,
      description: values.description,
    };
    submit(payload);
  };
  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit,
  });
  useEffect(() => {
    customer?.map((item) => {
      setFieldValue("name", item?.name);
      setFieldValue("description", item?.description);
    });
  }, [customer]);

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal} width={"500px"}>
      <AltModalHeader heading={heading} closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <GlobalInput
            name={"name"}
            inputValue={values.name}
            handleChange={handleChange}
            labelText="Name"
            inputPlaceholder={placeHolder}
            required
          />
          <GlobalInput
            name={"description"}
            inputValue={values.description}
            labelText="Description"
            handleChange={handleChange}
            inputPlaceholder="describe this customer type"
            required
          />
        </FormGroup>

        <GlobalBtn type="submit" className="mt-3 m-auto" disabled={isAdding}>
          {isAdding ? "Loading ....." : actionText}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default MasterOptions;
