import * as yup from "yup";

export const registerTechnicianSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
  phoneNo: yup.string().required("Phone Number is required"),
  gender: yup.string().required("Gender is required"),
  dob: yup.date().required("Date of birth is required"),
  address: yup.string().required("Address is required"),
  state: yup.string().required("State is required"),
  lga: yup.string().required("Local government is required"),
  city: yup.string().required("City is required"),
  address: yup.string().trim().required("Address is required"),
  course: yup.string().required("Course of Study is required"),
  education: yup.string().required("Level of education is required"),
  postalCode: yup.string().required("Postal code is required"),
  location: yup.string(),
  preferredLanguage: yup.string().required("Preferred language is required"),
  mainCategory: yup.string().required("Area of specialization is required"),
  mainSubCategories: yup.mixed().required("Please add a sub category"),
  otherSubCategories: yup.mixed().when("otherCategory", {
    is: (otherCategory) => otherCategory !== "",
    then: yup.mixed().required("Please add a sub category"),
    otherwise: yup.mixed().notRequired(),
  }),

  mainSubCategories: yup
    .array()
    .of(yup.object().shape({ id: yup.number(), name: yup.string() }))
    .min(1, "Please select a sub category")
    .required("Please select a sub category"),
  otherSubCategories: yup.array().when("otherCategory", {
    is: (otherCategory) => !!otherCategory,
    then: yup
      .array()
      .of(yup.object().shape({ id: yup.number(), name: yup.string() }))
      .min(1, "Please add a secondary sub category")
      .required("Please add a secondary sub category"),
    otherwise: yup.array().notRequired(),
  }),
  mediaChannels: yup.array().when("socialMedia", {
    is: (socialMedia) => Boolean(parseInt(socialMedia)) === true,
    then: yup
      .array()
      .of(yup.string())
      .min(1, "Please add a social media platform")
      .required("Please add a social media platform"),
    otherwise: yup.array().notRequired(),
  }),
  languages: yup
    .array()
    .of(yup.string())
    .min(1, "Please select a language")
    .required("Please select a language"),
  yearsOfExperience: yup.string().required("Please select experience level"),
  attendTraining: yup.string().required("Please select an option"),
  openTraining: yup.string().required("Please select an option"),
  trainedOthers: yup.string().required("Please select an option"),
  socialMedia: yup.string().required("Please select an option"),
  ownPhone: yup.string().required("Please select an option"),

  cv: yup.mixed().required("Please upload a CV"),
  coverLetter: yup.mixed().required("Please upload a cover letter"),
  terms: yup
    .bool()
    .oneOf([true], "Please Accept the terms of service")
    .required(),
});
