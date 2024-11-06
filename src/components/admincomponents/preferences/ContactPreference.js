import { useFormik } from "formik";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalModal from "../../globalcomponents/GlobalModal";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import GlobalTextArea from "../../globalcomponents/GlobalTextArea";
import { FormGroup } from "../../globalcomponents/Utilities";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import { useGetPreferenceMaster } from "../../../hooks/useQueries/useAdmin";

const ContactPreference = ({ isOpen, closeModal }) => {
  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      code: "",
      name: "",
      prefMaster: "",
    },
  });

  //-------------------------------------data fetching--------------------------------
  const { data: masterData } = useGetPreferenceMaster();

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        heading="Add Contact Preference"
        closeModal={closeModal}
      />
      <form>
        <FormGroup columns="2" mb="20px">
          <GlobalInput
            inputName="code"
            labelText="Code"
            inputPlaceHolder="001, 002"
            inputValue={values.code}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          <GlobalSelect
            selectName="prefMaster"
            labelText="Preference Master"
            inputPlaceHolder="001, 002"
            options={masterData?.data}
            handleBlur={handleBlur}
            handleSelect={handleChange}
          />
        </FormGroup>
        <FormGroup columns="1">
          <GlobalTextArea
            inputName="code"
            labelText="Code"
            inputPlaceHolder="001, 002"
          />
        </FormGroup>
        <GlobalBtn className="m-auto mt-3">Submit</GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default ContactPreference;
