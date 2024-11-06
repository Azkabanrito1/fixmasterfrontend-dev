import { useEffect, useReducer } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { FieldError } from "./GlobalInput";
import GlobalBtn from "./GlobalBtn";
import { useSnackbar } from "notistack";
import { AiOutlineClose } from "react-icons/ai";
import {
  useUploadDoc,
  useUploadImage,
  useUploadVideo,
} from "../../hooks/useQueries/useIdentity";

const initState = {
  errorMessage: "",
  internalError: false,
  file: {
    id: "",
    isUploaded: false,
  },
};

const stateReducer = (state, action) => {
  switch (action.type) {
    case "file_upload":
      return {
        ...state,
        file: {
          id: action.id,
          isUploaded: true,
        },
      };
    case "file_delete":
      return {
        ...state,
        file: {
          id: "",
          isUploaded: false,
        },
      };
    case "error":
      return {
        errorMessage: action.message,
        internalError: true,
        file: {
          id: "",
          isUploaded: false,
        },
      };
    case "success":
      return {
        ...state,
        errorMessage: "",
        internalError: false,
      };
    case "clear_error":
      return {
        ...state,
        errorMessage: "",
        internalError: false,
      };
    default:
      return state;
  }
};

const LargeFileUpload = ({
  inputName,
  uploadState,
  removeFile,
  removeMedia,
  accepted,
  fileState,
  fileType,
  uploadResponse,
  setUploadResponse,
  maximumSize = 5242880,
  numOfFiles = 1,
}) => {
  const {
    getInputProps,
    getRootProps,
    acceptedFiles,
    fileRejections,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { ...accepted },
    maxFiles: numOfFiles,
    maxSize: maximumSize,
    onDrop: (files) => uploadState(inputName, files[0]),
  });
  const [state, updateState] = useReducer(stateReducer, initState);
  const { enqueueSnackbar } = useSnackbar();
  const onUploadSuccess = (docUpload) => {
    enqueueSnackbar("File uploaded successfully", { variant: "success" });
    setUploadResponse([
      ...uploadResponse,
      {
        contentType: fileType,
        content: docUpload.data.url,
        contentId: docUpload.data.id,
      },
    ]);
    updateState({ type: "file_upload", id: docUpload.id });
  };

  const onUploadError = (docUpload) => {
    enqueueSnackbar(`An error occurred ${docUpload.message}`, {
      variant: "error",
    });
    updateState({ type: "error", message: docUpload.message });
  };

  // upload mutations
  const { mutate: docFileUpload } = useUploadDoc(
    onUploadSuccess,
    onUploadError,
    "document"
  );
  const { mutate: imageUpload } = useUploadImage(
    onUploadSuccess,
    onUploadError,
    "image"
  );
  const { mutate: videoUpload } = useUploadVideo(
    onUploadSuccess,
    onUploadError,
    "video"
  );

  useEffect(() => {
    updateState({
      type: "error",
      message: fileRejections[0]?.errors[0]?.message,
    });
  }, [fileRejections]);

  function handleRemove(file) {
    removeFile(inputName);
    acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
  }

  // const deleteUploadedFile = async (file) => {
  //   const payload = state.file.id;
  //   const delResponse = await dispatch(uploadedFileDelete(payload));

  //   if (delResponse.status) {
  //     enqueueSnackbar("File Deleted", { variant: "success" });
  //     updateState({
  //       type: "file_delete",
  //     });
  //     removeFile(inputName);
  //     acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
  //     setUploadResponse([]);
  //   } else {
  //     enqueueSnackbar("An error occured", { variant: "error" });
  //   }
  // };

  const uploadFile = async () => {
    updateState({ type: "clear_error" });
    if (acceptedFiles[0]) {
      enqueueSnackbar("Uploading...", { variant: "info" });
      const docs = new FormData();
      docs.append("file", fileState);

      if (fileType === "document") {
        docFileUpload(docs);
      } else if (fileType === "image") {
        imageUpload(docs);
      } else if (fileType === "video") {
        videoUpload(docs);
      }
    } else {
      // trigger errors and set the message
      updateState({
        type: "error",
        message: "Please add a file to be uploaded",
      });
    }
  };

  const files = acceptedFiles.map((file) => (
    <File key={file.path}>
      <span>{file.path}</span>
      {!state.file.isUploaded && (
        <button type="button" onClick={() => handleRemove(file)}>
          &times;
        </button>
      )}
    </File>
  ));

  return (
    <>
      <div
        style={{
          position: "relative",
          paddingBottom: "1.3rem",
          border: "1px solid var(--clr-primary)",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ padding: "16px 20px" }}
        >
          {!state.file.isUploaded ? (
            <GlobalBtn
              type="button"
              border="5px solid #F7F9FB"
              bdRad="2rem"
              width="100px"
              height="38px"
              fs="14px"
              onClick={uploadFile}
            >
              Upload
            </GlobalBtn>
          ) : (
            <div></div>
          )}
          <div>
            {fileType === "image" && (
              <img src="/images/img-placeholder.png" alt="" />
            )}
            {fileType === "video" && (
              <img src="/images/vid-placeholder.png" alt="" />
            )}
          </div>
        </div>
        <FlexBox>
          {acceptedFiles[0] && files}
          {!acceptedFiles[0] && (
            <div
              {...getRootProps({
                className: `dropzone ${isDragAccept ? "accepted" : ""} ${
                  isDragReject ? "invalid" : ""
                }`,
              })}
            >
              <input
                {...getInputProps()}
                id={inputName}
                name={inputName}
                capture
              />
              <p>
                Click to browse or drag and drop your files not more than 5mb
              </p>
            </div>
          )}
        </FlexBox>
        {state.internalError || fileRejections.length ? (
          <FieldError className="text-center">{state.errorMessage}</FieldError>
        ) : null}
        {removeMedia && !state.file.isUploaded && (
          <RemoveBtn onClick={removeMedia}>
            <AiOutlineClose />
          </RemoveBtn>
        )}
      </div>
    </>
  );
};

export default LargeFileUpload;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background-color: #f8f8f8;

  .dropzone {
    display: grid;
    place-items: center;
    padding: 1rem;
    border: 1px dashed #8692a6;
    border-radius: 6px;
    color: #8692a6;
    /* transition: 300ms ease; */

    &.accepted {
      border: 2px dashed #63eb63;
    }

    &.invalid {
      border: 2px dashed #eb493d;
    }

    p {
      /* max-width: 15ch; */
      margin: 0 !important;
      font-size: 12px;
      text-align: center;
    }
  }
`;

const File = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  position: relative;
  width: 80%;
  margin-inline: auto;
  margin-top: 8px;
  list-style: none;
  color: "#11E981";
  font-size: 0.8rem;
  font-weight: 600;

  button {
    appearance: none;
    display: grid;
    place-items: center;
    width: 30px;
    aspect-ratio: 1;
    border: none;
    border-radius: 50%;
    background-color: #c95d5d;
    color: white;
    font-size: 20px;

    &:hover {
      cursor: pointer;
      background-color: #a33333;
      transition: 300ms ease;
    }
  }
`;

const RemoveBtn = styled.button`
  position: absolute;
  bottom: -10px;
  left: 50%;
  width: 30px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid var(--clr-primary);
  color: var(--clr-primary);
  background-color: #fff;
  transform: translate(-50%, -50%);
  font-weight: 700;
`;
