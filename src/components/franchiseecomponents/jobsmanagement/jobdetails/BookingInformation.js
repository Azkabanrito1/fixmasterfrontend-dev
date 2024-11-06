import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../../../components/franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { Grid } from "../../../../pages/franchisee/jobs/MyJobDetails";

const BookingInformation = ({ jobDetails }) => {
  return (
    <AssignmentContainer className="mb-4">
      <AssignmentHeader>
        <h2>Booking Information</h2>
      </AssignmentHeader>

      <Grid columns="4" className="mb-4">
        <div>
          <h3>Booking Number</h3>
          <span className="d-block">{jobDetails?.bookingNumber}</span>
        </div>

        <div>
          <h3>Booking Type</h3>
          <span className="d-block">{jobDetails?.bookingType}</span>
        </div>

        <div>
          <h3>Booking Class</h3>
          <span className="d-block">{jobDetails?.bookingClass}</span>
        </div>

        <div>
          <h3>Fix Date</h3>
          <span className="d-block">{jobDetails?.fixDate?.slice(0, 10)}</span>
        </div>
      </Grid>

      <Grid columns="1">
        <div>
          <h3>Description</h3>
          <p className="d-block">{jobDetails?.description}</p>
        </div>
      </Grid>
    </AssignmentContainer>
  );
};

export default BookingInformation;
