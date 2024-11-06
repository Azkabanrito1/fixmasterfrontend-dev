import * as yup from "yup";

export const bonusValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  valueType: yup.string().required("Type is required"),
  value: yup.number().required("Value is required"),
  interval: yup.number().required("Interval is required"),
  workerType: yup.string().required("Contract type is required"),
});

export const targetValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  valueType: yup.string().required("Type is required"),
  value: yup.number().required("Value is required"),
  bonus: yup.string().required("Bonus is required"),
});
