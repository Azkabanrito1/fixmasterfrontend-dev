import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalModal from "../../globalcomponents/GlobalModal";
import { FormGroup } from "../../globalcomponents/Utilities";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import { useFormik } from "formik";

const FormOptions = ({ isOpen, closeModal, submit, loading }) => {
  const onSubmit = async (values) => {
    const payload = {
      option: values.questionOption,
    };
    submit(payload);
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        questionOption: "",
      },
      onSubmit,
    });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal} width={"500px"}>
      <AltModalHeader heading={"Add Option"} closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        <FormGroup columns="1">
          <GlobalInput
            labelText="Option"
            inputName="questionOption"
            inputValue={values.questionOption}
            inputPlaceholder="e.g. yes, no"
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.questionOption && touched.questionOption}
            errorMessage={errors.questionOption}
            required
          />
        </FormGroup>
        <GlobalBtn
          type="submit"
          className="m-auto mt-3"
          disabled={!values.questionOption}
        >
          {loading ? "Loading ..." : "Add Option"}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default FormOptions;
