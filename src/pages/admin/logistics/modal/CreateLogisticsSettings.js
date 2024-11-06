import styled from "styled-components";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useCreateQuotationParamSetting } from "../../../../hooks/useQueries/useAdmin";
import GlobalModal from "../../../../components/globalcomponents/GlobalModal";
import AltModalHeader from "../../../../components/layouts/modal/AltModalHeader";
import GlobalInput from "../../../../components/globalcomponents/GlobalInput";
import GlobalBtn from "../../../../components/globalcomponents/GlobalBtn";
import GlobalSelect from "../../../../components/globalcomponents/GlobalSelect";
import GlobalBallBeat from "../../../../components/globalcomponents/GlobalBallBeat";

const CreateLogisticsSettings = ({
  open,
  close,
  loading,
  labourData,
  materialData,
}) => {
  const arr1 = [
    { id: 1, name: "Labour Logistics" },
    {
      id: 2,
      name: "Material Logistics",
    },
  ];
  const arr2 = [{ id: 1, name: "Labour Logistics" }];
  const arr3 = [
    {
      id: 2,
      name: "Material Logistics",
    },
  ];
  const arrOptions =
    (labourData?.length === 0 && materialData.length === 0) ||
    (labourData[0]?.minimumLogisticsFee !== 0 &&
      materialData[0]?.materialMarkup !== 0)
      ? arr1
      : materialData[0]?.materialMarkup !== 0
      ? arr2
      : arr3;
  const materialArr = [
    { id: 1, name: "Percentage based" },
    { id: 2, name: "Flat rate" },
  ];
  const onSubmit = () => {
    const payload = {
      minLogisticsFee:
        parseInt(values.createType) === 1 ? values.minLogisticsFee : 0,
      maxLogisticsFee:
        parseInt(values.createType) === 1 ? values.maxLogisticsFee : 0,
      logisticFeeCap:
        parseInt(values.createType) === 1 ? values.logisticFeeCap : 0,
      materialMarkup:
        parseInt(values.createType) === 2 ? values.materialMarkup : 0,
      materialFeeType:
        parseInt(values.createType) === 2
          ? parseInt(values.materialFeeType)
          : 0,
    };
    createSettings(payload);
  };

  const { handleSubmit, handleBlur, handleChange, errors, values, touched } =
    useFormik({
      initialValues: {
        createType: 0,
        materialFeeType: 0,
        materialMarkup: 0,
        minLogisticsFee: 0,
        maxLogisticsFee: 0,
        logisticFeeCap: 0,
      },
      onSubmit,
    });

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    close();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: createSettings, isLoading } = useCreateQuotationParamSetting({
    typeId: parseInt(values.createType),
    onSuccess: onSuccess,
    onFailure: onFailure,
  });

  return (
    <>
      <GlobalModal isOpen={open} closeModal={close} width="">
        <AltModalHeader closeModal={close} />
        <GlobalBallBeat loading={loading} />
        {!loading && (
          <form onSubmit={handleSubmit}>
            <GlobalSelect
              labelText="Logsitics Type"
              selectName="createType"
              selectValue={values.createType}
              options={arrOptions}
              defaultOption="Select an option"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.createType && touched.createType}
              errorMessage={errors.createType}
              required
            />
            <Container>
              {values.createType === "1" && (
                <>
                  <GlobalInput
                    labelText="Minimum Logistics Fee"
                    inputName="minLogisticsFee"
                    inputValue={values.minLogisticsFee}
                    inputType="number"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.minLogisticsFee && touched.minLogisticsFee}
                    errorMessage={errors.minLogisticsFee}
                    min={1}
                    required
                  />
                  <GlobalInput
                    labelText="Maximum Logistics Fee"
                    inputName="maxLogisticsFee"
                    inputValue={values.maxLogisticsFee}
                    inputType="number"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.maxLogisticsFee && touched.maxLogisticsFee}
                    errorMessage={errors.maxLogisticsFee}
                    min={1}
                    required
                  />
                  <GlobalInput
                    labelText="Logistics Fee Cap (%)"
                    inputName="logisticFeeCap"
                    inputValue={values.logisticFeeCap}
                    inputType="number"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.logisticFeeCap && touched.logisticFeeCap}
                    errorMessage={errors.logisticFeeCap}
                    min={1}
                    max={100}
                    required
                  />
                </>
              )}
              {values.createType === "2" && (
                <>
                  <GlobalSelect
                    labelText="Material Fee Type"
                    selectName="materialFeeType"
                    selectValue={values.materialFeeType}
                    options={materialArr}
                    defaultOption="Select an option"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.materialFeeType && touched.materialFeeType}
                    errorMessage={errors.materialFeeType}
                    required
                  />
                  {values.materialFeeType === "1" && (
                    <GlobalInput
                      labelText="Material Markup (%)"
                      inputName="materialMarkup"
                      inputValue={values.materialMarkup}
                      inputType="number"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      error={errors.materialMarkup && touched.materialMarkup}
                      errorMessage={errors.materialMarkup}
                      min={1}
                      max={100}
                      required
                    />
                  )}
                  {values.materialFeeType === "2" && (
                    <GlobalInput
                      labelText="Material Markup"
                      inputName="materialMarkup"
                      inputValue={values.materialMarkup}
                      inputType="number"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      error={errors.materialMarkup && touched.materialMarkup}
                      errorMessage={errors.materialMarkup}
                      min={1}
                      required
                    />
                  )}
                </>
              )}
            </Container>
            <GlobalBtn
              className="mx-auto"
              type="submit"
              width="max-content"
              height="70px"
              px="2rem"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Create settings"}
            </GlobalBtn>
          </form>
        )}
      </GlobalModal>
    </>
  );
};
export default CreateLogisticsSettings;

const Container = styled.div`
  width: 100%;
  margin: 40px 0px;
  column-gap: 20px;
  row-gap: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;
