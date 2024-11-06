import React from "react";
import Navbar, {
  NavContainer,
} from "../../../components/admincomponents/jobs/EarningNav";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const TechnicianEarningsNav = () => {
  const location = useLocation();

  const collaboratorUrl = location.pathname.split("/").slice(-1)[0];
  return (
    <>
      <NavContainer>
        <NavLink
          to="full-time"
          className={({ isActive }) =>
            isActive || collaboratorUrl === "cse"
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

export default TechnicianEarningsNav;
