import { Stack } from "@mui/material";
import {
  BackBtn,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import MappingTable from "../../../../components/admincomponents/usermanagement/MappingTable";
import { useGetTechnicianMapping } from "../../../../hooks/useQueries/useOnboarding";
import GlobalBallBeat from "../../../../components/globalcomponents/GlobalBallBeat";

const TechnicianMappings = () => {
  const { data: mappingData, isLoading } = useGetTechnicianMapping();

  return (
    <Stack spacing={1}>
      <div>
        <BackBtn />
        <PageHeading>Technicians Mapping</PageHeading>
      </div>

      <GlobalBallBeat loading={isLoading} />

      <MappingTable data={mappingData?.data} />
    </Stack>
  );
};

export default TechnicianMappings;
