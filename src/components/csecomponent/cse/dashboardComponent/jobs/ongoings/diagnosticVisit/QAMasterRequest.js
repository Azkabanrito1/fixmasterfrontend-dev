import {
  Fields,
  FormGroup,
  SectionHeading,
} from "../../../../../../globalcomponents/Utilities";
import GlobalTextArea from "../../../../../../globalcomponents/GlobalTextArea";
import GlobalBtn from "../../../../../../globalcomponents/GlobalBtn";
import { useEffect, useState } from "react";
import {
  useCreateQamasterRequest,
  useGetTechnicianAssignByFixId,
} from "../../../../../../../hooks/useQueries/useJobs";
import FixFileUpload from "../FixFileUpload";
import { Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import GlobalSelect from "../../../../../../globalcomponents/GlobalSelect";

const QAMasterRequest = ({ fixId, stage = false }) => {
  const [request, setRequest] = useState({
    technician: "",
    review: "",
  });
  const [tech, setTech] = useState();

  const [files, setFiles] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });
  };

  const removeFile = (fileIndex) => {
    const newFiles = files.filter((_, index) => fileIndex !== index);

    setFiles(newFiles);
  };

  const { data: technicianAssignData } = useGetTechnicianAssignByFixId(fixId);
  //------------------------------------mutations fnc--------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: createQamasterRequest, isLoading: isCreating } =
    useCreateQamasterRequest(onSuccess, onFailure);

  useEffect(() => {
    const assignTech = technicianAssignData?.data?.map((item) => {
      return {
        id: item.id,
        name: item.firstName + " " + item.lastName,
      };
    });
    setTech(assignTech);
  }, [technicianAssignData]);

  const handleClick = () => {
    const qamasterRequestPayload = new FormData();
    qamasterRequestPayload.append("FixId", fixId);
    qamasterRequestPayload.append("TechnicianlId", request.technician);
    qamasterRequestPayload.append("Description", request.review);

    qamasterRequestPayload.append("PhasesEnum", stage ? 2 : 1);
    for (let i = 0; i < files.length; i++) {
      qamasterRequestPayload.append("Files", files[i]);
    }
    createQamasterRequest(qamasterRequestPayload);
  };
  return (
    <section className="mb-5 mt-3">
      <SectionHeading>QA Master Request</SectionHeading>

      <Fields>
        <FormGroup columns="2" className="mb-3">
          <GlobalSelect
            labelText="Technician"
            selectName="technician"
            handleChange={handleChange}
            options={tech}
            defaultOption="Select Technician"
          />
        </FormGroup>

        <GlobalTextArea
          inputName={"review"}
          labelText={"Detailed Review"}
          inputValue={request.review}
          handleChange={handleChange}
        />
      </Fields>

      <Stack spacing={2} alignItems={"center"}>
        <p>Add Pictures/Video</p>
        <FixFileUpload
          inputName="uploads"
          maxFiles={4}
          handleChange={setFiles}
          fileState={files}
          accept={{
            "image/*": [".jpeg", ".png"],
            "video/*": [".mp4", ".wmv"],
          }}
          removeFile={removeFile}
        />
        {/* <LargeFileUpload /> */}
      </Stack>

      <GlobalBtn
        className="m-auto mt-3"
        onClick={handleClick}
        disabled={!request.review}
      >
        {isCreating ? "Loading..." : "Submit"}
      </GlobalBtn>
    </section>
  );
};

export default QAMasterRequest;
