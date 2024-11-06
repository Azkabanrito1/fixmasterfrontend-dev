import * as yup from "yup";

export const workingPrefSchema = yup.object().shape({
  startTime: yup
    .string()
    .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid start time format")
    .required("Start time is required"),
  endTime: yup
    .string()
    .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid end time format")
    .required("End time is required")
    .test(
      "is-greater",
      "End time must be greater than start time",
      function (endTime) {
        const { startTime } = this.parent;
        if (!startTime || !endTime) return true; // Allow empty fields to be handled by 'required'
        const startTimeParts = startTime.split(":");
        const endTimeParts = endTime.split(":");
        const startTimeMinutes =
          parseInt(startTimeParts[0]) * 60 + parseInt(startTimeParts[1]);
        const endTimeMinutes =
          parseInt(endTimeParts[0]) * 60 + parseInt(endTimeParts[1]);
        return endTimeMinutes > startTimeMinutes;
      }
    ),
});
