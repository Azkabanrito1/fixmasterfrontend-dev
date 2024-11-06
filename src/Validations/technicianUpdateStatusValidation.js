import * as yup from "yup";

export const updateTechSchema = yup.object().shape({
  status: yup.string().required("Status is required"),
  reasonForChange: yup
    .string()
    .required("Reason for change status is required"),
  time: yup.string().required("Time is required"),
  date: yup.date().required("Date is required").min(new Date()),
});
