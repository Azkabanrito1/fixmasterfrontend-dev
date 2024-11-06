import React from "react";
import styled from "styled-components";
import * as BsIcons from "react-icons/bs";
import * as HiIcons from "react-icons/hi";
import FeedBackForm from "./FeedBackForm";

function ContactBoard() {
  const styleIcon = { color: "var(--clr-primary)", marginTop: "10px" };
  return (
    <Container>
      <ContactBoardBody>
        <ContactBoardBodyLeft>
          <label>How to contact us</label>
          <p>
            If you’ve got questions or ideas you would like to share, send a
            message. For anything more specific, please use one of the addresses
            listed below.
          </p>
          <Map>
            <BsIcons.BsPinMap style={styleIcon} />
            <span>
              Our Location 284 Ajose Adeogun Street, Victoria Island, Lagos,
              Nigeria
            </span>
          </Map>
          <Email>
            <HiIcons.HiOutlineMail style={styleIcon} />
            <span>Our Email info@FixMaster.com.ng</span>
          </Email>
        </ContactBoardBodyLeft>
        <ContactBoardBodyRight>
          <FeedBackForm />
        </ContactBoardBodyRight>
      </ContactBoardBody>
    </Container>
  );
}

export default ContactBoard;

const Container = styled.div``;
const ContactBoardBody = styled.div`
  width: 100%;
  height: 850px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;

  @media (max-width: 1200px) {
    width: 100%;
    height: 850px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 0px;
  }

  @media (max-width: 1024px) {
    width: 100%;
    height: 850px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 0px;
  }

  @media (max-width: 968px) {
    width: 100%;
    height: 850px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 0px;
    padding-left: 0px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 1200px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0px;
    padding-top: 20px;
  }
`;
const ContactBoardBodyLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: 30px;
  margin-top: 80px;

  && label {
    width: 400px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 200;
    font-size: 30px;
    line-height: 16px;
    /* or 44% */

    letter-spacing: 0.045em;

    color: #000000;
  }

  && p {
    width: 400px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 10;
    font-size: 14px;
    line-height: 16px;
    /* or 44% */

    letter-spacing: 0.045em;

    color: #000000;
  }

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    width: 40%;
    gap: 30px;
    margin-top: 160px;

    && label {
      width: 300px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 200;
      font-size: 30px;
      line-height: 16px;
      /* or 44% */

      letter-spacing: 0.045em;

      color: #000000;
    }

    && p {
      width: 400px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 10;
      font-size: 12px;
      line-height: 16px;
      /* or 44% */

      letter-spacing: 0.045em;

      color: #000000;
    }
  }

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    width: 40%;
    gap: 30px;
    margin-top: 160px;

    && label {
      width: 300px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 200;
      font-size: 30px;
      line-height: 16px;
      /* or 44% */

      letter-spacing: 0.045em;

      color: #000000;
    }

    && p {
      width: 400px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 10;
      font-size: 12px;
      line-height: 16px;
      /* or 44% */

      letter-spacing: 0.045em;

      color: #000000;
    }
  }

  @media (max-width: 968px) {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 160px;
    width: 40%;

    && label {
      width: 200px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 200;
      font-size: 22px;
      line-height: 16px;
      /* or 44% */

      letter-spacing: 0.045em;

      color: #000000;
    }

    && p {
      width: 200px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 10;
      font-size: 12px;
      line-height: 16px;
      /* or 44% */

      letter-spacing: 0.045em;

      color: #000000;
    }
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 0px;
    align-items: center;
    width: 100%;

    && label {
      width: 200px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 200;
      font-size: 22px;
      line-height: 16px;
      /* or 44% */

      letter-spacing: 0.045em;

      color: #000000;
    }

    && p {
      width: 300px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 10;
      font-size: 12px;
      line-height: 16px;
      /* or 44% */

      letter-spacing: 0.045em;

      color: #000000;
    }
  }
`;
const ContactBoardBodyRight = styled.div`
  width: 40%;

  @media (max-width: 1024px) {
    width: 40%;
  }

  @media (max-width: 968px) {
    width: 40%;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    align-items: center;
    width: 100%;
  }
`;
const Map = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;

  && span {
    width: 544px;
    height: 49px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    /* or 80% */

    letter-spacing: 0.045em;

    color: #000000;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
  }

  @media (max-width: 1200px) {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    gap: 10px;

    && span {
      width: 400px;
      height: 49px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      /* or 80% */

      letter-spacing: 0.045em;

      color: #000000;

      /* Inside auto layout */

      flex: none;
      order: 1;
      flex-grow: 0;
    }
  }

  @media (max-width: 968px) {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    gap: 5px;

    && span {
      width: 200px;
      height: 49px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      /* or 80% */

      letter-spacing: 0.045em;

      color: #000000;

      /* Inside auto layout */

      flex: none;
      order: 1;
      flex-grow: 0;
    }
  }
`;
const Email = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  && span {
    width: 222px;
    height: 49px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    /* or 80% */

    letter-spacing: 0.045em;

    color: #000000;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
  }
  @media (max-width: 968px) {
    display: flex;
    flex-direction: row;
    gap: 5px;

    && span {
      width: 200px;
      height: 49px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      /* or 80% */

      letter-spacing: 0.045em;

      color: #000000;

      /* Inside auto layout */

      flex: none;
      order: 1;
      flex-grow: 0;
    }
  }
`;
