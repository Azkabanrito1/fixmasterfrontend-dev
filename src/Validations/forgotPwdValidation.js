import * as yup from "yup";

const passwordRules =
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
//Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:

export const forgotPwdSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please add a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Passwords must be at least 8 characters")
    .matches(passwordRules, {
      message:
        "Password must contain at least one upper & lower case, one number & special characters",
    })
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), "Passwords do not match"])
    .required("Confirm password is required"),
});
