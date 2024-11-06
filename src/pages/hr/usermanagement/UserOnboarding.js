import React from "react";
import {
  GridCardsContainer,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import UserCard from "../../../components/admincomponents/usermanagement/UserCard";

const UserOnboarding = () => {
  const userOnboarding = [
    {
      id: 1,
      icon: "/images/adminIcon3.png",
      title: "Franchisee",
      description: "View, accept and reject franchisee",
      to: "new-franchisee",
    },
    {
      id: 2,
      icon: "/images/adminIcon3.png",
      title: "QA Master",
      description: "View, accept and reject qa master",
      to: "new-qa",
    },
  ];

  return (
    <>
      <PageHeading>User Onboarding</PageHeading>
      <GridCardsContainer>
        {userOnboarding.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </GridCardsContainer>
    </>
  );
};

export default UserOnboarding;
