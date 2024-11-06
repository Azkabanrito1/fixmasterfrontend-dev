import React from "react";
import {
  GridCardsContainer,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import UserCard from "../../../components/admincomponents/usermanagement/UserCard";

const UserManage = () => {
  const UserManage = [
    {
      id: 1,
      icon: "/images/adminIcon1.jpg",
      title: "Franchisee",
      description: "Franchisee Managed, Onboarding, Target & Bonuses...",
      to: "manage-franchisee",
    },
    {
      id: 2,
      icon: "/images/adminIcon1.jpg",
      title: "QA Master",
      description: "QA Master Managed, Onboarding, Target & Bonuses...",
      to: "manage-qa",
    },
  ];
  return (
    <>
      <PageHeading>User Management</PageHeading>
      <GridCardsContainer>
        {UserManage.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </GridCardsContainer>
    </>
  );
};

export default UserManage;
