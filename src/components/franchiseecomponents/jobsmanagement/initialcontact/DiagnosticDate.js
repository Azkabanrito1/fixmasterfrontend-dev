import { useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Grid,
  SectionHeading,
} from "../../../../pages/franchisee/jobs/MyJobDetails";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import { createDiagnosisVisitDate } from "../../../../redux/jobs/actions";

const DiagnosticDate = () => {
  const [visitDetails, setVisitDetails] = useState({
    date: "",
    time: "",
  });
  const { fixId } = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleBtnClick = async () => {
    const payload = {
      fixId: Number(fixId),
      diagnosisVisitDate: visitDetails.date,
      diagnosisVisitTime: visitDetails.time,
    };

    const response = await dispatch(createDiagnosisVisitDate(payload));

    if (response.status.toLowerCase() === "success") {
      enqueueSnackbar("Notification sent successfully", { variant: "success" });
      setVisitDetails({ date: "", time: "" });
    } else {
      enqueueSnackbar(`An error occurred: ${response.message}`, {
        variant: "error",
      });
    }
  };

  return (
    <section>
      <SectionHeading>Diagnostics Visit Date</SectionHeading>

      <Grid columns="4">
        <GlobalInput
          inputType="date"
          inputName="date"
          inputValue={visitDetails.date}
          handleChange={(e) => handleChange(e)}
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
        >
          Send Notification
        </GlobalBtn>
      </Grid>
    </section>
  );
};

export default DiagnosticDate;
