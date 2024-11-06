import WarrantyProgressBar from "./WarrantyStatusProgressBar";
import { Chip } from "@mui/material";
import JobStatusProgress from "./JobStatusProgress";
import { format } from "date-fns";

const JobModalDetails = ({ fix, status }) => {
  return (
    <table>
      <colgroup>
        <col className="col1" />
        <col className="col2" />
      </colgroup>
      <tbody>
        <tr>
          <td className="heading">Category:</td>
          <td className="categories">
            {fix?.bookingCategory && (
              <Chip label={fix?.bookingCategory} color="warning" />
            )}
            {fix?.bookingClass && (
              <Chip label={fix?.bookingClass} color="success" />
            )}
          </td>
        </tr>
        {fix?.franchiseeOrCseAssignedName && (
          <tr>
            <td className="heading">CSE:</td>
            <td>{fix?.franchiseeOrCseAssignedName}</td>
          </tr>
        )}
        <tr>
          <td className="heading">Fix Date:</td>
          {fix?.scheduleDate && (
            <td>{format(new Date(fix.scheduleDate), "dd-MM-yyyy")}</td>
          )}
        </tr>
        {/* job Status progress bar */}
        <tr>
          <td className="heading">Job Status:</td>
          <td>
            {status !== "warranty" && (
              <JobStatusProgress fixStatus={fix?.fixStatus} />
            )}

            {status === "warranty" && <span>Completed</span>}
          </td>
        </tr>

        {/* warranty time progress bar */}
        {status === "warranty" && (
          <tr>
            <td className="heading">Warranty:</td>
            <td>
              <WarrantyProgressBar
                jobCompletionDate={fix?.completedDate}
                warrantyDuration={fix?.warrantyDuration}
              />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default JobModalDetails;
