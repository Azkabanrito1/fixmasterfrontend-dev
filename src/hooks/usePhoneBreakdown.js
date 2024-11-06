import { parsePhoneNumber } from "libphonenumber-js";
import { useEffect, useState } from "react";

const usePhoneBreakdown = (phoneNumber) => {
  const [phoneNo, setPhoneNo] = useState("");
  const [phoneCountry, setPhoneCountry] = useState({
    abbr: "NG",
    code: "+234",
  });

  useEffect(() => {
    if (phoneNumber) {
      const correctNumber =
        phoneNumber[0] === "0"
          ? phoneNumber.replace(phoneNumber[0], phoneCountry.code)
          : phoneNumber;

      const profilePhone = parsePhoneNumber(correctNumber);
      const countryAbbr = profilePhone.country;
      const countryCode = profilePhone.countryCallingCode;
      const phoneNum = profilePhone
        .formatInternational()
        .replace(`+${countryCode}`, "");

      setPhoneNo(phoneNum);
      setPhoneCountry({ abbr: countryAbbr, code: "+" + countryCode });
    }
  }, [phoneNumber]);

  return {
    phoneCountry,
    phoneNo,
  };
};

export default usePhoneBreakdown;
