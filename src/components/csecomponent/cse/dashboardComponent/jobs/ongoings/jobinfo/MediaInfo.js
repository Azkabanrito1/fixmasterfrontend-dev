import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../../../../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { Grid } from "../../../../../../globalcomponents/Utilities";

const MedialInfo = ({ multimedias }) => {
  return (
    <AssignmentContainer className="mb-4">
      <AssignmentHeader>
        <h2>Pictures & Videos</h2>
      </AssignmentHeader>

      <Grid columns="3">
        {multimedias?.map((media) =>
          media.contentType === "image" ? (
            <div className="image" key={media.id}>
              <img src={media.content} alt={media.content} />
            </div>
          ) : (
            <div className="video" key={media.id}>
              <video src={media.content} controls />
            </div>
          )
        )}
      </Grid>
    </AssignmentContainer>
  );
};

export default MedialInfo;
