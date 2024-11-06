import * as yup from "yup";

export const addCityValidation = yup.object().shape({
  city: yup.string().required("City is required"),
  start: yup.date().required("Start date is required"),
});
