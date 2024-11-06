import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import TerritoryNavigation from "../../../components/admincomponents/territories/TerritoryNavigation";
import { UserCardsContainer } from "../usermanagement/UserManagementHome";
import { collaboratorsMenu } from "../../../utils/selectOptions";
import UserCard from "../../../components/admincomponents/usermanagement/UserCard";
import { useGetTerritoryDetails } from "../../../hooks/useQueries/useAdmin";
import { useParams } from "react-router-dom";

const TerritoryRateUplifts = () => {
  const { id } = useParams();

  const allowedRoles = ["cse", "call center operator", "technician"];
  const rateUpliftsRoles = collaboratorsMenu.filter((role) =>
    allowedRoles.includes(role.title.toLowerCase())
  );

  const { data: territoryData } = useGetTerritoryDetails(id);
  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Rate Uplifts: {territoryData?.territoryName}</PageHeading>
      </div>

      <TerritoryNavigation />

      <UserCardsContainer>
        {rateUpliftsRoles.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </UserCardsContainer>
    </>
  );
};

export default TerritoryRateUplifts;
