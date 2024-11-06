import GlobalInput from "../GlobalInput";
import GlobalSelect from "../GlobalSelect";
import { Fields, FormGroup, GroupHeading } from "../Utilities";

const AcademicInfoFormGroup = ({ formikHandlers = {}, qualifications }) => {
  const { values, errors, touched, handleChange, handleBlur } = formikHandlers;

  return (
    <Fields>
      <GroupHeading>Candidate’s Academic Qualifications</GroupHeading>
      <FormGroup columns="2">
        <GlobalSelect
          labelText="Highest Level Of Education"
          selectName="education"
          options={qualifications?.data || []}
          defaultOption="Select Level"
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={errors.education}
          error={errors.education && touched.education}
          required={true}
        />

        <GlobalInput
          labelText="Course Of Study"
          inputType="text"
          inputName="course"
          inputPlaceholder="Enter Course"
          inputValue={values.course}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={errors.course}
          error={errors.course && touched.course}
          required={true}
        />
      </FormGroup>
    </Fields>
  );
};

export default AcademicInfoFormGroup;
