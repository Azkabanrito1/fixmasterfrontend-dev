import { useState } from "react";
import { PropTypes } from "prop-types";

const useNotificationSearch = (data) => {
  const [presentFilter, setPresentFilter] = useState("");
  const [notificationSearch, setNotificationSearch] = useState("");
  const [filterDescription, setFilterDescription] = useState("description");

  const message = [
    { id: 1, name: "Description" },
    { id: 2, name: "Date" },
    { id: 3, name: "Time" },
  ];

  const request = [
    { id: 1, name: "Description" },
    { id: 2, name: "Date" },
    { id: 3, name: "Time" },
  ];

  const supply = [
    { id: 1, name: "Description" },
    { id: 2, name: "Date" },
    { id: 3, name: "Time" },
  ];

  const chooseOptions = () => {
    switch (filterDescription) {
      case "description":
        return message;

      case "date":
        return request;

      case "time":
        return supply;

      default:
        return message;
    }
  };

  let filteredResults = data;

  if (presentFilter?.toLowerCase() !== "") {
    if (filterDescription === "description") {
      filteredResults = filteredResults?.filter(
        (job) => job.type === presentFilter
      );
    } else if (filterDescription === "date") {
      filteredResults = filteredResults?.filter(
        (job) => job.category === presentFilter
      );
    } else if (filterDescription === "time") {
      filteredResults = filteredResults?.filter(
        (job) => job.class === presentFilter
      );
    }
  }

  if (notificationSearch.toLowerCase() !== "") {
    if (filterDescription === "description") {
      filteredResults = filteredResults?.filter(
        (job) => job.type === presentFilter
      );
    } else if (filterDescription === Number("date")) {
      filteredResults = filteredResults?.filter(
        (job) => job.category === presentFilter
      );
    } else if (filterDescription === Number("time")) {
      filteredResults = filteredResults?.filter(
        (job) => job.class === presentFilter
      );
    }
  }

  const options = chooseOptions();

  return {
    filteredResults,
    filterDescription,
    options,
    presentFilter,
    setPresentFilter,
    setFilterDescription,
    notificationSearch,
    setNotificationSearch,
  };
};

export default useNotificationSearch;

useNotificationSearch.propTypes = {
  data: PropTypes.array,
};
