import { FormControlLabel, Switch } from "@mui/material";
import GlobalBtn from "../../../../../globalcomponents/GlobalBtn";
import GlobalModal from "../../../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../../../layouts/modal/AltModalHeader";
import { useState } from "react";

const ConfirmSupplies = ({ isOpen, closeModal, respond }) => {
  const [requireParts, setRequireParts] = useState(false);

  const handleChange = (e) => {
    const { checked } = e.target;
    setRequireParts(checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    respond(requireParts);
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        isOpen={isOpen}
        closeModal={closeModal}
        heading={"Confirm End Diagnostics"}
      />
      <form onSubmit={handleSubmit}>
        <FormControlLabel
          label="Will spare parts be required?"
          control={
            <Switch
              name="requireParts"
              value={requireParts}
              onChange={handleChange}
            />
          }
        />

        <GlobalBtn type="submit" mx="auto">
          Confirm
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default ConfirmSupplies;
