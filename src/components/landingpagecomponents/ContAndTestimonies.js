import React from "react";
import styled from "styled-components";
import ScheduleFix from "./ScheduleFix";
import LandingPgTestimoniesCard from "./LandingPgTestimoniesCard";
import ContactBoard from "./ContactBoard";
import { Link } from "react-router-dom";

function ContAndTestimonies(props) {
  return (
    <Container>
      <ScheduleFix
        RoundButtonTextBig={props.RoundButtonTextBig}
        RoundButtonTextSm={props.RoundButtonTextSm}
      />
      <div className="quote">
        <p>
          We're here to help you get started in the right direction with your
          fix
        </p>
        <Link to="">Get a Quote</Link>
      </div>
      <LandingPgTestimoniesCard />
    </Container>
  );
}

export default ContAndTestimonies;

const Container = styled.div`
  position: relative;

  .quote {
    background: var(--clr-primary);
    width: 80%;
    height: 90px;
    display: flex;
    gap: 2rem;
    position: absolute;
    left: 10%;
    margin-top: -2.3%;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    color: #fff;
    padding: 0 4vw;

    @media screen and (max-width: 1023px) {
      margin-top: -3%;
      width: 100%;
      left: 0;
      border-radius: 0;
    }

    @media screen and (max-width: 767px) {
      gap: 1rem;
    }

    p {
      font-size: 1.2rem;

      @media screen and (max-width: 767px) {
        font-size: 1rem;
      }
    }

    a {
      text-decoration: none;
      border-radius: 50px;
      outline: none;
      border: none;
      background: black;
      color: #fff;
      padding: 10px 20px;
      text-align: center;

      @media screen and (max-width: 767px) {
        font-size: 1rem;
      }
    }
  }
`;
