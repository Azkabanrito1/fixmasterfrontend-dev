import styled from "styled-components";
import { useState } from "react";
import { PageHeading } from "../../../components/globalcomponents/Utilities";
import TrainingCalendar from "./TrainingCalendar";
import AddCseTraining from "../../../components/franchiseecomponents/csemanagement/modals/AddCseTraining";
import { getTrainingInvitations } from "../../../redux/franchisee/actions";
import { AiOutlinePlus } from "react-icons/ai";
import useFetch from "../../../hooks/useFetch";

const CseTraining = () => {
  const [isAddTrainingModalOpen, setIsAddTrainingModalOpen] = useState(false);

  const events = [];
  const response = useFetch({
    action: getTrainingInvitations,
    deps: [isAddTrainingModalOpen],
  });

  if (response?.length) {
    events.push(...response);
  }

  const openAddTrainingModal = () => {
    setIsAddTrainingModalOpen(true);
  };

  return (
    <>
      <PageHeading>CSE Training Management</PageHeading>
      <TrainingCalendar events={events} />
      <AddTrainingBtn>
        <button
          id="add-training"
          onClick={openAddTrainingModal}
          style={{ cursor: "pointer" }}
        >
          <AiOutlinePlus />
        </button>
        <label htmlFor="add-training">Add Training</label>
      </AddTrainingBtn>
      {isAddTrainingModalOpen && (
        <AddCseTraining
          isOpen={isAddTrainingModalOpen}
          closeModal={() => setIsAddTrainingModalOpen(false)}
        />
      )}
    </>
  );
};

export default CseTraining;

const AddTrainingBtn = styled.div`
  display: grid;
  place-items: center;
  gap: 1rem;
  margin-top: 3rem;

  button {
    display: grid;
    place-items: center;
    width: 50px;
    aspect-ratio: 1;
    border: none;
    border-radius: 8px;
    font-size: 36px;
    color: #fff;
    background-color: var(--clr-primary);
    transition: 0.3s ease;

    &:hover {
      background-color: #404040;
    }
  }

  label {
    color: var(--clr-primary);
  }
`;
