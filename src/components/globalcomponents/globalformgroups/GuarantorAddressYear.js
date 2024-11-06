import { FieldError } from "../GlobalInput";
import { Fields, FormGroup, GroupHeading } from "../Utilities";

const GuarantorAddressYear = ({
  formikHandlers,
  useHomeOccupancy = false,
  useOfficeOccupancy = false,
}) => {
  const { errors, touched, handleChange, handleBlur, values } = formikHandlers;
  return (
    <>
      {useHomeOccupancy && (
        <Fields>
          <GroupHeading>Details of Occupancy</GroupHeading>
          <FormGroup columns="1" mb="24px">
            <div>
              <div className="description" id="homeOccupancy-radio-group">
                How long have they been an occupant in the above location?
                <span className="text-danger">*</span>
              </div>
              <div role="group" aria-labelledby="homeOccupancy-radio-group">
                <label>
                  <input
                    type="radio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="homeOccupancy"
                    value={"0 - 3 years"}
                  />
                  0-3 years
                </label>
                <label>
                  <input
                    type="radio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="homeOccupancy"
                    value={"3 - 5 years"}
                  />
                  3-5 years
                </label>
                <label>
                  <input
                    type="radio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="homeOccupancy"
                    value={"5 and more years"}
                  />
                  5 and More years
                </label>
                {errors.homeOccupancy && touched.homeOccupancy && (
                  <FieldError>{errors.homeOccupancy}</FieldError>
                )}
              </div>
            </div>
          </FormGroup>
        </Fields>
      )}

      {useOfficeOccupancy && (
        <Fields>
          <GroupHeading>Years in the Company</GroupHeading>

          <FormGroup columns="1" mb="24px">
            <div>
              <div className="description" id="officeOccupancy-radio-group">
                How long have they worked for the above company?
                <span className="text-danger">*</span>
              </div>
              <div role="group" aria-labelledby="officeOccupancy-radio-group">
                <label>
                  <input
                    type="radio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="officeOccupancy"
                    value={"0 - 3 years"}
                  />
                  0-3 years
                </label>
                <label>
                  <input
                    type="radio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="officeOccupancy"
                    value={"3 - 5 years"}
                  />
                  3-5 years
                </label>
                <label>
                  <input
                    type="radio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="officeOccupancy"
                    value={"5 and more years"}
                  />
                  5 and More years
                </label>
                {errors.officeOccupancy && touched.officeOccupancy && (
                  <FieldError>{errors.officeOccupancy}</FieldError>
                )}
              </div>
            </div>
          </FormGroup>
        </Fields>
      )}
    </>
  );
};

export default GuarantorAddressYear;
