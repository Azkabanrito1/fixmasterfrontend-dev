import * as yup from "yup";

const SUPPORTED_FORMATS = ["application/pdf"];

export const termsAndConditionsValidationSchema = yup.object().shape({
  file: yup
    .mixed()
    .required("A file is required")
    .test(
      "fileFormat",
      "Unsupported Format. Only .pdf files are valid.",
      (value) => {
        return value && SUPPORTED_FORMATS.includes(value.type);
      }
    ),
});
