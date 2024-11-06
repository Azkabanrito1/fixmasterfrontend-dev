import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import { getStatusIndex } from "../../../utils/utilityFxns";

const OngoingJobsExtraActions = ({
  fix,
  stage,
  activeStatus,
  openRejectJobModal,
  openAcceptJobModal,
}) => {
  const navigate = useNavigate();
  const completingActions = [
    {
      id: 0,
      name: "Accept job",
      action: () => openAcceptJobModal(fix.id),
    },
    {
      id: 0,
      name: "Reject job",
      action: () => openRejectJobModal(fix.id),
    },
  ];

  if (stage === "ongoing") {
    return (
      <div>
        {/* condition to view quotation */}
        {getStatusIndex(fix.fixStatus) >= getStatusIndex("Quote Generated") &&
          fix.isQuotationAvailable && (
            <Button
              sx={{
                border: "1px solid var(--clr-primary)",
                color: "var(--clr-primary)",
                fontSize: "1.1rem",
              }}
              onClick={() => navigate(`../quote/${fix.id}`)}
            >
              View Quotation
            </Button>
          )}

        {/* condition to view invoice */}
        {getStatusIndex(fix.fixStatus) >= getStatusIndex("Quote Approved") && (
          <Button
            sx={{
              border: "1px solid var(--clr-primary)",
              color: "var(--clr-primary)",
              fontSize: "1.1rem",
            }}
          >
            View Invoice
          </Button>
        )}

        {/* condition for job rejection actions */}
        {getStatusIndex(fix.fixStatus) >= getStatusIndex("completed") && (
          <GlobalTableActions actions={completingActions} id="completed-jobs" />
        )}
      </div>
    );
  }
};

export default OngoingJobsExtraActions;
