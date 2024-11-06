import { useState } from "react";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import GlobalTextArea from "../../../globalcomponents/GlobalTextArea";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";

const AddDeclaration = ({
  addDeclaration,
  isOpen,
  closeModal,
  initDeclaration,
  editDeclaration,
}) => {
  const [declaration, setDeclaration] = useState(
    initDeclaration?.content || ""
  );
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setDeclaration(e.target.value);
  };

  const add = () => {
    if (!declaration) {
      setError("Please input a declaration");
      return;
    }

    if (initDeclaration.id) {
      const payload = { id: initDeclaration.id, content: declaration };
      editDeclaration(payload);
    } else {
      addDeclaration(declaration);
    }
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        closeModal={closeModal}
        heading={initDeclaration?.id ? "Edit Declaration" : "Add Declaration"}
      />

      <GlobalTextArea
        labelText={"Declaration"}
        inputName="declaration"
        inputValue={declaration}
        handleChange={handleChange}
        errorMessage={error}
        error={error}
        required
      />

      <GlobalBtn className="mt-3" onClick={add} mx="auto">
        {initDeclaration?.id ? "Edit" : "Add"}
      </GlobalBtn>
    </GlobalModal>
  );
};

export default AddDeclaration;
