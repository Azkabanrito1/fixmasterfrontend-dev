import styled from "styled-components";
import UserCard from "../../../components/admincomponents/usermanagement/UserCard";
import {
  GridCardsContainer,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { PATH_ADMIN } from "../../../routes/paths";
import { Stack } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const managedUser = [
  {
    id: 0,
    icon: "/images/adminIcon2.jpg",
    title: "Customer",
    role: "customer",
    description: "Individual, Commercial & Estates.",
    to: PATH_ADMIN.customerMgmt,
  },
  {
    id: 1,
    icon: "/images/adminIcon1.jpg",
    title: "Franchisee",
    role: "franchisee",
    description: "Franchisee Managed, Onboarding, Target & Bonuses...",
    to: PATH_ADMIN.franchiseeMgmt,
  },
  {
    id: 2,
    icon: "/images/adminIcon1.jpg",
    title: "QA Master",
    role: "qa",
    description: "QA Master Managed, Onboarding, Target & Bonuses...",
    to: PATH_ADMIN.qamasterMgmt,
  },
  {
    id: 3,
    icon: "/images/adminIcon1.jpg",
    title: "CSE",
    role: "cse",
    description:
      "Cse Managed, Training Doc & MCQs, Onboarding, Target & Bonuses...",
    to: PATH_ADMIN.cseMgmt,
  },
  {
    id: 4,
    icon: "/images/adminIcon1.jpg",
    title: "Technician",
    role: "technician",
    description:
      "Tech Managed, Training Doc & MCQs, Onboarding, Target & Bonuses...",
    to: PATH_ADMIN.technicianMgmt,
  },
  {
    id: 5,
    icon: "/images/adminIcon1.jpg",
    title: "Supplier",
    role: "supplier",
    description:
      "Supplier Managed, Training Doc & MCQs, Onboarding, Target & Bonuses...",
    to: PATH_ADMIN.supplierMgmt,
  },
  {
    id: 6,
    icon: "/images/adminIcon1.jpg",
    title: "Call Center Operator",
    role: "cco",
    description:
      "Call center Operator, Training Doc & MCQs, Onboarding, Target & Bonuses...",
    to: PATH_ADMIN.ccoMgmt,
  },
  {
    id: 7,
    icon: "/images/adminIcon3.png",
    title: "Admin Users",
    role:"admin",
    description: "HR Admin, Franchisee Admin, Supplier Admin...",
    to: PATH_ADMIN.adminMgmt,
  },
];

const UserManagementHome = () => {
  const { dashboardData } = useOutletContext();
  const data = dashboardData?.userCategories;

  const adminUsersArr = data?.filter((user) =>
    user?.userCategoryName?.toLowerCase().includes("admin")
  );

  const totalAdminUsers = adminUsersArr?.reduce(
    (acc, user) => acc + user?.totalCount,
    0
  );

  const userArr = managedUser.map((user) => {
    const currentUser = data?.filter(
      (currUser) => currUser?.userCategoryName?.toLowerCase() === user?.role?.toLowerCase()
    );

    if (user?.role?.toLowerCase().includes("admin")) {
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
    <Stack spacing={4}>
      <PageHeading>User Management</PageHeading>
      <UserCardsContainer>
        {userArr.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </UserCardsContainer>
    </Stack>
  );
};

export default UserManagementHome;

export const UserCardsContainer = styled(GridCardsContainer)`
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;
