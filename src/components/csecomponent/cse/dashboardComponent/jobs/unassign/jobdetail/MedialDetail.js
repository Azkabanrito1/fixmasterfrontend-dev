import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../../../../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { Grid } from "../../../../../../../pages/franchisee/jobs/MyJobDetails";
const MedialDetails = ({ multimedias }) => {
  return (
    <AssignmentContainer className="mb-4">
      <AssignmentHeader>
        <h2>Pictures & Videos</h2>
      </AssignmentHeader>

      <Grid columns="3">
        {multimedias?.map((media) => {
          if (media.mediaType === "image") {
            <div className="image" key={media.urlId}>
              <img src={media.url} alt={media.urlId} />
            </div>;
          } else if (media.mediaType === "video") {
            <div className="video">
              <video src={media.url} controls />
            </div>;
          }
        })}
      </Grid>
    </AssignmentContainer>
  );
};

export default MedialDetails;
