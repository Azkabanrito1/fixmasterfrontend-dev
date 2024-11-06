import React from "react";
import styled from "styled-components";

const CallPerMonth = () => {
  return (
    <EarningSummary>
      <div>
        <h4 className="fs-6" style={{ color: "#F26C2A" }}>
          Average Number of Calls/Month
        </h4>
        <span className="value"></span>
      </div>
      <div>
        <h4 className="fs-6" style={{ color: "#F26C2A" }}>
          Higest number of calls in a month
        </h4>
        <span className="value"></span>
      </div>
      <div>
        <h4 className="fs-6" style={{ color: "#F26C2A" }}>
          Lowest number of calls in a month
        </h4>
        <span className="value"></span>
      </div>
      <div>
        <h4 className="fs-6" style={{ color: "#F26C2A" }}>
          Total minutes Spent on all calls
        </h4>
        <span className="value"></span>
      </div>
      <div>
        <h4 className="fs-6" style={{ color: "#F26C2A" }}>
          Average minutes spent on all calls
        </h4>
        <span className="value"></span>
      </div>
    </EarningSummary>
  );
};

export default CallPerMonth;
const EarningSummary = styled.div`
  border-radius: 1rem;
  background-color: #fff;

  div {
    padding: 1rem;

    &:not(:last-child) {
      border-bottom: 1px dashed var(--clr-primary);
    }
  }

  h4 {
    margin-bottom: 0.8rem;
  }

  .value {
    font-weight: bold;
    color: var(--clr-primary);
    font-size: 1.2rem;
  }
`;
