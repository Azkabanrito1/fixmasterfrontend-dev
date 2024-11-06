import { useParams } from "react-router-dom";
import TargetsSection from "../../../components/admincomponents/territories/TargetsSection";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import {
  useGetAllTargets,
  useGetTerritoryDetails,
} from "../../../hooks/useQueries/useAdmin";
import TerritoryNavigation from "../../../components/admincomponents/territories/TerritoryNavigation";

const AllTargets = () => {
  const { id, collaborator } = useParams();

  const { data: territoryData } = useGetTerritoryDetails(id);

  const { data: allTargets, isLoading: isLoadingTargets } = useGetAllTargets(
    id,
    { enabled: !!collaborator && !!id },
    { collaboratorId: collaborator }
  );

  let targets = [];

  targets = allTargets?.data;

  return (
    <>
      <div className="mb-5">
        <PageHeading>
          Targets Settings: {territoryData?.territoryName}
        </PageHeading>
        <BackBtn />
      </div>

      <TerritoryNavigation />

      <TargetsSection targets={targets} isLoading={isLoadingTargets} />
    </>
  );
};

export default AllTargets;
