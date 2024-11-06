import styled from "styled-components";
import UserCard from "../../../../components/admincomponents/usermanagement/UserCard";
import {
  BackBtn,
  GridCardsContainer,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import { Stack } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const MANAGEDUSER = [
  {
    id: 1,
    icon: "/images/adminIcon3.png",
    title: "HR Admin",
    description: "HR Admin Managed, Create HR Admin",
    to: "hr-admin",
  },
  {
    id: 2,
    icon: "/images/adminIcon3.png",
    title: "Customer Admin",
    description: "Customer Admin Managed, Create Customer  Admin",
    to: "customer-admin",
  },
  {
    id: 3,
    icon: "/images/adminIcon3.png",
    title: "Supplier Admin",
    description: "Supplier Admin Managed, Create Supplier  Admin",
    to: "supplier-admin",
  },
  {
    id: 4,
    icon: "/images/adminIcon3.png",
    title: "Call Center Admin",
    description: "Call Center Admin Managed, Create Call Center Admin",
    to: "call-center-admin",
  },
  {
    id: 5,
    icon: "/images/adminIcon3.png",
    title: "CSE Admin",
    description: "CSE  Admin Managed, Create CSE Admin",
    to: "cse-admin",
  },
  {
    id: 6,
    icon: "/images/adminIcon3.png",
    title: "Technician Admin",
    description: "Technician Admin Managed, Create Technician Admin",
    to: "technician-admin",
  },
];

const AdminUserMgtHome = () => {
  const { dashboardData } = useOutletContext();

  const userArr = MANAGEDUSER.map((user) => {
    const currentUser = dashboardData?.userCategories?.filter(
      (currUser) =>
        currUser.userCategoryName.toLowerCase() === user.title.toLowerCase()
    );

    return {
      ...user,
      totalUsers: currentUser?.[0]?.totalCount,
    };
  });

  return (
    <Stack spacing={1}>
      <div className="position-relative">
        <BackBtn inset="0" />
        <PageHeading>Admin Users</PageHeading>
      </div>

      <UserCardsContainer>
        {userArr.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </UserCardsContainer>
    </Stack>
  );
};

export default AdminUserMgtHome;

const UserCardsContainer = styled(GridCardsContainer)`
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;
