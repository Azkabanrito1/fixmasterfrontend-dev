import React from "react";
import styled from "styled-components";
import LandingPageCards from "./LandingPageCards";
import GlobalAltBtn from "../globalcomponents/GlobalAltBtn";
import GlobalBtn from "../globalcomponents/GlobalBtn";

function FirstBodyBackground(props) {
  return (
    <Container>
      <TextBody>
        <p className="repair">
          Repairs, Installation & Maintenance Services (RIM)
        </p>
        <h1>Experienced and Certified Professionals.</h1>
        <p>Our technicians are well trained and trusted</p>
      </TextBody>
      <RoundButtons>
        <div className="filled">
          <button className="one">{props.RoundButtonTextBig}</button>
          <button className="two">{props.RoundButtonTextMd}</button>
        </div>
        <button className="transparent">{props.RoundButtonTextMdTrans}</button>
      </RoundButtons>
    </Container>
  );
}

export default FirstBodyBackground;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  background-attachment: fixed;
  background: rgba(88, 30, 4, 0.44);
  min-width: 100%;
  height: 100vh;
  overflow: auto;
  display: flex;
  background: rgba(88, 30, 4, 0.44);
  background-image: url("/images/landingpgbg.webp");
  background-position: right center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 140px;

  @media screen and (max-width: 767px) {
    height: 80vh;
  }

  @media screen and (max-width: 445px) {
    gap: 2rem;
  }
`;
const TextBody = styled.div`
  color: #fff;
  margin: 25vh 8vw 0;
  display: flex;
  flex-direction: column;
  max-width: 780px;

  @media screen and (max-width: 1023px) {
    margin: 25vh 4vw 0;
  }

  @media screen and (max-width: 767px) {
    margin: 10vh 4vw 0;
  }

  .repair {
    color: #c1bdbd;
  }
  p {
    font-size: 1.2rem;

    @media screen and (max-width: 1023px) {
      font-size: 1.1rem;
    }

    @media screen and (max-width: 767px) {
      font-size: 1rem;
    }

    @media screen and (max-width: 445px) {
      font-size: 0.9rem;
    }
    @media screen and (max-width: 415px) {
      font-size: 0.8rem;
    }
  }
  h1 {
    font-size: 4rem;

    @media screen and (max-width: 1023px) {
      font-size: 3.5rem;
    }

    @media screen and (max-width: 767px) {
      font-size: 2.6rem;
    }

    @media screen and (max-width: 387px) {
      font-size: 2.2rem;
    }
  }
`;
const RoundButtons = styled.div`
  margin-left: 8vw;
  display: flex;
  gap: 2rem;

  @media screen and (max-width: 1023px) {
    margin-left: 4vw;
  }

  @media screen and (max-width: 530px) {
    margin: 0 4vw;
  }

  .filled {
    display: flex;
    gap: 1rem;

    @media screen and (max-width: 385px) {
      flex-direction: column;
    }

    button {
      background: #f26222;
      color: #fff;

      @media screen and (max-width: 445px) {
        font-size: 0.9rem;
      }
      @media screen and (max-width: 415px) {
        font-size: 0.8rem;
      }
    }
  }

  .transparent {
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    padding: 10px 70px;

    @media screen and (max-width: 1023px) {
      display: none;
    }
  }
  .one {
    padding: 10px 30px;
  }
  .two {
    padding: 10px 70px;

    @media screen and (max-width: 530px) {
      padding: 10px 30px;
    }
  }

  button {
    padding: 10px;
    text-transform: uppercase;
    border-radius: 50px;
    outline: none;
    border: none;
  }
`;
