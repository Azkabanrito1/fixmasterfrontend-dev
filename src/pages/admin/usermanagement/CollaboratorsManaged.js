import { GridCardsContainer } from "../../../components/globalcomponents/Utilities";
import UserCard from "../../../components/admincomponents/usermanagement/UserCard";

const CollaboratorsManaged = ({ collaborator, extraOptions = [], role }) => {
  let collaboratorManagedOptions = [
    {
      id: 0,
      icon: "/images/rings.png",
      title: `Active ${collaborator}`,
      description: `View, suspend and de-activate ${collaborator}s`,
      to: "active",
    },

    {
      id: 1,
      icon: "/images/teaching.png",
      title: `New ${collaborator}`,
      description: `View, accept and reject ${collaborator}s`,
      to: "new",
    },

    {
      id: 91,
      icon: "/images/rings.png",
      title: `Rejected ${collaborator}`,
      description: `View rejected ${collaborator}s`,
      to: "rejected",
    },

    {
      id: 92,
      icon: "/images/teaching.png",
      title: `${collaborator} Login Details`,
      description: `View ${collaborator}s' Login Details`,
      to: "log",
    },
    {
      id: 93,
      icon: "/images/teaching.png",
      title: `${collaborator} Guarantors' Information`,
      description: `View ${collaborator}s' Guarantors' Information`,
      to: "guarantors",
    },
    {
      id: 94,
      icon: "/images/teaching.png",
      title: `${collaborator} Bank Details`,
      description: `View ${collaborator}'s Bank Details`,
      to: "bank-details",
    },
    {
        id: 95,
        icon: "/images/teaching.png",
        title: `${collaborator} Withdrawal Request`,
        description: `Approve and Reject withdrawal requests`,
        to: "withdrawal",
      },
    {
      id: 96,
      icon: "/images/teaching.png",
      title: `Suspended ${collaborator}`,
      description: `View suspended ${collaborator}s`,
      to: "suspended",
    },
    ...extraOptions,
  ];
  const extraObj = {
    id: 2,
    icon: "/images/teaching.png",
    title: `Assign ${collaborator} Working Type`,
    description: `Contract, Freelance, Fulltime`,
    to: `${role}-working-type`,
  };

  if (
    collaborator.toLowerCase() === "technician" ||
    collaborator.toLowerCase() === "cse" ||
    collaborator.toLowerCase() === "cco"
  ) {
    collaboratorManagedOptions.push(extraObj);
  }
  return (
    <>
      <GridCardsContainer>
        {collaboratorManagedOptions.map((collaborator) => (
          <UserCard key={collaborator.id} user={collaborator} />
        ))}
      </GridCardsContainer>
    </>
  );
};

export default CollaboratorsManaged;
