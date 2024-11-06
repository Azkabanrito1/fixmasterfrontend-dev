import { useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { warrantyJobById } from "../../../../redux/customer/actions";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import FixModalBody from "../FixModalBody";
import FixModalHeading from "../FixModalHeading";
import FixDetails from "../../../franchiseecomponents/jobsmanagement/initialcontact/FixDetails";
import DiagnosisReport from "./DiagnosisReportModal";
import Notifications from "./Notifications";
import FeedbackRatings from "./FeedbackRating";
import WarrantyClaim from "./WarrantyClaim";

const WarrantyFixModal = ({ isOpen, closeModal, id, stage }) => {
  const fix = useFetch({ action: warrantyJobById, args: [id] });
  const [showFixDetails, setShowFixDetails] = useState(false);
  const [showDiagnosticReport, setShowDiagnosticReport] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRatings, setShowRatings] = useState(false);
  const [showWarrantyClaim, setShowWarrantyClaim] = useState(false);

  let warrantyFix = {};
  if (fix) warrantyFix = fix[0];

  return (
    <>
      <GlobalModal isOpen={isOpen} closeModal={closeModal}>
        <AltModalHeader closeModal={closeModal} mb={"0"} />
        <FixModalHeading
          colors={{ primary: "#7B61FF", secondary: "#DED7FF" }}
          createDate={warrantyFix?.createDate}
          diagnosisAction={() => setShowDiagnosticReport(true)}
          fixStage={stage}
          jobRef={warrantyFix?.id}
          notifications={() => setShowNotifications(true)}
          openDetails={() => setShowFixDetails(true)}
          warrantyClaim={() => setShowWarrantyClaim(true)}
        />
        <FixModalBody fix={warrantyFix} fixStage={stage} />
      </GlobalModal>

      {showFixDetails && (
        <FixDetails
          isOpen={showFixDetails}
          closeModal={() => setShowFixDetails(false)}
          fixId={id}
          rating={() => setShowRatings(true)}
        />
      )}

      {showDiagnosticReport && (
        <DiagnosisReport
          isOpen={showDiagnosticReport}
          closeModal={() => setShowDiagnosticReport(false)}
          fixId={id}
        />
      )}

      {showNotifications && (
        <Notifications
          isOpen={showNotifications}
          closeModal={() => setShowNotifications(false)}
          fixId={id}
        />
      )}

      {showRatings && (
        <FeedbackRatings
          isOpen={showRatings}
          closeModal={() => setShowRatings(false)}
          fixId={id}
          cse={warrantyFix.cse}
        />
      )}

      {showWarrantyClaim && (
        <WarrantyClaim
          isOpen={showWarrantyClaim}
          closeModal={() => setShowWarrantyClaim(false)}
          fixId={id}
        />
      )}
    </>
  );
};

export default WarrantyFixModal;
