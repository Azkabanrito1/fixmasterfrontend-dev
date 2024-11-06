import * as yup from "yup";

export const locationPreferenceSchema = yup.object().shape({
  state: yup.string().required("State is required"),
  lga: yup.string().required("Local Government is required"),
  city: yup.string().required("City is required"),
});
