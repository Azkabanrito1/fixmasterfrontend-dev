import { useState } from "react";
import CollaboratorsManaged from "../CollaboratorsManaged";
import GlobalBtn from "../../../../components/globalcomponents/GlobalBtn";
import {
  BackBtn,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import CreateFranchisee from "../../../../components/admincomponents/usermanagement/createuserforms/CreateFranchisee";

const FranchiseManaged = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const openModal = () => setShowRegistrationForm(true);
  const closeModal = () => setShowRegistrationForm(false);

  return (
    <>
      <div className="position-relative">
        <div className="mb-5">
          <BackBtn inset="0" />
          <PageHeading>Franchisee Managed</PageHeading>
        </div>
        <GlobalBtn
          onClick={openModal}
          className="position-absolute end-0 top-0"
          width="max-content"
          px="1rem"
          py=".6rem"
          fw="400"
          fs="1rem"
        >
          Create Franchisee
        </GlobalBtn>
      </div>

      <CollaboratorsManaged collaborator="Franchisee" role="franchisee" />

      {showRegistrationForm && (
        <CreateFranchisee
          isOpen={showRegistrationForm}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default FranchiseManaged;
