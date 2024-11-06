import * as yup from "yup";
import { endOfYesterday } from "date-fns";

export const cseTrainingSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  type: yup.string().required("Training type is required"),
  date: yup
    .date()
    .min(new Date(endOfYesterday()), "Training can only be today or later")
    .required("Training date is required"),
  time: yup
    .string()
    .required("Training time is required")
    .test(
      "invalidTime",
      "Training must be scheduled later than present time",
      function (time) {
        const { date } = this.parent;

        const todayDate = new Date();
        const trainingDate = new Date(
          `${date.toISOString().slice(0, 10)}T${time}`
        );

        return todayDate <= trainingDate;
      }
    ),
  attendanceMode: yup.string().required("Attendance mode is required"),
  venue: yup.string().required("Venue/Link is required"),
  reminderDate: yup.string().required("Reminder date is required"),
  reminderMsg: yup.string(),
});
