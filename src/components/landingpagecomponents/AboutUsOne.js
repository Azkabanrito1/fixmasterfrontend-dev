import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import DisplayCards from "./DisplayCards";

function AboutUsOne() {
  return (
    <Container>
      <PageBody>
        <LeftSection>
          <h3>ABOUT US</h3>
          <p>
            We provide customers with local, trusted, technicians for quick
            turnaround of each RIM (Repairs, Installations & Maintenance) needs
            and ensure your assignment is managed by an independent Customer
            Service Executive (CSE) to guarantee your peace of mind.
          </p>
          <p className="check">
            Check out our <span>Convenient</span>, <span>Safe</span>,
            <span> Swift</span> & <span>Guaranteed</span> <span>Solution </span>
            to all your Repair, Installation & Maintenance (RIM) needs today.
          </p>
          <div className="image">
            <img src="/images/fixmasterH.png" />
          </div>
          <p className="info">
            FixMaster is your trusted one-call solution for a wide range of
            Repair, Installation & Maintenance needs. Our well-trained &
            certified technicians are fully insured and dedicated to redefining
            the RIM industry so our customers can fully relax, while we fix.
          </p>
          <p>
            Our People are subjected to rigorous security and background checks
            ; extremely high-end KYC (know your customer) recruitment policies
            and induction training to prepare them to delighting the customer.
            FixMaster people are well presented in smart uniforms, PPEs and
            equipped with the correct tools to deliver on our unique selling
            points of Convenient, Safe, Swift & Guaranteed Solution to all your
            repair, Installation & Maintenance needs.
          </p>
          <p>
            We pride ourselves as the Customer-Centric RIM service provider in
            Nigeria.
          </p>
          <p>
            We guarantee your repair requests to be handled professionally,
            employing the world’s best practices in health and safety to ensure
            a sweet experience from inception to completion.
          </p>
          <p>
            We offer Convenience and Swift RIM services to homes, schools,
            hospitals, corporate and public facilities.
          </p>
          <p>Find out more about our services here</p>
        </LeftSection>
        <RightSection>
          <h3>Our Company's Mission</h3>
          <p className="tableP">
            Revolutionizing home improvement services such as repairs,
            maintenance, installation, assembly, etc., through the rejuvenation
            of the clients and artisan relationship with better security,
            reliability, trust, transparency and prompt service delivery
          </p>
          <p className="values">Our Vision</p>
          <p className="values">Our Values</p>
          <p className="values">Technicians</p>
          <p className="more">
            <Link to="/">Find more about us</Link>
          </p>
        </RightSection>
      </PageBody>
    </Container>
  );
}

export default AboutUsOne;

const Container = styled.div`
  margin: 5rem 4vw;
`;
const PageBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 5rem;

  @media screen and (max-width: 1023px) {
    gap: 4rem;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;
const LeftSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media screen and (max-width: 767px) {
    width: 100%;
  }

  h3 {
    align-self: flex-start;
    font-size: 1.2rem;
  }
  p {
    line-height: 1.5rem;
    align-self: flex-start;
  }

  .image {
    width: 200px;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .check {
    span {
      color: #f26222;
    }
  }
`;
const RightSection = styled.div`
  width: 40%;

  @media screen and (max-width: 767px) {
    width: 100%;
  }

  h3 {
    color: #f26222;
    font-size: 1.2rem;
    border: 1px solid black;
    padding: 20px 30px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-bottom: 0;
    letter-spacing: 0.05rem;
  }
  .tableP {
    border: 1px solid black;
    border-top: none;
    padding: 30px 30px 50px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background: #dcdcdc;
  }
  .values {
    border: 1px solid black;
    padding: 20px 30px;
    border-radius: 10px;
    margin-top: 1rem;
  }
  .more {
    border: 2px solid #f26222;
    padding: 10px 30px;
    margin-top: 1rem;
    display: flex;
    justify-content: center;

    a {
      color: #f26222;
      text-decoration: none;
      font-size: 1.1rem;
      letter-spacing: 0.1rem;
    }
  }
`;
