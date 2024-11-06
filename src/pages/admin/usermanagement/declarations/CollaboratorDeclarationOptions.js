import { Stack } from "@mui/material";
import {
  BackBtn,
  GridCardsContainer,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import UserCard from "../../../../components/admincomponents/usermanagement/UserCard";
import styled from "styled-components";

const CollaboratorDeclarationOptions = ({ collaborator }) => {
  const layoutData = [
    {
      id: 0,
      icon: "/images/adds.png",
      title: `Preboarding Declaration`,
      description: "Add, view and edit preboarding declarations",
      to: "preboarding",
    },
    {
      id: 1,
      icon: "/images/adds.png",
      title: `Onboarding Declaration`,
      description: "Add, view and edit onboarding declarations",
      to: "onboarding",
    },
  ];

  return (
    <Stack spacing={4}>
      <div>
        <BackBtn />
        <PageHeading>{collaborator} Declarations</PageHeading>
      </div>

      <UserCardsContainer>
        {layoutData.map((data) => (
          <UserCard key={data.id} user={data} />
        ))}
      </UserCardsContainer>
    </Stack>
  );
};

export default CollaboratorDeclarationOptions;

const UserCardsContainer = styled(GridCardsContainer)`
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;
