import React from "react";
import { PropTypes } from "prop-types";
import GlobalSelect from "../../../../../../globalcomponents/GlobalSelect";
import GlobalInput from "../../../../../../globalcomponents/GlobalInput";
import NotifyFilter from "./NotifyFilter";
import { getToday } from "../../../../../../../utils/dateRanges";
import styled from "styled-components";

const JobsFilter = ({
  dateQueries,
  filterClass,
  options,
  presentFilter,
  setDateQueries,
  setFilterClass,
  setPresentFilter,
  notificationSearch,
  setNotificationSearch,
  title,
}) => {
  console.log(notificationSearch);
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
        <div>
          <SearchBar>
            <input
              type="text"
              placeholder="Search..."
              value={notificationSearch}
              onChange={(e) => setNotificationSearch(e.target.value)}
            />
            <img src="/images/searchIcon.svg" alt="searchIcon" />
          </SearchBar>
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
          <NotifyFilter setFilter={setFilterClass} filter={filterClass} />
        </div>
      </div>
    </div>
  );
};

export default JobsFilter;

JobsFilter.propTypes = {
  filterClass: PropTypes.string,
  options: PropTypes.array,
  presentFilter: PropTypes.string,
  setFilterClass: PropTypes.func,
  setPresentFilter: PropTypes.func,
};

const SearchBar = styled.div`
  width: 100%;
  position: relative;

  input {
    width: 100%;
    height: 48px;
    padding-left: 5px;
    border-radius: 5px;
    border: 2px solid #a1a1a1;
    background-color: #ffffff;
  }

  img {
    position: absolute;
    left: 150px;
    top: 0;
    margin: auto;
    padding-top: 15px;
  }
`;
