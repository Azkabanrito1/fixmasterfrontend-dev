import {
  endOfYesterday,
  format,
  isAfter,
  isBefore,
  parse,
  parseISO,
} from "date-fns";
import * as yup from "yup";

const parseTime = (time) => parse(time, "HH:mm", new Date());

export const bookAFixSchema = (timeBounds) =>
  yup.object().shape({
    addNewAddress: yup.boolean(),
    saveAddress: yup.boolean(),
    bookingInfo: yup.object().shape({
      bookingType: yup.string().required("Please select a service type"),
      bookingClass: yup.string().required("Please select a booking type"),
      bookingCategory: yup
        .string()
        .required("Please select a booking category"),
      bookingDate: yup
        .date()
        .min(new Date(endOfYesterday()), "")
        .required("Booking date is required"),
      bookingTime: yup
        .string()
        .required("Booking time is required")
        .test(
          "invalidTime",
          "Fix must be scheduled later than present time",
          function (time) {
            let { bookingDate } = this.parent;

            if (bookingDate) {
              bookingDate = format(bookingDate, "yyyy-MM-dd");
              const bookingDateTime = new Date(`${bookingDate} ${time}`);
              const now = new Date();

              return isAfter(bookingDateTime, now);
            }
            return false;
          }
        )
        .test(
          "withinBounds",
          `Time must be between ${timeBounds?.min} and ${timeBounds?.max}`,
          function (time) {
            if (time) {
              const minTime = parseTime(timeBounds?.min);
              const maxTime = parseTime(timeBounds?.max);
              const selectedTime = parseTime(time);

              if (isBefore(maxTime, minTime)) {
                // Handling the case where the time range spans across midnight
                return (
                  isAfter(selectedTime, minTime) ||
                  isBefore(selectedTime, maxTime)
                );
              }
              return (
                isAfter(selectedTime, minTime) &&
                isBefore(selectedTime, maxTime)
              );
            }
            return false;
          }
        ),
    }),
    addressId: yup.string().when("addNewAddress", {
      is: (addNewAddress) => addNewAddress === false,
      then: yup
        .string()
        .required("Select address for fix or add a new address"),
      otherwise: yup.string().notRequired(),
    }),
    addressTitle: yup.string().when("addNewAddress", {
      is: (addNewAddress) => addNewAddress === true,
      then: yup.string().required("Enter a title for the new address"),
      otherwise: yup.string().notRequired(),
    }),
    state: yup.string().when("addNewAddress", {
      is: (addNewAddress) => addNewAddress === true,
      then: yup
        .string()
        .required(
          "Please enter your address. This field will be automatically populated"
        ),
      otherwise: yup.string().notRequired(),
    }),
    lga: yup.string().when("addNewAddress", {
      is: (addNewAddress) => addNewAddress === true,
      then: yup
        .string()
        .required(
          "Please enter your address. This field will be automatically populated"
        ),
      otherwise: yup.string().notRequired(),
    }),
    city: yup.string().when("addNewAddress", {
      is: (addNewAddress) => addNewAddress === true,
      then: yup
        .string()
        .required(
          "Please enter your address. This field will be automatically populated"
        ),
      otherwise: yup.string().notRequired(),
    }),
    cityId: yup.string().when("addNewAddress", {
      is: (addNewAddress) => addNewAddress === true,
      then: yup
        .string()
        .required(
          "Please enter your address. This field will be automatically populated"
        ),
      otherwise: yup.string().notRequired(),
    }),
    address: yup.string().when("addNewAddress", {
      is: (addNewAddress) => addNewAddress === true,
      then: yup.string().required("Enter address"),
      otherwise: yup.string().notRequired(),
    }),
    contactName: yup.string().when("addNewAddress", {
      is: (addNewAddress) => addNewAddress === true,
      then: yup.string().required("Enter contact name"),
      otherwise: yup.string().notRequired(),
    }),
    contactPhoneNo: yup.string().when("addNewAddress", {
      is: (addNewAddress) => addNewAddress === true,
      then: yup.string().required("Enter contact phone number"),
      otherwise: yup.string().notRequired(),
    }),
    contactEmail: yup.string().when("addNewAddress", {
      is: (addNewAddress) => addNewAddress === true,
      then: yup
        .string()
        .email("Enter a valid email")
        .required("Enter contact email"),
      otherwise: yup.string().notRequired(),
    }),

    contactPreference: yup.lazy((value) => {
      return yup.object().shape({
        contactPreferenceId: yup
          .string()
          .required("Please choose a contact preference"),
        contactFrom: yup
          .string()
          .required("Enter a time")
          .test(
            "invalidTime",
            "From time must be earlier than To time",
            function (time) {
              const { contactTo } = value;

              if (contactTo) {
                const dateIso = format(new Date(), "yyyy-MM-dd");

                const fromDate = new Date(`${dateIso} ${time}`);
                const toDate = new Date(`${dateIso} ${contactTo}`);

                return isBefore(fromDate, toDate);
              }

              return true;
            }
          ),
        contactTo: yup
          .string()
          .required("Enter a time")
          .test(
            "invalidTime",
            "To time must be later than From time",
            (time) => {
              const { contactFrom } = value;
              if (contactFrom) {
                const dateIso = format(new Date(), "yyyy-MM-dd");

                const fromDate = new Date(`${dateIso} ${contactFrom}`);
                const toDate = new Date(`${dateIso} ${time}`);

                return isBefore(fromDate, toDate);
              }
            }
          ),
        notificationPreferenceId: yup
          .string()
          .required("Please choose a notification preference"),
      });
    }),
  });
