import { NavLink, useParams } from "react-router-dom";
import { OnboardingStageNav } from "../../../components/globalcomponents/Utilities";
import { PATH_ADMIN } from "../../../routes/paths";

const TerritoryNavigation = () => {
  const { id } = useParams();

  return (
    <OnboardingStageNav>
      <NavLink to={PATH_ADMIN.territoryInfo(id)}>View Territory</NavLink>
      <NavLink to={PATH_ADMIN.editTerritory(id)}>Edit Territory</NavLink>
      <NavLink to={PATH_ADMIN.territoryBonusTargets(id)}>
        Bonuses & Targets
      </NavLink>
      <NavLink to={PATH_ADMIN.uplifts(id)}>Rate Uplifts</NavLink>
    </OnboardingStageNav>
  );
};

export default TerritoryNavigation;
