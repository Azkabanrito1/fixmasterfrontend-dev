import React from "react";
import styled from "styled-components";

function MoreAboutUs(props) {
  return (
    <Container>
      <Body>
        <div className="leftBody">
          <h3 className="moreAbout">MORE ABOUT US</h3>

          <p className="head">
            We perform various types of property maintenance and repairs
          </p>
          <div className="bigCard">
            <p>{props.bigCardTextLeft}</p>
          </div>
          <p className="smallCard">{props.smallCardTextLeft} </p>
        </div>
        <div className="middleBody">
          <img src="/images/technician.webp" />
        </div>
        <div className="rightBody">
          <p className="head">
            We have the expertise to protect the value of your property with our
            services. We take pride in deliver ing quality services that exceed
            the expectations of our clients.
          </p>
          <p className="bigCard">{props.bigCardTextRight}</p>
          <p className="smallCard">{props.smallCardTextRight}</p>
        </div>
      </Body>
      <SmallBody>
        <div className="leftBody">
          <h3 className="moreAbout">MORE ABOUT US</h3>

          <div className="head">
            <p className="head1">
              We perform various types of property maintenance and repairs
            </p>
            <p className="head2">
              We have the expertise to protect the value of your property with
              our services. We take pride in deliver ing quality services that
              exceed the expectations of our clients.
            </p>
          </div>
        </div>
        <div className="rightBody">
          <p className="smallCard">{props.smallCardTextLeft} </p>
          <p className="smallCard">{props.smallCardTextRight}</p>
          <div className="bigCard">
            <p>{props.bigCardTextLeft}</p>
          </div>
          <p className="bigCard">{props.bigCardTextRight}</p>
        </div>
      </SmallBody>
    </Container>
  );
}

export default MoreAboutUs;

const Container = styled.div`
  padding: 3rem 4vw 0;
`;
const Body = styled.div`
  display: flex;

  @media screen and (max-width: 1023px) {
    display: none;
  }

  .rightBody {
    width: 37.5%;

    .head {
      margin: 3.2rem 0 7.5rem;
      text-align: right;
    }

    .bigCard {
      width: 105%;
      height: 150px;
      background: #e5e4e2;
      border-radius: 10px;
      border: 1px solid #808080;
      display: flex;
      align-items: center;
      text-align: right;
      padding: 0 30px;
      margin-left: -5%;
    }
    .smallCard {
      width: 105%;
      height: 70px;
      background: #e5e4e2;
      border-radius: 7px;
      border: 1px solid #808080;
      display: flex;
      align-items: center;
      text-align: right;
      padding: 0 30px;
      margin: 2rem 0 0 -5%;
    }
  }

  .leftBody {
    width: 37.5%;

    h3 {
      font-size: 1rem;
      margin-bottom: 2rem;
      font-weight: 400;
      color: #808080;
    }

    .head {
      font-size: 1.2rem;
      letter-spacing: 0.1rem;
      margin-bottom: 8.5rem;
    }

    .bigCard {
      width: 103%;
      height: 150px;
      background: #e5e4e2;
      border-radius: 10px;
      border: 1px solid #808080;
      display: flex;
      align-items: center;
      text-align: left;
      padding: 0 30px;
    }

    .smallCard {
      width: 103%;
      height: 70px;
      background: #e5e4e2;
      border-radius: 7px;
      border: 1px solid #808080;
      display: flex;
      align-items: center;
      text-align: left;
      padding: 0 30px;
      margin-top: 2rem;
    }
  }

  .middleBody {
    width: 25%;
    height: 600px;
    z-index: 1000;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
const SmallBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;

  h3 {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    font-weight: 400;
    color: #808080;
    text-align: center;
  }
  .head {
    max-width: 680px;
    text-align: center;
  }

  .rightBody {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 4rem;

    .bigCard {
      width: 48.3%;
      height: 150px;
      background: #e5e4e2;
      border-radius: 10px;
      border: 1px solid #808080;
      display: flex;
      align-items: center;
      text-align: left;
      padding: 0 30px;

      @media screen and (max-width: 767px) {
        width: 100%;
      }
    }

    .smallCard {
      width: 48.3%;
      height: 70px;
      background: #e5e4e2;
      border-radius: 7px;
      border: 1px solid #808080;
      display: flex;
      align-items: center;
      text-align: left;
      padding: 0 30px;

      @media screen and (max-width: 767px) {
        width: 100%;
      }
    }
  }

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;
