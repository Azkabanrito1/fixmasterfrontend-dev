import React from "react";
import styled from "styled-components";

function BlackCardStats() {
  return (
    <Container>
      <BlackCard>
        <div className="item">
          <h3>723</h3>
          <p>Completed Projects</p>
        </div>
        <span className="vertLine"></span>
        <div className="item">
          <h3>300</h3>
          <p>Qualified Technicians</p>
        </div>
        <span className="vertLine"></span>
        <div className="item">
          <h3>700+</h3>
          <p>Customers</p>
        </div>
        <span className="vertLine"></span>
        <div className="item">
          <h3>20+</h3>
          <p>LGAs</p>
        </div>
      </BlackCard>
    </Container>
  );
}

export default BlackCardStats;

const Container = styled.div`
  background-image: url("/images/iconboxBg.webp");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  padding: 100px 4vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BlackCard = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 3rem;
  max-width: 680px;

  @media screen and (max-width: 767px) {
    gap: 1rem;
  }

  @media screen and (max-width: 425px) {
    gap: 0.5rem;
  }

  .vertLine {
    height: 7.5rem;
    width: 0.05rem;
    background: #c1bdbd;
  }

  .item {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    width: 20%;

    h3 {
      @media screen and (max-width: 425px) {
        font-size: 1.2rem;
      }
    }

    p {
      font-size: 1.1rem;
      text-align: center;

      @media screen and (max-width: 1023px) {
        font-size: 1rem;
      }

      @media screen and (max-width: 425px) {
        font-size: 0.9rem;
      }
    }
  }
`;
