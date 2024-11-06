import * as yup from "yup";

export const createQuotationSetting = yup.object().shape({
  minRoyaltyFee: yup
    .number()
    .min(1, "Minimum royalty fee must be greater than or equal to 1")
    .required("Minimum royalty fee is required"),
  maxRoyaltyFee: yup
    .number()
    .min(1, "Maximum royalty fee must be greater than or equal to 1")
    .required("Maximum royalty fee is required"),
  royaltyCapFee: yup.number().min(0).required("Royalty fee cap is required"),
  diagnosisFeePercent: yup
    .number()
    .min(1, "Diagnosis fee percent must be greater than or equal to 1")
    .max(100, "Diagnosis fee percent must be less than or equal to 100")
    .required("Diagnosis fee percent is required"),
});

export const labourLogisticsSetting = yup.object().shape({
  minLogisticsFee: yup
    .number()
    .min(1, "Minimum logistic fee must be greater than or equal to 1")
    .required("Minimum logistics fee is required"),
  maxLogisticsFee: yup
    .number()
    .min(1, "Maximum logistic fee must be greater than or equal to 1")
    .required("Maximum logistics fee is required"),
  logisticFeeCap: yup.number().min(0).required("Logistics fee cap is required"),
});

export const materialLogisticsSetting = yup.object().shape({
  materialMarkup: yup
    .number()
    .min(1, "Material markup must be greater than or equal to 1")
    .required("Material markup is required"),
    materialFeeType: yup.number().required("Please select an option"),
});
