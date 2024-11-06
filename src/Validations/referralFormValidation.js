import * as yup from "yup";
import { earningTypes } from "../utils/utilityFxns";

export const createReferralSchema = yup.object().shape({
  // earningValue: yup.string().required("field is required"),
  // roleId: yup.string().oneOf(["1", "2"], "Select a collaborator  type "),
});
