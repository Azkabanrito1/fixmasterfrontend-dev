import * as yup from "yup";

export const cseGuarantorInfoSchema = yup.object().shape({
  prefix: yup.string().required("Choose prefix"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  marital: yup.string().required("Marital status is required"),
  relationship: yup.string().required("Guarantor's relationship is required"),
  dob: yup.date().required("Date of birth is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  altPhone: yup.string(),
  country: yup.string(),
  state: yup.string().required("State is required"),
  lga: yup.string().required("Local government is required"),
  city: yup.string().required("City is required"),
  address: yup.string().trim().required("Address is required"),
  officeCountry: yup.string(),
  officeState: yup.string().required("State is required"),
  officeLga: yup.string().required("Office local government is required"),
  officeCity: yup.string().required("City is required"),
  officeAddress: yup.string().required("Address is required"),
  doc: yup.mixed().required("Please upload the document (.pdf)"),
  terms: yup
    .bool()
    .oneOf([true], "Please accept the terms of service")
    .required(),
});
