import { IconButton } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { BsTrash3 } from "react-icons/bs";
import styled from "styled-components";

const GlobalFileInput = ({
  handleChange,
  label,
  fileState,
  removeFile,
  maxFiles = 2,
  accept,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    const oldFilePaths = fileState.map((file) => file.path);

    const newFiles = acceptedFiles.filter((file) => {
      return !oldFilePaths.includes(file.path);
    });

    // Do something with the files
    if (acceptedFiles?.length) {
      handleChange((prevFiles) => [...prevFiles, ...newFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
  });

  const acceptedFileItems = fileState?.map((file, index) => (
    <li key={file.path}>
      <span>
        {file.path} - {(file.size / 1024000).toFixed(2)}MB
      </span>
      <IconButton
        aria-label="delete"
        size="small"
        onClick={() => removeFile(index)}
        color="warning"
      >
        <BsTrash3 />
      </IconButton>
    </li>
  ));

  return (
    <>
      <label style={{ color: "#f26222" }}>{label}</label>
      <DropArea>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Click or drag to add pictures and videos</p>
          ) : (
            <p>
              Drag 'n' drop some files here, or click to select files. You can
              add a max of {maxFiles} files
            </p>
          )}
        </div>
        {!!fileState.length && <ul className="mt-3">{acceptedFileItems}</ul>}
      </DropArea>
    </>
  );
};

export default GlobalFileInput;

const DropArea = styled.div`
  border: 1px dashed #ccc;
  border-radius: 5px;

  .dropzone {
    padding: 1rem;
    cursor: pointer;
  }

  p {
    text-align: center;
  }
`;
