import { Stack } from "@mui/material";
import {
  BackBtn,
  GridCardsContainer,
  PageHeading,
} from "../../../globalcomponents/Utilities";
import UserCard from "../UserCard";
import styled from "styled-components";
import { useGetCollaboratorRoles } from "../../../../hooks/useQueries/useIdentity";
import { useGetAllCollabTrainingMCQ } from "../../../../hooks/useQueries/useAdmin";

const CollaboratorTrainingOptions = ({
  hasMCQStage,
  hasInterviewStage,
  collaborator,
}) => {
  const { data: rolesData } = useGetCollaboratorRoles();

  const collaboratorData = rolesData?.data?.filter(
    (collab) =>
      collab.name.toLowerCase() === collaborator.split(" ")[0].toLowerCase()
  )?.[0];

  const { data: trainingMCQData } = useGetAllCollabTrainingMCQ(
    collaboratorData?.id
  );

  return (
    <Stack spacing={4}>
      <div>
        <BackBtn />
        <PageHeading>Training Documents & MCQs</PageHeading>
      </div>

      <UserCardsContainer>
        {trainingMCQData?.data?.map((item) => (
          <UserCard key={item.id} user={item} />
        ))}
      </UserCardsContainer>
    </Stack>
  );
};

export default CollaboratorTrainingOptions;

const UserCardsContainer = styled(GridCardsContainer)`
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;
