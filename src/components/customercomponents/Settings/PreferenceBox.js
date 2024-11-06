import {
  Fields,
  FormGroup,
  SectionHeading,
} from "../../globalcomponents/Utilities";
import GlobalRadio from "../../globalcomponents/GlobalRadio";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useFormik } from "formik";
import { FieldError } from "../../globalcomponents/GlobalInput";
import { useEffect } from "react";

const PreferenceBox = ({
  contactPref,
  saveContactPreference,
  issaving,
  preferences,
}) => {
  const onSubmit = (values) => {
    const payload = {
      id: +values.contactPreferenceId,
    };
    saveContactPreference(payload);
  };
  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      contactPreferenceId: "",
    },
    onSubmit,
  });

  // Update form values when preferences change
  useEffect(() => {
    setFieldValue("contactPreferenceId", preferences?.contactPref);
  }, [preferences]);

  return (
    <section>
      {" "}
      <SectionHeading>Contact Preferences</SectionHeading>
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup>
            <div className="mb-4">
              {contactPref?.map((preference) => (
                <GlobalRadio
                  fs="1rem"
                  bRad="50%"
                  mb="1rem"
                  gap=".5rem"
                  key={preference.id}
                  inputName="contactPreferenceId"
                  inputValue={preference.id}
                  checked={Number(values.contactPreferenceId) === preference.id}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  labelText={preference.name}
                  required={+true}
                />
              ))}

              {errors.contactPreferenceId && touched.contactPreferenceId && (
                <FieldError>{errors.contactPreferenceId}</FieldError>
              )}
            </div>
          </FormGroup>
        </Fields>
        <GlobalBtn
          mx="auto"
          width="max-width"
          type="submit"
          px="2.5rem"
          disabled={!values.contactPreferenceId}
        >
          {issaving ? "Loading....." : "Save"}
        </GlobalBtn>
      </form>
    </section>
  );
};

export default PreferenceBox;
