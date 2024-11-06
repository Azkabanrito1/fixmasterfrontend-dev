import * as yup from "yup";

export const giftSubSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phoneNo: yup.string().required("Phone number is required"),
  subId: yup.string().required("Subscription type is required"),
  purpose: yup.string(),
  message: yup.string(),
});
