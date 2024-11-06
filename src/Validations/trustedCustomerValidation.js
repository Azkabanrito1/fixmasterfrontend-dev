import * as yup from "yup";

export const trustedCustomerSchema = yup.object().shape({
  prefix: yup.string().required("Choose prefix"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  marital: yup.string().required("Marital status is required"),
  organizationName: yup.string().required("Organization name is required"),
  relation: yup.string().required("Relation is required"),
  state: yup.string().required("State is required"),
  lga: yup.string().required("Local government is required"),
  city: yup.string().required("City is required"),
  address: yup.string().trim().required("Address is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phoneNo: yup.string().required("Phone number is required"),
});
