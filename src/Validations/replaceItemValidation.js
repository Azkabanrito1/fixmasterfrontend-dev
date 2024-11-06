import * as yup from "yup";

export const replacedItemSchema = yup.object().shape({
  expectedDate: yup
    .date()
    .required("Expected date is required")
    .min(new Date()),
  cost: yup.string().required("Cost is required"),
  deliveryFee: yup.string().required("Delivery fee is required"),
  deliveryTime: yup.string().required("Time is required"),
  warranty: yup.string().required("Warranty is required"),
});
