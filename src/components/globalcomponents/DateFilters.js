import { PropTypes } from "prop-types";
import { Stack } from "@mui/material";
import { BsArrowLeftRight } from "react-icons/bs";
import GlobalInput from "./GlobalInput";

const DateFilters = ({ dateQueries, setDateQueries }) => {
  return (
    <Stack direction={"row"} marginBottom={3}>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <GlobalInput
          inputValue={dateQueries.from.date}
          labelText="From"
          inputType="date"
          inputName="from"
          handleChange={(e) =>
            setDateQueries({ type: "setFrom", date: e.target.value })
          }
          error={dateQueries.from.error}
          errorMessage={dateQueries.from.errorMsg}
          max={dateQueries.to.date}
        />
        <BsArrowLeftRight color="#C4C4C4" fontSize={"1.5rem"} />
        <GlobalInput
          inputValue={dateQueries.to.date}
          labelText="To"
          inputType="date"
          inputName="to"
          handleChange={(e) =>
            setDateQueries({ type: "setTo", date: e.target.value })
          }
          error={dateQueries.to.error}
          errorMessage={dateQueries.to.errorMsg}
          min={dateQueries.from.date}
        />
      </Stack>
    </Stack>
  );
};

export default DateFilters;

DateFilters.propTypes = {
  setDateQueries: PropTypes.func,
  dateQueries: PropTypes.shape({
    from: PropTypes.shape({
      date: PropTypes.string,
      error: PropTypes.bool,
      errorMsg: PropTypes.string,
    }),
    to: PropTypes.shape({
      date: PropTypes.string,
      error: PropTypes.bool,
      errorMsg: PropTypes.string,
    }),
  }),
};
