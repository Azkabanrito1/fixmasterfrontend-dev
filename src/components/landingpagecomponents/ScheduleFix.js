import React from "react";
import styled from "styled-components";
import GetAQuoteCard from "./GetAQuoteCard";
import GlobalBtn from "../globalcomponents/GlobalBtn";
import { Link } from "react-router-dom";

function ScheduleFix(props) {
  return (
    <Container>
      <Body>
        <h3>Ready to schedule your fix?</h3>
        <p>
          When you hire us for complex services, you know you are getting highly
          qualified professionals who have the expertise and experience to make
          sure your project is done properly and functions well
        </p>
        <Link to="">BOOK A FIX</Link>
      </Body>
    </Container>
  );
}

export default ScheduleFix;

const Container = styled.div`
  width: 100%;
  background-image: url("/images/section-bg3.webp");
  background-repeat: no-repeat;
  background-position: right center;
  background-size: cover;
  height: 400px;
  display: flex;
  align-items: top;
  justify-content: center;
  margin-top: -0.8%;
`;
const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: #fff;
  max-width: 680px;
  width: 100%;
  margin-top: 4rem;
  gap: 1rem;

  @media screen and (max-width: 767px) {
    padding: 0 4vw;
  }

  h3 {
    font-weight: 400;
  }

  a {
    padding: 10px;
    border-radius: 50px;
    outline: none;
    border: none;
    background: #f26222;
    color: #fff;
    text-decoration: none;
    padding: 10px 70px;
    margin-top: 1rem;
  }
`;
