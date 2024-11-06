import { useStopwatch } from "react-timer-hook";
import GlobalBtn from "../../../../../../globalcomponents/GlobalBtn";
import CompletionDetails from "./CompletionDetails";
import { useEffect, useState } from "react";
import {
  useGetCompletionLog,
  useLogCompletionEnd,
  useLogCompletionObservation,
  useLogCompletionStart,
} from "../../../../../../../hooks/useQueries/useJobs";
import { useSnackbar } from "notistack";
import { SectionHeading } from "../../../../../../globalcomponents/Utilities";
import { generateTimerOffset } from "../../../../../../../utils/utilityFxns";
import { differenceInSeconds, subHours } from "date-fns";
import ConfirmDeleteModal from "../../../../../../globalcomponents/modals/ConfirmDeleteModal";

const DiagnosticTiming = ({ workTime, fixId }) => {
  // const [stoppedTime, setStoppedTime] = useState(false);
  // const [timeElapsed, setTimeElapsed] = useState({
  //   seconds: "",
  //   minutes: "",
  //   hours: "",
  //   days: "",
  // });
  const [showConfirmStop, setShowConfirmStop] = useState(false);

  const closeConfirmStop = () => {
    setShowConfirmStop(false);
  };

  const { days, hours, minutes, seconds, start, reset, isRunning } =
    useStopwatch({ autoStart: false });

  // const stop = () => {
  //   setTimeElapsed({
  //     seconds: seconds,
  //     minutes: minutes,
  //     hours: hours,
  //     days: days,
  //   });
  //   setStoppedTime(true);
  //   reset();
  // };

  const { enqueueSnackbar } = useSnackbar();

  //-------------------mutations---------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: logCompletion, isLoading: isSubmitting } =
    useLogCompletionObservation(onSuccess, onFailure);

  const { mutate: completionStart } = useLogCompletionStart(
    onSuccess,
    onFailure
  );

  const { mutate: completionEnd } = useLogCompletionEnd(
    onSuccess,
    onFailure,
    fixId
  );

  const startTime = () => {
    completionStart({
      fixId,
      startTime: new Date().toISOString(),
    });
    start();
  };

  const stop = () => {
    setShowConfirmStop(true);
  };

  const endCompletionAction = () => {
    completionEnd({
      fixId,
      endTime: new Date().toISOString(),
    });
    closeConfirmStop();
  };

  const { data: completionLogData, isLoading } = useGetCompletionLog(fixId);

  const completionLogStartTime = completionLogData?.data?.startTime;
  const completionLogEndTime = completionLogData?.data?.endTIme;
  const completionStatus = completionLogData?.data?.status;

  const combineDateWithTime = (time) => {
    const now = new Date();
    const [hours, minutes, seconds] = time.split(":");
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      seconds
    );
  };

  // -----------------------side effects------------------------
  useEffect(() => {
    if (
      !!completionLogStartTime &&
      completionStatus?.toLowerCase() === "started"
    ) {
      const combinedStartTime = combineDateWithTime(completionLogStartTime);
      const diffSecs = differenceInSeconds(new Date(), combinedStartTime);
      const offset = generateTimerOffset(diffSecs);
      reset(offset, true);
    }
  }, [completionLogStartTime, completionStatus]);

  useEffect(() => {
    if (completionStatus?.toLowerCase() === "stopped") {
      const combinedEndTime = combineDateWithTime(completionLogEndTime);
      const combinedStartTime = combineDateWithTime(completionLogStartTime);
      const diffSecs = differenceInSeconds(combinedEndTime, combinedStartTime);
      const offset = generateTimerOffset(diffSecs);
      reset(offset, false);
    }
  }, [completionStatus, completionLogEndTime, completionLogStartTime]);

  return (
    <section>
      <SectionHeading>Completion Timing</SectionHeading>
      <div className="d-flex align-items-center justify-content-between bg-white p-4 rounded">
        <div>
          <p>Total amount of time spent on completion</p>
          {!isLoading && (
            <div
              className="time-spent fw-bold"
              style={{ color: "var(--clr-primary)", fontSize: "2.2rem" }}
            >
              {days && (
                <>
                  <span>{String(days).padStart(2, "0")}</span>
                  <span>:</span>
                </>
              )}
              <span>{String(hours).padStart(1, "0")}</span>
              <span>:</span>
              <span>{String(minutes).padStart(2, "0")}</span>
              <span>:</span>
              <span>{String(seconds).padStart(2, "0")}</span>
            </div>
          )}
        </div>

        {!completionLogEndTime && completionStatus !== "stopped" ? (
          <div>
            {isRunning ? (
              <GlobalBtn width="max-content" px="4rem" onClick={stop}>
                Finish Completion
              </GlobalBtn>
            ) : (
              <GlobalBtn width="max-content" px="4rem" onClick={startTime}>
                Start Time
              </GlobalBtn>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <CompletionDetails
        fixId={fixId}
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        logCompletion={logCompletion}
        isSubmitting={isSubmitting}
      />

      {showConfirmStop && (
        <ConfirmDeleteModal
          open={showConfirmStop}
          close={closeConfirmStop}
          labelText={"Stop Time"}
          pText={"Are you sure you want to stop the timer?"}
          actionText={"Stop"}
          onDelete={() => endCompletionAction()}
        />
      )}
    </section>
  );
};

export default DiagnosticTiming;
