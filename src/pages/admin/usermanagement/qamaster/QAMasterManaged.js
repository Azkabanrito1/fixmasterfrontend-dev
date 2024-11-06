import { useState } from "react";
import CollaboratorsManaged from "../CollaboratorsManaged";
import GlobalBtn from "../../../../components/globalcomponents/GlobalBtn";
import {
  BackBtn,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import CreateQA from "../../../../components/admincomponents/usermanagement/createuserforms/CreateQA";

const QAsManaged = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const openModal = () => setShowRegistrationForm(true);
  const closeModal = () => setShowRegistrationForm(false);

  return (
    <>
      <div className="position-relative">
        <BackBtn inset="0" />
        <PageHeading>QAs Managed</PageHeading>
        <GlobalBtn
          onClick={openModal}
          className="position-absolute end-0 top-0"
          width="max-content"
          px="1rem"
          py=".6rem"
          fw="400"
          fs="1rem"
        >
          Create QA
        </GlobalBtn>
      </div>

      <CollaboratorsManaged collaborator="QA master" role="qa"/>

      {showRegistrationForm && (
        <CreateQA isOpen={showRegistrationForm} closeModal={closeModal} />
      )}
    </>
  );
};

export default QAsManaged;
