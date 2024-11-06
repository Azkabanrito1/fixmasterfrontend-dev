import {
  FormGroup,
  SectionHeading,
} from "../../../components/globalcomponents/Utilities";
import { useFormik } from "formik/dist";
import Language from "../../../components/qamastercomponent/setting/preference/Language";
import GlobalInput from "../../../components/globalcomponents/GlobalInput";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";

const TechMaximum = ({ maximumTechnician = false }) => {
  const onSubmit = async (values) => {
    const payload = {
      tech: values.tech,
      Language: values.languages,
      clockIn: values.clockIn,
      clockOut: values.clockOut,
      allDays: values.allDays,
      weekDay: values.weekDay,
      weekEnd: values.weekEnd,
      custom: values.custom,
      time: values.time,
      notify: Boolean(values.notify),
      supportRequest: Boolean(values.supportRequest),
      training: Boolean(values.training),
      message: Boolean(values.message),
    };
    console.log(payload);
  };
  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        tech: "",
      },
      onSubmit,
    });
  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <Language
          handleFormik={{ handleChange, handleBlur, errors, values, touched }}
        /> */}
        <section className="mt-3">
          <SectionHeading>
            Number of Technician (Specify the maximum number of technicians to
            be assigned to you)
          </SectionHeading>
          <FormGroup columns="3">
            <GlobalInput
              labelText="Numbers of Technician"
              inputName="tech"
              inputPlaceholder="E.g 100"
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputType="number"
              inputValue={values.tech}
            />
          </FormGroup>
        </section>
        <GlobalBtn className="mb-2 mt-3 m-auto" type="submit">
          Save
        </GlobalBtn>
      </form>
    </>
  );
};

export default TechMaximum;
