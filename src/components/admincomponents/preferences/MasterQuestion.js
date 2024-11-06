import { useState } from "react";
import GlobalModal from "../../globalcomponents/GlobalModal";
import { FormGroup } from "../../globalcomponents/Utilities";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalFullScreenLoader from "../../globalcomponents/GlobalFullScreenLoader";
import GlobalTextArea from "../../globalcomponents/GlobalTextArea";

const MasterQuestion = ({ isOpen, closeModal, createMaster, isCreating }) => {
  const [prefName, setPrefName] = useState("");

  const handleSubmit = () => {
    const payload = {
      name: prefName,
    };
    createMaster(payload);
  };
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal} width={"500px"}>
      <GlobalFullScreenLoader loading={isCreating} />
      <AltModalHeader
        heading="Add Contact Preference"
        closeModal={closeModal}
      />
      <FormGroup columns="1">
        <GlobalTextArea
          inputName="prefName"
          labelText="Name"
          inputPlaceholder="Enter Preference"
          handleChange={(e) => setPrefName(e.target.value)}
          inputValue={prefName}
          required={+true}
        />
      </FormGroup>
      <GlobalBtn
        type="submit"
        className="m-auto mt-3"
        width="200px"
        disabled={!prefName}
        onClick={handleSubmit}
      >
        Submit
      </GlobalBtn>
    </GlobalModal>
  );
};

export default MasterQuestion;
