import * as yup from "yup";

export const techTrainingSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  type: yup.string().required("Training type is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup
    .date()
    .required("Training date is required")
    .min(yup.ref("startDate"), "Training can only be today or later"),
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
  attendanceMode: yup.string().required("Attendance mode is required"),
  venue: yup.string().required("Venue/Link is required"),
  reminderDate: yup.string().required("Reminder date is required"),
  reminderMsg: yup.string(),
  training: yup.string().required("Training is required"),
  techInvite: yup
    .array()
    .of(yup.string())
    .min(1, "Please select a technician")
    .required("Please select a technician"),
  trainingMaterial: yup
    .array()
    .of(yup.string())
    .min(1, "Please select a training material")
    .required("Please select a training material"),
});
