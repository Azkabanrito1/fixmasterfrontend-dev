import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../../../../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { Grid } from "../../../../../../globalcomponents/Utilities";

const ServiceInfo = ({ jobDetails }) => {
  return (
    <AssignmentContainer className="mb-4">
      <AssignmentHeader>
        <h3>Contact Person Location</h3>
      </AssignmentHeader>

      <Grid columns="4">
        <div>
          <h4>Address Title</h4>
          <span>{jobDetails?.address}</span>
        </div>
        <div>
          <h4>Address</h4>
          <span>{jobDetails?.addressName}</span>
        </div>
        <div>
          <h4>City</h4>
          <span>{jobDetails?.cityName}</span>
        </div>
        <div>
          <h4>Nearest Landmark</h4>
          <span>{jobDetails?.nearestLandMark}</span>
        </div>
      </Grid>
    </AssignmentContainer>
  );
};

export default ServiceInfo;
