import styled from "styled-components";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { labourLogisticsSetting } from "../../../../Validations/QuotationLogisticsValidation";
import { useUpdateQuotationParamSetting } from "../../../../hooks/useQueries/useAdmin";
import GlobalModal from "../../../../components/globalcomponents/GlobalModal";
import AltModalHeader from "../../../../components/layouts/modal/AltModalHeader";
import GlobalInput from "../../../../components/globalcomponents/GlobalInput";
import GlobalBtn from "../../../../components/globalcomponents/GlobalBtn";

const LabourLogisticsModal = ({ open, close, data }) => {
  const onSubmit = () => {
    const payload = {
      id: data?.id,
      minLogisticsFee: values.minLogisticsFee,
      maxLogisticsFee: values.maxLogisticsFee,
      logisticFeeCap: values.logisticFeeCap,
    };
    updateSettings(payload);
  };

  const { handleSubmit, handleBlur, handleChange, errors, values, touched } =
    useFormik({
      initialValues: {
        minLogisticsFee: data?.minimumLogisticsFee,
        maxLogisticsFee: data?.maximumLogisticsFee,
        logisticFeeCap: data?.logisticsFeeCap,
      },
      onSubmit,
      validationSchema: labourLogisticsSetting,
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

  const { mutate: updateSettings, isLoading } = useUpdateQuotationParamSetting({
    typeId: 1,
    onSuccess: onSuccess,
    onFailure: onFailure,
  });

  return (
    <>
      <GlobalModal isOpen={open} closeModal={close} width="">
        <AltModalHeader closeModal={close} />
        <form onSubmit={handleSubmit}>
          <Container>
            <GlobalInput
              labelText="Minimum Logistics Fee"
              descriptionText="enter minimum logistics flat fee"
              inputName="minLogisticsFee"
              inputValue={values.minLogisticsFee}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.minLogisticsFee && touched.minLogisticsFee}
              errorMessage={errors.minLogisticsFee}
              min={0}
              required
            />
            <GlobalInput
              labelText="Maximum Logistics Fee"
              descriptionText="enter maximum logistics flat fee"
              inputName="maxLogisticsFee"
              inputValue={values.maxLogisticsFee}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.maxLogisticsFee && touched.maxLogisticsFee}
              errorMessage={errors.maxLogisticsFee}
              min={0}
              required
            />
            <GlobalInput
              labelText="Logistics Fee Cap (%)"
              descriptionText="enter logistics fee % for labour"
              inputName="logisticFeeCap"
              inputValue={values.logisticFeeCap}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.logisticFeeCap && touched.logisticFeeCap}
              errorMessage={errors.logisticFeeCap}
              min={0}
              max={100}
              required
            />
          </Container>

          <GlobalBtn
            className="mx-auto mt-3"
            type="submit"
            width="max-content"
            height="60px"
            px="2rem"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Update settings"}
          </GlobalBtn>
        </form>
      </GlobalModal>
    </>
  );
};
export default LabourLogisticsModal;

const Container = styled.div`
  width: 100%;
  margin: 40px 0px;
  column-gap: 20px;
  row-gap: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;
