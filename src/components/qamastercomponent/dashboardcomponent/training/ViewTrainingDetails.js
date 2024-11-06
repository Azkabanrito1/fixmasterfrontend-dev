import styled from "styled-components";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import {
  useGetAllTechnician,
  useGetTrainigType,
} from "../../../../hooks/useQueries/useAdmin";
import { useEffect, useState } from "react";
import format from "date-fns/format";

const ViewTrainingDetails = ({ isOpen, closeModal, events }) => {
  const [trainingTypes, setTrainingTypes] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  const { data: technicianInvite } = useGetAllTechnician();
  const { data: trainingTypeData } = useGetTrainigType();

  useEffect(() => {
    if (trainingTypeData) {
      const newTrainingType = trainingTypeData?.data?.map((item) => ({
        id: item.id,
        name: item.typeName,
      }));
      setTrainingTypes(newTrainingType);
    }
  }, [trainingTypeData]);

  useEffect(() => {
    if (technicianInvite) {
      const newTechArr = technicianInvite?.data?.map((item) => ({
        id: item.userId,
        name: item.userName,
      }));
      setTechnicians(newTechArr);
    }
  }, [technicianInvite]);

  const eventTemplate = events?.map((event) => {
    return (
      <div key={event.id}>
        <EventTitle>{event.title}</EventTitle>

        <div className="row mt-4">
          <div className="col">
            <Topic>Type:</Topic>
            {trainingTypes[event.trainingTypes - 1]?.name}
          </div>
          <div className="col">
            <Topic>Date:</Topic>
            <span style={{ marginLeft: "10px" }}>
              {format(new Date(event.start), "p")}
            </span>{" "}
            :
            <span style={{ marginLeft: "10px" }}>
              {format(new Date(event.end), "p")}
            </span>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <Topic>Time:</Topic>{" "}
            <span style={{ marginLeft: "10px" }}>
              {format(new Date(event.start), "p")}
            </span>
            :
            <span style={{ marginLeft: "10px" }}>
              {format(new Date(event.end), "p")}
            </span>
          </div>
          <div className="col">
            <Topic>Attendance: </Topic> {event.attendance}
          </div>
        </div>

        <div className="mt-4 row mb-4">
          <div className="col">
            <Topic>Attending Technicians: </Topic>
            {technicians[event?.technicians + 1]?.name}
          </div>
          <div className="col">
            <Topic>Venue/Link: </Topic> {event.venue}
          </div>
        </div>
      </div>
    );
  });
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader closeModal={closeModal} />
      {eventTemplate}
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
