import React, { useState } from "react";
import styled from "styled-components";
import SiteNavbar from "../../components/landingpagecomponents/SiteNavbar";

const AboutUs = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <Container>
      <HeaderContainer>
        <SiteNavbar
          isOpen={isNavOpen}
          toggleIsOpen={() => {
            setIsNavOpen((prev) => !prev);
          }}
        />
      </HeaderContainer>
      <SubContainer>
        <AboutHeader>
          <header>
            <span className="sideLine"></span>
            <h3>Who we are</h3>
            <span className="sideLine"></span>
          </header>

          <div className="welcome">
            <h3>Welcome to FixMaster (FM)!</h3>
            <p className="about-p">
              We are a dynamic startup company On a mission to revolutionize the
              Repair, Installation, and Maintenance (RIM) industry in Nigeria
              and beyond.
            </p>
            <div className="images">
              <img src="/images/img-01.webp" alt="omo" />
              <img src="/images/img-02.webp" alt="omo" />
            </div>
            <p className="tired">
              Tired of substandard services and constant glitches? So are we.
            </p>
            <h4>Here's why FixMaster stands out:</h4>
          </div>
        </AboutHeader>
        <Main>
          <div className="item">
            <div className="red box child">
              <span className="icon">
                <img src="/images/wrench.png" alt="" />
              </span>
              <h3>Quality</h3>
              <p>
                Expect nothing less than exceptional service from our skilled
                professionals. We're dedicated to exceeding your expectations
                with top-notch Repairs, Installations, and Maintenance.
              </p>
            </div>
            <div className="image child">
              <img src="images/img-03.webp" alt="omo" />
            </div>
          </div>
          <div className="item">
            <div className="blue box child">
              <span className="icon">
                <img src="/images/wrench.png" alt="" />
              </span>
              <h3>Ease of Contact</h3>
              <p>
                Say goodbye to endless waiting times. With streamlined
                communication channels via our user-friendly website, email, or
                phone, reaching us is just a click or call away.
              </p>
            </div>
            <div className="image child">
              <img src="images/img-04.webp" alt="omo" />
            </div>
          </div>
          <div className="item">
            <div className="red box child">
              <span className="icon">
                <img src="/images/wrench.png" alt="" />
              </span>
              <h3>The FixMaster Warranty</h3>
              <p>
                We stand by our workmanship. That's why we offer a comprehensive
                warranty on all services, ensuring your satisfaction and peace
                of mind.
              </p>
            </div>
            <div className="image child">
              <img src="images/img-05.webp" alt="omo" />
            </div>
          </div>
          <div className="item">
            <div className="blue box child">
              <span className="icon">
                <img src="/images/wrench.png" alt="" />
              </span>
              <h3>Standard Spares</h3>
              <p>
                Only the best for your devices. We use genuine, high-quality
                spare parts to guarantee longevity and reliability.
              </p>
            </div>
            <div className="image child">
              <img src="images/img-06.webp" alt="omo" />
            </div>
          </div>
          <div className="item">
            <div className="red box child">
              <span className="icon">
                <img src="/images/wrench.png" alt="" />
              </span>
              <h3>Promoting Maintenance Culture</h3>
              <p>
                We're all about proactive upkeep. Let us guide you on the best
                practices to save time, money, and headaches in the long run.
              </p>
            </div>
            <div className="image child">
              <img src="images/img-07.webp" alt="omo" />
            </div>
          </div>
        </Main>
        <Footer>
          <FooterItems>
            <div className="logo">
              <div className="image">
                <img src="/images/logo.svg" alt="omo" />
              </div>
              <p>
                Whether you need quick fixes or comprehensive solutions, we are
                here to help make repairs easier for you.
              </p>
            </div>
            <div className="links">
              <h3>PRODUCTS</h3>
              <a href="#">
                <li>Repair Services</li>
              </a>
              <a href="#">
                <li>Installation Services</li>
              </a>
              <a href="#">
                <li>Maintenance Services</li>
              </a>
              <a href="#">
                <li>Equipment Hire</li>
              </a>
            </div>
            <div className="links">
              <h3>FOLLOW US</h3>
              <a href="#">
                <li>Plumbing Repairs</li>
              </a>
              <a href="#">
                <li>Electronic and Appliance Repairs</li>
              </a>
              <a href="#">
                <li>HVAC System Installations</li>
              </a>
              <a href="#">
                <li>Security System Installations</li>
              </a>
              <a href="#">
                <li>Landscape and grounds maintenance</li>
              </a>
            </div>
            <div className="links">
              <h3>QUICK LINKS</h3>
              <a href="#">
                <li>About Us</li>
              </a>
              <a href="#">
                <li>Service</li>
              </a>
              <a href="#">
                <li>Contact Us</li>
              </a>
              <a href="#">
                <li>Log In</li>
              </a>
              <a href="#">
                <li>Terms & Privacy</li>
              </a>
            </div>
          </FooterItems>
          <div className="copyright">
            <hr />
            <p>© 2023 FixMaster. All Rights Reserved.</p>
          </div>
        </Footer>
      </SubContainer>
    </Container>
  );
};
export default AboutUs;

const Container = styled.div``;
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  margin: 0;
  box-sizing: border-box;
  text-align: center;
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 3;
`;
const AboutHeader = styled.div`
  width: 100%;

  @media screen and (min-width: 769px) {
    max-width: 680px;
  }

  @media screen and (min-width: 1024px) {
    max-width: 100%;
    width: min(120ch, 100% - 4rem);
    margin-inline: auto;
  }

  header {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    font-weight: 600;

    .sideLine {
      background-color: #f89880;
      width: 3rem;
      height: 0.2rem;
      margin-bottom: 0.4rem;
    }
  }
  .welcome {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h3 {
      color: #f26222;
      font-size: 1.3rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }
    .about-p {
      line-height: 1.7rem;
      margin-bottom: 1.5rem;

      @media screen and (min-width: 1024px) {
        max-width: 680px;
      }
    }
    .images {
      @media screen and (min-width: 754px) {
        width: 50%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto;
      }

      @media screen and (min-width: 769px) {
        width: 50%;
        height: 50%;
        display: flex;
        gap: 1.5rem;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: auto;
      }

      @media screen and (min-width: 1024px) {
        max-width: 100%;
        width: min(120ch, 100% - 4rem);
        margin-inline: auto;
      }

      img {
        margin-bottom: 1.5rem;

        @media screen and (min-width: 754px) {
          width: 100%;
          height: 100%;
        }

        @media screen and (min-width: 769px) {
          width: 100%;
          height: 100%;
        }
      }
    }
    .tired {
      color: #f26222;
      font-size: 1.1rem;
      margin-bottom: 3rem;
    }
    h4 {
      font-size: 1.3rem;
      margin-bottom: 2rem;
      font-weight: 600;
    }
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;

  @media screen and (min-width: 769px) {
    max-width: 680px;
  }

  @media screen and (min-width: 1024px) {
    max-width: 100%;
    width: min(120ch, 100% - 4rem);
    margin-inline: auto;
    /* flex-direction: row;
    flex-wrap: wrap; */
  }

  .item {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1.5rem;

    @media screen and (min-width: 769px) {
      max-width: 680px;
    }

    @media screen and (min-width: 1024px) {
      flex-direction: row;
      max-width: 100%;
      width: min(120ch, 100% - 4rem);
      margin-inline: auto;
    }

    &:nth-child(2n + 2) {
      @media screen and (min-width: 1024px) {
        flex-direction: row-reverse;
      }
    }
  }

  .box {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 30px 20px 40px 20px;
    border-radius: 0.75rem;

    @media screen and (min-width: 1024px) {
      width: 40%;
      height: 280px;
      flex: 1;
    }
  }
  .red {
    background: #fff1f4;
    .icon {
      background: #f89880;
      width: 4rem;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: center;
      border-radius: 0.75rem;
    }
    h3 {
      color: #f89880;
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
  .blue {
    background: #f0f8ff;
    .icon {
      background: #89cff0;
      width: 4rem;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: center;
      border-radius: 0.75rem;
    }
    h3 {
      color: #89cff0;
      font-size: 1.2rem;
    }
  }
  .image {
    width: 100%;
    height: 100%;

    @media screen and (min-width: 1024px) {
      width: 40%;
      height: 280px;
      flex: 1;
    }

    img {
      width: 100%;
      height: 100%;

      @media screen and (min-width: 1024px) {
        object-fit: cover;
        border-radius: 0.75rem;
      }
    }
  }
`;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 5rem;
  width: 100%;

  @media screen and (min-width: 769px) {
    max-width: 680px;
  }

  @media screen and (min-width: 1024px) {
    max-width: 100%;
    width: min(120ch, 100% - 4rem);
    margin-inline: auto;
  }

  .copyright {
    @media screen and (min-width: 769px) {
      text-align: center;
    }

    @media screen and (min-width: 1024px) {
      max-width: 100%;
      width: min(120ch, 100% - 4rem);
      margin-inline: auto;
    }
  }
`;
const FooterItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;

  @media screen and (min-width: 769px) {
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 4rem;
  }

  @media screen and (min-width: 1024px) {
    flex-wrap: nowrap;
    max-width: 100%;
    width: min(120ch, 100% - 4rem);
    margin-inline: auto;
  }

  .logo {
    .image {
      width: 7%;
      height: 7%;

      @media screen and (min-width: 769px) {
        width: 30%;
        height: 30%;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    @media screen and (min-width: 769px) {
      width: 45%;
    }
  }
  .links {
    h3 {
      color: #f26222;
      font-size: 1rem;
    }
    a {
      text-decoration: none;
      color: black;
      transition: 0.2s all linear;

      &:hover {
        color: #f26222;
      }
    }
    @media screen and (min-width: 769px) {
      width: 45%;
    }
  }
`;
