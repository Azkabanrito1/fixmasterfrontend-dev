import { Stack } from "@mui/material";
import {
  GridCardsContainer,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import UserCard from "../../../components/admincomponents/usermanagement/UserCard";
import styled from "styled-components";

const GuarantorHome = () => {
  const guarantorMenu = [
    {
      id: 0,
      icon: "/images/adminIcon2.jpg",
      title: "Guarantor Management",
      description: "User guarantors and auto validation",
      to: "management",
    },
    {
      id: 1,
      icon: "/images/settings.jpg",
      title: "Guarantor Requirements",
      description: "User guarantor requirements",
      to: "requirements",
    },
  ];

  return (
    <Stack spacing={4}>
      <PageHeading>User Management</PageHeading>
      <UserCardsContainer>
        {guarantorMenu.map((item) => (
          <UserCard key={item.id} user={item} />
        ))}
      </UserCardsContainer>
    </Stack>
  );
};

export default GuarantorHome;

const UserCardsContainer = styled(GridCardsContainer)`
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;
