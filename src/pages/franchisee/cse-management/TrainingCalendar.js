import { useState } from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import scrollgrid from "@fullcalendar/scrollgrid";
import interaction from "@fullcalendar/interaction";
import ViewTrainingDetails from "../../../components/franchiseecomponents/csemanagement/modals/ViewTrainingDetails";
import { endOfDay, parseISO } from "date-fns";

const TrainingCalendar = ({ events }) => {
  const dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [activeEvents, setActiveEvents] = useState([]);

  const handleDayClick = (day) => {
    const dayEvents = events.filter(
      (event) => event.start.slice(0, event.start.indexOf("T")) === day.dateStr
    );
    if (dayEvents.length) {
      setIsDetailsModalOpen(true);
      setActiveEvents(dayEvents);
    }
  };

  function renderEventContent(eventDay) {
    const event = eventDay.event;
    const numEvents = events.filter((evt) => {
      return (
        event.start <= parseISO(evt.start) &&
        parseISO(evt.start) < endOfDay(event.start)
      );
    }).length;
    return (
      <div>
        {numEvents > 0 && (
          <div className="fc-number-of-events">{`${numEvents} ${
            numEvents > 1 ? "trainings" : "training"
          }`}</div>
        )}
      </div>
    );
  }

  return (
    <>
      <CalendarStyle>
        <FullCalendar
          dayCellClassNames={["dayCell"]}
          dayCellContent={(date) => {
            const dayOfWeek = dow[date.dow];
            const dayCellTemplate = (
              <div className="dayContent">
                <span className="dayOfWeek">{dayOfWeek}</span>
                <span className="dayNumber">{date.dayNumberText}</span>
              </div>
            );
            return dayCellTemplate;
          }}
          dayHeaders={false}
          dateClick={(date) => handleDayClick(date)}
          displayEventEnd={false}
          displayEventTime={false}
          events={events}
          eventColor="rgb(255 255 255 / 0)"
          eventContent={(eventDay) => renderEventContent(eventDay)}
          eventDisplay="block"
          initialView="dayGridMonth"
          headerToolbar={{ left: "prev", center: "title", right: "next" }}
          plugins={[dayGridPlugin, interaction, scrollgrid]}
          showNonCurrentDates={false}
          eventDidMount={(event) => {
            event.el.closest(".fc-day").classList.add("hasEvent");
          }}
        />
      </CalendarStyle>
      {isDetailsModalOpen && (
        <ViewTrainingDetails
          isOpen={isDetailsModalOpen}
          closeModal={() => setIsDetailsModalOpen(false)}
          events={activeEvents}
        />
      )}
    </>
  );
};

export default TrainingCalendar;

const CalendarStyle = styled.div`
  .fc {
    & * {
      border: none;
    }

    tr[role="row"]:not(:last-child) {
      border-bottom: 10px solid #f2f2f2;
    }

    tr[role="row"]:last-child {
      display: none;
    }

    .fc-scrollgrid {
      border-left-width: 0;
      border-top-width: 0;
    }

    .fc-daygrid-day.dayCell.hasEvent {
      cursor: pointer;
    }

    .fc-toolbar-title {
      font-size: 20px;
      font-weight: 700;
    }

    .fc-scrollgrid-sync-inner {
      font-size: 16px;
    }

    .fc-daygrid-block-event .fc-event-time,
    .fc-daygrid-block-event .fc-event-title {
      color: white;
      font-size: 12px;
    }

    .fc-daygrid-event-harness:nth-of-type(n + 2) {
      display: none;
    }

    .fc-daygrid-day-top {
      justify-content: center;
      padding-top: 0.8rem;
      font-size: 18px;
      font-weight: 500;
    }

    .fc-daygrid-day-number {
      text-decoration: none;
      color: #000;
    }

    .fc-button-primary {
      border: none;
      color: #000;
      background-color: transparent;

      &:hover {
        background-color: var(--clr-primary);
        color: #fff;
      }

      &:focus {
        box-shadow: 0 0 0 0.2rem rgb(76 91 106 / 10%);
      }
    }

    .fc-event-main {
      text-align: center;
      font-size: 12px;
    }

    .dayContent {
      display: grid;
      gap: 8px;
      place-items: center;
      text-decoration: none;

      .dayOfWeek {
        font-size: 12px;
        opacity: 0.8;
      }

      .dayNumber {
        font-size: 20px;
      }
    }

    .fc-license-message {
      display: none !important;
    }

    .hasEvent {
      background-color: var(--clr-primary);
      color: #fff;

      .fc-daygrid-day-number {
        color: #fff;
      }
    }
  }
`;
