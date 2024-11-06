import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import {
  useGetAllBonuses,
  useGetAllTargets,
  useGetTerritoryDetails,
} from "../../../hooks/useQueries/useAdmin";
import { useParams } from "react-router-dom";
import BonusSection from "../../../components/admincomponents/territories/BonusSection";
import TargetsSection from "../../../components/admincomponents/territories/TargetsSection";
import { useGetCollaboratorRoles } from "../../../hooks/useQueries/useIdentity";
import TerritoryNavigation from "../../../components/admincomponents/territories/TerritoryNavigation";

const CollaboratorTerritoryBonusSetting = () => {
  const { id, collaborator } = useParams();

  const { data: territoryData } = useGetTerritoryDetails(id);

  const { data: allTargets, isLoading: isLoadingTargets } = useGetAllTargets(
    id,
    { enabled: !!collaborator && !!id },
    { collaboratorId: collaborator }
  );
  const { data: allBonuses, isLoading: isLoadingBonuses } = useGetAllBonuses(
    id,
    { enabled: !!collaborator && !!id },
    { collaboratorId: collaborator }
  );

  const collaboratorName =
    collaborator === "cse"
      ? collaborator.toUpperCase()
      : `${collaborator[0].toUpperCase()}${collaborator.slice(1)}`;

  return (
    <>
      <div className="mb-5">
        <PageHeading>
          {collaboratorName} Bonus & Targets: {territoryData?.territoryName}
        </PageHeading>
        <BackBtn />
      </div>

      <TerritoryNavigation />

      <BonusSection bonuses={allBonuses?.data} isLoading={isLoadingBonuses} />
      <TargetsSection targets={allTargets?.data} isLoading={isLoadingTargets} />
    </>
  );
};

export default CollaboratorTerritoryBonusSetting;
