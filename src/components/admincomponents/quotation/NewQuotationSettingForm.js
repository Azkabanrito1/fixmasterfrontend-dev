import { useFormik } from "formik";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalInput from "../../globalcomponents/GlobalInput";
import { Fields, FormGroup } from "../../globalcomponents/Utilities";
import { createQuotationSetting } from "../../../Validations/QuotationLogisticsValidation";

const NewQuotationSettingForm = ({ createSetting, isLoading }) => {
  const onSubmit = () => {
    const payload = {
      minRoyaltyFee: values.minRoyaltyFee,
      maxRoyaltyFee: values.maxRoyaltyFee,
      royaltyCapFee: values.royaltyCapFee,
      diagnosisFeePercent: values.diagnosisFeePercent,
    };

    createSetting(payload);
  };

  const { handleSubmit, handleBlur, handleChange, errors, values, touched } =
    useFormik({
      initialValues: {
        minRoyaltyFee: 0,
        maxRoyaltyFee: 0,
        royaltyCapFee: 0,
        diagnosisFeePercent: 0,
      },
      onSubmit,
      validationSchema: createQuotationSetting,
    });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup columns="2">
            <GlobalInput
              labelText="Minimum Royalty Fee"
              inputName="minRoyaltyFee"
              inputValue={values.minRoyaltyFee}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.minRoyaltyFee && touched.minRoyaltyFee}
              errorMessage={errors.minRoyaltyFee}
              min={1}
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
              min={1}
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
              min={1}
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
              min={1}
              max={100}
              required
            />
          </FormGroup>
        </Fields>

        <GlobalBtn
          type="submit"
          mx="auto"
          px="2rem"
          width="max-content"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Create Quotation Setting"}
        </GlobalBtn>
      </form>
    </>
  );
};

export default NewQuotationSettingForm;
