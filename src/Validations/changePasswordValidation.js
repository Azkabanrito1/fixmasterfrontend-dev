import * as yup from "yup";

const passwordRules =
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$";
//Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:

export const changePwdSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .matches(
      passwordRules,
      "Password must contain at least one upper & lower case, one number & special characters"
    )
    .required("Password is required"),
  newPassword: yup
    .string()
    .min(8, "New password must be at least 8 characters")
    .matches(
      passwordRules,
      "Password must contain at least one upper & lower case, one number & special characters"
    )
    .required("New Password is required"),
  confirmPassword: yup
    .string()
    .min(8, "Confirm password must be at least 8 characters")
    .oneOf([yup.ref("newPassword"), "Confirm password must match password"])
    .matches(
      passwordRules,
      "Password must contain at least one upper & lower case, one number & special characters"
    )
    .required("Confirm Password is required"),
});
