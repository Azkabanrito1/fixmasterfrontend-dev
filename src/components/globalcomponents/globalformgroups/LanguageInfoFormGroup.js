import GlobalSelect from "../GlobalSelect";
import GlobalMultipleSelect from "../GlobalMultipleSelect";
import { Fields, FormGroup, GroupHeading } from "../Utilities";

const LanguageInfoFormGroup = ({
  data = [],
  formikHandlers,
  withPreferred,
  selectedLanguages,
  qamaster = false,
}) => {
  const { values, errors, touched, handleBlur, handleChange } = formikHandlers;

  return (
    <Fields>
      <GroupHeading>Language Proficiency Information</GroupHeading>
      {qamaster ? (
        <p className="text-muted mb-3">
          Please select English and any other languages you are proficient with
        </p>
      ) : (
        <p className="text-muted mb-3">
          Please select two or more languages you are proficient with
        </p>
      )}

      <FormGroup columns="2">
        <GlobalMultipleSelect
          labelText={"Language(s)"}
          initData={data}
          inputName="languages"
          required={true}
          formikHandlers={formikHandlers}
        />

        {withPreferred && values.languages.length > 0 && (
          <GlobalSelect
            defaultOption="Select Language"
            selectName="preferredLanguage"
            labelText="Choose a preferred language"
            options={selectedLanguages}
            valueType="string"
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={touched.preferredLanguage && errors.preferredLanguage}
            errorMessage={errors.preferredLanguage}
            required={true}
          />
        )}
      </FormGroup>
    </Fields>
  );
};

export default LanguageInfoFormGroup;
