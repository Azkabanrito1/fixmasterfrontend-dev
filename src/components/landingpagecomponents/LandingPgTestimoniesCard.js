import React from "react";
import styled from "styled-components";
import TestimonyCard from "./TestimonyCard";

function LandingPgTestimoniesCard() {
  return (
    <Container>
      <TestimoniesCard>
        <div className="header">
          <h3>TESTIMONIALS</h3>
          <p className="head">What our customers are saying about us</p>
          <p className="text">
            See what FixMaster clients have to say about a variety of services
            that we provided for their projects.
          </p>
        </div>
        <TestimonyCardContainer>
          <TestimonyCard />
          <TestimonyCard />
          <TestimonyCard />
        </TestimonyCardContainer>
      </TestimoniesCard>
    </Container>
  );
}

export default LandingPgTestimoniesCard;

const Container = styled.div`
  background-image: url("/images/section-bg4.webp");
  background-position: right center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 2rem;
  padding: 8rem 4vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 767px) {
    padding: 8rem 4vw 0;
    background-image: none;
  }
`;

const TestimoniesCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  gap: 4rem;

  @media screen and (max-width: 767px) {
    color: black;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 380px;
    width: 100%;
    gap: 1rem;
    text-align: center;

    h3 {
      font-size: 1.1rem;
      font-weight: 400;
    }
    .head {
      font-size: 1.6rem;
      letter-spacing: 0.02rem;

      @media screen and (max-width: 767px) {
        font-size: 1.1rem;
      }
    }
    .text {
      letter-spacing: 0.02rem;
      line-height: 1.5rem;
      font-size: 1rem;
    }
  }
`;
const TestimonyCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  @media screen and (max-width: 1023px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 5rem;
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;
