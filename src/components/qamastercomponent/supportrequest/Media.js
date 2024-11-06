import { AssignmentHeader } from "../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { Grid } from "../../globalcomponents/Utilities";

const Media = ({ multimedias }) => {
  return (
    <div className="my-3">
      <AssignmentHeader>
        <h2 style={{ color: "#f26c2a" }}>Attachments</h2>
      </AssignmentHeader>

      <Grid columns="3">
        {multimedias?.map((media) =>
          media.fileType === "image" ? (
            <div className="image" key={media.fileId}>
              <img
                src={media.fileUrl}
                alt={media.fileUrl}
                style={{ width: "100%" }}
              />
            </div>
          ) : (
            <div className="video">
              <video src={media.fileUrl} controls style={{ width: "100%" }} />
            </div>
          )
        )}
      </Grid>
    </div>
  );
};

export default Media;
