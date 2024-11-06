import React from "react";
import styled from "styled-components";
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

function LandingPageCards() {
  const styleTools = {
    marginLeft: "auto",
    marginRight: "auto",
    color: "var(--clr-primary)",
  };
  const styleMap = { color: "white", width: "32px", height: "32px" };
  const styleStar = { color: "white", width: "32px", height: "32px" };
  return (
    <Container>
      <Cards>
        <Professionalism>
          <ToolIcon>
            <BsIcons.BsTools style={styleTools} />
          </ToolIcon>
          <h3>Professionalism</h3>
          <p>
            You don’t want just any technician working in your home or
            business—you want a technician with real experience.
          </p>
        </Professionalism>
        <LocallyOwned>
          <MapIcon>
            <FaIcons.FaMap style={styleMap} />
          </MapIcon>
          <h3>Locally Owned</h3>
          <p>
            We care about the communities we serve because our locations are
            locally owned and operated.
          </p>
        </LocallyOwned>
        <Quality>
          <StarIcon>
            <AiIcons.AiFillStar style={styleStar} />
          </StarIcon>
          <h3>Quality</h3>
          <p>
            We are proud of our work, and we stand behind it. We guarantee the
            quality and workmanship our technicians provide.
          </p>
        </Quality>
      </Cards>
    </Container>
  );
}

export default LandingPageCards;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const Cards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: -15vh 4vw 0;
  padding: 0 3rem;
  gap: 1.5rem;

  @media screen and (max-width: 1023px) {
    margin: -20vh 4vw 0;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0;
  }

  @media screen and (max-width: 767px) {
    margin: -15vh 4vw 0;
  }
`;
const Professionalism = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  padding: 20px;
  width: 700px;
  height: 300px;
  text-align: center;
  background: #ffffff;
  border-radius: 17px;

  @media screen and (max-width: 1023px) {
    width: 48.3%;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
  }

  h3 {
    font-size: 1.4rem;
    margin: 1.5rem 0 0 0;
    padding: 0;
  }
`;
const ToolIcon = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #feeee9;

  background: #fdded3;
  border-radius: 50px;
`;
const LocallyOwned = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  padding: 20px;
  width: 700px;
  height: 300px;
  text-align: center;
  background: #ffffff;
  border-radius: 17px;
  color: #fff;

  @media screen and (max-width: 1023px) {
    width: 48.3%;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
  }

  h3 {
    font-size: 1.4rem;
    margin: 1.5rem 0 0 0;
    padding: 0;
  }

  background: var(--clr-primary);
  border-radius: 17px;
`;

const MapIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid transparent;
`;

const Quality = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  padding: 20px;
  width: 700px;
  height: 300px;
  text-align: center;
  background: #ffffff;
  border-radius: 17px;
  color: #fff;

  @media screen and (max-width: 1023px) {
    width: 100%;
  }

  h3 {
    font-size: 1.4rem;
    margin: 1.5rem 0 0 0;
    padding: 0;
  }

  background: #030f27;
  border-radius: 17px;
`;
const StarIcon = styled.div`
  width: 70px;
  height: 70px;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #212c45;

  background: #353f52;
  border-radius: 50px;
`;
