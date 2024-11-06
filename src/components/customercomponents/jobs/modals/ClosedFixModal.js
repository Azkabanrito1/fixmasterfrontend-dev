import { useState } from "react";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import FixModalBody from "../FixModalBody";
import FixModalHeading from "../FixModalHeading";
import FixDetails from "../../../franchiseecomponents/jobsmanagement/initialcontact/FixDetails";
import { useGetJobDetails } from "../../../../hooks/useQueries/useJobs";

const ClosedFixModal = ({ isOpen, closeModal, id, stage }) => {
  const { data: jobData } = useGetJobDetails(id);
  const closedFix = jobData?.data || {};
  const [showFixDetails, setShowFixDetails] = useState(false);

  return (
    <>
      <GlobalModal isOpen={isOpen} closeModal={closeModal}>
        <AltModalHeader closeModal={closeModal} mb={"0"} />
        <FixModalHeading
          colors={{ primary: "#7B61FF", secondary: "#DED7FF" }}
          createDate={closedFix?.createDate}
          fixStage={stage}
          jobRef={closedFix?.id}
          openDetails={() => setShowFixDetails(true)}
        />
        <FixModalBody fix={closedFix} fixStage={stage} />
      </GlobalModal>

      {showFixDetails && (
        <FixDetails
          isOpen={showFixDetails}
          closeModal={() => setShowFixDetails(false)}
          fixId={id}
        />
      )}
    </>
  );
};

export default ClosedFixModal;
