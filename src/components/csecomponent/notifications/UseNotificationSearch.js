import { useState } from "react";
import { PropTypes } from "prop-types";

const UseNotificationSearch = (data) => {
  const [presentFilter, setPresentFilter] = useState("");
  const [filterAll, setFilterAll] = useState("type");

  const all = [
    { id: 1, name: "All Notification" },
    { id: 2, name: " All Unread Message" },
  ];

  const unRead = [
    { id: 1, name: "All Notification" },
    { id: 2, name: " All Unread Message" },
  ];

  const chooseOptions = () => {
    switch (filterAll) {
      case "type":
        return all;

      case "unread":
        return unRead;

      default:
        return all;
    }
  };

  let filteredResults = data;

  if (presentFilter?.toLowerCase() !== "") {
    if (filterAll === "type") {
      filteredResults = filteredResults?.filter(
        (notify) => notify.type === presentFilter
      );
    } else if (filterAll === "unread") {
      filteredResults = filteredResults?.filter(
        (notify) => notify.category === presentFilter
      );
    }
  }

  const options = chooseOptions();

  return {
    filteredResults,
    filterAll,
    options,
    presentFilter,
    setPresentFilter,
    setFilterAll,
  };
};

export default UseNotificationSearch;

UseNotificationSearch.propTypes = {
  data: PropTypes.array,
};
