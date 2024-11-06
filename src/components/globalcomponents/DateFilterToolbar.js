import JobFilters from "../franchiseecomponents/jobsmanagement/JobFilters";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const DateFilterToolbar = ({
  dateQueries,
  setDateQueries,
  selectedDate,
  setSelectedDate,
  firstDate,
  secondDate,
}) => {
  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <>
      {selectedDate && (
        <FormControl
          variant="outlined"
          sx={{
            margin: "0 0 0 0.5rem",
          }}
        >
          <InputLabel id="date-select-label">Filter Date by</InputLabel>
          <Select
            labelId="date-select-label"
            id="date-select"
            value={selectedDate}
            onChange={handleChange}
            label="Select Date"
            style={{
              height: "44px",
              margin: "0 1rem 1rem 0",
              fontSize: "0.95rem",
              borderRadius: "8px",
            }}
          >
            <MenuItem
              value={firstDate}
              style={{
                fontSize: "0.95rem",
              }}
            >
              {firstDate === "dateCreated"
                ? "Date Booked"
                : firstDate === "requestedDate"
                ? "Request Date"
                : firstDate === "responseDate"
                ? "Response Date"
                : "Start Date"}
            </MenuItem>
            <MenuItem
              value={secondDate}
              style={{
                fontSize: "0.95rem",
              }}
            >
              {secondDate === "scheduleDate" ? "Date Accepted" : "End Date"}
            </MenuItem>
          </Select>
        </FormControl>
      )}

      <JobFilters dateQueries={dateQueries} setDateQueries={setDateQueries} />
    </>
  );
};

export default DateFilterToolbar;
