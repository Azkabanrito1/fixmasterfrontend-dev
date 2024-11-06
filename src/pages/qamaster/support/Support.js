import { AssignmentHeader } from "../../../components/franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import {
  FormGroup,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { BackBtn } from "../../../components/globalcomponents/Utilities";
import DiagonisticVisit from "../../../components/qamastercomponent/supportrequest/DiagonisticVisit";
import FixInfo from "../../../components/qamastercomponent/supportrequest/FixInfo";
import Media from "../../../components/qamastercomponent/supportrequest/Media";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import AddBtn from "../../../components/franchiseecomponents/jobsmanagement/AddBtn";
import { useParams } from "react-router-dom";
import {
  useCreateQamasterResponseToRequest,
  useGetSupportRequestByRequesId,
} from "../../../hooks/useQueries/useJobs";
import FixFileUpload from "../../../components/csecomponent/cse/dashboardComponent/jobs/ongoings/FixFileUpload";
import { useState } from "react";
import { Stack } from "@mui/material";
import GlobalTextArea from "../../../components/globalcomponents/GlobalTextArea";
import { useSnackbar } from "notistack";
import GlobalFullScreenLoader from "../../../components/globalcomponents/GlobalFullScreenLoader";

const Support = () => {
  const [files, setFiles] = useState([]);
  const [shownFiles, setShowFiles] = useState(false);
  const [recommendMessage, setRecommendMessage] = useState("");

  const removeFile = (fileIndex) => {
    const newFiles = files.filter((_, index) => fileIndex !== index);

    setFiles(newFiles);
  };
  const { enqueueSnackbar } = useSnackbar();
  //---------------------------------------------mutate fn---------------------------------------------
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
  const { mutate: submitFeedback, isLoading } =
    useCreateQamasterResponseToRequest(onSuccess, onFailure);

  const handleClick = () => {
    const responsSupportPayload = new FormData();
    responsSupportPayload.append("RequestId", Number(requestId));
    responsSupportPayload.append("Recommendation", recommendMessage);
    for (let i = 0; i < files.length; i++) {
      responsSupportPayload.append("Files", files[i]);
    }
    submitFeedback(responsSupportPayload);
  };

  const { requestId } = useParams();

  const { data: requestData } = useGetSupportRequestByRequesId(requestId);

  return (
    <div>
      <BackBtn />
      <PageHeading>Support Request</PageHeading>
      <DiagonisticVisit diagnosticTime={requestData?.data} />
      <FixInfo support={requestData?.data} />
      <div className="mt-3">
        <h2 style={{ fontSize: "20px", fontWeight: "700" }}>Request Details</h2>
        <p className="mb-3">{requestData?.data?.requestDetails}</p>
      </div>
      <Media multimedias={requestData?.data?.requestAttachments} />

      <FormGroup columns="1">
        <GlobalTextArea
          labelText="Recommendation"
          inputName={recommendMessage}
          inputValue={recommendMessage}
          handleChange={(event) => setRecommendMessage(event.target.value)}
          required={true}
        />
      </FormGroup>
      <Stack alignItems={"center"} mt={3}>
        {shownFiles && (
          <FixFileUpload
            inputName="uploads"
            maxFiles={4}
            handleChange={setFiles}
            fileState={files}
            accept={{
              "image/*": [".jpeg", ".png"],
              "video/*": [".mp4", ".wmv"],
              // "audio/*": ["mp4"],
            }}
            removeFile={removeFile}
          />
        )}
      </Stack>

      <AddBtn text="Add Image/Audio/Video" action={() => setShowFiles(true)} />

      <GlobalBtn
        className="m-auto mt-3"
        type="submit"
        onClick={handleClick}
        disabled={!recommendMessage}
      >
        Save
      </GlobalBtn>

      <GlobalFullScreenLoader open={isLoading} />
    </div>
  );
};

export default Support;
