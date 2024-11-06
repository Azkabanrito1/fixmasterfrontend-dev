import React from "react";
import { Fields, GroupHeading, FormGroup } from "../Utilities";
import GlobalMultipleSelect from "../GlobalMultipleSelect";
import { FieldError } from "../GlobalInput";

const CallCenterLanguage = ({ data = [], formikHandlers }) => {
  const { values, errors, touched, handleBlur, setFieldValue } = formikHandlers;

  const languageTemplate = values.languages.map((language) => {
    return (
      <div key={language}>
        <div className="description" id="trading-radio-group">
          {language}
          <span className="text-danger">*</span>
        </div>
        <div role="group" aria-labelledby="trading-radio-group">
          <label>
            <input
              type="radio"
              onBlur={handleBlur}
              onChange={(e) => {
                setFieldValue("languagePercent", {
                  ...values.languagePercent,
                  [e.target.name]: e.target.value,
                });
              }}
              name={language}
              value="0 - 20%"
              checked={values.languagePercent[language] === "0 - 20%"}
            />
            0-20%
          </label>
          <label>
            <input
              type="radio"
              onBlur={handleBlur}
              onChange={(e) => {
                setFieldValue("languagePercent", {
                  ...values.languagePercent,
                  [e.target.name]: e.target.value,
                });
              }}
              name={language}
              value="20 - 40%"
              checked={values.languagePercent[language] === "20 - 40%"}
            />
            20-40%
          </label>
          <label>
            <input
              type="radio"
              onBlur={handleBlur}
              onChange={(e) => {
                setFieldValue("languagePercent", {
                  ...values.languagePercent,
                  [e.target.name]: e.target.value,
                });
              }}
              name={language}
              value="40 - 60%"
              checked={values.languagePercent[language] === "40 - 60%"}
            />
            40-60%
          </label>
          <label>
            <input
              type="radio"
              onBlur={handleBlur}
              onChange={(e) => {
                setFieldValue("languagePercent", {
                  ...values.languagePercent,
                  [e.target.name]: e.target.value,
                });
              }}
              name={language}
              value="60 - 80%"
              checked={values.languagePercent[language] === "60 - 80%"}
            />
            60-80%
          </label>
          <label>
            <input
              type="radio"
              onBlur={handleBlur}
              onChange={(e) => {
                setFieldValue("languagePercent", {
                  ...values.languagePercent,
                  [e.target.name]: e.target.value,
                });
              }}
              name={language}
              value="80 - 100%"
              checked={values.languagePercent[language] === "80 - 100%"}
            />
            80-100%
          </label>
          {errors.trading && touched.trading && (
            <FieldError>{errors.trading}</FieldError>
          )}
        </div>
      </div>
    );
  });
  return (
    <Fields>
      <GroupHeading>Language Proficiency Information</GroupHeading>
      <p className="text-muted">
        Please select two or more languages you are proficient with
      </p>
      <FormGroup columns="2">
        <GlobalMultipleSelect
          labelText={"Language(s)"}
          initData={data}
          inputName="languages"
          required={true}
          formikHandlers={formikHandlers}
        />
      </FormGroup>
      {values.languages?.length > 0 && (
        <p className="text-muted mt-4">
          Rate your proficiency in each of the selected languages
        </p>
      )}
      <FormGroup columns="1" mt="24px">
        {languageTemplate}
      </FormGroup>
    </Fields>
  );
};

export default CallCenterLanguage;
