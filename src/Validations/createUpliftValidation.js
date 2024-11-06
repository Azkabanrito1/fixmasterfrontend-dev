import * as yup from "yup";

const upliftValidation = yup.object().shape({
  valueType: yup.string().required("Value type is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .min(0, "Amount must be at least 0")
    .when("valueType", {
      is: "1",
      then: (schema) => schema.max(100, "Amout cannot be greater than 100"),
    }),
  minAmount: yup
    .number()
    .when("valueType", {
      is: "1",
      then: (schema) =>
        schema.required(
          "Minimum amount is required when value type is percentage based"
        ),
      otherwise: (schema) => schema.notRequired(),
    })
    .min(0, "Minimum amount must be at least 0"),
  maxAmount: yup
    .number()
    .when("valueType", {
      is: "1",
      then: (schema) =>
        schema.required(
          "Maximum amount is required when value type is percentage based"
        ),
      otherwise: (schema) => schema.notRequired(),
    })
    .min(
      yup.ref("minAmount"),
      "Maximum amount must be greater than or equal to minimum amount"
    ),
  fmShareRateType: yup.string().required("Value type is required"),
  fmShareAmount: yup
    .number()
    .required("Amount is required")
    .min(0, "Amount must be at least 0")
    .when(["fmShareRateType", "$valueType"], {
      is: (fmShareRateType, valueType) =>
        fmShareRateType === "0" && valueType === "0",
      then: (schema) =>
        schema.max(
          yup.ref("amount"),
          "Amount cannot be greater than the uplift's amount"
        ),
    })
    .when(["fmShareRateType", "$valueType"], {
      is: (fmShareRateType, valueType) =>
        fmShareRateType === "0" && valueType === "1",
      then: (schema) =>
        schema.max(
          yup.ref("minAmount"),
          "Amount cannot be greater than the uplift's minimum amount"
        ),
    })
    .when(["fmShareRateType", "$valueType"], {
      is: (fmShareRateType, valueType) =>
        fmShareRateType === "1" && valueType === "1",
      then: (schema) => schema.max(100, "Amount cannot be greater 100"),
    }),
});

export default upliftValidation;
