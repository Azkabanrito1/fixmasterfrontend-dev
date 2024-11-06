import * as yup from "yup";

export const createLoyaltySchema = yup.object().shape({
  loyaltyName: yup.string().required("Name is required"),
  loyaltyType: yup.string().required("Type is required"),
  minSpend: yup.number().min(0).required("Minimum spend is required"),
  maxSpend: yup.number().min(0).required("Maximum spend is required"),
  percentDue: yup.number().min(0).required("Percentage due is required"),
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().required("End date is required"),
});
