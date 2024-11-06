import React from "react";
import styled from "styled-components";
import GlobalBtn from "../globalcomponents/GlobalBtn";

function GetAQuoteCard(props) {
  return (
    <Container>
      <GetAQuoteCardBody>
        <label>
          We're here to help you get started in the right direction with your
          fix
        </label>
        <GlobalBtn>{props.RoundButtonTextSm}</GlobalBtn>
      </GetAQuoteCardBody>
    </Container>
  );
}

export default GetAQuoteCard;

const Container = styled.div``;
const GetAQuoteCardBody = styled.div`
  display: flex;
  flex-direction: row;
  gap: 150px;
  padding-left: 60px;
  align-items: center;
  width: 1179px;
  height: 143px;

  background: var(--clr-primary);
  border-radius: 7px;

  && label {
    width: 600px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 300;
    font-size: 25px;
    line-height: 25px;
    /* or 50% */

    color: #ffffff;
  }

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: row;
    gap: 80px;
    padding-left: 60px;
    align-items: center;
    width: 950px;
    height: 143px;

    background: var(--clr-primary);
    border-radius: 7px;

    && label {
      width: 600px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 300;
      font-size: 25px;
      line-height: 25px;
      /* or 50% */

      color: #ffffff;
    }
  }

  @media (max-width: 968px) {
    display: flex;
    flex-direction: row;
    gap: 50px;
    padding-left: 20px;
    align-items: center;
    width: 764px;
    height: 143px;

    background: var(--clr-primary);
    border-radius: 7px;

    && label {
      width: 500px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 300;
      font-size: 20px;
      line-height: 25px;
      /* or 50% */

      color: #ffffff;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: none;
    align-items: center;
    width: 358px;
    height: 143px;

    background: var(--clr-primary);
    border-radius: 7px;

    && label {
      width: 300px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      line-height: 25px;
      /* or 50% */

      color: #ffffff;
    }
  }
`;
