import React from "react";
import styled from "styled-components";
import { ProgressBar } from "react-bootstrap";

const FixBook = () => {
  return (
    <FixContainer>
      <Fixs>
        <FixTarget>
          <h4 className="text-muted">Fix Target</h4>
          <div>
            <h6 className="text-muted mt-4" style={{ paddingLeft: "40px" }}>
              Today
            </h6>
            <img src="./images/account-image.jpeg" alt="account" />
            <p className="text-danger mb-3" style={{ paddingLeft: "40px" }}>
              3
            </p>
          </div>
          <div>
            <h6 className="text-muted mt-3" style={{ paddingLeft: "40px" }}>
              This Month
            </h6>
            <img src="./images/account-image.jpeg" alt="account" />
            <p className="text-danger mb-2" style={{ paddingLeft: "40px" }}>
              3
            </p>
          </div>
        </FixTarget>
        <FixBonus>
          <h4 className="text-muted">Fix Target</h4>
          <div>
            <h6 className="text-muted mt-4" style={{ paddingLeft: "40px" }}>
              Today
            </h6>
            <img src="./images/account-circular.jpeg" alt="account" />
            <p className="text-danger mb-3" style={{ paddingLeft: "40px" }}>
              3
            </p>
          </div>
          <div>
            <h6 className="text-muted mt-3" style={{ paddingLeft: "40px" }}>
              This Month
            </h6>
            <img src="./images/account-circular.jpeg" alt="account" />
            <p className="text-danger mb-2" style={{ paddingLeft: "40px" }}>
              3
            </p>
          </div>
        </FixBonus>
      </Fixs>
      <div className="p-4 gap-3">
        <h4 className="text-muted ">Fix Target Status</h4>

        <div className="d-flex gap-2">
          <img
            src="./images/hourglass.png"
            alt=""
            style={{ width: "45px", marginTop: "15px" }}
          />
          <div>
            <div
              className="d-flex justify-content-between mt-2"
              style={{ flexDirection: "row", width: "300px" }}
            >
              <h5 className="text-muted mt-3">Today</h5>
              <p className="text-muted mt-3">6/7</p>
            </div>
            <ProgressBar style={{ backgroundColor: "var(--clr-primary)" }} />
          </div>
        </div>
        <div className="d-flex gap-2">
          <img
            src="./images/hourglass.png"
            alt=""
            style={{ width: "45px", marginTop: "15px" }}
          />
          <div>
            <div
              className="d-flex justify-content-between mt-2"
              style={{ flexDirection: "row", width: "300px" }}
            >
              <h5 className="text-muted mt-3">Month</h5>
              <p className="text-muted mt-3">6/7</p>
            </div>
            <ProgressBar style={{ backgroundColor: "var(--clr-primary)" }} />
          </div>
        </div>
      </div>
    </FixContainer>
  );
};

export default FixBook;

export const FixContainer = styled.div`
width: 380px;
height: 500px;
border-radius: 10px;
background-color: #fff;
display-grid;
 
`;
export const Fixs = styled.div`
  width: 380px;
  height: 250px;
  border-bottom: 2px dotted var(--clr-primary);
  display: grid;
  grid-template-columns: 50% 50%;
`;

export const FixTarget = styled.div`
  border-right: 2px dotted var(--clr-primary);
  padding-left: 12px;
  h4,
  h6 {
    font-size: 16px;
  }
`;

export const FixBonus = styled.div`
  padding-left: 12px;
  h4,
  h6 {
    font-size: 16px;
  }
`;
