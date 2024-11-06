import { useState } from "react";
import GlobalCalendar from "../../../../globalcomponents/GlobalCalendar";
import styled from "styled-components";

const UpcomingEvent = ({ events }) => {
  const [date, setDate] = useState(new Date());

  const eventDates = events?.map(
    (event) => new Date(event?.start?.slice(0, 10))
  );
  let modEvents = events?.map((event) => {
    return { date: new Date(event?.start?.slice(0, 10)), title: event.title };
  });

  if (modEvents) {
    modEvents = modEvents?.sort(
      (objA, objB) => Number(objA.date) - Number(objB.date)
    );
  }

  const eventsTemplate = modEvents?.map((event) => {
    return (
      event.date.getFullYear() === date.getFullYear() &&
      event.date.getMonth() === date.getMonth() && (
        <Event key={`${event.title}-${event.date.getDate()}`}>
          <span className="date">{event.date.getDate()}</span>
          <span className="event">{event.title}</span>
        </Event>
      )
    );
  });

  return (
    <EventsContainer>
      <GlobalCalendar
        eventDates={eventDates}
        date={date}
        updateDate={setDate}
      />
      <div>{eventsTemplate}</div>
    </EventsContainer>
  );
};

export default UpcomingEvent;

const EventsContainer = styled.div`
  h2 {
    margin-block: 1.8rem 1rem;
    font-size: 20px;
    font-weight: 700;
  }
`;

const Event = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
  padding: 20px 13px;
  border-radius: 10px;
  background-color: #f8e9e2;

  .date {
    display: grid;
    place-items: center;
    width: 45px;
    aspect-ratio: 1;
    border-radius: 50%;
    color: #333333;
    background-color: #f2f2f2;
  }
`;
