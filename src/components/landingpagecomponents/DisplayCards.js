import React from "react";
import styled from "styled-components";

function DisplayCards(props) {
  return (
    <Container>
      <Vision>
        <p>{props.DisplayCardText}</p>
      </Vision>
    </Container>
  );
}

export default DisplayCards;

const Container = styled.div`
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 680px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Vision = styled.div`
  margin-top: 23px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-left: 35px;

  width: 397px;
  height: 81px;

  border: 1px solid #8b7c7c;
  border-radius: 10px;

  && p {
    width: 100px;
    height: 24px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    text-align: center;

    color: #000000;
  }

  @media (max-width: 1024px) {
    margin-top: 23px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 600px;
    height: 81px;

    border: 1px solid #8b7c7c;
    border-radius: 10px;

    && p {
      width: 300px;
      height: 24px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: 35px;
      line-height: 20px;
      text-align: center;

      color: #000000;
    }
  }

  @media (max-width: 680px) {
    margin-top: 23px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding-left: 25px;
    margin-left: auto;
    margin-right: auto;

    width: 260px;
    height: 81px;

    border: 1px solid #8b7c7c;
    border-radius: 10px;

    && p {
      width: 100px;
      height: 24px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 20px;
      text-align: center;

      color: #000000;
    }
  }
`;
