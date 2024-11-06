import styled from "styled-components";
import {
  PageHeading,
  BackBtn,
} from "../../../components/globalcomponents/Utilities";
// import format from "date-fns/format";
// import { useParams } from "react-router";

const ViewTraining = ({ events }) => {
  console.log(events);
  // const viewTemplate = events?.map((event) => {
  //   return (
  //     <div key={event.id}>
  //       <EventTitle>{event.title}</EventTitle>

  //       <div className="row mt-4">
  //         <div className="col">
  //           <Topic>Type:{event.trainingTypes}</Topic>
  //         </div>
  //         <div className="col">
  //           <Topic>
  //             Date:
  //             <span className="mx-2">
  //               {format(new Date(event.start), "PP")}
  //             </span> -{" "}
  //             <span className="mx-2">{format(new Date(event.end), "PP")}</span>
  //           </Topic>
  //         </div>
  //       </div>

  //       <div className="row mt-4">
  //         <div className="col">
  //           <Topic>Time:</Topic>{" "}
  //           <span className="mx-2">{format(new Date(event.start), ("p")}</span> -{" "}
  //           <span className="mx-2">{format(new Date(event.end), ("p")}</span>
  //         </div>
  //         <div className="col">
  //           <Topic>Attendance: {event.attendance}</Topic>
  //         </div>
  //       </div>

  //       <div className="mt-4 row">
  //         <div className="col">
  //           <Topic>Attending CSEs: </Topic>
  //           <ul>
  //             <li>{event.technicians}</li>
  //           </ul>
  //         </div>
  //         <div className="col">
  //           <Topic>Venue/Link: {event.venue}</Topic>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // });
  return (
    <div>
      <div className="mb-4">
        <BackBtn />
        <PageHeading>Technician Training Management</PageHeading>
      </div>
      {/* {viewTemplate} */}
    </div>
  );
};

export default ViewTraining;

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
