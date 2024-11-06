import * as yup from "yup";

export const registerSupplierSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
  phoneNo: yup.string().required("Phone Number is required"),
  gender: yup.string().required("Gender is required"),
  dob: yup.date().required("Date of birth is required"),
  address: yup.string().required("Address is required"),
  preferredLanguage: yup.string().required("Preferred language is required"),
  mainCategory: yup.string().required("Area of specialization is required"),
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
  languages: yup
    .array()
    .of(yup.string())
    .min(1, "Please select a language")
    .required("Please select a language"),
  branch: yup.string().required("Please select an option"),
  trading: yup.string().required("Please select an option"),
  warranty: yup
    .number()
    .required("Please input a value")
    .min(0, "Please input a value greater than or equal to zero"),
  corporateCustomer: yup.string().required("Please select an option"),
  state: yup.string().required(),
  officeState: yup.string().required(),
  officeCity: yup.string().required(),
  city: yup.string().required(),
  lga: yup.string().required(),
  cac: yup.mixed().required("Please upload your CAC document"),
  coverLetter: yup.mixed().required("Please upload a cover letter"),
  terms: yup
    .bool()
    .oneOf([true], "Please Accept the terms of service")
    .required(),
});
