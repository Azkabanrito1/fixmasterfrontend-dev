import * as yup from "yup";

export const techDiscussionSchema = yup.object().shape({
  time: yup.string().required("Time is required"),
  date: yup.date().required("Date is required"),
});
