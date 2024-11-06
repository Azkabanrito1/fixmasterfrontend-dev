import { useState } from "react";
import { useStopwatch } from "react-timer-hook";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import { Fields, FormGroup, SectionHeading} from "../../../globalcomponents/Utilities";
import GlobalTextArea from "../../../globalcomponents/GlobalTextArea";
import GlobalInput from "../../../globalcomponents/GlobalInput";

const DiagnosticTiming = () => {
  const [stoppedTime, setStoppedTime] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState({
    seconds: "",
    minutes: "",
    hours: "",
    days: "",
  });
  const { days, hours, minutes, seconds, start, pause, reset, isRunning } =
    useStopwatch({});

  const stop = () => {
    setTimeElapsed({
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      days: days,
    });
    setStoppedTime(true);
    reset();
  };
  return (
    <>
      <section className="mb-5">
        <SectionHeading>Diagnosis Timing</SectionHeading>
        <div className="d-flex align-items-center justify-content-between bg-white p-4 rounded">
          <div>
            <p>Total amount of time spent on diagnosis</p>
            <div
              className="time-spent fw-bold"
              style={{ color: "var(--clr-primary)", fontSize: "2.2rem" }}
            >
              {days && (
                <>
                  <span>
                    {stoppedTime
                      ? String(timeElapsed.days).padStart(2, "0")
                      : String(days).padStart(2, "0")}
                  </span>
                  <span>:</span>
                </>
              )}
              <span>{stoppedTime ? timeElapsed.hours : hours}</span>
              <span>:</span>
              <span>
                {stoppedTime
                  ? String(timeElapsed.minutes).padStart(2, "0")
                  : String(minutes).padStart(2, "0")}
              </span>
              <span>:</span>
              <span>
                {stoppedTime
                  ? String(timeElapsed.seconds).padStart(2, "0")
                  : String(seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
          {!stoppedTime ? (
            <div>
              {isRunning ? (
                <GlobalBtn width="max-content" px="4rem" onClick={stop}>
                  Stop Time
                </GlobalBtn>
              ) : (
                <GlobalBtn width="max-content" px="4rem" onClick={start}>
                  Start Time
                </GlobalBtn>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </section>
      <section className="mb-5">
        <SectionHeading>Extended Diagnostic Time</SectionHeading>
        <Fields>
          <FormGroup columns="1" className="mb-3">
            <GlobalInput labelText="Please specify time reqiured to complete diagnosis" />
            <div>
              <p>Do you want to extend time for fix diagnosis?</p>
              <div>
                <label>
                  <input type="radio" name="extendTime" />
                  Yes
                </label>
              </div>
              <div>
                <label>
                  <input type="radio" name="extendTime" />
                  No
                </label>
              </div>
            </div>
            <GlobalTextArea
              inputName="reasons"
              labelText={
                "If yes, please specify your reasons diagnosis time extension"
              }
            />
          </FormGroup>
          <GlobalBtn mx="auto">Submit</GlobalBtn>
        </Fields>
      </section>
    </>
  );
};

export default DiagnosticTiming;
