import { Stack } from "@mui/material";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalModal from "../GlobalModal";
import GlobalBtn from "../GlobalBtn";
import GlobalAltBtn from "../GlobalAltBtn";
import { useNavigate } from "react-router-dom";

const WebcamError = ({ isOpen, errorMessage }) => {
  const navigate = useNavigate();

  return (
    <GlobalModal
      closeModal={() => navigate("../../training")}
      isOpen={isOpen}
      width="600px"
    >
      <AltModalHeader
        heading="Recording Error"
        closeModal={() => navigate("../../training")}
      />

      <Stack spacing={3}>
        <Stack spacing={2} fontSize={"18px"}>
          <p>{errorMessage}</p>
          <p>
            Please ensure that you allow access to the webcam and microphone and
            then reload the page
          </p>
        </Stack>

        <Stack direction="row" spacing={2}>
          <GlobalBtn onClick={() => navigate(-1)}>Go Back</GlobalBtn>
          <GlobalAltBtn onClick={() => window.location.reload()}>
            Refresh
          </GlobalAltBtn>
        </Stack>
      </Stack>
    </GlobalModal>
  );
};

export default WebcamError;
