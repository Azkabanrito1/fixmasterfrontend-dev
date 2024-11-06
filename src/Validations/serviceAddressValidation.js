import * as yup from "yup";

export const addressSchema = yup.object().shape({
  addressTitle: yup.string().required("Title for address is required"),
  contactName: yup.string().required("Contact name is required"),
  contactEmail: yup
    .string()
    .email("Enter a valid email")
    .required("Contact name is required"),
  contactPhoneNo: yup.string().required("Contact phone number is required"),
  address: yup.string().required("Address is required"),
});
