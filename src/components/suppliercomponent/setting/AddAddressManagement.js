import { useState, useRef, useEffect, Fragment } from "react";
import GlobalInput, {
  FieldError,
  InputGroup,
} from "../../globalcomponents/GlobalInput";
import GlobalPhoneInput from "../../globalcomponents/GlobalPhoneInput";
import {
  Fields,
  FormGroup,
  GroupHeading,
} from "../../globalcomponents/Utilities";
import FileUpload from "../../globalcomponents/FileUpload";
import GlobalMultipleSelect from "../../globalcomponents/GlobalMultipleSelect";
import { useFormik } from "formik";
import GlobalModal from "../../globalcomponents/GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import useGooglePlaces from "../../../hooks/useGooglePlaces";
import scriptLoader from "react-async-script-loader";
import PrimaryAdd from "./PrimaryAdd";
import { days } from "../../../utils/selectOptions";
import { generateSupplierBranchValidation } from "../../../Validations/supplierBranchValidation";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { convertTime } from "../../../utils/utilityFxns";
import { useSnackbar } from "notistack";

const AddAddressManagement = ({
  isOpen,
  closeModal,
  isScriptLoadSucceed,
  isCreating,
  supplierCreateAddress,
  onSuccess,
  onboarding,
}) => {
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });
  const [uploadResponse, setUploadResponse] = useState([]);
  const [internalErrors, setInternalErrors] = useState("");
  const [daysTimesTemplate, setDaysTimesTemplate] = useState(null);
  const [schema, setSchema] = useState(null);
  const [cityId, setCityId] = useState("");

  const inputRef = useRef();
  const addressComponent = useGooglePlaces(isScriptLoadSucceed, inputRef);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const { state, cityIdResult } = addressComponent;
    if (state) setCityId(cityIdResult);
    if (inputRef.current)
      setFieldValue("branchAddress", inputRef.current.value);
  }, [addressComponent, inputRef]);

  const removeFile = (name) => {
    setFieldValue(name, "");
  };

  const onSubmit = (values) => {
    setInternalErrors("");

    const multimedia = uploadResponse.map((response, index) => {
      return {
        attachmentId: response.contentId,
        attachmentType: response.contentType,
        attachmentUrl: response.content,
      };
    });

    if (multimedia.length < 2) {
      setInternalErrors("Please upload the files");
      return;
    }

    const openingHours = Object.keys(values.workingHours).map((day) => {
      const workingDay = days.filter((dayOfWeek) => dayOfWeek.name === day);

      const workingHours = values.workingHours[day];

      return {
        dayOfWeek: workingDay[0].id,
        openTime: convertTime(workingHours.open),
        closeTime: convertTime(workingHours.close),
      };
    });
    const payload = [];
    const payloads = {
      branchEmailAddress: values.branchEmail,
      branchPhoneNumber: `${selectedCountry.code} ${values.phoneNumber}`,
      primaryBranch: values.primaryAddress,
      branchCityId: cityId,
      breanchAddress: values.branchAddress,
      branchMultiMedia: multimedia,
      openingHours,
    };
    payload.push(payloads);
    // Get initialPayload from sessionStorage
    let initialPayload = JSON.parse(sessionStorage.getItem("payload")) || [];

    // Check if any item in initialPayload already has primaryBranch set to true
    const existingPrimaryBranch = initialPayload.some(
      (branch) => branch.primaryBranch === true
    );
    if (existingPrimaryBranch && payloads.primaryBranch === true) {
      enqueueSnackbar("there is an existing head office", {
        variant: "error",
      });
      return;
    }

    // Push the current payload to initialPayload
    initialPayload.push(payloads);

    // Check if initialPayload has any data
    if (!onboarding?.isCompleted) {
      sessionStorage.setItem("payload", JSON.stringify(initialPayload));
      onSuccess();
    } else {
      // If initialPayload is empty, call supplierCreateAddress with current payload
      supplierCreateAddress(payload);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      address: "",
      phoneNumber: "",
      branchEmail: "",
      branchPhoto: null,
      regEvidence: null,
      weekDay: [],
      workingHours: {},
      branchAddress: "",
      primaryAddress: false,
    },
    validationSchema: schema,
    onSubmit,
  });

  const formikHandlers = {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
  };

  const generateTimeTemplate = () =>
    values.weekDay?.map((day) => {
      return (
        <Fragment key={day}>
          <GroupHeading className="mt-4 mb-3">{day}</GroupHeading>
          <FormGroup columns="2">
            <GlobalInput
              inputType="time"
              inputName={`workingHours.${day}.open`}
              labelText="Opening Hour"
              inputValue={values.workingHours[day]?.open || ""}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={
                errors.workingHours?.[day]?.open &&
                touched.workingHours?.[day]?.open
              }
              errorMessage={errors.workingHours?.[day]?.open}
            />
            <GlobalInput
              inputType="time"
              inputName={`workingHours.${day}.close`}
              labelText="Closing Hour"
              inputValue={values.workingHours?.[day]?.close || ""}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={
                errors.workingHours?.[day]?.close &&
                touched.workingHours?.[day]?.close
              }
              errorMessage={errors.workingHours?.[day]?.close}
            />
          </FormGroup>
        </Fragment>
      );
    });

  useEffect(() => {
    values.weekDay.forEach((day) => {
      setFieldValue(`workingHours.${day}.open`, "");
      setFieldValue(`workingHours.${day}.close`, "");
    });
  }, [values.weekDay, setFieldValue]);

  useEffect(() => {
    const template = generateTimeTemplate();
    setDaysTimesTemplate(template);
  }, [values.weekDay, values.workingHours, schema, generateTimeTemplate]);

  useEffect(() => {
    const validationSchema = generateSupplierBranchValidation(values.weekDay);
    setSchema(validationSchema);
  }, [values.weekDay]);

  return (
    <GlobalModal
      isOpen={isOpen}
      closeModal={closeModal}
      shouldCloseOnOverlayClick={false}
    >
      <AltModalHeader heading="Add Branch" closeModal={closeModal} />
      <GlobalBallBeat loading={isCreating} />
      <form onSubmit={handleSubmit}>
        <FormGroup columns="2" className="mb-3">
          <InputGroup>
            <label htmlFor="branchAddress">
              Branch Address
              <span className="text-danger">*</span>
            </label>
            <div className="input-block">
              <input
                className={
                  errors.branchAddress && touched.branchAddress ? "invalid" : ""
                }
                type="text"
                id="branchAddress"
                name="branchAddress"
                defaultValue={values.branchAddress}
                placeholder="Enter your address"
                ref={inputRef}
              />
            </div>
            {errors.branchAddress && touched.branchAddress && (
              <FieldError>{errors.branchAddress}</FieldError>
            )}
          </InputGroup>
          <GlobalPhoneInput
            labelText="Branch Phone Number"
            inputName="phoneNumber"
            inputPlaceholder="803 334 4556"
            inputValue={values.phoneNumber}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            handleBlur={handleBlur}
            handleChange={setFieldValue}
            error={errors.phoneNumber && touched.phoneNumber}
            errorMessage={errors.phoneNumber}
            required
          />

          <GlobalInput
            inputType="email"
            inputName="branchEmail"
            labelText="Branch Email"
            inputValue={values.branchEmail}
            inputPlaceholder="hello@FixMaster.com.ng"
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.branchEmail && touched.branchEmail}
            errorMessage={errors.branchEmail}
            required
          />
        </FormGroup>
        <Fields>
          <GroupHeading>Additional Documents</GroupHeading>
          {internalErrors && (
            <FieldError mt={"0"} ml={"0"} mb={"16px"} fs={"14px"}>
              {internalErrors}
            </FieldError>
          )}
          <FormGroup columns="2">
            <FileUpload
              labelText="Branch Photo"
              inputName="branchPhoto"
              description="Upload image file with max size of 2MB"
              uploadState={setFieldValue}
              error={errors.branchPhoto && touched.branchPhoto}
              errorInfo={errors.branchPhoto}
              fileState={values.branchPhoto}
              fileType={"image"}
              removeFile={removeFile}
              uploadResponse={uploadResponse}
              setUploadResponse={setUploadResponse}
              maximumSize={2048000}
              required={true}
              accepted={{
                "image/png": [".png"],
                "image/jpeg": [".jpg", ".jpeg"],
              }}
              /* onclick should clear internal errors that are generated when a user tries to 
          submit the application without uploading the file */
              onClick={() => setInternalErrors("")}
            />
            <FileUpload
              labelText="Evidence of Registration"
              inputName="regEvidence"
              description="Upload pdf file with max size of 2MB"
              error={errors.regEvidence && touched.regEvidence}
              errorInfo={errors.regEvidence}
              fileState={values.regEvidence}
              fileType={"document"}
              uploadState={setFieldValue}
              removeFile={removeFile}
              uploadResponse={uploadResponse}
              setUploadResponse={setUploadResponse}
              accepted={{
                "application/pdf": [".pdf"],
              }}
              maximumSize={2048000}
              required={true}
              onClick={() => setInternalErrors("")}
            />
          </FormGroup>
        </Fields>

        <Fields>
          <GroupHeading>Specify your working day</GroupHeading>
          <FormGroup columns="2" className="mt-3">
            <GlobalMultipleSelect
              labelText={"Week Day"}
              initData={days}
              inputName="weekDay"
              required={true}
              formikHandlers={formikHandlers}
            />
          </FormGroup>
        </Fields>

        <Fields>
          <GroupHeading>Specify your opening and closing hour</GroupHeading>
          {!!values.weekDay && daysTimesTemplate}
        </Fields>

        <PrimaryAdd formikHandlers={formikHandlers} />

        <GlobalBtn className="mt-3 mx-auto" type="submit" disabled={isCreating}>
          {isCreating ? "Loading..." : "Submit"}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default scriptLoader([process.env.REACT_APP_PLACES_API_URL])(
  AddAddressManagement
);
