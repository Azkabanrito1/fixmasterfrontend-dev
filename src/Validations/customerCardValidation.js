import * as yup from "yup";

export const CardSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  cardNumber: yup.number().required("Card number is required").min(16),
  expiryMonth: yup
    .number()
    .required("Expiry month is required")
    .min(1, "Invalid expiry month: format is 'mm'")
    .test(
      "invalidMonth",
      "The expiry month is invalid",
      function (expiryMonth) {
        const { expiryYear } = this.parent;
        const date = new Date();
        const presentYear = date.getFullYear() % 1000;
        const presentMonth = date.getMonth() + 1;

        if (+expiryYear === presentYear) {
          return expiryMonth >= presentMonth;
        }

        return true;
      }
    ),
  expiryYear: yup
    .number()
    .required("Expiry year is required")
    .min(2, "Invalid expiry year: format is 'yy'")
    .test("invalidYear", "The expiry year is invalid", function (year) {
      const date = new Date();
      const presentYear = date.getFullYear() % 1000;

      return +year >= presentYear;
    }),
  cvv: yup.number().required().min(3),
});
