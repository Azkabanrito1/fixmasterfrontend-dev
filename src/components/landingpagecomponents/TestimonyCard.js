import React from "react";
import styled from "styled-components";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io";

function TestimonyCard() {
  const styleStar = { color: "#ff6600" };

  const styleQuote = {
    color: "#ff6600",
    width: "64px",
    height: "48px",
    borderRadius: "2px",
  };
  return (
    <Container>
      <Body>
        <div className="image">
          <img src="/images/tijani.png" />
        </div>
        <h3>Tijani Williams</h3>
        <div className="stars">
          <BsIcons.BsStarFill style={styleStar} />
          <BsIcons.BsStarFill style={styleStar} />
          <BsIcons.BsStarFill style={styleStar} />
          <BsIcons.BsStarFill style={styleStar} />
          <BsIcons.BsStarFill style={styleStar} />
        </div>
        <p>
          My employers used Fix Master for the company’s outdoor advertising
          project based on my recommendation and they more than delivered.
        </p>
        <IoIcons.IoMdQuote style={styleQuote} />
      </Body>
    </Container>
  );
}

export default TestimonyCard;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 0.5px solid #c1bdbd;
  padding: 0 20px 20px;
  height: 100%;
  color: #fff;
  border-radius: 7px;
  text-align: center;
  gap: 1rem;

  @media screen and (max-width: 767px) {
    color: black;
    background: #fff;
  }

  .image {
    width: 100px;
    height: 100px;
    margin-top: -3rem;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
