import * as yup from "yup";

export const requestQuotationSchema = yup.object().shape({
  measurement: yup.string().required("Please Enter Unit of Measurement"),
  time: yup.string().required("Delivery time is required"),
  date: yup.date().required("Delivery date is required").min(new Date()),
  cost: yup.string().required("Cost is required"),
  delivery: yup.string().required("Delivery Fee is required"),
  warranty: yup.string().required("Warranty is required"),
});
