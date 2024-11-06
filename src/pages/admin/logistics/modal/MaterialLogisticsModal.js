import styled from "styled-components";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { materialLogisticsSetting } from "../../../../Validations/QuotationLogisticsValidation";
import { useUpdateQuotationParamSetting } from "../../../../hooks/useQueries/useAdmin";
import GlobalModal from "../../../../components/globalcomponents/GlobalModal";
import AltModalHeader from "../../../../components/layouts/modal/AltModalHeader";
import GlobalInput from "../../../../components/globalcomponents/GlobalInput";
import GlobalBtn from "../../../../components/globalcomponents/GlobalBtn";
import GlobalSelect from "../../../../components/globalcomponents/GlobalSelect";

const MaterialLogisticsModal = ({ open, close, data }) => {
  const arrOptions = [
    { id: 1, name: "Percentage based" },
    { id: 2, name: "Flat rate" },
  ];
  const onSubmit = () => {
    const payload = {
      id: data?.id,
      materialMarkup: values.materialMarkup,
      materialFeeType: parseInt(values.materialFeeType),
    };
    updateSettings(payload);
  };

  const { handleSubmit, handleBlur, handleChange, errors, values, touched } =
    useFormik({
      initialValues: {
        materialFeeType: data?.materialFeeType,
        materialMarkup: data?.materialMarkup,
      },
      onSubmit,
      validationSchema: materialLogisticsSetting,
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
    typeId: 2,
    onSuccess: onSuccess,
    onFailure: onFailure,
  });
console.log(data)
  return (
    <>
      <GlobalModal isOpen={open} closeModal={close} width="">
        <AltModalHeader closeModal={close} />
        <form onSubmit={handleSubmit}>
          <GlobalSelect
            labelText="Material Fee Type"
            descriptionText="select material fee type"
            selectName="materialFeeType"
            selectValue={values.materialFeeType}
            options={arrOptions}
            defaultOption="Select an option"
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.materialFeeType && touched.materialFeeType}
            errorMessage={errors.materialFeeType}
            required
          />
          {values.materialFeeType === "1" && (
            <div style={{ marginTop: "30px" }}>
              <GlobalInput
                labelText="Material Markup (%)"
                descriptionText="enter material logistics fee (%)"
                inputName="materialMarkup"
                inputValue={values.materialMarkup}
                inputType="number"
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.materialMarkup && touched.materialMarkup}
                errorMessage={errors.materialMarkup}
                min={0}
                max={100}
                required
              />
            </div>
          )}

          {values.materialFeeType === "2" && (
            <div style={{ marginTop: "30px" }}>
              <GlobalInput
                labelText="Material Markup"
                descriptionText="enter material logistics fee (flat rate)"
                inputName="materialMarkup"
                inputValue={values.materialMarkup}
                inputType="number"
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.materialMarkup && touched.materialMarkup}
                errorMessage={errors.materialMarkup}
                min={0}
                required
              />
            </div>
          )}
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
export default MaterialLogisticsModal;

