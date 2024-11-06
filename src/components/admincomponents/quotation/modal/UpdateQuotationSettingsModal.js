import styled from "styled-components";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import { useFormik } from "formik";
import { createQuotationSetting } from "../../../../Validations/QuotationLogisticsValidation";
import { useSnackbar } from "notistack";
import { useUpdateQuotationParamSetting } from "../../../../hooks/useQueries/useAdmin";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";

const UpdateQuotationSettingsModal = ({ open, close, data }) => {
  const onSubmit = () => {
    const payload = {
      id: data?.id,
      minRoyaltyFee: values.minRoyaltyFee,
      maxRoyaltyFee: values.maxRoyaltyFee,
      royaltyCapFee: values.royaltyCapFee,
      diagnosisFeePercent: values.diagnosisFeePercent,
    };
    updateSettings(payload);
  };

  const { handleSubmit, handleBlur, handleChange, errors, values, touched } =
    useFormik({
      initialValues: {
        minRoyaltyFee: data.minRoyaltyFee,
        maxRoyaltyFee: data.maxRoyaltyFee,
        royaltyCapFee: data.royaltyCapFee,
        diagnosisFeePercent: data.diagnosisFeePercent,
      },
      onSubmit,
      validationSchema: createQuotationSetting,
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

  const { mutate: updateSettings } = useUpdateQuotationParamSetting(
    2,
    onSuccess,
    onFailure
  );

  return (
    <>
      <GlobalModal isOpen={open} closeModal={close} width="">
        <AltModalHeader closeModal={close} />
        <form onSubmit={handleSubmit}>
          <Container>
            <GlobalInput
              labelText="Minimum Royalty Fee"
              inputName="minRoyaltyFee"
              inputValue={values.minRoyaltyFee}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.minRoyaltyFee && touched.minRoyaltyFee}
              errorMessage={errors.minRoyaltyFee}
              min={0}
              required
            />
            <GlobalInput
              labelText="Maximum Royalty Fee"
              inputName="maxRoyaltyFee"
              inputValue={values.maxRoyaltyFee}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.maxRoyaltyFee && touched.maxRoyaltyFee}
              errorMessage={errors.maxRoyaltyFee}
              min={0}
              required
            />
            <GlobalInput
              labelText="Royalty Fee Cap"
              inputName="royaltyCapFee"
              inputValue={values.royaltyCapFee}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.royaltyCapFee && touched.royaltyCapFee}
              errorMessage={errors.royaltyCapFee}
              min={0}
              required
            />
            <GlobalInput
              labelText="Diagnonis Fee Percent (%)"
              inputName="diagnosisFeePercent"
              inputValue={values.diagnosisFeePercent}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.diagnosisFeePercent && touched.diagnosisFeePercent}
              errorMessage={errors.diagnosisFeePercent}
              min={0}
              max={100}
              required
            />
          </Container>
          <GlobalBtn
            className="mx-auto"
            type="submit"
            width="max-content"
            height="70px"
            px="2rem"
          >
            UPDATE
          </GlobalBtn>
        </form>
      </GlobalModal>
    </>
  );
};
export default UpdateQuotationSettingsModal;

const Container = styled.div`
  width: 100%;
  margin-bottom: 50px;
  column-gap: 30px;
  row-gap: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;
