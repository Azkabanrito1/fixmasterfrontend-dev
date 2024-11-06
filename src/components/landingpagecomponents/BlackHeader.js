import React from "react";
import styled from "styled-components";
import {
  BiLogoFacebookSquare,
  BiLogoLinkedinSquare,
  BiLogoInstagramAlt,
} from "react-icons/bi";

function BlackHeader() {
  const style = {
    color: "#c1bdbd",
    fontSize: "2rem",
  };

  return (
    <Container>
      <PreHeaderContent>
        <div className="info">
          <p>info@FixMaster.com.ng</p>
          <span></span>
        </div>
        <p className="address">
          284 Ajose Adeogun Street, Victoria Island, Lagos, Nigeria
        </p>
        <SocialMediaIcons>
          <BiLogoFacebookSquare style={style} />
          <BiLogoLinkedinSquare style={style} />
          <BiLogoInstagramAlt style={style} />
        </SocialMediaIcons>
      </PreHeaderContent>
    </Container>
  );
}

export default BlackHeader;

const Container = styled.div`
  width: 100%;
  background: #000000;
  color: #fff;
  padding: 15px 0;
`;

const PreHeaderContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media screen and (max-width: 1023px) {
    justify-content: space-between;
    padding: 0 4vw;
  }

  .address {
    @media screen and (max-width: 1023px) {
      display: none;
    }
  }

  .info {
    display: flex;
    align-items: center;
    gap: 1rem;

    span {
      height: 2rem;
      width: 0.05rem;
      background: #c1bdbd;
    }
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  gap: 0.5rem;
`;
