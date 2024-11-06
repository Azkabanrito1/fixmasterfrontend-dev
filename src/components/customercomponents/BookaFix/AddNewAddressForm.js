import { useEffect, useRef } from "react";
import GlobalInput, { FieldError } from "../../globalcomponents/GlobalInput";
import { FormGroup } from "../../globalcomponents/Utilities";
import { InputGroup } from "../../globalcomponents/GlobalInput";
import GlobalTextArea from "../../globalcomponents/GlobalTextArea";
import GlobalPhoneInput from "../../globalcomponents/GlobalPhoneInput";
import scriptLoader from "react-async-script-loader";
import useGooglePlaces from "../../../hooks/useGooglePlaces";
import {
  useGetLgaByStateName,
  useGetStates,
} from "../../../hooks/useQueries/useIdentity";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import { stringComparator } from "../../../utils/utilityFxns";

const AddAddress = ({
  isScriptLoadSucceed,
  formikHandlers,
  mode,
  selectedCountry,
  setSelectedCountry,
  location, // where the component is called from ie "book a fix" or "service location"
}) => {
  const { errors, touched, values, handleBlur, handleChange, setFieldValue } =
    formikHandlers;
  const { data: statesData } = useGetStates({
    refetchOnWindowFocus: false,
  });
  const { data: lgaData, refetch: fetchLga } = useGetLgaByStateName(
    values.state,
    { enabled: !!values.state }
  );

  const allStates = stringComparator(statesData?.data);

  const inputRef = useRef(null);
  const addressComponents = useGooglePlaces(isScriptLoadSucceed, inputRef);

  useEffect(() => {
    const {
      state,
      lga,
      city,
      cityIdResult,
      streetName,
      streetNumber,
      longitude,
      latitude,
    } = addressComponents;

    if (state) {
      setFieldValue("state", state);
      setFieldValue("lga", lga);
      setFieldValue("city", city);
      setFieldValue("cityId", cityIdResult);
      setFieldValue("address", inputRef.current.value);
      setFieldValue("longitude", longitude);
      setFieldValue("latitude", latitude);
      if (location === "service location") {
        setFieldValue("streetName", streetName);
        setFieldValue("houseNumber", streetNumber);
      }
    }
  }, [addressComponents]);

  useEffect(() => {
    if (values.state) {
      fetchLga();
    }
  }, [values.state]);

  return (
    <>
      <h4
        style={{
          marginBottom: "12px",
          fontSize: "1.2rem",
          fontWeight: 600,
        }}
      >
        Address For The Fix
      </h4>

      <FormGroup columns="2" mb="1.5rem">
        <GlobalInput
          labelColor={"var(--clr-primary)"}
          labelText={"Address Title"}
          inputPlaceholder={"eg. Home, Mum's house etc..."}
          inputName={"addressTitle"}
          inputValue={values.addressTitle}
          handleBlur={handleBlur}
          handleChange={handleChange}
          error={errors.addressTitle && touched.addressTitle}
          errorMessage={errors.addressTitle}
          required={true}
        />

        <InputGroup labelColor="var(--clr-primary)">
          <label htmlFor="fixAddress">Enter Your Address*</label>
          <div className="input-block">
            <input
              className={errors.address && touched.address ? "invalid" : ""}
              type="text"
              id="fixAddress"
              name="address"
              defaultValue={values.address}
              placeholder="Enter your address"
              ref={inputRef}
              required
            />
          </div>
          {errors.address && touched.address && (
            <FieldError>{errors.address}</FieldError>
          )}
        </InputGroup>

        <GlobalSelect
          labelColor={"var(--clr-primary)"}
          labelText={"State"}
          defaultOption={"Select a State"}
          selectName={"state"}
          selectValue={values.state}
          options={allStates}
          handleChange={handleChange}
          valueType={"string"}
          error={errors.state && touched.state}
          errorMessage={errors.state}
          required={true}
        />

        <GlobalSelect
          labelColor={"var(--clr-primary)"}
          labelText={"LGA"}
          defaultOption={"Select a LGA"}
          selectName={"lga"}
          selectValue={values.lga}
          options={lgaData?.data || []}
          handleChange={handleChange}
          valueType={"string"}
          error={errors.lga && touched.lga}
          errorMessage={errors.lga}
          required={true}
        />

        <GlobalInput
          labelColor={"var(--clr-primary)"}
          labelText={"City"}
          inputPlaceholder={"City"}
          inputName={"city"}
          inputValue={values.city}
          handleChange={handleChange}
          error={errors.city && touched.city}
          errorMessage={errors.city}
          required={true}
        />

        {location === "service location" && (
          <>
            <GlobalInput
              labelColor={"var(--clr-primary)"}
              labelText={"Street Name"}
              inputPlaceholder={"Street Name"}
              inputName={"streetName"}
              inputValue={values.streetName}
              handleChange={handleChange}
              error={errors.streetName && touched.streetName}
              errorMessage={errors.streetName}
            />

            <GlobalInput
              labelColor={"var(--clr-primary)"}
              labelText={"House Number"}
              inputPlaceholder={"House Number"}
              inputName={"houseNumber"}
              inputValue={values.houseNumber}
              handleChange={handleChange}
              error={errors.houseNumber && touched.houseNumber}
              errorMessage={errors.houseNumber}
            />
          </>
        )}
      </FormGroup>

      <FormGroup columns="1" className="mb-3">
        <GlobalTextArea
          labelColor={"var(--clr-primary)"}
          labelText={"Landmarks/Further Description"}
          inputPlaceholder={"i.e. behind the transformer"}
          inputName={"landmark"}
          inputValue={values.landmark}
          handleBlur={handleBlur}
          handleChange={handleChange}
          error={errors.landmark && touched.landmark}
          // required={true}
          errorMessage={errors.landmark}
        />
      </FormGroup>

      {mode !== "editing" && (
        <>
          <h4
            style={{
              marginBottom: "8px",
              fontSize: "1.2rem",
              fontWeight: 600,
            }}
          >
            Contact Person For The Fix
          </h4>
          <FormGroup columns="2" mb="1.5rem">
            <GlobalInput
              labelColor={"var(--clr-primary)"}
              labelText={"Contact Name"}
              inputPlaceholder={"Contact Name"}
              inputName={"contactName"}
              inputValue={values.contactName}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors?.contactName && touched?.contactName}
              errorMessage={errors?.contactName}
              required={true}
            />
            <GlobalPhoneInput
              labelText="Contact Phone Number"
              labelColor="var(--clr-primary)"
              inputName="contactPhoneNo"
              inputPlaceholder="803 333 3333"
              inputValue={values.contactPhoneNo}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              handleBlur={handleBlur}
              handleChange={setFieldValue}
              error={errors.contactPhoneNo && touched.contactPhoneNo}
              errorMessage={errors.contactPhoneNo}
              required={true}
            />
            <GlobalInput
              labelColor={"var(--clr-primary)"}
              labelText={"Contact Email"}
              inputPlaceholder={"Contact Email"}
              inputName={"contactEmail"}
              inputValue={values.contactEmail}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors?.contactEmail && touched?.contactEmail}
              errorMessage={errors?.contactEmail}
              required={true}
            />
          </FormGroup>
        </>
      )}
    </>
  );
};

export default scriptLoader([process.env.REACT_APP_PLACES_API_URL])(AddAddress);
