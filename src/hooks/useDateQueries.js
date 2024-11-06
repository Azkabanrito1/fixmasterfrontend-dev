import { isEqual, isBefore, format } from "date-fns";
import { useReducer } from "react";

const initState = {
  from: {
    date: "",
    error: false,
    errorMsg: "",
  },
  to: {
    date: "",
    error: false,
    errorMsg: "",
  },
};

const dateQueryReducer = (state, action) => {
  switch (action.type) {
    case "setFrom":
      state.from.error = false;
      state.to.error = false;
      const fromDate = new Date(action.date);
      const toDate = state.to.date ? new Date(state.to.date) : new Date();

      if (isEqual(fromDate, toDate) || isBefore(fromDate, toDate)) {
        return { ...state, from: { ...state.from, date: action.date } };
      } else if (!!action.date) {
        return {
          ...state,
          from: {
            date: action.date,
            error: true,
            errorMsg: `Must be earlier than ${
              toDate ? state.to.date : format(new Date(), "dd-MM-yyyy")
            }`,
          },
        };
      } else if (!action.date) {
        return {
          ...state,
          from: {
            date: "",
            error: false,
            errorMsg: "",
          },
        };
      }
      break;
    case "setTo":
      state.from.error = false;
      state.to.error = false;
      if (action.date === "") {
        return {
          ...state,
          to: { date: action.date, error: false, errorMsg: "" },
        };
      } else {
        if (state.from.date) {
          const fromDate = new Date(state.from.date);
          const toDate = new Date(action.date);

          if (isEqual(fromDate, toDate) || isBefore(fromDate, toDate)) {
            return { ...state, to: { ...state.to, date: action.date } };
          } else
            return {
              ...state,
              to: {
                date: action.date,
                error: true,
                errorMsg: `Must be later than ${state.from.date}`,
              },
            };
        } else return { ...state, to: { ...state.to, date: action.date } };
      }
    default:
      return state;
  }
};

const useDateQueries = () => {
  const [dateQueries, setDateQueries] = useReducer(dateQueryReducer, initState);
  return { dateQueries, setDateQueries };
};

export default useDateQueries;
