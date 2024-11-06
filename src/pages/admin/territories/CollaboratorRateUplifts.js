import React from "react";
import { useParams } from "react-router-dom";
import { useGetCollaboratorRoles } from "../../../hooks/useQueries/useIdentity";
import {
  useCreateCollabRateUplift,
  useGetCollabRateUplifts,
  useGetTerritoryDetails,
} from "../../../hooks/useQueries/useAdmin";
import TerritoryNavigation from "../../../components/admincomponents/territories/TerritoryNavigation";
import {
  BackBtn,
  FormGroup,
  PageHeading,
  SectionHeading,
} from "../../../components/globalcomponents/Utilities";
import GlobalInput from "../../../components/globalcomponents/GlobalInput";
import GlobalSelect from "../../../components/globalcomponents/GlobalSelect";
import { valueTypes } from "../../../utils/selectOptions";
import { useFormik } from "formik";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import { useEffect } from "react";
import upliftValidation from "../../../Validations/createUpliftValidation";

const VALUETYPES = [
  { id: 0, name: "Flat rate" },
  { id: 1, name: "Percentage based" },
];

const CollaboratorRateUplifts = () => {
  const { id, collaborator } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const { data: territoryData } = useGetTerritoryDetails(id);

  const { data: roles } = useGetCollaboratorRoles();
  const collaboratorId = roles?.data?.filter(
    (role) => role.name.toLowerCase() === collaborator.toLowerCase()
  )?.[0]?.id;

  const collaboratorName =
    collaborator === "cse"
      ? collaborator.toUpperCase()
      : `${collaborator[0].toUpperCase()}${collaborator.slice(1)}`;

  const { data: rateUpliftData } = useGetCollabRateUplifts(id, collaboratorId);

  const onCreateSuccess = () => {
    enqueueSnackbar("Rate uplift created successfully", {
      variant: "success",
    });
    // Handle success and reset form
  };
  const onCreateFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: createRateUpLift } = useCreateCollabRateUplift(
    onCreateSuccess,
    onCreateFailure
  );

  const onSubmit = (values) => {
    const payload = {
      territoryId: +id,
      collaboratorRole: collaboratorId,
      valueType: {
        amount: values.amount,
        rateType: +values.valueType,
        minRate: +values.minAmount,
        maxRate: +values.maxAmount,
      },
      fmShare: {
        amount: values.fmShareAmount,
        rateType: +values.fmShareRateType,
        minRate: 0,
        maxRate: 0,
      },
    };

    createRateUpLift(payload);
  };

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      valueType: "",
      amount: "",
      minAmount: "",
      maxAmount: "",
      fmShareAmount: "",
      fmShareRateType: "",
      fmShareMinRate: "",
      fmShareMaxRate: "",
    },
    onSubmit,
    validationSchema: upliftValidation,
  });

  useEffect(() => {
    const data = rateUpliftData?.[0];

    if (!!data?.rateType) {
      setFieldValue("valueType", data.rateType);
      setFieldValue("amount", data.amount);
      setFieldValue("minAmount", data.minRate);
      setFieldValue("maxAmount", data.maxRate);
      console.log("setting");
    }
  }, [rateUpliftData]);

  const maxAmount = values.valueType === "1" ? 100 : "";
  const fmMaxAmount = values.fmShareRateType === "1" ? 100 : "";

  return (
    <>
      <div className="mb-5">
        <PageHeading>
          {collaboratorName} Rate Uplift: {territoryData?.territoryName}
        </PageHeading>
        <BackBtn />
      </div>

      <TerritoryNavigation />

      <Box maxWidth="900px" mx="auto">
        <form onSubmit={handleSubmit}>
          <FormGroup columns="2">
            <GlobalSelect
              labelText="Value Type"
              options={VALUETYPES}
              defaultOption="Select a value type"
              selectName="valueType"
              selectValue={values.valueType}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors?.valueType && touched?.valueType}
              errorMessage={errors?.valueType}
              required
            />
            <GlobalInput
              type="number"
              labelText="Amount"
              inputName="amount"
              inputValue={values.amount}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.amount && touched.amount}
              errorMessage={errors.amount}
              min={0}
              max={maxAmount}
              required
            />

            {values?.valueType === "1" && (
              <>
                <GlobalInput
                  type="number"
                  labelText="Minimum Amount"
                  inputName="minAmount"
                  inputValue={values.minAmount}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  error={errors.minAmount && touched.minAmount}
                  errorMessage={errors.minAmount}
                  min={0}
                  inputPlaceholder="i.e. 1,000"
                  required
                />
                <GlobalInput
                  type="number"
                  labelText="Maximum Amount"
                  inputName="maxAmount"
                  inputValue={values.maxAmount}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  error={errors.maxAmount && touched.maxAmount}
                  errorMessage={errors.maxAmount}
                  min={0}
                  inputPlaceholder="i.e. 10,000"
                  required
                />
              </>
            )}
          </FormGroup>

          <Box marginBlockStart={8}>
            <SectionHeading>FM Uplift Share</SectionHeading>
            <FormGroup columns="2">
              <GlobalSelect
                labelText="FM Share Value Type"
                options={VALUETYPES}
                defaultOption="Select a value type"
                selectName="fmShareRateType"
                selectValue={values.fmShareRateType}
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.fmShareRateType && touched.fmShareRateType}
                errorMessage={errors.fmShareRateType}
                required
              />
              <GlobalInput
                type="number"
                labelText="Amount"
                inputName="fmShareAmount"
                inputValue={values.fmShareAmount}
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.fmShareAmount && touched.fmShareAmount}
                errorMessage={errors.fmShareAmount}
                min={0}
                max={fmMaxAmount}
                required
              />
              {/* {values.rateType === "1" && (
                <>
                  <GlobalInput
                    type="number"
                    labelText="Minimum Amount"
                    inputName="fmShareMinRate"
                    inputValue={values.fmShareMinRate}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.fmShareMinRate && touched.fmShareMinRate}
                    errorMessage={errors.fmShareMinRate}
                    min={0}
                    inputPlaceholder="i.e. 1,000"
                    required
                  />
                  <GlobalInput
                    type="number"
                    labelText="Maximum Amount"
                    inputName="fmShareMaxRate"
                    inputValue={values.fmShareMaxRate}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.fmShareMaxRate && touched.fmShareMaxRate}
                    errorMessage={errors.fmShareMaxRate}
                    min={values.minRate}
                    inputPlaceholder="i.e. 10,000"
                    required
                  />
                </>
              )} */}
            </FormGroup>
          </Box>
          <GlobalBtn type="submit" mx="auto" my="24px">
            Save
          </GlobalBtn>
        </form>
      </Box>
    </>
  );
};

export default CollaboratorRateUplifts;
