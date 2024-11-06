import GlobalSelect from "../../globalcomponents/GlobalSelect";
import GlobalInput from "../../globalcomponents/GlobalInput";
import { getToday } from "../../../utils/dateRanges";
import NotifyFilter from "../cse/dashboardComponent/jobs/ongoings/notification/NotifyFilter";

const FilterNotification = ({
  dateQueries,
  filterAll,
  options,
  presentFilter,
  setDateQueries,
  setFilterAll,
  setPresentFilter,
  title,
}) => {
  const today = getToday();
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex align-items-center">
          <GlobalSelect
            options={options}
            defaultOption={`${title}`}
            valueType="string"
            handleChange={(e) => setPresentFilter(e.target.value)}
            selectValue={presentFilter}
          />
        </div>
        <div className="d-flex align-items-center">
          <GlobalSelect
            options={options}
            defaultOption={`${title}`}
            valueType="string"
            handleChange={(e) => setPresentFilter(e.target.value)}
            selectValue={presentFilter}
          />
        </div>
        <div className="d-flex align-items-center">
          <GlobalInput
            inputType="date"
            labelText="From"
            inputValue={dateQueries.from.date}
            handleChange={(e) =>
              setDateQueries({ type: "setFrom", date: e.target.value })
            }
            error={dateQueries.from.error}
            errorMessage={dateQueries.from.errorMsg}
            max={today}
          />
          <img src="/images/arrows-exchange-alt.png" alt="" />
          <GlobalInput
            inputType="date"
            labelText="To"
            inputValue={dateQueries.to.date}
            handleChange={(e) =>
              setDateQueries({ type: "setTo", date: e.target.value })
            }
            error={dateQueries.to.error}
            errorMessage={dateQueries.to.errorMsg}
            min={dateQueries.from.date}
          />
          <NotifyFilter setFilter={setFilterAll} filter={filterAll} />
        </div>
      </div>
    </div>
  );
};

export default FilterNotification;
