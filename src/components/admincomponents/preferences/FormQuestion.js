import { useFormik } from "formik";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalModal from "../../globalcomponents/GlobalModal";
import GlobalTextArea from "../../globalcomponents/GlobalTextArea";
import { Fields, FormGroup } from "../../globalcomponents/Utilities";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalInput from "../../globalcomponents/GlobalInput";

const FormQuestion = ({ openModal, closeModal, action, loading }) => {
  const onSubmit = async (values) => {
    const payload = {
      question: values.general,
      questionType: values.income,
    };
    action(payload);
  };
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        general: "",
        income: "",
      },
      onSubmit,
    });

  return (
    <GlobalModal isOpen={openModal} closeModal={closeModal} width={"700px"}>
      <AltModalHeader heading={"Add Question"} closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup columns="1">
            <GlobalInput
              labelText="Question Type"
              inputName="income"
              inputValue={values.income}
              inputPlaceholder="e.g. general questions, earnings question"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.income && touched.income}
              errorMessage={errors.income}
              required
            />
            <GlobalTextArea
              descriptionText="Please enter the collaborator preference question"
              fullWidth={true}
              labelText="Question"
              inputName="general"
              inputValue={values.general}
              inputPlaceholder="e.g. Franchise, Cse Preferences"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.general && touched.general}
              errorMessage={errors.general}
              required
            />
          </FormGroup>
        </Fields>
        <GlobalBtn
          type="submit"
          className="m-auto mt-4"
          disabled={!values.general}
        >
          {loading ? "Loading..." : "Add"}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default FormQuestion;
