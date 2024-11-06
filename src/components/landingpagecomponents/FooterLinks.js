import React from "react";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";

function FooterLinks() {
  const styleLink = {
    width: "140px",
    height: "50px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "16px",
    letterSpacing: "0.045em",
    color: "var(--clr-primary)",
    textDecoration: "none",
  };
  const styleIcon = { width: "26px", height: "26px", color: "#8c8c8c" };
  return (
    <Container>
      <FooterLinksBody>
        <FixMaster>
          <img src="/images/fixmaster.png" />
          <p>
            FixMaster is Nigeria’s forward thinking and customer centric RIM
            services provider fixing homes and commercial facilities.
          </p>

          <label>…we fix, you relax</label>
          <SocialIcons>
            <FaIcons.FaFacebookSquare style={styleIcon} />
            <AiIcons.AiFillLinkedin style={styleIcon} />
            <FaIcons.FaInstagramSquare style={styleIcon} />
          </SocialIcons>
        </FixMaster>
        <UsefulLinks>
          <label>Useful Links</label>
          <AllLinks>
            <LinksLeft>
              <Link style={styleLink} to="#">
                About Us
              </Link>
              <Link style={styleLink} to="#">
                Services
              </Link>
              <Link style={styleLink} to="#">
                Refunds
              </Link>
              <Link style={styleLink} to="#">
                Disclaimer
              </Link>
              <Link style={styleLink} to="#">
                Terms of use
              </Link>
            </LinksLeft>
            <LinksRight>
              <Link style={styleLink} to="#">
                How it Works
              </Link>
              <Link style={styleLink} to="#">
                Careers
              </Link>
              <Link style={styleLink} to="#">
                Help Desk
              </Link>
              <Link style={styleLink} to="#">
                Contact
              </Link>
              <Link style={styleLink} to="#">
                Privacy Policy
              </Link>
            </LinksRight>
          </AllLinks>
        </UsefulLinks>
        <Contact>
          <label>Contact</label>
          <span>
            Mon - Sat: 7.00am - 7.00pm 284 Ajose Adeogun Street, Victoria
            Island, Lagos, Nigeria
          </span>
          <p>info@FixMaster.com.ng</p>
        </Contact>
      </FooterLinksBody>
    </Container>
  );
}

export default FooterLinks;

const Container = styled.div``;
const FooterLinksBody = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  padding-left: 40px;
  padding-top: 45px;

  width: 100%;
  height: 567px;

  background: #d9d9d9;
  @media (max-width: 1200px) {
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding-left: 20px;
    padding-top: 35px;
    align-items: center;

    width: 100%;
    height: 567px;

    background: #d9d9d9;
  }

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: row;
    gap: 5px;
    padding-left: 15px;
    padding-top: 35px;
    align-items: center;

    width: 100%;
    height: 567px;

    background: #d9d9d9;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-left: 40px;
    padding-top: 45px;
    align-items: center;

    width: 100%;
    height: auto;

    background: #d9d9d9;
  }
`;
const FixMaster = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  && img {
    width: 204px;
    height: 104px;
  }

  && p {
    width: 519px;
    height: 100px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    /* or 80% */

    letter-spacing: 0.045em;

    color: #000000;
  }
  && label {
    width: 519px;
    height: 50px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    /* or 80% */

    letter-spacing: 0.045em;

    color: #000000;
  }

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
    && img {
      width: 204px;
      height: 104px;
    }

    && p {
      width: 350px;
      height: 100px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      /* or 80% */

      letter-spacing: 0.045em;

      color: #000000;
    }
    && label {
      width: 350px;
      height: 50px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 25px;
      /* or 80% */

      letter-spacing: 0.045em;

      color: #000000;
    }
  }

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
    && img {
      width: 204px;
      height: 104px;
    }

    && p {
      width: 220px;
      height: 100px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 25px;
      /* or 80% */

      letter-spacing: 0.045em;

      color: #000000;
    }
    && label {
      width: 220px;
      height: 50px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 25px;
      /* or 80% */

      letter-spacing: 0.045em;

      color: #000000;
    }
  }
`;
const SocialIcons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const UsefulLinks = styled.div`
  margin-top: 55px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  && label {
    width: 193px;
    height: 16px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 16px;
    /* identical to box height, or 50% */

    letter-spacing: 0.045em;

    color: #000000;
  }
`;
const AllLinks = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  width: 350px;

  @media (max-width: 1200px) {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    gap: 5px;
    width: 300px;
  }
  @media (max-width: 1024px) {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    gap: 0px;
    width: 280px;
  }
`;
const LinksLeft = styled.div`
  display: flex;
  flex-direction: column;
`;
const LinksRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const Contact = styled.div`
  margin-top: 55px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  && label {
    width: 350px;
    height: 50px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 16px;
    /* or 50% */

    letter-spacing: 0.045em;

    color: #000000;
  }

  && span {
    width: 350px;
    height: 50px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    /* or 80% */

    letter-spacing: 0.045em;

    color: #000000;
  }

  && p {
    margin-top: 30px;
    width: 350px;
    height: 50px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    /* or 80% */

    letter-spacing: 0.045em;

    color: #8c8c8c;
  }

  @media (max-width: 1200px) {
    margin-top: 0px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    && label {
      width: 350px;
      height: 50px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 500;
      font-size: 32px;
      line-height: 16px;
      /* or 50% */

      letter-spacing: 0.045em;

      color: #000000;
    }

    && span {
      width: 350px;
      height: 50px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 25px;
      /* or 80% */

      letter-spacing: 0.045em;

      color: #000000;
    }

    && p {
      margin-top: 50px;
      margin-bottom: 30px;
      width: 350px;
      height: 50px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 25px;
      /* or 80% */

      letter-spacing: 0.045em;

      color: #8c8c8c;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 0px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    && label {
      width: 250px;
      height: 50px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 500;
      font-size: 32px;
      line-height: 16px;
      /* or 50% */

      letter-spacing: 0.045em;

      color: #000000;
    }

    && span {
      width: 250px;
      height: 50px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 25px;
      /* or 80% */

      letter-spacing: 0.045em;

      color: #000000;
    }

    && p {
      margin-top: 50px;
      margin-bottom: 30px;
      width: 250px;
      height: 50px;

      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 25px;
      /* or 80% */

      letter-spacing: 0.045em;

      color: #8c8c8c;
    }
  }
`;
