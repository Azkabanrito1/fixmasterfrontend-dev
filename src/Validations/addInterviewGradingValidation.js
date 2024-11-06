import * as yup from "yup";

export const interviewGradingValidation = yup.object().shape({
  interviewName: yup.string().required("Interview name is required"),
  passMark: yup.number().required("Cut off mark is required"),
  interviewType: yup.string().required("Interview type is required"),
});
