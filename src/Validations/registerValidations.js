import * as yup from "yup";

const passwordRules =
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$";
//Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:

export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "First name must be minimum of 2 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(2, "Last name must be minimum of 2 characters")
    .required("Last name is required"),
  email: yup
    .string()
    .email("Please add a valid email")
    .required("Email is required"),
  phoneNo: yup.number().required("Phone number is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(passwordRules, {
      message:
        "Password must contain at least one upper & lower case, one number & special char",
    })
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .test(
      "unmatchedPassword",
      "Passwords do not match",
      function (confirmPassword) {
        const { password } = this.parent;

        return password === confirmPassword;
      }
    ),
  userReferalCode: yup.string(),
  termsOfService: yup
    .bool()
    .oneOf([true], "Please accept the terms of service")
    .required(),
});

export const createPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please add a valid email")
    .required(" Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(passwordRules, {
      message:
        "Password must contain at least one upper & lower case, one number & special char",
    })
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .test(
      "unmatchedPassword",
      "Passwords do not match",
      function (confirmPassword) {
        const { password } = this.parent;

        return password === confirmPassword;
      }
    ),
});
export const commentToMngtSchema = yup.object().shape({
  responseMessage: yup
    .string()
    .required("Message cannot be empty"),
});
