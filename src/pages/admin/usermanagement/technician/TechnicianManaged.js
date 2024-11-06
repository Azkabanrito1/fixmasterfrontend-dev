import { useState } from "react";
import CollaboratorsManaged from "../CollaboratorsManaged";
import GlobalBtn from "../../../../components/globalcomponents/GlobalBtn";
import {
  BackBtn,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import CreateTechnician from "../../../../components/admincomponents/usermanagement/createuserforms/CreateTechnician";

const extraOptions = [
  {
    id: 3,
    icon: "/images/rings.png",
    title: "Technician - QA",
    description: "View relationships between Technicians and QA ",
    to: "mappings",
  },
];

const TechnicianManaged = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const openModal = () => setShowRegistrationForm(true);
  const closeModal = () => setShowRegistrationForm(false);

  return (
    <>
      <div className="position-relative">
        <BackBtn inset="0" />
        <PageHeading>Technician Managed</PageHeading>
        <GlobalBtn
          onClick={openModal}
          className="position-absolute end-0 top-0"
          width="max-content"
          px="1rem"
          py=".6rem"
          fw="400"
          fs="1rem"
        >
          Create Technician
        </GlobalBtn>
      </div>

      <CollaboratorsManaged
        collaborator="technician"
        extraOptions={extraOptions}
        role="technician"
      />

      {showRegistrationForm && (
        <CreateTechnician
          isOpen={showRegistrationForm}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default TechnicianManaged;
