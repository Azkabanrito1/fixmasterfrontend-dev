import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import GlobalBtn from "../../../../globalcomponents/GlobalBtn";
import GlobalInput from "../../../../globalcomponents/GlobalInput";
import { useSetDiagnosisVisit } from "../../../../../hooks/useQueries/useJobs";
import { Grid, SectionHeading } from "../../../../globalcomponents/Utilities";
import { format, parse } from "date-fns";

const DiagnosticVisitDate = ({ diagnosisTime }) => {
  const [visitDetails, setVisitDetails] = useState({
    date: "",
    time: "",
  });
  const { fixId } = useParams();

  const { enqueueSnackbar } = useSnackbar();
  //-------------------mutations---------------
  const onSuccess = (response) => {
    if (response.data.toLowerCase().includes("already set")) {
      enqueueSnackbar(response.data, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(response.message, {
        variant: "success",
      });
    }
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: applyDiagnosisTime, isLoading: isSubmitting } =
    useSetDiagnosisVisit(onSuccess, onFailure);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitDetails((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    if (diagnosisTime) {
      const [date, time] = diagnosisTime.split("T");
      setVisitDetails({ date, time });
    }
  }, [diagnosisTime]);

  const handleBtnClick = async () => {
    const payload = {
      fixId: Number(fixId),
      visitDate: visitDetails.date,
      visitTime: visitDetails.time,
    };
    applyDiagnosisTime(payload);
  };

  return (
    <section>
      <SectionHeading>Diagnostics Visit Date</SectionHeading>

      <Grid columns="3">
        <GlobalInput
          inputType="date"
          inputName="date"
          inputValue={visitDetails.date}
          handleChange={(e) => handleChange(e)}
          min={format(new Date(), "yyyy-MM-dd")}
          disabled={diagnosisTime}
        />

        <GlobalInput
          inputType="time"
          inputName="time"
          inputValue={visitDetails.time}
          handleChange={(e) => handleChange(e)}
          disabled={diagnosisTime}
        />

        <GlobalBtn
          height="auto"
          width="max-content"
          fs="1rem"
          px="2rem"
          onClick={handleBtnClick}
          disabled={
            (!visitDetails.time && !visitDetails.date) ||
            isSubmitting ||
            diagnosisTime
          }
        >
          Send Notification
        </GlobalBtn>
      </Grid>
    </section>
  );
};

export default DiagnosticVisitDate;
