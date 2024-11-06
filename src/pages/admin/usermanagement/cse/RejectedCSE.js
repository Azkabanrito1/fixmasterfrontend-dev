import {
  BackBtn,
  OnboardingStageNav,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const RejectedCSE = () => {
  const location = useLocation();

  const stageUrl = location.pathname.split("/").slice(-1)[0];

  return (
    <div>
      <BackBtn />
      <PageHeading style={{ marginBottom: "32px" }}>Rejected CSE</PageHeading>
      <OnboardingStageNav>
        <NavLink
          to="first"
          className={stageUrl === ("rejected" || "first") ? "active" : ""}
        >
          First Stage
        </NavLink>
        <NavLink to="last">Last Stage</NavLink>
      </OnboardingStageNav>

      <Outlet />
    </div>
  );
};

export default RejectedCSE;
