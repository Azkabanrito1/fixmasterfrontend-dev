import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FirstBodyBackground from "../../components/landingpagecomponents/FirstBodyBackground";
import BlackHeader from "../../components/landingpagecomponents/BlackHeader";
import AboutUsOne from "../../components/landingpagecomponents/AboutUsOne";
import BlackCardStats from "../../components/landingpagecomponents/BlackCardStats";
import OurServices from "../../components/landingpagecomponents/OurServices";
import CateCardsRow from "../../components/landingpagecomponents/CateCardsRow";
import HowWeFixCard from "../../components/landingpagecomponents/HowWeFixCard";
import MoreAboutUs from "../../components/landingpagecomponents/MoreAboutUs";
import LandingPageFooter from "../../components/landingpagecomponents/LandingPageFooter";
import FooterLinks from "../../components/landingpagecomponents/FooterLinks";
import ContAndTestimonies from "../../components/landingpagecomponents/ContAndTestimonies";
import SiteNavbar from "../../components/landingpagecomponents/SiteNavbar";
import LandingPageCards from "../../components/landingpagecomponents/LandingPageCards";
import ContactBoard from "../../components/landingpagecomponents/ContactBoard";
import MyFooter from "../../components/landingpagecomponents/MyFooter";

const styleClosed = { width: "50px", height: "50px" };

function HomePage() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <Container>
      <HeaderContainer>
        <BlackHeader className="d-none d-lg-block" />
        <SiteNavbar
          isOpen={isNavOpen}
          toggleIsOpen={() => {
            setIsNavOpen((prev) => !prev);
          }}
        />
      </HeaderContainer>

      <FirstBodyBackground
        RoundButtonTextBig="Download FixMaster App"
        RoundButtonTextMd="Sign Up"
        RoundButtonTextMdTrans="Book a Fix"
      />
      <LandingPageCards />

      <AboutUsOne />
      <BlackCardStats />
      <OurServices />
      <CategoryCardsPlace>
        <CateCardsRow
          cateLabelTextRow1="Plumbing"
          cateDescTextRow1="Replace, Repair, Insulate, Install & More"
          cateImgRow1="/images/plumber.webp"
          cateLabelTextRow2="Electrical"
          cateDescTextRow2="Install, Repair, Replace & More"
          cateImgRow2="/images/electrical.webp"
          cateLabelTextRow3="Communication"
          cateDescTextRow3="Repair, Replace, Upgrade and More."
          cateImgRow3="/images/communication.webp"
          cateLabelTextRow4="Refrigeration"
          cateDescTextRow4="Repair, Replace, Install, Fill and More"
          cateImgRow4="/images/refrigerator.webp"
          cateLabelTextRow5="Locks & Security"
          cateDescTextRow5="Install, Repair, Replace & More"
          cateImgRow5="/images/locks.webp"
          cateLabelTextRow6="Air Conditioning"
          cateDescTextRow6="Diagnose, Maintain, Repair, and More"
          cateImgRow6="/images/aircondition.webp"
          cateLabelTextRow7="Gardening"
          cateDescTextRow7="Repair, Trim, Plant and More"
          cateImgRow7="/images/garden.webp"
          cateLabelTextRow8="Painting & Decorating"
          cateDescTextRow8="Paint, Re-paint, Install, and More"
          cateImgRow8="/images/painting.webp"
          cateLabelTextRow9="Landscaping"
          cateDescTextRow9="Clean, Prune, Renovate and More"
          cateImgRow9="/images/landscaping.webp"
        />
      </CategoryCardsPlace>
      <HowWeFixCard />
      <MoreAboutUs
        smallCardTextLeft="We provide standard or 
            extended warranty on all jobs"
        bigCardTextLeft="whether you need officer 
            Repairs, Installation, or 
            Maintenance. FixMaster is the 
            go to place."
        smallCardTextRight="we focus on offering quality & 
            efficiency."
        bigCardTextRight="We score more than average in 
            Repairs, Installation & 
            Maintenance (RIM) and home 
            innovations"
      />
      <ContAndTestimonies
        RoundButtonTextBig="BOOK A FIX"
        RoundButtonTextSm="Get A Qoute"
      />
      <ContactBoard />
      <MyFooter />
    </Container>
  );
}

export default HomePage;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #f5f5f5;
  overflow: hidden;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 10000;
  position: fixed;
  left: 0;
  right: 0;
`;

const CategoryCardsPlace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin: 2rem 4vw 4rem;
`;
