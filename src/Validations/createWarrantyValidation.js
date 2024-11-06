import * as yup from "yup";

export const createWarrantySchema = yup.object().shape({
  warrantyType: yup.string().required("Type is required"),
  warrantyName: yup.string().required("Name is required"),
  maxNoOfDays: yup
    .number()
    .min(0)
    .required("Maximum number of days is required"),
  maxNoOfClaims: yup
    .number()
    .min(0)
    .required("Maximum number of claims is required"),
  warrantyFee: yup.number().min(0).required("Warranty fee is required"),
});
