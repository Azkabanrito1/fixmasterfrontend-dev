import React, { useEffect, useRef, useState } from "react";
import {
  Fields,
  FormGroup,
  GroupHeading,
} from "../../globalcomponents/Utilities";
import { marital, prefixes } from "../../../utils/selectOptions";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import { useFormik } from "formik";
import GlobalInput, {
  FieldError,
  InputGroup,
} from "../../globalcomponents/GlobalInput";
import GlobalPhoneInput from "../../globalcomponents/GlobalPhoneInput";
import useGooglePlaces from "../../../hooks/useGooglePlaces";
import scriptLoader from "react-async-script-loader";
import { trustedCustomerSchema } from "../../../Validations/trustedCustomerValidation";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { AsYouType } from "libphonenumber-js";
import { capitalizeFirstLetter } from "../../../utils/utilityFxns";
import AddressInfoFormGroup from "../../globalcomponents/globalformgroups/AddressInformation";
import {
  useTrustedCustomer,
  useUpdateTrustedCustomer,
} from "../../../hooks/useQueries/useOnboarding";
import { useCreateAddressOnRequest } from "../../../hooks/useQueries/useIdentity";
import { useSnackbar } from "notistack";

const CustomerForm = ({
  isScriptLoadSucceed,
  // createTrustedCustomer,
  // isLoading,
  customerInfo,
}) => {
  const [cityId, setCityId] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });
  const [isEdited, setIsEdited] = useState(true);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(true);
  // Use the "disabled" attribute based on the condition
  const isCustomerInfoNotEmpty =
    customerInfo && Object.keys(customerInfo).length > 0;

  const inputRef = useRef();
  const addressComponents = useGooglePlaces(isScriptLoadSucceed, inputRef);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const customerPhone = new AsYouType();
    if (customerInfo?.firstName) {
      setFieldValue("prefix", capitalizeFirstLetter(customerInfo.prefix) || "");
      setFieldValue("firstName", customerInfo.firstName);
      setFieldValue("lastName", customerInfo.lastName);
      setFieldValue(
        "marital",
        capitalizeFirstLetter(customerInfo.maritalStatus || "")
      );
      setFieldValue("organizationName", customerInfo.coporateName);
      setFieldValue("relation", customerInfo.customerRelation);
      setFieldValue("email", customerInfo.emailAddress);
      setFieldValue("state", customerInfo.state);
      setFieldValue("lga", customerInfo.lga);
      setFieldValue("city", customerInfo.cityName);
      setFieldValue("cityId", customerInfo.cityId);
      inputRef.current.value = customerInfo.customerAddress;

      customerPhone.input(customerInfo?.phoneNumber);
      const countryAbbr = customerPhone?.getCountry();
      const countryCode = customerPhone?.getCallingCode();
      const phoneNo = customerPhone?.formattedOutput?.replace(
        `${selectedCountry.code} `,
        ""
      );
      setSelectedCountry({
        code: `+${countryCode}`,
        abbr: countryAbbr,
      });
      setFieldValue("phoneNo", phoneNo);
    }

    if (customerInfo?.status?.toLowerCase() === "confirmed") {
      setIsEdited(true);
      setIsSubmittingEdit(false);
    } else {
      setIsEdited(false);
      setIsSubmittingEdit(true);
    }
  }, [customerInfo]);

  useEffect(() => {
    const { state, lga, city, cityIdResult } = addressComponents;

    if (state) {
      setFieldValue("state", state);
      setFieldValue("lga", lga);
      setFieldValue("city", city);
      setCityId(cityIdResult);
    }
    if (inputRef.current) setFieldValue("address", inputRef.current.value);
  }, [addressComponents, inputRef]);

  const onCreateTrustedCustomerSuccess = () => {
    enqueueSnackbar("Submitted successfully", { variant: "success" });
  };
  const onCreateTrustedCustomerFailure = (error) => {
    enqueueSnackbar(error.message, { variant: "error" });
  };

  const createTrustedCustomerAction = () => {
    const payload = {
      firstName: values.firstName,
      prefix: values.prefix.toLowerCase(),
      lastName: values.lastName,
      maritalStatus: values.marital.toLowerCase(),
      coporateName: values.organizationName,
      customerRelation: values.relation,
      cityId: cityId,
      emailAddress: values.email,
      phoneNumber: `${selectedCountry.code} ${values.phoneNo}`,
      customerAddress: inputRef.current.value,
    };
    if (customerInfo?.id) {
      const customerPayload = {
        id: customerInfo.id,
        firstName: values.firstName,
        prefix: values.prefix.toLowerCase(),
        lastName: values.lastName,
        maritalStatus: values.marital.toLowerCase(),
        coporateName: values.organizationName,
        customerRelation: values.relation,
        cityId: cityId,
        emailAddress: values.email,
        phoneNumber: `${selectedCountry.code} ${values.phoneNo}`,
        customerAddress: inputRef.current.value,
      };
      updateTrustedCustomer(customerPayload);
    } else {
      createTrustedCustomer([payload]);
    }
  };

  const { mutate: createTrustedCustomer, isLoading } = useTrustedCustomer(
    onCreateTrustedCustomerSuccess,
    onCreateTrustedCustomerFailure
  );

  const { mutate: updateTrustedCustomer, isLoading: isUpdating } =
    useUpdateTrustedCustomer(
      onCreateTrustedCustomerSuccess,
      onCreateTrustedCustomerFailure
    );

  const { mutate: createAddress } = useCreateAddressOnRequest(
    createTrustedCustomerAction,
    onCreateTrustedCustomerFailure
  );

  const onSubmit = async (values) => {
    const payload = {
      country: "Nigeria",
      state: values.state,
      lga: values.lga,
      city: values.city,
    };
    createAddress(payload);
  };

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      prefix: "",
      firstName: "",
      lastName: "",
      marital: "",
      organizationName: "",
      address: "",
      state: "",
      lga: "",
      email: "",
      phoneNo: "",
      relation: "",
      city: "",
    },
    validationSchema: trustedCustomerSchema,
    onSubmit,
  });

  const formikHandlers = { values, errors, touched, handleChange, handleBlur };
  const inputName = {
    addressName: "address",
    stateName: "state",
    cityName: "city",
    lgaName: "lga",
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Fields>
          <GroupHeading>Organization/Individual Information</GroupHeading>
          <FormGroup columns="3" mb="24px">
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
              required={true}
              // disabled={!isEdited || isCustomerInfoNotEmpty}
            />
            <GlobalInput
              labelText="Customer's First Name"
              inputName="firstName"
              inputType="text"
              inputPlaceholder="Sholawa"
              inputValue={values.firstName}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={touched.firstName && errors.firstName}
              errorMessage={errors.firstName}
              required={true}
              // disabled={!isEdited || isCustomerInfoNotEmpty}
            />
            <GlobalInput
              labelText="Customer's Last Name"
              inputName="lastName"
              inputType="text"
              inputPlaceholder="Bamiyo"
              inputValue={values.lastName}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={touched.lastName && errors.lastName}
              errorMessage={errors.lastName}
              required={true}
              // disabled={!isEdited || isCustomerInfoNotEmpty}
            />
          </FormGroup>
          <FormGroup columns="3" className="mt-3">
            <GlobalSelect
              labelText={"Customer’s Marital Status"}
              selectName={"marital"}
              defaultOption={"Select marital status"}
              selectValue={values.marital}
              valueType="string"
              options={marital}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={touched.marital && errors.marital}
              errorMessage={errors.marital}
              // disabled={!isEdited || isCustomerInfoNotEmpty}
              required={true}
            />
            <GlobalInput
              labelText="Organization First Name"
              inputName="organizationName"
              inputType="text"
              inputPlaceholder="FixMaster Limited"
              inputValue={values.organizationName}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={touched.organizationName && errors.organizationName}
              errorMessage={errors.organizationName}
              required={true}
              // disabled={!isEdited || isCustomerInfoNotEmpty}
            />
          </FormGroup>

          <FormGroup columns="1" className="mt-4">
            <div>
              <div className="description" id="relation-radio-group">
                How many years have you been relating with this customer?
                <span className="text-danger">*</span>
              </div>
              <div role="group" aria-labelledby="relation-radio-group">
                <label>
                  <input
                    type="radio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="relation"
                    value="1 - 3 years"
                    checked={values.relation === "1 - 3 years"}
                  />
                  1 - 3 years
                </label>
                <label>
                  <input
                    type="radio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="relation"
                    value="3 - 5 years"
                    checked={values.relation === "3 - 5 years"}
                  />
                  3 - 5 years
                </label>
                <label>
                  <input
                    type="radio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="relation"
                    value="5 years and more"
                    checked={values.relation === "5 years and more"}
                  />
                  5 year and More
                </label>
                {errors.relation && touched.relation && (
                  <FieldError>{errors.relation}</FieldError>
                )}
              </div>
            </div>
          </FormGroup>
        </Fields>

        <Fields>
          <GroupHeading>Candidate’s Contact Information</GroupHeading>

          <FormGroup columns="2">
            <GlobalInput
              labelText="Email Address"
              inputType="email"
              inputName="email"
              inputPlaceholder="hello@FixMaster.com.ng"
              inputValue={values.email}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.email && touched.email}
              errorMessage={errors.email}
              required={true}
              // disabled={!isEdited || isCustomerInfoNotEmpty}
            />

            <GlobalPhoneInput
              labelText="Phone Number"
              inputName="phoneNo"
              inputPlaceholder="803 112 2334"
              inputValue={values.phoneNo}
              handleBlur={handleBlur}
              handleChange={setFieldValue}
              error={errors.phoneNo && touched.phoneNo}
              errorMessage={errors.phoneNo}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              required={true}
              // disabled={!isEdited || isCustomerInfoNotEmpty}
            />
          </FormGroup>
        </Fields>

        <AddressInfoFormGroup
          title="Customer Address Information"
          inputNames={inputName}
          formikHandlers={formikHandlers}
          inputRef={inputRef}
        />

        {isSubmittingEdit && !isCustomerInfoNotEmpty && (
          <GlobalBtn className="mt-5 mx-auto mb-3" type="submit">
            {isLoading || isUpdating ? "Loading ..." : "Submit"}
          </GlobalBtn>
        )}

        {/* {!isEdited && (
          <GlobalBtn
            size="large"
            mx="auto"
            onClick={() => setIsEdited(true)}
            type="button"
          >
            Edit
          </GlobalBtn>
        )} */}
      </form>
    </div>
  );
};

export default scriptLoader([process.env.REACT_APP_PLACES_API_URL])(
  CustomerForm
);
