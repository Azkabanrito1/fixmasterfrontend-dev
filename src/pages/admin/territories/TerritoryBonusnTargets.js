import { useParams } from "react-router-dom";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import UserCard from "../../../components/admincomponents/usermanagement/UserCard";
import { UserCardsContainer } from "../usermanagement/UserManagementHome";
import TerritoryNavigation from "../../../components/admincomponents/territories/TerritoryNavigation";
import { collaboratorsMenu } from "../../../utils/selectOptions";
import { useGetTerritoryDetails } from "../../../hooks/useQueries/useAdmin";
import { PATH_ADMIN } from "../../../routes/paths";

const TerritoryBonusnTargets = () => {
  const { id } = useParams();

  const { data: territoryData } = useGetTerritoryDetails(id);

  // const collabs = collaboratorsMenu.map((collab) => ({
  //   ...collab,
  //   to: PATH_ADMIN.territoryCollabsBonusTargets(id, collab.title),
  // }));

  return (
    <>
      <div className="mb-5">
        <PageHeading>
          Bonus & Targets: {territoryData?.territoryName}
        </PageHeading>
        <BackBtn />
      </div>

      <TerritoryNavigation />

      <UserCardsContainer>
        {collaboratorsMenu.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </UserCardsContainer>
    </>
  );
};

export default TerritoryBonusnTargets;
