import GlobalModal from "../GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import { Button, Stack, Typography } from "@mui/material";
import JobFilters from "../../franchiseecomponents/jobsmanagement/JobFilters";
import useDateQueries from "../../../hooks/useDateQueries";
import GlobalInput from "../GlobalInput";
import { formatDistance } from "date-fns";
import styled from "styled-components";

const Notification = ({ notification }) => {
  return (
    <NotificationRow>
      <Typography fontSize="14px">{notification.subject}</Typography>
      <Typography fontWeight={500} fontSize="14px">
        {notification.messages}
      </Typography>
      <Typography color={"#959494"} fontSize="14px">
        {formatDistance(new Date(notification.dateCreated), new Date(), {
          addSuffix: true,
        })}
      </Typography>
      <Button
        sx={{
          textDecoration: "underline",
          textTransform: "none",
          textUnderlineOffset: "3px",
          color: "var(--clr-primary)",
          fontSize: "14px",
        }}
      >
        Mark as read
      </Button>
    </NotificationRow>
  );
};

const NotificationsModal = ({ isOpen, closeModal, notifications }) => {
  const { dateQueries, setDateQueries } = useDateQueries();
  // console.log(notifications);

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={"Notifications"} closeModal={closeModal} />

      <Stack direction="row" justifyContent={"space-between"} mb={4}>
        <JobFilters dateQueries={dateQueries} setDateQueries={setDateQueries} />
        <GlobalInput
          inputType="search"
          inputPlaceholder="Search"
          iconSrc="/images/search.png"
        />
      </Stack>

      <Stack>
        {notifications.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}

        {!notifications.length && <p>There are no new notifications</p>}
      </Stack>
    </GlobalModal>
  );
};

export default NotificationsModal;

const NotificationRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 3fr 1fr 1fr;
  padding: 10px;
  border-bottom: 1px solid #a1a1a138;

  & > p {
    padding: 10px;
  }
`;
