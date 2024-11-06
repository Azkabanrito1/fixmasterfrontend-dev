import { getToday } from "../../../utils/utilityFxns";
import GlobalInput from "../../globalcomponents/GlobalInput";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

const JobFilters = ({ dateQueries, setDateQueries }) => {
  return (
    <div className="d-inline-flex gap-1 align-items-center mb-md-0 mb-3">
      <GlobalInput
        inputType="date"
        // labelText="From"
        inputPlaceholder="From"
        inputValue={dateQueries.from.date}
        handleChange={(e) => {
          setDateQueries({ type: "setFrom", date: e.target.value });
        }}
        error={dateQueries.from.error}
        errorMessage={dateQueries.from.errorMsg}
        max={dateQueries.to.date || getToday()}
        height={"auto"}
        width="150px"
      />
      <HiOutlineSwitchHorizontal color="var(--clr-primary)" size={"1.2rem"} />
      <GlobalInput
        inputType="date"
        // labelText="To"
        inputPlaceholder="To"
        inputValue={dateQueries.to.date}
        handleChange={(e) =>
          setDateQueries({ type: "setTo", date: e.target.value })
        }
        error={dateQueries.to.error}
        errorMessage={dateQueries.to.errorMsg}
        min={dateQueries.from.date}
        height={"auto"}
        width="150px"
      />
    </div>
  );
};

export default JobFilters;
