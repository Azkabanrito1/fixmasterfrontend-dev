import * as yup from "yup";

export const addSubscriptionValidation = yup.object().shape({
  shortName: yup.string().required("Short name is required"),
  longName: yup.string().required("Long name is required"),
  customerType: yup.string().required("Customer type is required"),
});

export const addPlanValidation = yup.object().shape({
 paymentPlanId: yup.number().required("Payment plan ID is required"),
  totalAllowedNoOfJobs: yup
    .number()
    .required("Total number of jobs allowed is required"),
  planAmount: yup.number().required("Payment plan amount is required"),
  paymentGatewayCode: yup.string().required("Payment gateway code is required"),
});
