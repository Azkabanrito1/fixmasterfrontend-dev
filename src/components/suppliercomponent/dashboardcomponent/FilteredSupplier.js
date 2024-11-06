import React, { useEffect, useState } from "react";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import GlobalInput from "../../globalcomponents/GlobalInput";
import {
  useGetCategories,
  useGetLanguage,
} from "../../../hooks/useQueries/useOnboarding";
import { getToday } from "../../../utils/dateRanges";

const FilteredSupplier = ({
  values,
  handleChange,
  dateQueries,
  setDateQueries,
}) => {
  const status = [
    {
      id: 1,
      name: "New",
    },
    {
      id: 2,
      name: "Active",
    },
    {
      id: 3,
      name: "Closed",
    },
  ];
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex gap-5">
          <GlobalSelect
            options={status}
            selectName="status"
            // selectValue={values.status}
            defaultOption="New Status"
            handleChange={handleChange}
            valueType="string"
            width="100%"
          />
        </div>
        <div className="d-flex align-items-center">
          <GlobalInput
            inputType="date"
            labelText="From"
            // inputValue={dateQueries?.from?.date}
            // handleChange={(e) =>
            //   setDateQueries({ type: "setFrom", date: e.target.value })
            // }
            // error={dateQueries?.from.error}
            // errorMessage={dateQueries?.from.errorMsg}
            // max={today}
          />
          <img src="/images/arrows-exchange-alt.png" alt="" />
          <GlobalInput
            inputType="date"
            labelText="To"
            // inputValue={dateQueries?.to?.date}
            // handleChange={(e) =>
            //   setDateQueries({ type: "setTo", date: e.target.value })
            // }
            // error={dateQueries?.to.error}
            // errorMessage={dateQueries?.to.errorMsg}
            // min={dateQueries?.from.date}
          />
        </div>
      </div>
    </div>
  );
};

export default FilteredSupplier;
