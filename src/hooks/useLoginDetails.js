import isAfter from "date-fns/isAfter";

const useLoginDetails = () => {
  const loginDetails = JSON.parse(localStorage.getItem("loginDetails")) || {};
  const {
    dateLoggedIn = "",
    role = "",
    onboarding = {},
    token = "",
    username = "",
    expiration = "",
  } = loginDetails;
  const now = new Date();

  let isExpired = true;

  if (token) {
    isExpired = isAfter(now, new Date(expiration));
    if (isExpired) {
      localStorage.removeItem("loginDetails");
    }
  }

  return {
    role,
    onboarding,
    token,
    username,
    isExpired,
    dateLoggedIn,
  };
};

export default useLoginDetails;
