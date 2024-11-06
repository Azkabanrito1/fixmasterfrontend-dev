import React from "react";

const DiagonisticVisit = ({ diagnosticTime }) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between bg-white p-4 rounded mb-4">
        <div className="d-flex flex-column">
          <p>Total amount of time spent on diagnosis</p>
          <span style={{ color: "var(--clr-primary)", fontSize: "2.2rem" }}>
            {diagnosticTime?.durationInWarranty}
          </span>
        </div>
        <div>
          <p style={{ color: "var(--clr-primary)" }}>Fix Stage</p>
          <span>{diagnosticTime?.fixStage}</span>
        </div>
      </div>
    </>
  );
};

export default DiagonisticVisit;
