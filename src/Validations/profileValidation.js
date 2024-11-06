import * as yup from "yup";

export const franchiseeProfileValidation = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  gender: yup.string().required("Gender is required"),
  dob: yup.string().required("Date of birth is required"),
  email: yup
    .string()
    .email("Enter valid email address")
    .required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  identificationNumber: yup
    .string()
    .required("Identification number is required"),
  prefix: yup.string().required("Prefix is required"),
});
