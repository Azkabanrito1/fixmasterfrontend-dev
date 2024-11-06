import React from "react";
import styled from "styled-components";

function OurServices() {
  return (
    <Container>
      <BodyText>
        <h3>Our Services</h3>
        <h1>
          We offer trusted solutions for all Repair, Installation, and
          Maintenance (<span>RIM</span>) needs and services.
        </h1>
        <p>
          Our technicians are fully insured professionals. We arrive on time
          with the tools to complete the job right.
        </p>
      </BodyText>
    </Container>
  );
}

export default OurServices;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem 4vw 0;
`;
const BodyText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  max-width: 650px;

  h1 {
    font-size: 2rem;
    font-weight: 400;

    @media screen and (max-width: 767px) {
      font-size: 1.3rem;
    }

    span {
      color: #f26222;
    }
  }
  h3 {
    text-transform: uppercase;
    font-size: 1.3rem;
  }
  p {
    font-size: 1.1rem;
  }
`;
