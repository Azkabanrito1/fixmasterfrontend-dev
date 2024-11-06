import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../../../../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { Grid } from "../../../../../../../pages/franchisee/jobs/MyJobDetails";

const BookingDetails = ({ jobInfo }) => {
  return (
    <AssignmentContainer className="mb-4">
      <AssignmentHeader>
        <h2>Booking Information</h2>
      </AssignmentHeader>

      <Grid columns="4" className="mb-4">
        <div>
          <h3>Booking Number</h3>
          <span className="d-block">{jobInfo?.bookingNumber}</span>
        </div>

        <div>
          <h3>Booking Type</h3>
          <span className="d-block">{jobInfo?.bookingType}</span>
        </div>

        <div>
          <h3>Booking Class</h3>
          <span className="d-block">{jobInfo?.bookingClass}</span>
        </div>

        <div>
          <h3>Fix Date</h3>
          <span className="d-block">{jobInfo?.fixDate?.slice(0, 10)}</span>
        </div>
      </Grid>

      <Grid columns="1">
        <div>
          <h3>Description</h3>
          <p className="d-block">{jobInfo?.description}</p>
        </div>
      </Grid>
    </AssignmentContainer>
  );
};

export default BookingDetails;
