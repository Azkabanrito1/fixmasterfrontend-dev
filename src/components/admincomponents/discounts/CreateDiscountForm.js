import { useFormik } from "formik";
import GlobalInput from "../../globalcomponents/GlobalInput";
import { FormGroup, GroupHeading } from "../../globalcomponents/Utilities";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import GlobalTextArea from "../../globalcomponents/GlobalTextArea";
import { useEffect, useState } from "react";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { BallBeat } from "react-pure-loaders";
import { audienceCategories } from "../../../utils/selectOptions";
import AddBtn from "../../franchiseecomponents/jobsmanagement/AddBtn";
import AudienceModal from "./AudienceModal";
import GlobalMultipleSelect from "../../globalcomponents/GlobalMultipleSelect";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { addDiscountValidation } from "../../../Validations/addDiscountValidation";

const CreateDiscountForm = ({
  createUpdateDiscount,
  discountTypes,
  initValues,
  invoiceComponents,
  isLoading,
  isSubmitting,
  valueTypes,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [audience, setAudience] = useState([]);
  const [maxValue, setMaxValue] = useState("");
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const onSubmit = () => {
    if (audience.length === 0) {
      setError({
        isError: true,
        message: "No audience selected",
      });
      return;
    }

    const selectedAudIDs = audience.map((aud) => aud.id);

    const payload = {
      computeType: values.computeType,
      discountName: values.discountName,
      discountType: parseInt(values.discountType),
      discountValue: parseInt(values.discountValue),
      minNoOfService: values.minNoOfService,
      maxNoOfService: values.maxNoOfService,
      minNoOfEquipment: values.minNoOfEquipment,
      maxNoOfEquipment: values.maxNoOfEquipment,
      minNoOfJobs: values.minNoOfJobs,
      maxNoOfJobs: values.maxNoOfJobs,
      targetInvoiceComponent: values.invoiceComponents,

      discountAudienceCategory: values.audienceCategory,
      discountAudienceId: selectedAudIDs,
      periodStartDate: values.periodStartDate,
      periodEndDate: values.periodEndDate,
    };

    createUpdateDiscount(payload);
  };

  const openAudienceList = () => setIsModalOpen(true);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {
      computeType: "",
      discountAudience: "",
      discountName: "",
      discountType: "",
      discountValue: 0,
      invoiceComponents: [],

      maxNoOfEquipment: 0,
      minNoOfEquipment: 0,
      maxNoOfJobs: 0,
      minNoOfJobs: 0,
      maxNoOfService: 0,
      minNoOfService: 0,

      audienceCategory: "",
      periodStartDate: "",
      periodEndDate: "",
    },
    onSubmit,
    validationSchema: addDiscountValidation,
  });

  const formikHandlers = {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
  };

  console.log(errors);

  useEffect(() => {
    setFieldValue("maxNoOfEquipment", 0);
    setFieldValue("minNoOfEquipment", 0);
    setFieldValue("maxNoOfJobs", 0);
    setFieldValue("minNoOfJobs", 0);
    setFieldValue("maxNoOfService", 0);
    setFieldValue("minNoOfService", 0);
  }, [values.discountType]);

  useEffect(() => {
    setAudience([]);
  }, [values.audienceCategory]);

  useEffect(() => {
    if (values.computeType.toLowerCase() === "percentage based") {
      setMaxValue(100);
      return;
    }
    setMaxValue("");
  }, [values.computeType]);

  const selectedAudience = audience.map((aud) => aud.name);

  return (
    <>
      <GlobalBallBeat loading={isLoading} />

      <form onSubmit={handleSubmit}>
        <GroupHeading>Base Settings</GroupHeading>
        <FormGroup columns="3" className="mb-4">
          <GlobalInput
            labelText="Discount Name"
            inputName="discountName"
            inputValue={values.discountName}
            inputPlaceholder="e.g. Loyalty Limit Discount"
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.discountName && touched.discountName}
            errorMessage={errors.discountName}
            required
          />
          <GlobalSelect
            labelText={"Value Type"}
            options={valueTypes}
            selectName={"computeType"}
            selectValue={values.computeType}
            valueType={"string"}
            handleBlur={handleBlur}
            handleChange={handleChange}
            defaultOption={"Select a value type"}
            error={errors.computeType && touched.computeType}
            errorMessage={errors.computeType}
            required
          />
          <GlobalSelect
            labelText={"Discount Type"}
            options={discountTypes}
            selectName={"discountType"}
            selectValue={values.discountType}
            handleBlur={handleBlur}
            handleChange={handleChange}
            defaultOption={"Select a discount type"}
            error={errors.discountType && touched.discountType}
            errorMessage={errors.discountType}
            required
          />

          <GlobalMultipleSelect
            initData={invoiceComponents}
            inputName="invoiceComponents"
            formikHandlers={formikHandlers}
            labelText="Invoice Components"
          />

          <GlobalInput
            labelText="Discount Value"
            inputName="discountValue"
            inputType="number"
            inputValue={values.discountValue}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.discountValue && touched.discountValue}
            errorMessage={errors.discountValue}
            min={0}
            max={maxValue}
            required
          />
        </FormGroup>

        <>
          <GroupHeading>Discount Period</GroupHeading>
          <FormGroup columns="3" className="mb-4">
            <GlobalInput
              labelText="Discount Start Date"
              inputName="periodStartDate"
              inputType="date"
              inputValue={values.periodStartDate}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.periodStartDate && touched.periodStartDate}
              errorMessage={errors.periodStartDate}
              required
            />
            <GlobalInput
              labelText="Discount End Date"
              inputName="periodEndDate"
              inputType="date"
              inputValue={values.periodEndDate}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.periodEndDate && touched.periodEndDate}
              errorMessage={errors.periodEndDate}
              min={values.periodStartDate}
              required
            />
          </FormGroup>
        </>
        {(values.discountType !== 0 || values.discountType !== "") && (
          <>
            <GroupHeading>Discount Type Details</GroupHeading>
            <FormGroup columns="3" className="mb-4">
              {(values.discountType === "1" || values.discountType === "4") && (
                <>
                  <GlobalInput
                    labelText="Mininum No of Services"
                    inputName="minNoOfService"
                    inputType="number"
                    inputValue={values.minNoOfService}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.minNoOfService && touched.minNoOfService}
                    errorMessage={errors.minNoOfService}
                    min={0}
                    required
                  />
                  <GlobalInput
                    labelText="Maximum No of Services"
                    inputName="maxNoOfService"
                    inputType="number"
                    inputValue={values.maxNoOfService}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.maxNoOfService && touched.maxNoOfService}
                    errorMessage={errors.maxNoOfService}
                    min={values.maxNoOfService}
                    required
                  />
                </>
              )}
              {(values.discountType === "3" || values.discountType === "4") && (
                <>
                  <GlobalInput
                    labelText="Mininum No of Equipment"
                    inputName="minNoOfEquipment"
                    inputType="number"
                    inputValue={values.minNoOfEquipment}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.minNoOfEquipment && touched.minNoOfEquipment}
                    errorMessage={errors.minNoOfEquipment}
                    min={0}
                    required
                  />
                  <GlobalInput
                    labelText="Maximum No of Equipment"
                    inputName="maxNoOfEquipment"
                    inputType="number"
                    inputValue={values.maxNoOfEquipment}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.maxNoOfEquipment && touched.maxNoOfEquipment}
                    errorMessage={errors.maxNoOfEquipment}
                    min={values.maxNoOfEquipment}
                    required
                  />
                </>
              )}
              {values.discountType === "4" && (
                <>
                  <GlobalInput
                    labelText="Mininum No of Jobs"
                    inputName="minNoOfJobs"
                    inputType="number"
                    inputValue={values.minNoOfJobs}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.minNoOfJobs && touched.minNoOfJobs}
                    errorMessage={errors.minNoOfJobs}
                    min={0}
                    required
                  />
                  <GlobalInput
                    labelText="Maximum No of Jobs"
                    inputName="maxNoOfJobs"
                    inputType="number"
                    inputValue={values.maxNoOfJobs}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.maxNoOfJobs && touched.maxNoOfJobs}
                    errorMessage={errors.maxNoOfJobs}
                    min={values.maxNoOfJobs}
                    required
                  />
                </>
              )}
            </FormGroup>
          </>
        )}

        <FormGroup columns="3" className="mb-4">
          <GlobalSelect
            labelText="Target Audience Category"
            options={audienceCategories}
            selectName={"audienceCategory"}
            selectValue={values.audienceCategory}
            handleBlur={handleBlur}
            handleChange={handleChange}
            defaultOption={"Select a category"}
            error={errors.audienceCategory && touched.audienceCategory}
            errorMessage={errors.audienceCategory}
            required
          />

          <div>
            {isModalOpen && !values.audienceCategory && (
              <span className="text-danger">
                Please select an audience category
              </span>
            )}
            <AddBtn
              action={openAudienceList}
              text={"Add Audience"}
              mt="1rem"
              mb="2rem"
              orientation="inline"
            />
          </div>

          <GlobalTextArea
            fullWidth={true}
            labelText="Audience"
            inputValue={selectedAudience.join(", ")}
            error={error.isError}
            errorMessage={error.message}
            readOnly
          />
        </FormGroup>
        <GlobalBtn mx="auto" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Submit"}
        </GlobalBtn>
      </form>

      {isModalOpen && !!values.audienceCategory && (
        <AudienceModal
          audienceCategory={values.audienceCategory}
          addToAudience={setAudience}
          audienceList={audience}
          closeModal={() => setIsModalOpen(false)}
          isOpen={isModalOpen && !!values.audienceCategory}
        />
      )}
    </>
  );
};

export default CreateDiscountForm;
