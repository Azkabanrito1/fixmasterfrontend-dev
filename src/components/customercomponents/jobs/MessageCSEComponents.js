import { Button, Stack } from "@mui/material";
import { format } from "date-fns";
import moment from "moment";
import styled from "styled-components";

export const SearchBar = ({
  searchStr,
  handleChange,
  handleSubmit,
  recipient,
}) => {
  return (
    <StyledSearchBar>
      <Stack spacing={1}>
        <span className="fw-bold fs-5">{recipient?.name}</span>
        <span>{recipient?.role}</span>
      </Stack>

      {/* <form onSubmit={handleSubmit}>
        <input
          type="search"
          name="search"
          placeholder="Search..."
          value={searchStr}
          onChange={handleChange}
        />
      </form> */}
    </StyledSearchBar>
  );
};

export const SendMessageBar = ({ message, handleChange, handleSend }) => {
  return (
    <StyledSendMessage>
      <textarea
        className="me-3"
        type="text"
        name="message"
        id="message"
        placeholder="Type message..."
        rows={1}
        value={message}
        onChange={handleChange}
      />
      <Button onClick={handleSend}>
        <i className="fa fa-paper-plane"></i>
      </Button>
    </StyledSendMessage>
  );
};

export const Message = ({ message, id }) => {
  if (!message?.messages) return;

  return (
    <StyledMessage>
      <div
        className={`${
          message?.sentBy === id ? "sent" : "received"
        }  message-box`}
      >
        <span>{message?.messages}</span>
        <span className="time">
          {moment(message?.dateSent).format("D-MMM-YYYY LT")}
        </span>
      </div>
    </StyledMessage>
  );
};

export const MessageArea = styled.div`
  height: calc(100% - 250px);
  overflow-y: auto;
  position: relative;
`;

const StyledSearchBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  background-color: #f8b090;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 0 -28px;
    background-color: inherit;
    z-index: -1;
  }

  input {
    padding: 0.5em 1em;
    border: none;
    border-radius: 2em;
    font-size: 16px;
    background-color: #fafafa;
    color: #000;
  }
`;

const StyledSendMessage = styled.div`
  position: absolute;
  inset: auto 0 -32px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.1em;
  padding-block: 0.8rem;
  background-color: #f8b090;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 0 -28px;
    background-color: inherit;
    z-index: -1;
  }

  textarea {
    width: min(calc(100% - 80px), 400px);
    padding: 0.5em 1em;
    border: none;
    border-radius: 2em;
    font-size: 16px;
    resize: none;
    overflow: hidden;
  }

  button {
    padding: 0.4em;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 2px solid #fff;
    font-size: 1.2em;
    color: #fff;
  }
`;

const StyledMessage = styled.div`
  .message-box {
    position: relative;
    max-width: 55%;
    padding: 0.5em 1em;
    margin-bottom: 2em;
    border-radius: 2em;
    color: #000;
    /* overflow: hidden; */

    .time {
      position: absolute;
      bottom: -1.1rem;
      color: #000;
      font-size: 10px;
    }

    &.sent {
      margin-left: 1rem;
      margin-right: auto;
      background-color: #f8b090;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: -0.4rem;
        width: 0;
        height: 0;
        border-top: 0.5rem solid transparent;
        border-bottom: 0.5rem solid transparent;
        border-right: 0.5rem solid #f8b090;
        transform: translateY(-50%);
        z-index: 1;
      }

      .time {
        left: 0.1rem;
      }
    }

    &.received {
      margin-right: 1rem;
      margin-left: auto;
      background-color: #b0ecb9;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        right: -0.4em;
        width: 0;
        height: 0;
        border-top: 0.5rem solid transparent;
        border-bottom: 0.5rem solid transparent;
        border-left: 0.5rem solid #b0ecb9;
        transform: translateY(-50%);
        z-index: 1;
      }

      & .time {
        right: 0.1rem;
      }
    }
  }
`;
