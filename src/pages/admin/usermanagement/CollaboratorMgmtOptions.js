import styled from "styled-components";
import UserCard from "../../../components/admincomponents/usermanagement/UserCard";
import {
  BackBtn,
  GridCardsContainer,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { Link } from "react-router-dom";

const CollaboratorMgmtOptions = ({ collaborator, createVacancy }) => {
  const layoutData = [
    {
      id: 0,
      icon: "/images/adminIcon1.jpg",
      title: `${collaborator} Managed`,
      description: `View, activate and de-activate ${collaborator} Managed.`,
      to: "managed",
    },
    {
      id: 1,
      icon: "/images/adds.png",
      title: "Declaration",
      description: "Add, view and edit preboarding & onboarding declarations",
      to: "declarations",
    },
    {
      id: 2,
      icon: "/images/teaching.png",
      title: "Training Documents, MCQs & Exams",
      description:
        "Add, view and update training documents, MCQ and interview questions",
      to: "training",
    },
    {
      id: 3,
      icon: "/images/group.png",
      title: "Onboarding Requirements",
      description: "Add, view and update onboarding requirements",
      to: "onboarding",
    },
    {
      id: 4,
      icon: "/images/welcome.png",
      title: "Messages",
      description: `Add, view and update message for new ${collaborator}`,
      to: "welcome-messages",
    },
    // {
    //   id: 5,
    //   icon: "/images/stars.png",
    //   title: "Ratings Parameters & Settings",
    //   description: `Add, view and update ratings parameters for  ${collaborator}`,
    //   to: "ratings",
    // },
  ];

  return (
    <>
      <div className="position-relative mb-5">
        <BackBtn inset="0" />
        <PageHeading>{collaborator}</PageHeading>
        <div>
          <Link
            onClick={createVacancy}
            className="position-absolute top-0 end-0 btn"
            style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
            width="max-content"
            px="2em"
          >
            Create Vacancy
          </Link>
        </div>
      </div>

      <UserCardsContainer>
        {layoutData.map((data) => (
          <UserCard key={data.id} user={data} />
        ))}
      </UserCardsContainer>
    </>
  );
};

export default CollaboratorMgmtOptions;

export const UserCardsContainer = styled(GridCardsContainer)`
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;
