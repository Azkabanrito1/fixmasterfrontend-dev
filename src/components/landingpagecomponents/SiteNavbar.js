import styled from "styled-components";
import GlobalBtn from "../globalcomponents/GlobalBtn";
import Logo from "../globalcomponents/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const SiteNavbar = ({ isOpen, toggleIsOpen }) => {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <Logo maxWidth={"130px"} />
      <nav className={isOpen ? "open" : ""}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about-us">About Us</NavLink>
        <NavLink to="/careers">Careers</NavLink>
        <NavLink to="/sign-up">Sign Up</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/testimonials">Testimonials</NavLink>
        <NavLink to="/contact">Contact Us</NavLink>
      </nav>
      <GlobalBtn
        className="d-none d-md-block"
        width="auto"
        px="1rem"
        bdRad="36px"
        fs="18px"
        onClick={() => navigate("/sign-up")}
      >
        BOOK A FIX
      </GlobalBtn>
      <div className="mobile-only">
        <Button
          className={isOpen ? "rotate" : ""}
          sx={{ fontSize: "2rem", color: "var(--clr-primary)" }}
          onClick={toggleIsOpen}
        >
          {isOpen ? (
            <i className="fa fa-times"></i>
          ) : (
            <i className="fa fa-bars"></i>
          )}
        </Button>
      </div>
    </StyledHeader>
  );
};

export default SiteNavbar;

const StyledHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-inline: auto;
  padding: 10px 4vw;
  background: #fff;
  color: black;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    /* box-shadow: 5px 3px 7px rgba(0, 0, 0, 0.1); */

    a {
      padding: 0.5em;
      color: #000000;
      text-decoration: none;
      font-size: 16px;
      transition: 0.3s ease-in;
      text-decoration-thickness: 0;
    }

    a.active {
      color: var(--clr-primary);
      transition: 0.3s ease-in;
    }

    a:hover {
      text-decoration: underline;
      text-underline-offset: 5px;
      text-decoration-thickness: 3px;
      transition: 0.4s ease-in;
    }
  }

  @media screen and (max-width: 1023px) {
    nav {
      position: fixed;
      top: 62px;
      left: -32px;
      flex-direction: column;
      justify-content: center;
      gap: 2rem;
      width: 50%;
      height: 100vh;
      background-color: #fff;
      transform: translateX(-100%);
      transition: 0.3s;
      z-index: 10;

      &.open {
        transform: translateX(0);
      }
    }

    button.rotate i {
      transform: rotateZ(90deg);
    }
  }
  @media screen and (max-width: 767px) {
    nav {
      width: 80%;
    }
  }
`;
