import * as yup from "yup";

export const createAdminUserSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
  gender: yup.string().required("Gender is required"),
  dob: yup.date().required("Date of birth is required"),
  phoneNo: yup.string().required("Phone number is required"),
});
