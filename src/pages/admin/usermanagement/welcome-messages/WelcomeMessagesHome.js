import { Stack } from "@mui/material";
import {
  BackBtn,
  GridCardsContainer,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import styled from "styled-components";
import UserCard from "../../../../components/admincomponents/usermanagement/UserCard";

const WelcomeMessagesHome = ({
  collaborator,
  hasInterviewStage = false,
  hasMCQStage = false,
}) => {
  const layoutData = [
    {
      id: 0,
      icon: "/images/welcome.png",
      title: `Preboarding Messages`,
      description: "Add, view and edit preboarding messages",
      to: "preboarding",
    },
    {
      id: 1,
      icon: "/images/welcome.png",
      title: `Onboarding Messages`,
      description: "Add, view and edit onboarding messages",
      to: "onboarding",
    },
    ...(hasMCQStage
      ? [
          {
            id: 2,
            icon: "/images/welcome.png",
            title: "MCQ Welcome Messages",
            description:
              "Add, view and edit messages that show before aptitude tests",
            to: "mcq",
          },
          {
            id: 3,
            icon: "/images/welcome.png",
            title: "MCQ Passed Messages",
            description:
              "Add, view and edit messages that show after passing aptitude tests",
            to: "mcq-passed",
          },
          {
            id: 4,
            icon: "/images/welcome.png",
            title: "MCQ Failed Messages",
            description:
              "Add, view and edit messages that show after failing aptitude tests",
            to: "mcq-failed",
          },
          {
            id: 5,
            icon: "/images/welcome.png",
            title: "MCQ Retake Messages",
            description:
              "Add, view and edit messages that show after failing aptitude tests",
            to: "mcq-retake",
          },
        ]
      : []),
    ...(hasInterviewStage
      ? [
          {
            id: 6,
            icon: "/images/welcome.png",
            title: "Interview Messages",
            description:
              "Add, view and edit messages that show before interview tests",
            to: "interview",
          },
        ]
      : []),
  ];

  return (
    <Stack spacing={4}>
      <div>
        <BackBtn />
        <PageHeading>{collaborator} Messages</PageHeading>
      </div>

      <UserCardsContainer>
        {layoutData.map((data) => (
          <UserCard key={data.id} user={data} />
        ))}
      </UserCardsContainer>
    </Stack>
  );
};

export default WelcomeMessagesHome;

const UserCardsContainer = styled(GridCardsContainer)`
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;
