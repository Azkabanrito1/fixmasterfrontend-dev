import { AssignmentContainer } from "../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { Grid } from "../../globalcomponents/Utilities";

const FixInfo = ({ support }) => {
  return (
    <AssignmentContainer>
      <Grid columns="4" className="mb-4">
        <div>
          <h3>Booking Number</h3>
          <span className="d-block">{support?.fixId}</span>
        </div>

        <div>
          <h3>Booking Type</h3>
          <span className="d-block">{support?.bookingType}</span>
        </div>

        <div>
          <h3>Booking Class</h3>
          <span className="d-block">{support?.bookingClass}</span>
        </div>

        <div>
          <h3>Fix Date</h3>
          <span className="d-block">{support?.fixDate}</span>
        </div>
      </Grid>

      <Grid columns="2">
        <div>
          <h3>CSE</h3>
          <span className="d-block">{support?.cseName}</span>
        </div>

        <div>
          <h3>Technician</h3>
          <span className="d-block">{support?.technicianName}</span>
        </div>
      </Grid>
    </AssignmentContainer>
  );
};

export default FixInfo;
