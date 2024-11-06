import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../../../components/franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { Grid } from "../../../../pages/franchisee/jobs/MyJobDetails";

const ContactPersonLoc = ({ jobDetails }) => {
  return (
    <AssignmentContainer className="mb-4">
      <AssignmentHeader>
        <h3>Contact Person Location</h3>
      </AssignmentHeader>

      <Grid columns="4">
        <div>
          <h4>Country</h4>
          <span>{jobDetails?.country}</span>
        </div>
        <div>
          <h4>State</h4>
          <span>{jobDetails?.state}</span>
        </div>
        <div>
          <h4>LGA</h4>
          <span>{jobDetails?.lGA}</span>
        </div>
        <div>
          <h4>City</h4>
          <span>{jobDetails?.city}</span>
        </div>
        <div>
          <h4>Estate</h4>
          <span>{jobDetails?.estate}</span>
        </div>
        <div>
          <h4>Nearest Landmark</h4>
          <span>{jobDetails?.nearestLandmark}</span>
        </div>
      </Grid>
    </AssignmentContainer>
  );
};

export default ContactPersonLoc;
