import { IconButton } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { BsTrash3 } from "react-icons/bs";
import styled from "styled-components";

const FixFileUpload = ({
  handleChange,
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
      {/* <label style={{ color: "#f26222" }}>{label}</label> */}
      <Files>
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
      </Files>
    </>
  );
};

export default FixFileUpload;
const Files = styled.div`
  position: relative;
  border: 1px solid var(--clr-primary);
  border-radius: 24px;
  overflow: hidden;
`;

const DropArea = styled.div`
  gap: 20px;
  padding: 20px;
  background-color: #f8f8f8;
  .dropzone {
    display: grid;
    place-items: center;
    padding: 2rem 1rem;
    border: 1px dashed #8692a6;
    border-radius: 6px;
    color: #8692a6;
    cursor: pointer;
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

  ul {
    padding: 0 0.8rem;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    list-style: none;
  }
`;
