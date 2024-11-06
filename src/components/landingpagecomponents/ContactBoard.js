import React from "react";
import styled from "styled-components";
import * as BsIcons from "react-icons/bs";
import * as HiIcons from "react-icons/hi";
import FeedBackForm from "./FeedBackForm";

function ContactBoard() {
  const styleIcon = {
    color: "var(--clr-primary)",
    width: "25px",
    height: "25px",
  };
  return (
    <Container>
      <Body>
        <div className="leftBody">
          <div className="header">
            <h3>How to contact us</h3>
            <p>
              If you’ve got questions or ideas you would like to share, send a
              message. For anything more specific, please use one of the
              addresses listed below.
            </p>
          </div>

          <div className="infos">
            <div className="info">
              <span className="icon">
                <BsIcons.BsPinMap style={styleIcon} />
              </span>
              <div className="textInfo">
                <h3>Our Location</h3>
                <p>284 Ajose Adeogun Street, Victoria Island, Lagos, Nigeria</p>
              </div>
            </div>
            <div className="info">
              <span className="icon">
                <HiIcons.HiOutlineMail style={styleIcon} />
              </span>
              <div className="textInfo">
                <h3>Our Email</h3>
                <p>info@FixMaster.com.ng</p>
              </div>
            </div>
          </div>
        </div>
        <FeedBackForm />
      </Body>
    </Container>
  );
}

export default ContactBoard;

const Container = styled.div`
  padding: 0 4vw;
  margin: 0;
`;
const Body = styled.div`
  display: flex;
  gap: 2rem;

  @media screen and (max-width: 1023px) {
    gap: 1.5rem;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .leftBody {
    width: 50%;
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;

    @media screen and (max-width: 767px) {
      width: 100%;
      justify-content: center;
      align-items: center;
      max-width: 480px;
      gap: 2rem;
    }

    .header {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      @media screen and (max-width: 767px) {
        text-align: center;
      }

      h3 {
        font-weight: 400;
      }
    }

    .infos {
      margin-left: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;

      @media screen and (max-width: 1023px) {
        margin-left: 0;
      }

      @media screen and (max-width: 767px) {
        gap: 1.5rem;
      }
    }
    .info {
      display: flex;
      gap: 0.7rem;
      align-items: center;

      h3 {
        font-size: 1.1rem;
        margin-bottom: 0;
      }
    }
  }
`;
