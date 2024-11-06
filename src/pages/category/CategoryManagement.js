import { Stack } from "@mui/material";
import UserCard from "../../components/admincomponents/usermanagement/UserCard";
import {
  BackBtn,
  GridCardsContainer,
  PageHeading,
} from "../../components/globalcomponents/Utilities";
import { UserCardsContainer } from "../admin/usermanagement/UserManagementHome";

const CategoryManagement = () => {
  const masterData = [
    {
      id: 0,
      icon: "/images/adds.png",
      title: "Job Categories",
      description: "Add, view and edit booking category",
      to: "category",
    },
    {
      id: 1,
      icon: "/images/adds.png",
      title: "Service Listing",
      description: "Add, view and edit service listing",
      to: "service-listing",
    },
  ];

  return (
    <Stack spacing={4}>
      <div>
        <BackBtn />
        <PageHeading>Categories Management</PageHeading>
      </div>

      <GridCardsContainer>
        {masterData.map((data) => (
          <UserCard key={data.id} user={data} />
        ))}
      </GridCardsContainer>
    </Stack>
  );
};

export default CategoryManagement;
