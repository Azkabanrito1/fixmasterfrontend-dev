import { Button } from "@mui/material";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import styled from "styled-components";
import moment from "moment";

const Notifications = ({ closeModal, fixId, isOpen }) => {
  const notifications = {
    createDate: new Date(),
    jobStatus: "Ongoing",
    unread: [
      {
        id: 1,
        message: "Your Quotation is ready. Tap to view",
        duration: "3hrs ago",
      },
      {
        id: 2,
        message: "Your Quotation is ready. Tap to view",
        duration: "3hrs ago",
      },
      {
        id: 3,
        message: "Your Quotation is ready. Tap to view",
        duration: "3hrs ago",
      },
      {
        id: 4,
        message: "Your Quotation is ready. Tap to view",
        duration: "3hrs ago",
      },
    ],
    allNotifications: [
      {
        id: 1,
        message: "Your Quotation is ready. Tap to view",
        duration: "3hrs ago",
      },
      {
        id: 2,
        message: "Your Quotation is ready. Tap to view",
        duration: "3hrs ago",
      },
      {
        id: 3,
        message: "Your Quotation is ready. Tap to view",
        duration: "3hrs ago",
      },
      {
        id: 4,
        message: "Your Quotation is ready. Tap to view",
        duration: "3hrs ago",
      },
    ],
  };

  return (
    <GlobalModal closeModal={closeModal} isOpen={isOpen}>
      <AltModalHeader heading="Notifications" closeModal={closeModal} />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div style={{ color: "var(--clr-primary)" }}>
          <h3>Fix Ref: {fixId}</h3>
          <span>{moment(notifications?.createDate).format("DD/MM/YYYY")}</span>
        </div>
        <div className="text-center">
          <span className="text-muted fs-6">Job Status</span>
          <h4>{notifications?.jobStatus}</h4>
        </div>
      </div>

      <div>
        <FullWidthTitle>
          <h4 className="fs-5 fw-bold mb-0">Unread</h4>
          <Button sx={{ color: "var(--clr-primary)" }}>Mark all as read</Button>
        </FullWidthTitle>
        <NotificationsList>
          {notifications.unread.map((note) => (
            <li
              key={note.id}
              className="d-flex justify-content-between align-items-center"
            >
              <span>{note.message}</span>
              <span className="text-muted">{note.duration}</span>
            </li>
          ))}
        </NotificationsList>
      </div>

      <div>
        <FullWidthTitle>
          <h4 className="fs-5 fw-bold mb-0">All Notifications</h4>
        </FullWidthTitle>
        <NotificationsList>
          {notifications.allNotifications.map((note) => (
            <li
              key={note.id}
              className="d-flex justify-content-between align-items-center"
            >
              <span>{note.message}</span>
              <span className="text-muted">{note.duration}</span>
            </li>
          ))}
        </NotificationsList>
      </div>
    </GlobalModal>
  );
};

export default Notifications;

const FullWidthTitle = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 0.5rem;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -34px;
    width: calc(100% + 68px);
    height: 100%;
    background-color: #f9f9f9;
    z-index: -1;
  }
`;

const NotificationsList = styled.ul`
  li {
    position: relative;
    margin-bottom: 0.5rem;

    &::before {
      content: "";
      position: absolute;
      width: 10px;
      aspect-ratio: 1;
      border-radius: 50%;
      background-color: var(--clr-primary);
      top: 50%;
      left: -20px;
      transform: translateY(-50%);
    }
  }
`;
