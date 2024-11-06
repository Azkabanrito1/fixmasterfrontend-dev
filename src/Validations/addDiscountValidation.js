import * as yup from "yup";

export const addDiscountValidation = yup.object().shape({
  computeType: yup.string().required("Compute type is required"),
  discountName: yup.string().required("Discount name is required"),
  discountType: yup.string().required("Compute Type is required"),
  discountValue: yup.number().required("Discount value is required"),
  invoiceComponents: yup
    .array()
    .required("Invoice components is required")
    .min(1, "Please add an invoice component "),

  audienceCategory: yup.string().required("Audience category is required"),
  periodStartDate: yup.string().required("Discount start date is required"),
  periodEndDate: yup.string().required("Discount end date is required"),
});
