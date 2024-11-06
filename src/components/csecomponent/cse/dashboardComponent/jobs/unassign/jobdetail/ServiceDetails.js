import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../../../../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { Grid } from "../../../../../../../pages/franchisee/jobs/MyJobDetails";
const ServiceDetails = ({ jobInfo }) => {
  return (
    <AssignmentContainer className="mb-4">
      <AssignmentHeader>
        <h3>Contact Person Location</h3>
      </AssignmentHeader>

      <Grid columns="4">
        <div>
          <h4>Country</h4>
          <span>{jobInfo?.country}</span>
        </div>
        <div>
          <h4>State</h4>
          <span>{jobInfo?.state}</span>
        </div>
        <div>
          <h4>LGA</h4>
          <span>{jobInfo?.lGA}</span>
        </div>
        <div>
          <h4>City</h4>
          <span>{jobInfo?.city}</span>
        </div>
        <div>
          <h4>Estate</h4>
          <span>{jobInfo?.estate}</span>
        </div>
        <div>
          <h4>Nearest Landmark</h4>
          <span>{jobInfo?.nearestLandmark}</span>
        </div>
      </Grid>
    </AssignmentContainer>
  );
};

export default ServiceDetails;
