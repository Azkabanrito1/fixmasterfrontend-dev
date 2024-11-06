import React from "react";
import { Stack } from "@mui/material";
import UserCard from "../../../components/admincomponents/usermanagement/UserCard";
import {
  BackBtn,
  GridCardsContainer,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
function ReferralsManagement() {
  const masterData = [
    {
      id: 1,
      icon: "/images/adds.png",
      title: "Referrals Settings",
      description: "Add, view and edit referrals earnings",
      to: "create/referrals",
    },
    {
      id: 2,
      icon: "/images/adds.png",
      title: "Referral History",
      description: "View referral history",
      to: "referrals-records",
    },
  ];

  return (
    <Stack spacing={4}>
      <div>
        <BackBtn />
        <PageHeading>Referrals Management</PageHeading>
      </div>

      <GridCardsContainer>
        {masterData.map((data) => (
          <UserCard key={data.id} user={data} />
        ))}
      </GridCardsContainer>
    </Stack>
  );
}

export default ReferralsManagement;
