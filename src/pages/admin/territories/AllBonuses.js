import { useParams } from "react-router-dom";
import BonusSection from "../../../components/admincomponents/territories/BonusSection";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import {
  useGetAllBonuses,
  useGetTerritoryDetails,
} from "../../../hooks/useQueries/useAdmin";
import TerritoryNavigation from "../../../components/admincomponents/territories/TerritoryNavigation";

const AllBonuses = () => {
  const { id, collaborator } = useParams();

  const { data: territoryData } = useGetTerritoryDetails(id);
  const { data: allBonuses, isLoading: isLoadingBonuses } = useGetAllBonuses(
    id,
    { enabled: !!collaborator && !!id },
    { collaboratorId: collaborator }
  );

  let bonuses = [];

  bonuses = allBonuses?.data;

  return (
    <>
      <div className="mb-5">
        <PageHeading>
          Bonuses Settings: {territoryData?.territoryName}
        </PageHeading>
        <BackBtn />
      </div>

      <TerritoryNavigation />

      <BonusSection bonuses={bonuses} isLoading={isLoadingBonuses} />
    </>
  );
};

export default AllBonuses;
