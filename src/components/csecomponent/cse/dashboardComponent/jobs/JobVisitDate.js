import { useState } from "react";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import GlobalBtn from "../../../../globalcomponents/GlobalBtn";
import GlobalInput from "../../../../globalcomponents/GlobalInput";
import { useSetJobVisitDate } from "../../../../../hooks/useQueries/useJobs";
import { Grid } from "../../../../globalcomponents/Utilities";
import { format } from "date-fns";

const JobVisitDate = ({ fixId, closeModal }) => {
  const [visitDetails, setVisitDetails] = useState({
    date: "",
    time: "",
  });

  const { enqueueSnackbar } = useSnackbar();
  //-------------------mutations---------------
  const onSuccess = (response) => {
    if (response.data.toLowerCase().includes("Quotation Accepted")) {
      enqueueSnackbar(response.data, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(response.message, {
        variant: "success",
      });
      closeModal();
    }
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: setJobVisitDate, isLoading: isSubmitting } =
    useSetJobVisitDate(onSuccess, onFailure);
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
      fixId: +fixId,
      visitDate: visitDetails.date,
      visitTime: visitDetails.time,
    };
    setJobVisitDate(payload);
  };

  return (
    <section>
      <Grid columns="3">
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

export default JobVisitDate;
