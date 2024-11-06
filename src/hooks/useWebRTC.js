import format from "date-fns/format";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import RecordRTC from "recordrtc";

const useWebRTC = ({ testType = "interview", videoRef }) => {
  const recorderRef = useRef();
  const [stream, setStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingError, setRecordingError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const startRecording = async (startCallback) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const options = {
        type: "video/webm;codecs=vp8",
        mimeType: "video/webm",
        disableLogs: true,
      };
      setStream(mediaStream);
      recorderRef.current = new RecordRTC(mediaStream, options);

      if (recorderRef.current) {
        await recorderRef.current.startRecording();
        setIsRecording(true);
        setRecordingError(false);
        setErrorMessage("");
        if (startCallback) startCallback();

        if (videoRef?.current) {
          // Display the live video feed
          videoRef.current.srcObject = mediaStream;
        }
      } else {
        enqueueSnackbar("Failed to initialize the recorder.", {
          variant: "error",
        });
        setIsRecording(false);
        setRecordingError(true);
        setErrorMessage("Failed to initialize the recorder");
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
      enqueueSnackbar(`Error accessing webcam: ${error}`, {
        variant: "error",
      });
      setIsRecording(false);
      setRecordingError(true);
      setErrorMessage(`Error accessing webcam: ${error}`);
    }
  };

  const stopRecording = async (stopCallback) => {
    try {
      if (recorderRef.current) {
        recorderRef.current.stopRecording(function async() {
          const tracks = stream.getTracks();

          tracks.forEach((track) => track.stop());

          const blob = recorderRef.current.getBlob();
          recorderRef.current = null;
          setStream(null);

          // create a file from the recorded blob
          const blobFile = new File(
            [blob],
            `${testType}_${format(new Date(), "ddMMyyyy_HHmmss")}.mp4`,
            {
              type: "video/mp4",
              lastModified: new Date().getTime(),
            }
          );

          // Reset the recording state
          if (setIsRecording) setIsRecording(false);

          // Call the stop callback with the recorded file
          if (!!stopCallback) stopCallback(blobFile);
        });

        // Reset the video element source
        if (videoRef?.current) {
          videoRef.current.srcObject = null;
        }
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
      enqueueSnackbar(`Error stopping recording: ${error.message}`, {
        variant: "error",
      });
      setRecordingError(true);
      setErrorMessage(`Error stopping recording: ${error.message}`);
    }
  };

  return {
    startRecording,
    stopRecording,
    isRecording,
    recordingError,
    errorMessage,
  };
};

export default useWebRTC;
