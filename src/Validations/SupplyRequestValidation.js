import * as yup from "yup";

export const requestSupplySchema = yup.object().shape({
  productName: yup.string().required("Please Enter Product Name"),
  manufacturer: yup.string(),
  modelNumber: yup.string(),
  modelYear: yup.string(),
  color: yup.string(),
  partNumber: yup.string(),
  size: yup.number().required("Please enter a quantity"),
  measurement: yup.string().required("Please Enter Unit of Measurement"),
  time: yup.string().required("Time is required"),
  date: yup.date().required("Date is required").min(new Date()),
  productDescription: yup.string(),
});
