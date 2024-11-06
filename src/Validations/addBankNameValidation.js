import * as yup from "yup";

export const addBankValidation = yup.object().shape({
  bankName: yup.string().required("Bank name is required"),
  accountNumber: yup
    .string()
    .required("Account number is required")
    .matches(/^\d{10}$/, "Account number is 10 digits"),
});
