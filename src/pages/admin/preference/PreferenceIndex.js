import { Stack } from "@mui/material";
import React from "react";
import { PageHeading } from "../../../components/globalcomponents/Utilities";
import { UserCardsContainer } from "../usermanagement/UserManagementHome";
import UserCard from "../../../components/admincomponents/usermanagement/UserCard";
import { PATH_ADMIN } from "../../../routes/paths";
import styled from "styled-components";

const PreferenceIndex = () => {
  const managedUser = [
    {
      id: 0,
      icon: "/images/adminIcon2.jpg",
      title: "Customer",
      description: "Individual, Commercial & Estates Preferences.",
      to: PATH_ADMIN.customerPref,
    },
  ];

  return (
    <Stack spacing={4}>
      <PageHeading>Preferences Management</PageHeading>
      <Container>
        {managedUser.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Container>
    </Stack>
  );
};

export default PreferenceIndex;

const Container = styled(UserCardsContainer)`
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;
