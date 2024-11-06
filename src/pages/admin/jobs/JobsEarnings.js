import React from "react";
import {
  BackBtn,
  OnboardingStageNav,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const JobsEarnings = () => {
  const location = useLocation();

  const collaboratorUrl = location.pathname.split("/").slice(-1)[0];
  return (
    <div>
      <BackBtn />
      <PageHeading style={{ marginBottom: "32px" }}>
        Earnings Settings
      </PageHeading>
      <OnboardingStageNav>
        <NavLink
          to="franchisee"
          className={
            collaboratorUrl === ("earnings-setting" || "franchisee")
              ? "active"
              : ""
          }
        >
          Franchisee
        </NavLink>
        <NavLink to="qa-master">QA Master</NavLink>
        <NavLink to="cse">CSE</NavLink>
        <NavLink to="technician">Technician</NavLink>
        <NavLink
          to="call-center"
          className="disabled-link"
          onClick={(e) => e.preventDefault()}
        >
          Call Center Operator
        </NavLink>
      </OnboardingStageNav>

      <Outlet />
    </div>
  );
};

export default JobsEarnings;
