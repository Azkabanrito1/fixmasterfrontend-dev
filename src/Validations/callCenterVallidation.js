import * as yup from "yup";

export const registerCallCenterSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
  gender: yup.string().required("Gender is required"),
  dob: yup.date().required("Date of birth is required"),
  phoneNo: yup.string().required("Phone number is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  lga: yup.string().required("Local government is required"),
  course: yup.string().required("Course of Study is required"),
  education: yup.string().required("Level of education is required"),
  cv: yup.mixed().required("Please upload a CV"),
  coverLetter: yup.mixed().required("Please upload a cover letter"),
  video: yup.mixed().required("Please upload a video"),
  topics: yup.string().required("Topics is required"),
  address: yup.string().required("Please enter a valid address"),
  terms: yup
    .bool()
    .oneOf([true], "Please Accept the terms of service")
    .required(),
  languages: yup
    .array()
    .of(yup.string())
    .min(1, "Please select a language")
    .required("Please select a language"),
  //   languagePercent: yup.string().required(),
});
