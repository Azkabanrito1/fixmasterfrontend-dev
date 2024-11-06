import * as yup from "yup";

export const jobBookingFeeValidation = yup.object().shape({
    applicableFee: yup
    .number()
    .min(0.000001, "Applicable fee must be greater that 0"),
});
