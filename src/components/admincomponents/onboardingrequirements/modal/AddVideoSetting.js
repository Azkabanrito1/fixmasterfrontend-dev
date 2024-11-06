import React, { useState } from "react";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { FormGroup } from "../../../globalcomponents/Utilities";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalFullScreenLoader from "../../../globalcomponents/GlobalFullScreenLoader";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import GlobalSelect from "../../../globalcomponents/GlobalSelect";

const AddVideoSetting = ({
  isOpen,
  closeModal,
  initVideoTopicSetting,
  editVideoTopicSetting,
  addVideoTopicSetting,
  isEditing,
  isCreating,
}) => {
  const [fileType, setFileType] = useState(
    initVideoTopicSetting?.fileType || ""
  );

  const [fileSize, setFileSize] = useState(
    initVideoTopicSetting?.fileSize || ""
  );

  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!fileType) {
      setError("Please select a message");
    }
    if (!fileSize) {
      setError("Please input a file size");
    }
    if (initVideoTopicSetting?.id) {
      const payload = { id: initVideoTopicSetting?.id, fileSize, fileType };
      editVideoTopicSetting(payload);
    } else {
      const payload = { fileSize, fileType };
      addVideoTopicSetting(payload);
    }
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        closeModal={closeModal}
        heading={
          initVideoTopicSetting?.id
            ? "Edit Video Topic Setting"
            : "Add Video Topic Setting"
        }
      />

      <FormGroup columns="2" className="mb-4">
        <GlobalSelect
          labelText="Video File Type"
          selectName="fileType"
          defaultOption="Select File Type"
          selectValue={fileType}
          options={[
            { id: "mkv", name: ".mkv" },
            { id: "mp4", name: ".mp4" },
            { id: "mpeg", name: ".mpeg" },
            { id: "avi", name: ".avi" },
            { id: "webm", name: ".webm" },
            { id: "wmv", name: ".wmv" },
            { id: "mxf", name: ".mxf" },
            { id: "ogv", name: ".ogv" },
            { id: "flv", name: ".flv" },
            { id: "3gp", name: ".3gp" },
            { id: "3g2", name: ".3g2" },
            { id: "mov", name: ".mov" },
          ]}
          handleChange={(e) => setFileType(e.target.value)}
          error={error}
          errorMessage={error}
          required
        />
        <GlobalInput
          labelText="Video File Size (mb)"
          inputType="number"
          inputName="fileSize"
          inputValue={fileSize}
          handleChange={(e) => setFileSize(e.target.value)}
          error={error}
          errorMessage={error}
          inputPlaceholder={"e.g 20"}
          min={0}
          required
        />
      </FormGroup>

      <GlobalBtn mx="auto" onClick={handleSubmit}>
        {initVideoTopicSetting?.id ? "Edit" : "Add"}
      </GlobalBtn>

      <GlobalFullScreenLoader open={isCreating || isEditing} />
    </GlobalModal>
  );
};

export default AddVideoSetting;
