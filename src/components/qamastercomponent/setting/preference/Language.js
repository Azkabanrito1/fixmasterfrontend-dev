import GlobalSelect from "../../../globalcomponents/GlobalSelect";
import { FormGroup, SectionHeading } from "../../../globalcomponents/Utilities";

const Language = ({ handleFormik }) => {
  const language = [
    {
      id: 0,
      name: "English",
    },
    {
      id: 2,
      name: "French",
    },
    {
      id: 3,
      name: "Spanish",
    },
    {
      id: 4,
      name: "Dutch",
    },
  ];

  const { handleChange, handleBlur, errors, touched } = handleFormik;

  return (
    <section className="mt-3">
      <SectionHeading>
        Language Preferences (Can select more than 1)
      </SectionHeading>
      <FormGroup columns="3" style={{ marginTop: "20px" }}>
        <GlobalSelect
          labelText="Languages*"
          selectName="languages"
          options={language}
          defaultOption="Select Language"
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={errors.languages}
          error={errors.languages && touched.languages}
        />
      </FormGroup>
    </section>
  );
};

export default Language;
