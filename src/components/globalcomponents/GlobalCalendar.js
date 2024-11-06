import styled from "styled-components";
import {
  differenceInDays,
  endOfMonth,
  startOfMonth,
  addMonths,
  subMonths,
} from "date-fns";

const GlobalCalendar = ({ eventDates, date, updateDate }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  const firstOfMonth = startOfMonth(date);
  const lastOfMonth = endOfMonth(date);
  const daysOfMonth = differenceInDays(lastOfMonth, firstOfMonth) + 1;
  const prefixDays = firstOfMonth.getDay() - 1;
  const events = eventDates?.map((event) => {
    return {
      year: event.getFullYear(),
      month: event.getMonth(),
      day: event.getDate(),
    };
  });

  function makeDaysOfMonth(noOfDays) {
    const template = Array.from(
      { length: noOfDays },
      (_, index) => index + 1
    ).map((_, index) => {
      const hasEvent = events?.filter(
        (event) =>
          event.month === date.getMonth() &&
          event.year === date.getFullYear() &&
          event.day === index + 1
      );
      return (
        <div
          key={index}
          className={`${hasEvent?.length > 0 ? "event-date" : ""} ${"hi"}`}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      );
    });
    return template;
  }

  const nextMonth = () => {
    const newDate = addMonths(date, 1);
    updateDate(newDate);
  };

  const prevMonth = () => {
    const newDate = subMonths(date, 1);
    updateDate(newDate);
  };

  return (
    <Calendar>
      <Title>
        <div>
          <button onClick={prevMonth}>
            <i className="fas fa-chevron-left"></i>
          </button>
        </div>
        <div>
          {months[date.getMonth()]} {date.getFullYear()}
        </div>
        <div>
          <button onClick={nextMonth}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </Title>

      <Days>
        {daysOfWeek.map((day, index) => (
          <div key={index} className={day === "S" ? "red" : ""}>
            {day}
          </div>
        ))}
      </Days>

      <Dates>
        {Array.from({ length: prefixDays }, (_, index) => index + 1).map(
          (_, index) => (
            <div key={index}></div>
          )
        )}
        {makeDaysOfMonth(daysOfMonth)}
      </Dates>
    </Calendar>
  );
};

export default GlobalCalendar;

const Calendar = styled.div`
  padding: 2rem 1rem;
  border-radius: 10px;
  background-color: #fff;

  & > div {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    align-items: center;
  }

  div {
    text-align: center;
  }

  button {
    appearance: none;
    border: none;
    padding-inline: 12px;
    background-color: transparent;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Title = styled.div`
  margin-bottom: 2rem;

  div:nth-child(1) {
    text-align: left;
  }

  div:nth-child(3) {
    text-align: right;
  }

  div:nth-child(1),
  div:nth-child(3) {
    grid-column: span 2;
  }

  div:nth-child(2) {
    grid-column: span 3;
    font-weight: bold;
  }
`;

const Days = styled.div`
  margin-bottom: 2rem;
  font-size: 13px;

  .red {
    color: #e01b1b;
  }
`;

const Dates = styled.div`
  gap: 10px 8px;
  font-size: 16px;
  font-weight: 600;
  color: #a1a1a1;

  div {
    display: grid;
    place-items: center;
    aspect-ratio: 1;
    padding: 6px;
  }

  .event-date {
    border-radius: 50%;
    background-color: #f8e9e2;
    color: #000;
  }
`;
