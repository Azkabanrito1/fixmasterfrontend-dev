export const getMaxDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const maxYear = year - 18;
  const max = `${maxYear}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(today.getDate()).padStart(2, "0")}`;
  return max;
};

export const getToday = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
};
