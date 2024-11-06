import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../../../components/franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { Grid } from "../../../../pages/franchisee/jobs/MyJobDetails";

const ContactPreferences = ({ jobDetails }) => {
  return (
    <AssignmentContainer>
      <AssignmentHeader>
        <h3>Contact Preferences</h3>
      </AssignmentHeader>

      <Grid columns="1">
        <div>
          <h4>Fix Contact Person</h4>
          <span>{jobDetails?.contactPreference}</span>
        </div>

        <div>
          <h4>Notifications</h4>
          <span>{jobDetails?.notificationPreference}</span>
        </div>
      </Grid>
    </AssignmentContainer>
  );
};

export default ContactPreferences;
