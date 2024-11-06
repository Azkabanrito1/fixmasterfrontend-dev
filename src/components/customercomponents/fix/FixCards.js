import { GridCardsContainer } from "../../globalcomponents/Utilities";
import SingleFixCard from "./SingleFixCard";

const FixCards = ({ fixData }) => {
  const cards = [
    {
      id: 0,
      icon: "/images/new-fix.png",
      title: "New Fix",
      description: "View, edit and update newly booked jobs.",
      to: "/customer/jobs/new-fix",
      notificationCount: fixData?.newFixNotificationCount,
      color: "#FF9B04",
    },
    {
      id: 1,
      icon: "/images/ongoing-fix.png",
      title: "Ongoing Fix",
      description: "View, rate job fix stages, and confirm completion.",
      to: "/customer/jobs/ongoing-fix",
      notificationCount: fixData?.ongoingFixNotificationCount,
      color: "#7B61FF",
    },
    {
      id: 2,
      icon: "/images/warranty-fix.png",
      title: "Warranty Fix",
      description: "View, buy extended warranty for completed jobs.",
      to: "/customer/jobs/warranty-fix",
      notificationCount: null,
      color: "#F37238",
    },
    {
      id: 3,
      icon: "/images/completed-fix.png",
      title: "Closed Fix",
      description: "View all closed jobs...",
      to: "/customer/jobs/closed-fix",
      notificationCount: null,
      color: "#11E981",
    },
  ];

  return (
    <GridCardsContainer>
      {cards.map((card) => (
        <SingleFixCard key={card.id} fix={card} />
      ))}
    </GridCardsContainer>
  );
};

export default FixCards;
