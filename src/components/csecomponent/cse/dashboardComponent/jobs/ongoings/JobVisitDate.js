import { useState } from "react";
import GlobalBtn from "../../../../../globalcomponents/GlobalBtn";
import GlobalInput from "../../../../../globalcomponents/GlobalInput";
import {
  Grid,
  SectionHeading,
} from "../../../../../globalcomponents/Utilities";
import { format } from "date-fns";

const DiagnosticVisitDate = ({ fixId, isSubmitting, applyJobVisitDate }) => {
  const [visitDetails, setVisitDetails] = useState({
    date: "",
    time: "",
    requireParts: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVisitDetails((prevState) => {
      if (type === "checkbox") {
        return {
          ...prevState,
          [name]: checked,
        };
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  const handleBtnClick = async () => {
    const payload = {
      fixId: Number(fixId),
      visitDate: visitDetails.date,
      visitTime: visitDetails.time,
      // isPartRequested: visitDetails.requireParts,
    };
    applyJobVisitDate(payload);
  };

  return (
    <section>
      <SectionHeading>Completion Visit Date</SectionHeading>

      <Grid columns="4">
        <GlobalInput
          inputType="date"
          inputName="date"
          inputValue={visitDetails.date}
          handleChange={(e) => handleChange(e)}
          min={format(new Date(), "yyyy-MM-dd")}
        />

        <GlobalInput
          inputType="time"
          inputName="time"
          inputValue={visitDetails.time}
          handleChange={(e) => handleChange(e)}
        />

        <GlobalBtn
          height="auto"
          width="max-content"
          fs="1rem"
          px="2rem"
          onClick={handleBtnClick}
          disabled={(!visitDetails.time && !visitDetails.date) || isSubmitting}
        >
          Send Notification
        </GlobalBtn>
      </Grid>
    </section>
  );
};

export default DiagnosticVisitDate;
