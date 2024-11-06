import * as yup from "yup";

export const registerQamasterSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
  gender: yup.string().required("Gender is required"),
  dob: yup.date().required("Date of birth is required"),
  state: yup.string().required("State is required"),
  lga: yup.string().required("Local government is required"),
  city: yup.string().required("City is required"),
  address: yup.string().trim().required("Address is required"),
  course: yup.string().required("Course of Study is required"),
  education: yup.string().required("Level of education is required"),
  cv: yup.mixed().required("Please upload a CV"),
  coverLetter: yup.mixed().required("Please upload a cover letter"),
  // trainingOther: yup.string().required("Please select an option"),
  technicalTraining: yup.string().required("Please select an option"),
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
  phoneNo: yup.string().required("Phone Number is required"),
  terms: yup
    .bool()
    .oneOf([true], "Please Accept the terms of service")
    .required(),
});
