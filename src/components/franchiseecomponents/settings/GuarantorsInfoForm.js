import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import {
  Fields,
  FormGroup,
  GroupHeading,
} from "../../globalcomponents/Utilities";
import GlobalInput, { FieldError } from "../../globalcomponents/GlobalInput";
import GlobalCheckbox from "../../globalcomponents/GlobalCheckbox";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import { guarantorInfoSchema } from "../../../Validations/guarantorInfoValidations";
import { AsYouType } from "libphonenumber-js";
import moment from "moment";
import scriptLoader from "react-async-script-loader";
import useGooglePlaces from "../../../hooks/useGooglePlaces";
import { capitalizeFirstLetter } from "../../../utils/utilityFxns";
import { getMaxDate } from "../../../utils/dateRanges";
import { prefixes, marital, docType } from "../../../utils/selectOptions";
import GuarantorContactFormGroup from "../../globalcomponents/globalformgroups/GuarantorContactFormGroup";
import AddressInfoFormGroup from "../../globalcomponents/globalformgroups/AddressInformation";
import GuarantorAddressYear from "../../globalcomponents/globalformgroups/GuarantorAddressYear";

const GuarantorsInfoForm = ({
  isTrustedCustomer,
  guarantor,
  isLoading,
  isUpdating,
  isScriptLoadSucceed,
  submitInfo,
  updateInfo,
}) => {
  const [internalError, setInternalError] = useState("");
  const [isEditingAllowed, setIsEditingAllowed] = useState(true);
  const [isSubmitAllowed, setIsSubmitAllowed] = useState(true);
  const [selectedCountry1, setSelectedCountry1] = useState({
    code: "+234",
    abbr: "NG",
  });
  const [selectedCountry2, setSelectedCountry2] = useState({
    code: "+234",
    abbr: "NG",
  });
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const addressComponents = useGooglePlaces(isScriptLoadSucceed, inputRef1);
  const officeAddressComponents = useGooglePlaces(
    isScriptLoadSucceed,
    inputRef2
  );

  useEffect(() => {
    const guarantorPhone = new AsYouType();
    const altGuarantorPhone = new AsYouType();
    if (guarantor?.firstName) {
      setFieldValue("prefix", capitalizeFirstLetter(guarantor.prefix) || "");
      setFieldValue("firstName", guarantor.firstName);
      setFieldValue("lastName", guarantor.lastName);
      setFieldValue(
        "marital",
        capitalizeFirstLetter(guarantor.maritalStatus) || ""
      );
      setFieldValue("companyName", guarantor.officialCompany);
      setFieldValue("relationship", guarantor.relationship);
      setFieldValue("dob", moment(guarantor.dateOfBirth).format("yyyy-MM-DD"));
      setFieldValue("email", guarantor.emailAddress);
      setFieldValue("state", guarantor.homeState);
      setFieldValue("lga", guarantor.homeLga);
      setFieldValue("city", guarantor.homeCity);
      setFieldValue("cityId", guarantor.homeCityId);
      inputRef1.current.value = guarantor.homeAddress;
      setFieldValue("officeState", guarantor.officeState);
      setFieldValue("officeLga", guarantor.officeLga);
      setFieldValue("officeCity", guarantor.officeCity);
      setFieldValue("officeCityId", guarantor.officeCityId);
      inputRef2.current.value = guarantor.officeAddress;
      setFieldValue(
        "docType",
        capitalizeFirstLetter(guarantor.attachmentType) || ""
      );
      setFieldValue("identificationNumber", guarantor.attachmentId || "");
      if (guarantor.status.toLowerCase() === "confirmed") {
        setIsEditingAllowed(true);
        setIsSubmitAllowed(false);
      } else {
        setIsEditingAllowed(false);
        setIsSubmitAllowed(true);
      }

      guarantorPhone.input(guarantor?.phoneNumber);
      const countryAbbr = guarantorPhone?.getCountry();
      const countryCode = guarantorPhone?.getCallingCode();
      const phoneNo = guarantorPhone?.formattedOutput?.replace(
        `${selectedCountry1.code} `,
        ""
      );
      setSelectedCountry1({
        code: `+${countryCode}`,
        abbr: countryAbbr,
      });
      setFieldValue("phone", phoneNo);

      altGuarantorPhone.input(guarantor?.alternativeNumber);
      const altCountryAbbr = altGuarantorPhone?.getCountry();
      const altCountryCode = altGuarantorPhone?.getCallingCode();
      const altPhoneNo = altGuarantorPhone?.formattedOutput?.replace(
        `${selectedCountry2.code} `,
        ""
      );
      setSelectedCountry2({
        code: `+${altCountryCode}`,
        abbr: altCountryAbbr,
      });
      setFieldValue("altPhone", altPhoneNo);
    }
  }, [guarantor]);

  // fill in the fields for address breakdown on input of address
  useEffect(() => {
    const { state, lga, city, cityIdResult } = addressComponents;

    if (state) {
      setFieldValue("state", state);
      setFieldValue("lga", lga);
      setFieldValue("city", city);
      setFieldValue("cityId", cityIdResult);
    }
    if (inputRef1.current) setFieldValue("address", inputRef1.current.value);
  }, [addressComponents, inputRef1]);

  useEffect(() => {
    const { state, lga, city, cityIdResult } = officeAddressComponents;

    if (state) {
      setFieldValue("officeState", state);
      setFieldValue("officeLga", lga);
      setFieldValue("officeCity", city);
      setFieldValue("officeCityId", cityIdResult);
    }
    if (inputRef2.current)
      setFieldValue("officeAddress", inputRef2.current.value);
  }, [officeAddressComponents, inputRef2]);

  const onSubmit = async () => {
    setInternalError("");

    const payload = {
      prefix: values.prefix.toLowerCase(),
      firstName: values.firstName,
      lastName: values.lastName,
      maritalStatus: values.marital.toLowerCase(),
      relationship: values.relationship,
      dateOfBirth: values.dob,
      emailAddress: values.email,
      phoneNumber: `${selectedCountry1.code} ${values.phone}`,
      alternativeNumber: values.altPhone
        ? `${selectedCountry2.code} ${values.altPhone}`
        : "",

      homeAddress: inputRef1.current.value,
      homeCityId: parseInt(values.cityId),

      officeAddress: inputRef2.current.value,
      officeCityId: parseInt(values.officeCityId),

      attachmentId: values.identificationNumber,
      attachmentUrl: "",
      attachmentType: values.docType,

      homeCountryId: 1,
      homeStateId: 0,
      homeLgaId: 0,
      officeLgaId: 0,
      officeStateId: 0,
      homeOccupancy: values.homeOccupancy,
      officeOccupancy: values.officeOccupancy,
      officialCompany: values.companyName,
    };
    if (guarantor?.id) {
      updateInfo({ guarantorId: guarantor.id, payload });
    } else {
      submitInfo(payload);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      prefix: "",
      firstName: "",
      lastName: "",
      marital: "",
      relationship: "",
      dob: "",
      email: "",
      phone: "",
      altPhone: "",
      address: "",
      state: "",
      lga: "",
      city: "",
      cityId: "",
      officeAddress: "",
      officeState: "",
      officeLga: "",
      officeCity: "",
      officeCityId: "",
      docType: "",
      identificationNumber: "",
      homeOccupancy: "",
      officeOccupancy: "",
      companyName: "",
      terms: false,
    },
    validationSchema: guarantorInfoSchema,
    onSubmit,
  });

  const formikHandlers = {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
  };

  const inputHomeNames = {
    addressName: "address",
    stateName: "state",
    lgaName: "lga",
    cityName: "city",
  };

  const inputOfficeNames = {
    addressName: "officeAddress",
    stateName: "officeState",
    lgaName: "officeLga",
    cityName: "officeCity",
  };

  const placeHolderText =
    values.docType === "Passport"
      ? "Enter your passport number"
      : values.docType === "National ID (NIN)"
      ? "Enter your NIN Number"
      : values.docType === "Driver's License"
      ? "Enter your Driver's License Number"
      : values.docType === "Voter's Card"
      ? "Enter your Voter's Card Number"
      : "";

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Fields>
          <GroupHeading>
            {isTrustedCustomer
              ? "Customer Personal Information"
              : "Guarantor Personal Information"}
          </GroupHeading>
          <FormGroup columns="3">
            <GlobalSelect
              labelText={"Prefix"}
              selectName={"prefix"}
              defaultOption={"Select Prefix"}
              selectValue={values.prefix}
              options={prefixes}
              valueType="string"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={touched.prefix && errors.prefix}
              errorMessage={errors.prefix}
              disabled={!isEditingAllowed}
              required={true}
            />
            <GlobalInput
              labelText={`
                ${isTrustedCustomer ? "Customer's" : "Guarantor's"} First Name`}
              inputName="firstName"
              inputType="text"
              inputPlaceholder="Sholawa"
              inputValue={values.firstName}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={touched.firstName && errors.firstName}
              errorMessage={errors.firstName}
              readOnly={!isEditingAllowed}
              required={true}
            />
            <GlobalInput
              labelText={`
                ${isTrustedCustomer ? "Customer's" : "Guarantor's"} Last Name`}
              inputName={"lastName"}
              inputType={"text"}
              inputPlaceholder={"Bamiyo"}
              inputValue={values.lastName}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={touched.lastName && errors.lastName}
              errorMessage={errors.lastName}
              readOnly={!isEditingAllowed}
              required={true}
            />
            <GlobalSelect
              labelText={`
                ${
                  isTrustedCustomer ? "Customer's" : "Guarantor's"
                } Marital Status`}
              selectName={"marital"}
              defaultOption={"Select marital status"}
              selectValue={values.marital}
              valueType="string"
              options={marital}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={touched.marital && errors.marital}
              errorMessage={errors.marital}
              disabled={!isEditingAllowed}
              required={true}
            />
            <GlobalInput
              labelText={`
                ${
                  isTrustedCustomer ? "Customer's" : "Guarantor's"
                } relationship with candidate`}
              inputName={"relationship"}
              inputType={"text"}
              inputPlaceholder={"Former Employer"}
              inputValue={values.relationship}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={touched.relationship && errors.relationship}
              errorMessage={errors.relationship}
              readOnly={!isEditingAllowed}
              required={true}
            />
            <GlobalInput
              labelText="Date Of Birth"
              inputType="date"
              inputName="dob"
              min="1920-01-01"
              max={getMaxDate()}
              inputValue={values.dob}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.dob && touched.dob}
              errorMessage={errors.dob}
              readOnly={!isEditingAllowed}
              required={true}
            />
          </FormGroup>
        </Fields>

        <GuarantorContactFormGroup
          title={`
                ${
                  isTrustedCustomer ? "Customer's" : "Guarantor's"
                } Contact Information`}
          formikHandlers={formikHandlers}
          selectedCountry1={selectedCountry1}
          setSelectedCountry1={setSelectedCountry1}
          selectedCountry2={selectedCountry2}
          setSelectedCountry2={setSelectedCountry2}
          isEditingAllowed={isEditingAllowed}
        />

        <AddressInfoFormGroup
          inputRef={inputRef1}
          columns={3}
          title={`
                ${
                  isTrustedCustomer ? "Customer's" : "Guarantor's"
                } Home Addres`}
          formikHandlers={formikHandlers}
          inputNames={inputHomeNames}
          addressLabel={"Enter Home Address"}
        />
        <GuarantorAddressYear
          formikHandlers={formikHandlers}
          useHomeOccupancy={true}
        />

        <AddressInfoFormGroup
          inputRef={inputRef2}
          columns={3}
          title={`
                ${
                  isTrustedCustomer ? "Customer's" : "Guarantor's"
                } Office Addres`}
          formikHandlers={formikHandlers}
          inputNames={inputOfficeNames}
          addressLabel={"Enter Office Address"}
          useCompanyName={true}
        />
        <GuarantorAddressYear
          formikHandlers={formikHandlers}
          useOfficeOccupancy={true}
        />

        <Fields>
          <GroupHeading>Key Identification Documents</GroupHeading>
          <FormGroup columns="3">
            <GlobalSelect
              labelText={"Document"}
              selectName={"docType"}
              selectValue={values.docType}
              defaultOption={"Select Document"}
              options={docType}
              handleBlur={handleBlur}
              handleChange={handleChange}
              valueType="string"
              errorMessage={errors.docType}
              error={errors.docType && touched.docType}
              disabled={!isEditingAllowed}
              required={true}
            />
            {values.docType && isEditingAllowed && (
              <GlobalInput
                inputType="text"
                inputName="identificationNumber"
                labelText={values.docType}
                inputValue={values.identificationNumber}
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={
                  errors.identificationNumber && touched.identificationNumber
                }
                errorMessage={errors.identificationNumber}
                inputPlaceholder={placeHolderText}
                maxLength={12}
              />
            )}
            {guarantor?.attachmentUrl && (
              <div>
                <p>Uploaded File</p>
                <a
                  href={guarantor.attachmentUrl}
                  target="_blank"
                  style={{ fontSize: "1.4rem", color: "var(--clr-primary)" }}
                >
                  <i className="fa fa-file-pdf"></i>
                  {guarantor.attachmentType}
                </a>
              </div>
            )}
          </FormGroup>
        </Fields>

        {isEditingAllowed && (
          <>
            <Fields>
              <GlobalCheckbox
                inputName="terms"
                inputValue={values.terms}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={touched.terms && errors.terms}
                errorMessage={errors.terms}
                labelText="I agree that all documents and information provided are genuine."
              />
            </Fields>
            {internalError && <FieldError>{internalError}</FieldError>}

            {isSubmitAllowed && (
              <GlobalBtn
                type="submit"
                size="large"
                mx="auto"
                disabled={isLoading || isUpdating || !!errors.terms}
              >
                {isLoading || isUpdating ? "Loading..." : "Submit"}
              </GlobalBtn>
            )}
          </>
        )}
        {!isEditingAllowed && (
          <GlobalBtn
            size="large"
            mx="auto"
            onClick={() => setIsEditingAllowed(true)}
          >
            Edit
          </GlobalBtn>
        )}
      </form>
    </div>
  );
};

export default scriptLoader([process.env.REACT_APP_PLACES_API_URL])(
  GuarantorsInfoForm
);
