import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  const location = useLocation();

  const collaboratorUrl = location.pathname.split("/").slice(-1)[0];

  return (
    <>
      <NavContainer>
        <NavLink
          to="full-time"
          className={({ isActive }) =>
            isActive || collaboratorUrl === "technician"
              ? "nav-item active-link"
              : "nav-item"
          }
          end
        >
          Full-Time
        </NavLink>

        <NavLink
          to="contract"
          className={({ isActive }) =>
            isActive ? "nav-item active-link" : "nav-item"
          }
          end
        >
          Contract
        </NavLink>

        <NavLink
          to="freelance"
          className={({ isActive }) =>
            isActive ? "nav-item active-link" : "nav-item"
          }
          end
        >
          Freelance
        </NavLink>
      </NavContainer>
      <Outlet />
    </>
  );
};

export default Navbar;

export const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ccc;
  gap: 2rem;

  .nav-item {
    margin: 0 20px;
    padding: 10px 0;
    color: #ccc;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 2px solid transparent;
    transition: color 0.3s ease, border-bottom 0.3s ease;
  }

  .active-link {
    color: #ff6600;
    border-bottom: 2px solid #ff6600;
  }

  .nav-item:hover {
    color: #000;
  }

  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
      padding: 20px 0;
    }

    .nav-item {
      margin: 10px 0;
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    .nav-item {
      font-size: 12px;
      padding: 8px 0;
    }
  }
`;
