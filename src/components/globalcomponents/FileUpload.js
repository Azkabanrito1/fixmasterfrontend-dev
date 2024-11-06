import { useEffect, useReducer } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { FieldError } from "./GlobalInput";
import GlobalBtn from "./GlobalBtn";
import GlobalFullScreenLoader from "./GlobalFullScreenLoader";
import {
  useUploadDoc,
  useUploadImage,
  useUploadVideo,
} from "../../hooks/useQueries/useIdentity";
import { useSnackbar } from "notistack";

const initState = {
  errorMessage: "",
  internalError: false,
  isUploading: false,
  file: {
    id: "",
    isUploaded: false,
  },
};

const stateReducer = (state, action) => {
  switch (action.type) {
    case "uploading":
      return {
        ...state,
        isUploading: true,
      };
    case "file_uploaded":
      return {
        ...state,
        isUploading: false,
        file: {
          id: action.id,
          isUploaded: true,
        },
      };
    case "file_delete":
      return {
        ...state,
        isUploading: true,
        file: {
          id: "",
          isUploaded: false,
        },
      };
    case "error":
      return {
        errorMessage: action.message,
        internalError: true,
        isUploading: false,
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
        isUploading: false,
      };
    case "clear_error":
      return {
        ...state,
        errorMessage: "",
        internalError: false,
        isUploading: false,
      };
    default:
      return state;
  }
};

const FileUpload = ({
  labelText,
  inputName,
  uploadState,
  removeFile,
  accepted,
  fileState,
  fileType,
  uploadResponse,
  setUploadResponse,
  description,
  error,
  errorInfo,
  maximumSize = 2048000,
  numOfFiles = 1,
  required,
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
        contentType: inputName,
        content: docUpload.data.url,
        contentId: docUpload.data.id,
      },
    ]);
    updateState({ type: "file_uploaded", id: docUpload.id });
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
    onUploadError
  );
  const { mutate: imageUpload } = useUploadImage(
    onUploadSuccess,
    onUploadError
  );
  const { mutate: videoUpload } = useUploadVideo(
    onUploadSuccess,
    onUploadError
  );

  useEffect(() => {
    if (fileRejections.length > 0) {
      let message = "";

      if (fileRejections[0].errors[0].code === "file-too-large") {
        message = `File must not be larger than ${maximumSize / 1024000}MB`;
      } else {
        message = fileRejections[0].errors[0].message;
      }

      updateState({
        type: "error",
        message,
      });
    } else if (error) {
      updateState({
        type: "error",
        message: errorInfo,
      });
    }
  }, [fileRejections, error]);

  function handleRemove(file) {
    removeFile(inputName);
    acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
  }

  const uploadFile = async () => {
    updateState({ type: "clear_error" });
    if (acceptedFiles[0]) {
      const docs = new FormData();
      docs.append("file", fileState);

      updateState({ type: "uploading" });
      if (fileType === "document") {
        docFileUpload(docs);
      } else if (fileType === "image") {
        imageUpload(docs);
      } else if (fileType === "video") {
        videoUpload(docs);
      }
    } else {
      // trigger errors and set the message
      updateState({ type: "error", message: "Please upload a file" });
    }
  };

  const files = acceptedFiles.map((file) => (
    <File key={file.path}>
      <span className="path">{file.path}</span>
      {!state.file.isUploaded && (
        <button type="button" onClick={() => handleRemove(file)}>
          &times;
        </button>
      )}
    </File>
  ));

  return (
    <div>
      {labelText && (
        <label htmlFor={inputName}>
          {labelText}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      {!!description && (
        <p className="text-muted" style={{ fontSize: "13px" }}>
          {description}
        </p>
      )}
      {acceptedFiles[0] && files}
      <FlexBox>
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
              accept={accepted}
            />
            <p>Click to browse or drag files here</p>
          </div>
        )}
        {!state.file.isUploaded && (
          <GlobalBtn
            type="button"
            color="var(--clr-primary)"
            border="1px solid var(--clr-primary)"
            bgClr="white"
            width="100px"
            height="36px"
            fs="14px"
            onClick={uploadFile}
          >
            Upload
          </GlobalBtn>
        )}
      </FlexBox>
      {(state.internalError || fileRejections.length || error) && (
        <FieldError>{state.errorMessage}</FieldError>
      )}

      <GlobalFullScreenLoader open={state.isUploading} />
    </div>
  );
};

export default FileUpload;

const FlexBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-top: 8px;

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
  position: relative;
  margin-top: 8px;
  padding-inline: 8px;
  list-style: none;
  color: "#11E981";
  font-size: 1.2rem;
  font-weight: 600;

  button {
    appearance: none;
    display: grid;
    place-items: center;
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
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

  .path {
    display: inline-block;
    font-size: 12px;
    word-wrap: break-word;
    word-break: break-all;
  }
`;
