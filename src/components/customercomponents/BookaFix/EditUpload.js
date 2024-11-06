import { useState } from "react";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import Collapsible from "react-collapsible";
import { StyledCollapsible } from "./BookingInfo";
import FixFileUpload from "../../csecomponent/cse/dashboardComponent/jobs/ongoings/FixFileUpload";
import { Grid } from "@mui/material";

const EditUpload = ({ fixDetails, files, removeFile, setFiles }) => {
  const [isEditing, setIsEditing] = useState();

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
      {!isEditing && (
        <div>
          {/* <Media mode="editing" multimedias={fixDetails?.fixMultiMedias} /> */}
          <Grid columns="3">
            {fixDetails?.fixMultiMedias?.map((media) =>
              media.contentType === "image" ? (
                <div className="image" key={media.contentId}>
                  <img
                    src={media.content}
                    alt={media.content}
                    style={{ width: "100%" }}
                  />
                </div>
              ) : (
                <div className="video">
                  {media.content && (
                    <video
                      src={media.content}
                      controls
                      style={{ width: "100%" }}
                    />
                  )}
                </div>
              )
            )}
          </Grid>
          {fixDetails?.fixMultiMedias[0].content && (
            <GlobalBtn
              className="m-auto my-3"
              style={{ width: "150px" }}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </GlobalBtn>
          )}
        </div>
      )}
      {isEditing && (
        <FixFileUpload
          inputName="uploads"
          maxFiles={6}
          handleChange={setFiles}
          fileState={files}
          accept={{
            "image/*": [".jpeg", ".png"],
            "video/*": [".mp4", ".wmv"],
          }}
          removeFile={removeFile}
        />
      )}
      {!isEditing && !fixDetails?.fixMultiMedias[0].content && (
        <FixFileUpload
          inputName="uploads"
          maxFiles={6}
          handleChange={setFiles}
          fileState={files}
          accept={{
            "image/*": [".jpeg", ".png"],
            "video/*": [".mp4", ".wmv"],
          }}
          removeFile={removeFile}
        />
      )}
    </Collapsible>
  );
};

export default EditUpload;
