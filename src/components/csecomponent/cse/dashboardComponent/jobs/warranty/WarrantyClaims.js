import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../../../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { Stack } from "@mui/system";
import { Grid } from "../../../../../globalcomponents/Utilities";
import format from "date-fns/format";

const WarrantyClaims = ({ warranties }) => {
  console.log(warranties);
  return (
    <AssignmentContainer>
      <AssignmentHeader>
        <h2>Warranty Claims Details</h2>
      </AssignmentHeader>
      {!!warranties?.fixId && (
        <Grid columns="4" className="mb-3">
          <div>
            <h3>Warranty Expires</h3>
            <span className="d-block">
              {format(new Date(warranties?.expirationDays), "dd-MM-yyyy")}
            </span>
          </div>

          <div>
            <h3>Claim Date</h3>
            <span className="d-block">
              {format(new Date(warranties?.claimDate), "dd-MM-yyyy")}
            </span>
          </div>

          <div>
            <h3>Services Delivery Date</h3>
            <span className="d-block">
              {format(new Date(warranties?.deliveryDate), "dd-MM-yyyy")}
            </span>
          </div>

          <div>
            <h3>Service Delivery Time</h3>
            <span className="d-block">
              {format(
                new Date(
                  `${new Date().toISOString().split("T")[0]}T${
                    warranties?.deliveryTime
                  }`
                ),
                "p"
              )}
            </span>
          </div>

          <div>
            <h3> Description</h3>
            <span className="d-block">{warranties?.description}</span>
          </div>
        </Grid>
      )}
      {!warranties?.fixId && (
        <Stack alignItems={"center"}>
          <p>There's no warranty for this job</p>
        </Stack>
      )}
    </AssignmentContainer>
  );
};

export default WarrantyClaims;
