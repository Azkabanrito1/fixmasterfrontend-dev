import { Button } from "@mui/material";
import styled from "styled-components";

const NotificationBar = ({ notifications, openNotifications }) => {
  const notTemplate = notifications?.map((not) => (
    <marquee key={not.id}>{not.message}</marquee>
  ));

  return (
    <Bar>
      <img src="/images/bell.png" alt="" />
      {/* {notTemplate} */}
      <marquee behavior="" direction="left">
        You have a new notification
      </marquee>
      <Button
        sx={{
          textTransform: "capitalize",
          color: "var(--clr-primary)",
          textDecoration: "underline",
        }}
        onClick={() => openNotifications()}
      >
        View All
      </Button>
    </Bar>
  );
};

export default NotificationBar;

const Bar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background-color: #f2f2f2;
  grid-column: span 2;

  font-size: 0.8rem;

  img {
    position: absolute;
    left: 10px;
    top: 50%;
    padding-right: 1rem;
    transform: translateY(-50%);
    background-color: #f2f2f2;
    z-index: 1;
  }

  marquee {
    display: flex;
    padding-inline: 50px 120px;
  }

  button {
    position: absolute;
    top: 50%;
    right: 10px;
    width: max-content;
    background-color: #f2f2f2;
    transform: translateY(-50%);
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    grid-column: span 3;
  }
`;
