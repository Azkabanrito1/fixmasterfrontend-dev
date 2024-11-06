import { useEffect, useState } from "react";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import GlobalTextArea from "../../../globalcomponents/GlobalTextArea";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { FormGroup } from "../../../globalcomponents/Utilities";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import GlobalCheckbox from "../../../globalcomponents/GlobalCheckbox";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import { getToday } from "../../../../utils/dateRanges";
import { useSnackbar } from "notistack";

const WarrantyClaim = ({ isOpen, closeModal, fixId }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [agree, setAgree] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const minDate = getToday();

  useEffect(() => {
    if (date === minDate) {
      const today = new Date();
      const nextTime = `${String(today.getHours() + 1).padStart(
        2,
        "0"
      )}:${String(today.getMinutes()).padStart(2, "0")}`;

      setTime(nextTime);
    }
  }, [date, time, minDate]);

  const makeClaim = async () => {
    const payload = {
      fixId,
      claimDescription: description,
      claimTime: time,
      claimDate: date,
    };

    // const response = await dispatch(makeWarrantyClaim(payload));

    // if (response.status === "success") {
    //   enqueueSnackbar(response.message, { variant: "success" });
    // } else {
    //   enqueueSnackbar(response.message, { variant: "error" });
    // }
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal} width="600px">
      <AltModalHeader
        heading={"Make A Warranty Claim"}
        closeModal={closeModal}
      />

      <p className="text-muted">
        *Please give a description of the issue you now have and why you believe
        it is related to the work we did previously
      </p>

      <GlobalTextArea
        inputName="description"
        border="1px solid var(--clr-primary)"
        inputValue={description}
        handleChange={(e) => setDescription(e.target.value)}
        required
      />

      <p style={{ fontSize: ".9rem" }}>
        While FixMaster will aim to resolve your warranty claim with a sense of
        urgency, we are unable to confirm a definite resolution date. We will
        contact you to discuss a review inspection day and time. You may however
        indicate a convenient date / time range for the visit.
      </p>

      <FormGroup columns={2} className="mb-3">
        <GlobalInput
          inputType={"date"}
          inputName="date"
          inputValue={date}
          handleChange={(e) => setDate(e.target.value)}
          min={minDate}
          required
        />
        <GlobalInput
          inputType={"time"}
          inputName="time"
          inputValue={time}
          handleChange={(e) => setTime(e.target.value)}
          required
        />
      </FormGroup>

      <GlobalCheckbox
        inputName="agree"
        inputValue={agree}
        fs={"16px"}
        labelText="I agree that the fix will be treated as a new fix if the issue is different from the initial fix."
        handleChange={() => setAgree((prev) => !prev)}
      />

      <GlobalBtn
        width="auto"
        px="2.5rem"
        my="1.2rem"
        mx="auto"
        disabled={description === "" || date === "" || time === "" || !agree}
        onClick={makeClaim}
      >
        Submit
      </GlobalBtn>
    </GlobalModal>
  );
};

export default WarrantyClaim;
