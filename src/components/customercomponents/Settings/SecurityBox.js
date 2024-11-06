import React from "react";
import styled from "styled-components";
import * as MdIcons from "react-icons/md";

const styleArrowRight = {
  width: "35px",
  height: "27px",
  top: "34px",
  cursor: "pointer",
};

function SecurityBox({ displayPassSec }) {
  return (
    <Container>
      <MainBody>
        <ClientImg img src="/images/userSettingsSec.svg" alt="Sec" />
        <ArrowRow>
          <label
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              displace: "inline-block",
            }}
          >
            Password & Security
          </label>
          <ArRyt>
            <MdIcons.MdOutlineKeyboardArrowRight
              onClick={displayPassSec}
              style={styleArrowRight}
            />
          </ArRyt>
        </ArrowRow>
        <p>Change your account security information</p>
      </MainBody>
    </Container>
  );
}

export default SecurityBox;

const Container = styled.div``;
const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  && p {
    width: 249px;
    height: 48px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    color: #595858;
    margin-top: 16px;
  }
`;
const ClientImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50px;

  @media (min-width: 1441px) {
    width: 70px;
    height: 70px;
    border-radius: 50px;
  }
`;
const ArrowRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 5px;
  width: 280px;
  height: 44px;
  margin-top: 16px;

  && label {
    width: 240px;
    height: 44px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 50px;
    display: flex;
    align-items: center;
    color: #f37238;
  }
`;
const ArRyt = styled.div`
  margin-top: 7px;
`;
