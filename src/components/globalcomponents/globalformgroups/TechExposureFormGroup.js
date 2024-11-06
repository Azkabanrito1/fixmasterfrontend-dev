import { FieldError } from "../GlobalInput";
import GlobalMultipleSelect from "../GlobalMultipleSelect";
import { Fields, FormGroup, GroupHeading } from "../Utilities";

const TechExposureFormGroup = ({ initData = [], formikHandlers }) => {
  const { errors, touched, handleChange, handleBlur, values } = formikHandlers;

  return (
    <Fields>
      <GroupHeading>Candidate’s Technology Exposure Evaluation</GroupHeading>

      <FormGroup columns="1" mb="24px">
        <div>
          <div className="description" id="ownPhone-radio-group">
            Do you own a smart phone?<span className="text-danger">*</span>
          </div>
          <div role="group" aria-labelledby="ownPhone-radio-group">
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="ownPhone"
                value={1}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="ownPhone"
                value={0}
              />
              No
            </label>
            {errors.ownPhone && touched.ownPhone && (
              <FieldError>{errors.ownPhone}</FieldError>
            )}
          </div>
        </div>
      </FormGroup>

      <FormGroup columns="1" mb="24px">
        <div>
          <div className="description" id="socialMedia-radio-group">
            Do you use social media?<span className="text-danger">*</span>
          </div>
          <div role="group" aria-labelledby="socialMedia-radio-group">
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="socialMedia"
                value={"1"}
                checked={values.socialMedia === "1"}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                onBlur={handleBlur}
                onChange={handleChange}
                name="socialMedia"
                value={"0"}
                checked={values.socialMedia === "0"}
              />
              No
            </label>
            {errors.socialMedia && touched.socialMedia && (
              <FieldError>{errors.socialMedia}</FieldError>
            )}
          </div>
        </div>
      </FormGroup>
      {values.socialMedia === "1" && (
        <>
          <p className="text-muted mb-3">
            If yes, select the social media platform you are familiar with?
          </p>
          <FormGroup columns="2">
            <GlobalMultipleSelect
              labelText="Social Media"
              initData={initData}
              inputName="mediaChannels"
              formikHandlers={formikHandlers}
            />
          </FormGroup>
        </>
      )}
    </Fields>
  );
};

export default TechExposureFormGroup;
