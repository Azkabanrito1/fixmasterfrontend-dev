import { genderOptions } from "../../../utils/selectOptions";
import { getMaxDate } from "../../../utils/dateRanges";
import GlobalInput from "../GlobalInput";
import GlobalSelect from "../GlobalSelect";
import { Fields, FormGroup, GroupHeading } from "../Utilities";
import NameFormGroup from "./NameFormGroup";

const PersonalInfoFormGroup = ({ formikHandlers, user }) => {
  const { errors, touched, handleChange, handleBlur, values } = formikHandlers;
  const maxDate = getMaxDate();

  return (
    <Fields>
      <GroupHeading>Candidate’s Personal Information</GroupHeading>
      <NameFormGroup formikHandlers={formikHandlers} user={user} />

      <FormGroup columns="2">
        <GlobalSelect
          labelText="Gender"
          selectName="gender"
          defaultOption="Select gender"
          selectValue={values.gender}
          options={genderOptions}
          handleBlur={handleBlur}
          handleChange={handleChange}
          error={errors.gender && touched.gender}
          disabled={user?.genderId ? true : false}
          errorMessage={errors.gender}
          required={true}
        />

        <GlobalInput
          labelText="Date Of Birth"
          inputType="date"
          inputName="dob"
          inputValue={values.dob}
          min="1920-01-01"
          max={maxDate}
          handleBlur={handleBlur}
          handleChange={handleChange}
          disabled={user?.dateOfBirth ? true : false}
          error={errors.dob && touched.dob}
          errorMessage={errors.dob}
          required={true}
        />
      </FormGroup>
    </Fields>
  );
};

export default PersonalInfoFormGroup;
