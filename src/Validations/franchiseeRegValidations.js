import * as yup from "yup";

export const registerFranchiseeSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
  gender: yup.string().required("Gender is required"),
  dob: yup.date().required("Date of birth is required"),
  // country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  lga: yup.string().required("Local Government is required"),
  city: yup.string().required("City is required"),
  territory: yup.string().required("Territory is required"),
  address: yup.string().trim().required("Address is required"),
  course: yup.string().required("Course of Study is required"),
  education: yup.string().required("Level of education is required"),
  runBusiness: yup.bool().required("Please select an option"),
  management: yup.string().required("Please select an option"),
  marketing: yup.bool().required("Please select an option"),
  haveFunds: yup.bool().required("Please select an option"),
  // howMuch: yup.string().required("Please specify an amount"),
  cv: yup.mixed().required("Please upload a CV"),
  coverLetter: yup.mixed().required("Please upload a cover letter"),
  terms: yup
    .bool()
    .oneOf([true], "Please Accept the terms of service")
    .required(),
});
