import isBefore from "date-fns/isBefore";
import * as yup from "yup";

const daySchema = yup.object().shape({
  open: yup
    .string()
    .required("Opening time is required")
    .test(
      "invalidTime",
      "Opening time must be before closing time",
      function (open) {
        const { close } = this.parent;

        if (close) {
          const openingTime = new Date(
            `${new Date().toISOString().split("T")[0]}T${open}`
          );
          const closingTime = new Date(
            `${new Date().toISOString().split("T")[0]}T${close}`
          );

          return isBefore(openingTime, closingTime);
        }
      }
    ),
  close: yup
    .string()
    .required("Closing time is required")
    .test(
      "invalidTime",
      "Closing time must be after opening time",
      function (close) {
        const { open } = this.parent;

        if (open) {
          const openingTime = new Date(
            `${new Date().toISOString().split("T")[0]}T${open}`
          );
          const closingTime = new Date(
            `${new Date().toISOString().split("T")[0]}T${close}`
          );

          return isBefore(openingTime, closingTime);
        }
      }
    ),
});

export const generateSupplierBranchValidation = (workingDays) => {
  const supplierBranchValidation = yup.object().shape({
    phoneNumber: yup.string().required("Branch phone number is required"),
    branchAddress: yup.string().required("Branch address is required"),
    branchEmail: yup
      .string()
      .email("Enter valid email address")
      .required("Busines email is required"),
    weekDay: yup
      .array()
      .of(yup.string())
      .min(1, "Please select a working day")
      .required("Please select a working day"),
    workingHours: yup.object().shape({
      ...workingDays.reduce((acc, day) => {
        acc[day] = daySchema;
        return acc;
      }, {}),
    }),
  });

  return supplierBranchValidation;
};
