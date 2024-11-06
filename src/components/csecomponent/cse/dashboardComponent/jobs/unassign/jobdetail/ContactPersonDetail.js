import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../../../../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { Grid } from "../../../../../../../pages/franchisee/jobs/MyJobDetails";
import { FaWhatsapp } from "react-icons/fa";

const ContactPersonLoc = ({ jobDetails }) => {
  return (
    <AssignmentContainer className="mb-4">
      <AssignmentHeader>
        <h3>Contact Person Details</h3>
      </AssignmentHeader>

      <Grid columns="3">
        <div>
          <h4>Name</h4>
          <span>{jobDetails?.contactName}</span>
        </div>
        <div>
          <h4>Email</h4>
          <span>{jobDetails?.contactEmail}</span>
        </div>
        <div>
          <h4>Phone Number</h4>
          <span>
            {jobDetails?.contactPhoneNumber}
            {"  "}
            <a href={`https://wa.me/${jobDetails?.contactPhoneNumber}`}>
              <FaWhatsapp />
            </a>
            {"  "}
            <a href={`#`}>
              <i className="fa fa-message"></i>
            </a>
          </span>
        </div>
      </Grid>
    </AssignmentContainer>
  );
};

export default ContactPersonLoc;
