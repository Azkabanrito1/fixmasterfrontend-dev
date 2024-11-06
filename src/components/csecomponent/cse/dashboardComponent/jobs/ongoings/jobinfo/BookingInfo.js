import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../../../../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { Grid } from "../../../../../../globalcomponents/Utilities";
import { format } from "date-fns";

const BookingInfo = ({ jobDetails }) => {
  return (
    <AssignmentContainer className="mb-4">
      <AssignmentHeader>
        <h2>Booking Information</h2>
      </AssignmentHeader>

      <Grid columns="4" className="mb-4">
        <div>
          <h3>Booking Number</h3>
          <span className="d-block">{jobDetails?.fixId}</span>
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
          <span className="d-block">
            {!!jobDetails?.scheduleDate
              ? format(new Date(jobDetails?.scheduleDate), "dd-MM-yyyy")
              : ""}
          </span>
        </div>
      </Grid>
    </AssignmentContainer>
  );
};

export default BookingInfo;
