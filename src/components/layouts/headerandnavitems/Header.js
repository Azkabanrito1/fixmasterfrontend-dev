import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import styled from "styled-components";
import { Link } from "react-router-dom";
import RoundCornerBigButton from "../buttons/RoundCornerBigButton";

function Header(props) {
  const [active, setActive] = useState(false);

  const showMenu = () => {
    setActive(!active);
  };
  return (
    <Container>
      <HeaderNav>
        <div className="header__logo"></div>

        <div className="menu-icon">
          <FaIcons.FaBars className="menu" onClick={showMenu} />
        </div>

        <nav className={`${active ? "navbar active" : "navbar"} d-flex`}>
          <img className="nav-text" src="/images/FixMastercse.png" alt="" />
          <ul className="nav__ul">
            <div className="closed">
              <AiIcons.AiOutlineClose className="close" onClick={showMenu} />
            </div>

            <li>
              <Link to="/">{props.TextOne}</Link>
            </li>
            <li>
              <Link to="/">{props.TextTwo}</Link>
            </li>
            <li>
              <Link to="/">{props.TextThree}</Link>
            </li>
            <li>
              <Link to="">{props.TextFour}</Link>
            </li>
            <li>
              <Link to="/">{props.TextFive}</Link>
            </li>
            <li>
              <Link to="/">{props.TextSix}</Link>
            </li>

            <RoundCornerBigButton
              RoundButtonTextBig={props.RoundButtonTextBig}
            />
          </ul>
        </nav>
      </HeaderNav>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  z-index: 200;
`;
const HeaderNav = styled.div`
  font-family: "Poppins", sans-serif;
  display: flex;
  width: 100%;
  height: 5em;
  position: static;
  top: 0;
  z-index: 100;
  background-color: transparent;
  background-color: white;

  .navbar {
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: space-around;
  }

  .header__logo {
    font-size: 22px;
    margin-left: 6rem;
    display: flex;
    align-items: center;
  }

  img {
    margin-left: 0px;
    margin-top: auto;
    margin-bottom: auto;
    width: 120px;
    height: 55px;
  }

  .nav__ul {
    /* width: 100%; */
    display: flex;
    align-items: center;
    justify-content: center;

    Button {
      margin-right: 80px;
    }
  }

  .nav__ul li {
    margin-inline: 1.4rem;
    list-style: none;

    a {
      text-decoration: none;
      color: rgb(53, 46, 46);
      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: 17px;
      line-height: 18px;

      color: #000000;

      &:hover {
        border-bottom: 3px solid var(--clr-primary);
      }
    }
  }

  .menu-icon {
    display: none;
  }

  .closed {
    display: none;
  }

  @media (max-width: 1200px) {
    .header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .navbar {
      width: 100%;
      height: 100vh;
      position: fixed;
      top: -100%;
      transition: 1s ease;
    }

    .navbar.active {
      transition: 1s ease;
      background-color: saddlebrown;
      top: 0;
    }

    .nav__ul {
      flex-direction: column;
      margin-bottom: 3rem;

      li {
        margin-block: 1.5rem;

        a {
          color: #fff;
          text-decoration: none;
          font-size: 20px;
        }
      }
    }

    .header__logo {
      font-size: 16px;
      margin-left: 1rem;
    }

    .header__contact {
      padding: 0.8rem 2rem;
      background: none;
      border: none;
      margin-left: 0rem;
      a {
        text-decoration: none;
        color: #fff;
        font-size: 20px;
      }
    }

    .closed {
      display: block;
      justify-content: flex-start;
      width: 100%;
      color: #fff;
      position: absolute;
      top: 0;
      cursor: pointer;
      .close {
        font-size: 25px;
      }
    }

    .menu-icon {
      display: block;
      cursor: pointer;
      .menu {
        font-size: 50px;
      }
    }
  }
`;
