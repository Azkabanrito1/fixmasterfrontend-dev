import styled from "styled-components";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import { format, parseISO } from "date-fns";

const ViewTrainingDetails = ({ isOpen, closeModal, events }) => {
  const trainingTypes = [
    { id: 1, name: "Periodic Training" },
    { id: 2, name: "Performance Training" },
    { id: 3, name: "Specific Training" },
  ];

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader closeModal={closeModal} />

      {events.map((event) => {
        const eventDate = parseISO(event.time);
        return (
          <div key={event.id}>
            <EventTitle>{event.title}</EventTitle>

            <div className="row mt-4">
              <div className="col">
                <Topic>Type:</Topic> {trainingTypes[event.type - 1].name}
              </div>
              <div className="col">
                <Topic>Date:</Topic> {format(eventDate, "EEEE, do MMMM, yyyy")}
              </div>
            </div>

            <div className="row mt-4">
              <div className="col">
                <Topic>Time:</Topic>{" "}
                {eventDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="col">
                <Topic>Attendance: </Topic> {event.attendance}
              </div>
            </div>

            <div className="mt-4 row">
              <div className="col">
                <Topic>Attending CSEs: </Topic>
                <ul>
                  {event.attendingCSE.map((cse) => {
                    return <li key={cse.id}>{cse.name}</li>;
                  })}
                </ul>
              </div>
              <div className="col">
                <Topic>Venue/Link: </Topic> {event.venue}
              </div>
            </div>
          </div>
        );
      })}
    </GlobalModal>
  );
};

export default ViewTrainingDetails;

const EventTitle = styled.h3`
  width: max-content;
  padding: 1rem;
  border-radius: 0.5rem;
  color: var(--clr-primary);
  background-color: #fff0e9;
  font-size: 1.2rem;
  text-transform: capitalize;
`;

const Topic = styled.span`
  color: #a1a1a1;
  font-weight: 700;
`;
