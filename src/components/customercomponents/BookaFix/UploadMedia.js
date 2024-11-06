import Collapsible from "react-collapsible";
import { StyledCollapsible } from "./BookingInfo";
import LargeFileUpload from "../../globalcomponents/LargeFileUpload";
import { FormGroup } from "../../globalcomponents/Utilities";
import { Button, Menu, MenuItem, styled } from "@mui/material";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const UploadMedia = ({
  fileState,
  addMedia,
  uploadState,
  uploadResponse,
  setUploadResponse,
  removeFile,
  removeMedia,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const acceptedImagesFmt = {
    "image/png": [".png"],
    "image/gif": [".gif"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/JPEG": [".JPG", ".JPEG"],
  };
  const acceptedVideoFmt = {
    "video/mp4": [".mp4"],
    "video/webm": [".webm"],
  };

  const setAcceptedFiles = (fileType) => {
    if (fileType === "image") {
      return acceptedImagesFmt;
    } else if (fileType === "video") {
      return acceptedVideoFmt;
    }
  };
  // console.log(fileState);
  return (
    <Collapsible
      trigger={
        <StyledCollapsible className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="heading">Pictures & Videos</h3>
            <p className="sub-heading">
              Add pictures and videos of the fix you require
            </p>
          </div>
          <i className="fas fa-chevron-right collapsible-icon"></i>
        </StyledCollapsible>
      }
    >
      <div className="px-4">
        <FormGroup columns="2" gap="40px">
          {fileState.map((file) => (
            <LargeFileUpload
              accepted={setAcceptedFiles(file.fileType)}
              key={file.id}
              fileState={file.file}
              fileType={file.fileType}
              inputName={file.name}
              removeFile={removeFile}
              removeMedia={() => removeMedia(file.id)}
              setUploadResponse={setUploadResponse}
              uploadState={uploadState}
              uploadResponse={uploadResponse}
            />
          ))}
        </FormGroup>
      </div>

      <Button
        id="mediaType-btn"
        aria-controls={open ? "mediaType-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          display: "block",
          gap: "1rem",
          color: "var(--clr-primary)",
          fontSize: "1.2rem",
          textAlign: "center",
          marginTop: "2rem",
          marginInline: "auto",
          marginBottom: "2rem",
        }}
      >
        <AiOutlinePlusCircle fontSize={"2.6rem"} /> Add Image/Video
      </Button>
      <StyledMenu
        id="mediaType-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "mediaType-btn" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            addMedia("image");
            handleClose();
          }}
          sx={{ fontSize: "1.2rem" }}
        >
          Add Image
        </MenuItem>
        <MenuItem
          onClick={() => {
            addMedia("video");
            handleClose();
          }}
          sx={{ fontSize: "1.2rem" }}
        >
          Add Video
        </MenuItem>
      </StyledMenu>
    </Collapsible>
  );
};

export default UploadMedia;

const StyledMenu = styled(Menu)`
  ul.css-6hp17o-MuiList-root-MuiMenu-list {
    display: flex;
    gap: 1rem;
  }
`;
