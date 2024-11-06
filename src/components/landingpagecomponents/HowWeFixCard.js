import React from "react";
import styled from "styled-components";

function HowWeFixCard() {
  return (
    <Container>
      <CardBody>
        <div className="leftBody">
          <img src="/images/how-we-fix-seaction-img.webp" />
        </div>
        <div className="rightBody">
          <h1>How We Fix</h1>
          <div className="howBody">
            <h3>Book a Service</h3>
            <p>
              Answer a few questions and fill a form to tell us about your
              specific request requirements.
            </p>
            <h3>Get a Dedicated Project Manager</h3>
            <p>
              We assign a dedicated client service executive to you who ensures
              your job is completed promptly and professionally.
            </p>
            <h3>We Fix, You Relax</h3>
            <p>
              We deploy the best professionals to do the job and provide you
              with a standard 1-week warranty, which can be extended to 1 month
              if requested
            </p>
          </div>
        </div>
      </CardBody>
    </Container>
  );
}

export default HowWeFixCard;

const Container = styled.div`
  width: 100%;
`;
const CardBody = styled.div`
  display: flex;
  width: 100%;

  .leftBody {
    width: 50%;
    height: 600px;

    @media screen and (max-width: 1023px) {
      display: none;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
  .rightBody {
    background: #030f27;
    width: 50%;
    height: 600px;
    color: #fff;
    padding: 4rem 4rem 4rem 6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 1023px) {
      width: 100%;
    }

    @media screen and (max-width: 767px) {
      padding: 4rem 4vw;
    }

    h1 {
      font-size: 1.7rem;

      @media screen and (max-width: 767px) {
        font-size: 1.5rem;
      }
    }
    h3 {
      font-size: 1.2rem;
      margin: 2.5rem 0 0.5rem;
    }
    p {
      line-height: 1.3rem;
    }
    .howBody {
      padding-left: 2rem;

      @media screen and (max-width: 1023px) {
        max-width: 680px;
      }

      @media screen and (max-width: 767px) {
        padding: 0 4vw;
      }
    }
  }
`;
