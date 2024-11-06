import { Stack } from "@mui/material";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { UserCardsContainer } from "../usermanagement/UserManagementHome";
import UserCard from "../../../components/admincomponents/usermanagement/UserCard";

const MasterDataHome = () => {
  const masterData = [
    {
      id: 2,
      icon: "/images/adds.png",
      title: "Academic Qualification",
      description: "Add, view and edit academic qualification",
      to: "academic",
    },
    {
      id: 3,
      icon: "/images/adds.png",
      title: "Language Proficiency",
      description: "Add, view and edit language proficiency",
      to: "language",
    },
    {
      id: 4,
      icon: "/images/adds.png",
      title: "Territory Categories",
      description: "Add, view and edit territory categories",
      to: "territory-categories",
    },
    {
      id: 6,
      icon: "/images/adds.png",
      title: "Equipment to Fix",
      description: "Add, view and edit equipment to fix",
      to: "equipment",
    },
    {
      id: 7,
      icon: "/images/adds.png",
      title: "SLA Parameters",
      description: "Add, view and edit SLA parameters",
      to: "sla-mgt",
    },
    {
      id: 8,
      icon: "/images/adds.png",
      title: "Earnings",
      description: "Add, view and edit earnings",
      to: "collaborator-earning",
    },
  ];
  return (
    <Stack spacing={4}>
      <div>
        <BackBtn />
        <PageHeading>Master Data Management</PageHeading>
      </div>

      <UserCardsContainer>
        {masterData.map((data) => (
          <UserCard key={data.id} user={data} />
        ))}
      </UserCardsContainer>
    </Stack>
  );
};

export default MasterDataHome;
