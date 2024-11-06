import styled from "styled-components";
import {
  GroupHeading,
  GridCardsContainer,
} from "../../globalcomponents/Utilities";
import { PATH_ADMIN } from "../../../routes/paths";
import { Stack } from "@mui/material";
import UserCard from "../usermanagement/UserCard";

const MANAGEDUSER = [
  {
    id: 0,
    icon: "/images/adminIcon2.jpg",
    title: "Customer",
    role: "Customer",
    to: PATH_ADMIN.customerMgmt,
  },
  {
    id: 1,
    icon: "/images/adminIcon1.jpg",
    title: "Franchisee",
    role: "Franchisee",
    to: PATH_ADMIN.franchiseeMgmt,
  },
  {
    id: 2,
    icon: "/images/adminIcon1.jpg",
    title: "QA Master",
    role: "QA",
    to: PATH_ADMIN.qamasterMgmt,
  },
  {
    id: 3,
    icon: "/images/adminIcon1.jpg",
    title: "CSE",
    role: "CSE",
    to: PATH_ADMIN.cseMgmt,
  },
  {
    id: 4,
    icon: "/images/adminIcon1.jpg",
    title: "Technician",
    role: "Technician",
    to: PATH_ADMIN.technicianMgmt,
  },
  {
    id: 5,
    icon: "/images/adminIcon1.jpg",
    title: "Supplier",
    role: "Supplier",
    to: PATH_ADMIN.supplierMgmt,
  },
  {
    id: 6,
    icon: "/images/adminIcon1.jpg",
    title: "Call Center Operator",
    role: "CCO",
    to: PATH_ADMIN.ccoMgmt,
  },
  {
    id: 7,
    icon: "/images/adminIcon3.png",
    title: "Admin Users",
    role: "Admin Users",
    to: PATH_ADMIN.adminMgmt,
  },
  // {
  //   id: 8,
  //   icon: "/images/adminIcon3.png",
  //   title: "WYSIWIG",
  //   role: "wisywig",
  //   to: PATH_ADMIN.editor,
  // },
];

const UsersSection = ({ data }) => {
  const adminUsersArr = data?.filter((user) =>
    user.userCategoryName.toLowerCase().includes("admin")
  );

  const totalAdminUsers = adminUsersArr?.reduce(
    (acc, user) => acc + user.totalCount,
    0
  );

  const userArr = MANAGEDUSER.map((user) => {
    const currentUser = data?.filter(
      (currUser) => currUser.userCategoryName === user.role
    );

    if (user.role.toLowerCase().includes("admin")) {
      return {
        ...user,
        totalUsers: totalAdminUsers,
      };
    }

    return {
      ...user,
      totalUsers: currentUser?.[0]?.totalCount,
    };
  });

  return (
    <Stack spacing={0}>
      <GroupHeading>Users</GroupHeading>
      <UserCardsContainer>
        {userArr.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </UserCardsContainer>
    </Stack>
  );
};

export default UsersSection;

const UserCardsContainer = styled(GridCardsContainer)`
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;
