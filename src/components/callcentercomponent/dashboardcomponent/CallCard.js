import styled from "styled-components";
import { GridCardsContainer } from "../../globalcomponents/Utilities";
import SingleCallCard from "./SingleCallCard";

const CallCard = () => {
  const cards = [
    {
      id: 0,
      icon: "/images/missed.png",
      title: "Missed Calls",
      description: "View all missed calls",
      to: "/call-center/call-logs/missed",
      notificationCount: null,
      color: "#f37238",
    },
    {
      id: 1,
      icon: "/images/received.png",
      title: "Received Calls",
      description: "View all recived calls.",
      to: "/call-center/call-logs/received",
      notificationCount: null,
      color: "#f37238",
    },
    {
      id: 2,
      icon: "/images/schedule.png",
      title: "Schedule Calls",
      description: "View all schedule calls",
      to: "/call-center/schedule",
      notificationCount: null,
      color: "#f37238",
    },
  ];
  return (
    <CallContainer>
      {cards.map((call) => {
        return <SingleCallCard key={call.id} call={call} />;
      })}
    </CallContainer>
  );
};

export default CallCard;

export const CallContainer = styled(GridCardsContainer)`
  --gap: 1.5rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--gap);
`;
