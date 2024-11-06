import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isEqual from "date-fns/isEqual";

const useDateFilter = (dateValues, filterParam, filterData) => {
  let filteredResults = filterData;

  if (dateValues.to.date) {
    const dateTo = new Date(dateValues.to.date);
    filteredResults = filteredResults?.filter(
      (result) =>
        isBefore(new Date(result[filterParam]), dateTo) ||
        isEqual(new Date(result[filterParam]), dateTo)
    );
  }

  if (dateValues.from.date) {
    const dateFrom = new Date(dateValues.from.date);
    filteredResults = filteredResults?.filter(
      (result) =>
        isAfter(new Date(result[filterParam]), dateFrom) ||
        isEqual(new Date(result[filterParam]), dateFrom)
    );
  }

  return filteredResults;
};

export default useDateFilter;
