import { useState } from "react";
import { PropTypes } from "prop-types";

const useActivitiesSearch = (data) => {
  const [presentFilter, setPresentFilter] = useState("");
  const [filterClass, setFilterClass] = useState("type");

  const byType = [
    { id: 1, name: "Emergency Jobs" },
    { id: 2, name: "Out of Hours Jobs" },
    { id: 3, name: "Standard Jobs" },
  ];

  const byClass = [
    { id: 1, name: "Maintenance" },
    { id: 2, name: "Repair" },
    { id: 3, name: "Diagnostics" },
  ];

  const byCategory = [
    { id: 1, name: "Electrical" },
    { id: 2, name: "Automobile" },
    { id: 3, name: "Plumbing" },
  ];

  const chooseOptions = () => {
    switch (filterClass) {
      case "type":
        return byType;

      case "class":
        return byClass;

      case "category":
        return byCategory;

      default:
        return byType;
    }
  };

  let filteredResults = data;

  if (presentFilter?.toLowerCase() !== "") {
    if (filterClass === "type") {
      filteredResults = filteredResults?.filter(
        (job) => job.type === presentFilter
      );
    } else if (filterClass === "category") {
      filteredResults = filteredResults?.filter(
        (job) => job.category === presentFilter
      );
    } else if (filterClass === "class") {
      filteredResults = filteredResults?.filter(
        (job) => job.class === presentFilter
      );
    }
  }

  const options = chooseOptions();

  return {
    filteredResults,
    filterClass,
    options,
    presentFilter,
    setPresentFilter,
    setFilterClass,
  };
};

export default useActivitiesSearch;

useJobSearch.propTypes = {
  data: PropTypes.array,
};
