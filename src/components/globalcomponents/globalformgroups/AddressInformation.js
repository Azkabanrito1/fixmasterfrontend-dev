import { useEffect } from "react";
import {
  useGetLgaByStateName,
  useGetStates,
} from "../../../hooks/useQueries/useIdentity";
import GlobalInput, { FieldError, InputGroup } from "../GlobalInput";
import GlobalSelect from "../GlobalSelect";
import { Fields, FormGroup, GroupHeading } from "../Utilities";
import { PropTypes } from "prop-types";
import { stringComparator } from "../../../utils/utilityFxns";

const AddressInfoFormGroup = ({
  title,
  inputRef,
  formikHandlers,
  inputNames,
  withLocation = false,
  withPostalCode = false,
  columns = 2,
  addressLabel = "Enter Your Address",
  useCompanyName = false,
  withTerritory = false,
}) => {
  const { values, errors, touched, handleChange } = formikHandlers;
  const {
    addressName,
    stateName,
    lgaName,
    cityName,
    locationName,
    postalCodeName,
  } = inputNames;
  const { data: statesData } = useGetStates();
  const { data: lgaData, refetch: fetchLga } = useGetLgaByStateName(
    values[stateName],
    { enabled: !!values[stateName] }
  );

  useEffect(() => {
    if (!!values[stateName]) {
      fetchLga();
    }
  }, [values[stateName]]);

  const allStates = stringComparator(statesData?.data || []);
  const allLgas = stringComparator(lgaData?.data || []);

  return (
    <Fields>
      <GroupHeading>{title}</GroupHeading>

      <FormGroup columns={columns}>
        {!!useCompanyName && (
          <GlobalInput
            name="companyName"
            labelText="Company Name"
            inputPlaceholder="Enter the company name"
            handleChange={handleChange}
            value={values.companyName}
            required
          />
        )}

        <InputGroup>
          <label htmlFor="contactAddress">
            {addressLabel}
            <span className="text-danger">*</span>
          </label>
          <div className="input-block">
            <input
              className={errors.address && touched.address ? "invalid" : ""}
              type="text"
              id="contactAddress"
              name={addressName}
              defaultValue={values[addressName]}
              placeholder={addressLabel}
              ref={inputRef}
              required
            />
          </div>
          {errors[addressName] && touched[addressName] && (
            <FieldError>{errors[addressName]}</FieldError>
          )}
        </InputGroup>

        <GlobalSelect
          // labelColor={"var(--clr-primary)"}
          labelText={"State"}
          defaultOption={"Select a State"}
          selectName={stateName}
          selectValue={values[stateName]}
          options={allStates}
          handleChange={handleChange}
          valueType={"string"}
          error={errors[stateName] && touched[stateName]}
          errorMessage={errors[stateName]}
          required={true}
        />

        <GlobalSelect
          // labelColor={"var(--clr-primary)"}
          labelText={"LGA"}
          defaultOption={"Select a LGA"}
          selectName={lgaName}
          selectValue={values[lgaName]}
          options={allLgas}
          handleChange={handleChange}
          valueType={"string"}
          error={errors[lgaName] && touched[lgaName]}
          errorMessage={errors[lgaName]}
          required={true}
        />

        <GlobalInput
          labelText={"City"}
          inputPlaceholder={"City"}
          inputName={cityName}
          inputValue={values[cityName]}
          handleChange={handleChange}
          error={errors[cityName] && touched[cityName]}
          errorMessage={errors[cityName]}
          required={true}
          // disabled
        />

        {withLocation && (
          <GlobalInput
            labelText={"Landmarks/Description"}
            descriptionText="Give more information about address if needed"
            inputPlaceholder={"Landmarks"}
            inputName={locationName}
            inputValue={values[locationName]}
            handleChange={handleChange}
            error={errors[locationName] && touched[locationName]}
            errorMessage={errors[locationName]}
            required={true}
          />
        )}

        {withPostalCode && (
          <GlobalInput
            labelText={"Postal Code"}
            inputPlaceholder={"Input the postal code of your area"}
            inputName={postalCodeName}
            inputValue={values[postalCodeName]}
            handleChange={handleChange}
            error={errors[postalCodeName] && touched[postalCodeName]}
            errorMessage={errors[postalCodeName]}
            required={true}
            pattern="[0-9]*"
            maxLength={6}
          />
        )}
        {withTerritory && (
          <GlobalInput
            name="territory"
            labelText="Territory Name"
            inputPlaceholder="Enter the company name"
            handleChange={handleChange}
            value={values.territory}
            required
          />
        )}
      </FormGroup>
    </Fields>
  );
};

export default AddressInfoFormGroup;

AddressInfoFormGroup.propTypes = {
  title: PropTypes.string,
  inputRef: PropTypes.object.isRequired,
  formikHandlers: PropTypes.shape({
    values: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
  }),
  inputNames: PropTypes.shape({
    addressName: PropTypes.string.isRequired,
    stateName: PropTypes.string.isRequired,
    lgaName: PropTypes.string.isRequired,
    cityName: PropTypes.string.isRequired,
    locationName: PropTypes.string,
    postalCodeName: PropTypes.string,
  }),
  withLocation: PropTypes.bool,
  withPostalCode: PropTypes.bool,
};
