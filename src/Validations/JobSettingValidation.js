import * as yup from "yup";
export const jobSettingSchema = yup.object().shape({
  techMaxDist: yup.number().min(0.000001, "Value must be greater that 0"),
  jobAdvEscTime: yup.number().min(0, "Value must be not be less then 0"),
  jobAdvWaitTime: yup.number().min(0, "Value must be not be less then 0"),
  rfqAdvWaitTimeLV1: yup.number().min(0, "Value must be not be less then 0"),
  rfqAdvWaitTimeLV2: yup.number().min(0, "Value must be not be less then 0"),
  rfqAdvWaitTimeLV3: yup.number().min(0, "Value must be not be less then 0"),
  jobPrtyMinRating: yup.number().min(0, "Value must be not be less then 0"),
  rfqPrtyMinRating: yup.number().min(0, "Value must be not be less then 0"),
  supplierMaxDistance: yup
    .number()
    .min(0.000001, "Value must be greater that 0"),
});
