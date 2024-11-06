import React from "react";
import styled from "styled-components";

function LandingPageFooter() {
  const today = new Date();
  return (
    <Container>
      <FooterBody>
        <LeftItems>
          <span>
            © FixMaster {today.getFullYear()} - All rights reserved | Built by
          </span>{" "}
          <label>Ninth Binary</label>
        </LeftItems>
        <RightItems>
          <p>Terms of Use Privacy Policy</p>
        </RightItems>
      </FooterBody>
    </Container>
  );
}

export default LandingPageFooter;

const Container = styled.div``;
const FooterBody = styled.div`
  display: flex;
  flex-direction: row;
  gap: 180px;
  align-items: center;
  padding-left: 60px;
  width: 100%;
  height: 106px;

  background: #1e2227;
  @media (max-width: 1200px) {
    display: flex;
    flex-direction: row;
    gap: 80px;
    align-items: center;
    padding-left: 20px;
    width: 100%;
    height: 106px;

    background: #1e2227;
  }

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    padding-left: 20px;
    width: 100%;
    height: 106px;

    background: #1e2227;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    padding-left: 10px;
    width: 100%;
    height: 106px;

    background: #1e2227;
  }
`;
const LeftItems = styled.div`
  display: flex;
  flex-direction: row;
  width: 700px;
  && span {
    width: 480px;
    height: 16px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 16px;
    /* identical to box height, or 80% */

    letter-spacing: 0.045em;

    color: #ffffff;
  }
  && label {
    width: 150px;
    height: 16px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 16px;
    /* identical to box height, or 80% */

    letter-spacing: 0.045em;

    color: var(--clr-primary);
  }

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: row;
    width: 500px;
    && span {
      width: 350px;
      height: 16px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 16px;
      /* identical to box height, or 80% */

      letter-spacing: 0.045em;

      color: #ffffff;
    }
    && label {
      width: 150px;
      height: 16px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      /* identical to box height, or 80% */

      letter-spacing: 0.045em;

      color: var(--clr-primary);
    }
  }

  @media (max-width: 768px) {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    width: 360px;
    align-items: center;
    && span {
      width: 250px;
      height: 16px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 500;
      font-size: 10px;
      line-height: 16px;
      /* identical to box height, or 80% */

      letter-spacing: 0.045em;

      color: #ffffff;
    }
    && label {
      width: 80px;
      height: 16px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 500;
      font-size: 10px;
      line-height: 16px;
      /* identical to box height, or 80% */

      letter-spacing: 0.045em;

      color: var(--clr-primary);
    }
  }
`;
const RightItems = styled.div`
  && p {
    width: 279px;
    height: 16px;
    margin-right: 60px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 16px;
    /* identical to box height, or 80% */

    letter-spacing: 0.045em;

    color: #a3aed0;
  }

  @media (max-width: 1024px) {
    && p {
      width: 220px;
      height: 16px;
      margin-right: 60px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 16px;
      /* identical to box height, or 80% */

      letter-spacing: 0.045em;

      color: #a3aed0;
    }
  }
`;
