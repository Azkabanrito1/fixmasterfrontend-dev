import React from "react";
import { PropTypes } from "prop-types";
import GlobalSelect from "../../../../globalcomponents/GlobalSelect";
import GlobalInput from "../../../../globalcomponents/GlobalInput";
import Filter from "../jobs/management/Filter";
import { getToday } from "../../../../../utils/dateRanges";

const WalletFilters = ({
  dateQueries,
  filterClass,
  options,
  presentFilter,
  setDateQueries,
  setFilterClass,
  setPresentFilter,
  title,
}) => {
  const today = getToday();
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-5">
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
        </div>
        <div className="d-flex align-items-center">
          <GlobalSelect
            options={options}
            defaultOption={` ${title}`}
            valueType="string"
            handleChange={(e) => setPresentFilter(e.target.value)}
            selectValue={presentFilter}
          />
          <Filter setFilter={setFilterClass} filter={filterClass} />
        </div>
      </div>
    </div>
  );
};

export default WalletFilters;

WalletFilters.propTypes = {
  filterClass: PropTypes.string,
  options: PropTypes.array,
  presentFilter: PropTypes.string,
  setFilterClass: PropTypes.func,
  setPresentFilter: PropTypes.func,
};
