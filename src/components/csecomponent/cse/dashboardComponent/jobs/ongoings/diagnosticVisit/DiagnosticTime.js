import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import GlobalBtn from "../../../../../../globalcomponents/GlobalBtn";
import { SectionHeading } from "../../../../../../globalcomponents/Utilities";
import { useGetDiagnosisLog } from "../../../../../../../hooks/useQueries/useJobs";
import { differenceInSeconds, subHours } from "date-fns";
import { generateTimerOffset } from "../../../../../../../utils/utilityFxns";
import ConfirmSupplies from "../../modal/ConfirmSupplies";

const DiagnosticTiming = ({
  fixId,
  startDiagnosis,
  endDiagnosis,
  showConfirmSupplies,
  setShowConfirmSupplies,
}) => {
  const { days, hours, minutes, seconds, start, isRunning, reset } =
    useStopwatch({ autoStart: false });

  const startTime = () => {
    startDiagnosis({
      fixId,
      startTime: new Date().toISOString(),
    });
    start();
  };

  const stop = () => {
    setShowConfirmSupplies(true);
  };

  // -----------------------data fetching --------------------
  const { data: diagnosticLogData, isLoading } = useGetDiagnosisLog(fixId);
  const diagnosisLogEndTime = diagnosticLogData?.data?.endTIme;
  const diagnosisLogStartTime = diagnosticLogData?.data?.startTime;
  const diagnosisStatus = diagnosticLogData?.data?.status;

  // -----------------------side effects------------------------
  useEffect(() => {
    if (
      !!diagnosisLogStartTime &&
      diagnosisStatus?.toLowerCase() === "started"
    ) {
      const diffSecs = differenceInSeconds(
        subHours(new Date(), 1),
        new Date(diagnosisLogStartTime.replace(" ", "T"))
      );
      const offset = generateTimerOffset(diffSecs);
      reset(offset, true);
    }
  }, [diagnosisLogStartTime, diagnosisStatus]);

  useEffect(() => {
    if (diagnosisStatus?.toLowerCase() === "stopped") {
      const diffSecs = differenceInSeconds(
        new Date(diagnosisLogEndTime?.replace(" ", "T")),
        new Date(diagnosisLogStartTime?.replace(" ", "T"))
      );
      const offset = generateTimerOffset(diffSecs);
      reset(offset, false);
    }
  }, [diagnosisStatus, diagnosisLogEndTime, diagnosisLogStartTime]);

  return (
    <>
      <section className="mb-5">
        <SectionHeading>Diagnosis Timing</SectionHeading>
        <div className="d-flex align-items-center justify-content-between bg-white p-4 rounded">
          <div>
            <p>Total amount of time spent on diagnosis</p>
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

          {!diagnosisLogEndTime && diagnosisStatus !== "stopped" ? (
            <div>
              {isRunning ? (
                <GlobalBtn width="max-content" px="4rem" onClick={stop}>
                  Finish Diagnosis
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
      </section>

      {showConfirmSupplies && (
        <ConfirmSupplies
          isOpen={showConfirmSupplies}
          closeModal={() => {
            setShowConfirmSupplies(false);
          }}
          respond={endDiagnosis}
        />
      )}
    </>
  );
};

export default DiagnosticTiming;
