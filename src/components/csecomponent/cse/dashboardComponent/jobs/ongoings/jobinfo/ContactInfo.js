import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../../../../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { FaWhatsapp } from "react-icons/fa";
import { Button, Stack } from "@mui/material";
import { Grid } from "../../../../../../globalcomponents/Utilities";

const ContactInfo = ({ jobDetails }) => {
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
          {!!jobDetails?.contactPhone && (
            <Stack direction={"row"} spacing={2}>
              <span>{jobDetails?.contactPhone}</span>
              <a href={`tel:${jobDetails?.contactPhone}`}>
                <FaWhatsapp />
              </a>
              <Button>
                <i className="fa fa-message"></i>
              </Button>
            </Stack>
          )}
        </div>
      </Grid>
    </AssignmentContainer>
  );
};

export default ContactInfo;
