import { useState } from "react";
import CollaboratorsManaged from "../CollaboratorsManaged";
import GlobalBtn from "../../../../components/globalcomponents/GlobalBtn";
import {
  BackBtn,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import CreateCSE from "../../../../components/admincomponents/usermanagement/createuserforms/CreateCSE";

const CSEManaged = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const openModal = () => setShowRegistrationForm(true);
  const closeModal = () => setShowRegistrationForm(false);

  return (
    <>
      <div className="position-relative">
        <BackBtn inset="0" />
        <PageHeading>CSE Managed</PageHeading>
        <GlobalBtn
          onClick={openModal}
          className="position-absolute end-0 top-0"
          width="max-content"
          px="1rem"
          py=".6rem"
          fw="400"
          fs="1rem"
        >
          Create CSE
        </GlobalBtn>
      </div>

      <CollaboratorsManaged collaborator="CSE" role="cse"/>

      {showRegistrationForm && (
        <CreateCSE isOpen={showRegistrationForm} closeModal={closeModal} />
      )}
    </>
  );
};

export default CSEManaged;
