import { useState, useEffect } from "react";
import { PageHeading } from "../../../components/globalcomponents/Utilities";
import AddTechTraining from "../../../components/qamastercomponent/techmanagement/modal/AddTechTraining";
import { useGetAllAssignTechnician } from "../../../hooks/useQueries/useAdmin";
import AddBtn from "../../../components/franchiseecomponents/jobsmanagement/AddBtn";
import TrainingCalendar from "../../../components/globalcomponents/TrainingCalendar";

const TechTraining = () => {
  const [isAddTrainingModalOpen, setIsAddTrainingModalOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const { data: technicianTrainingData } = useGetAllAssignTechnician();
  // console.log(technicianTrainingData?.data);

  useEffect(() => {
    if (technicianTrainingData) {
      const newEvents = technicianTrainingData?.data?.map((event) => ({
        id: event.id,
        title: event.title,
        start: new Date(event.fromDate),
        end: new Date(event.toDate),
        technicians: event.assignedTrainingId,
        trainingTypes: event.trainingTypeId,
        attendance: event.attendanceMode,
        venue: event.venueLink,
        note: event.message,
      }));
      setEvents(newEvents);
    }
  }, [technicianTrainingData?.data]);
  // console.log(events);
  const openAddTrainingModal = () => {
    setIsAddTrainingModalOpen(true);
  };

  return (
    <div>
      <PageHeading>Technician Training Management</PageHeading>
      <TrainingCalendar events={events} />
      <AddBtn
        mt="1rem"
        className="mx-auto"
        text="Add Training"
        action={openAddTrainingModal}
        id="add-training"
      />
      {isAddTrainingModalOpen && (
        <AddTechTraining
          isOpen={isAddTrainingModalOpen}
          closeModal={() => setIsAddTrainingModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TechTraining;
