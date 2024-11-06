import { useState } from "react";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import FixModalBody from "../FixModalBody";
import FixModalHeading from "../FixModalHeading";
import EditDetails from "./EditDetails";
import FixDetails from "./FixDetails";
import { useGetJobDetails } from "../../../../hooks/useQueries/useJobs";

const NewFixModal = ({
  closeModal,
  id,
  isOpen,
  messageCSE,
  openCancelModal,
  stage,
}) => {
  const { data: jobData } = useGetJobDetails(id);
  const newFix = jobData?.data || {};
  const [showFixDetails, setShowFixDetails] = useState(false);
  const [showEditDetails, setShowEditDetails] = useState(false);

  const openDetails = () => setShowFixDetails(true);
  const editBooking = () => setShowEditDetails(true);

  return (
    <>
      <GlobalModal isOpen={isOpen} closeModal={closeModal}>
        <AltModalHeader closeModal={closeModal} mb="0" />
        <FixModalHeading
          colors={{ primary: "#FF9B04", secondary: "#F8DFB9" }}
          createDate={newFix?.createDate}
          fixStage={stage}
          jobRef={id}
          openDetails={openDetails}
          messageCse={messageCSE}
        />
        <FixModalBody
          cancelBooking={() => openCancelModal(id)}
          editBooking={editBooking}
          fix={newFix}
          fixStage={stage}
        />
      </GlobalModal>

      {showFixDetails && (
        <FixDetails
          isOpen={showFixDetails}
          closeModal={() => setShowFixDetails(false)}
          fixId={id}
        />
      )}

      {showEditDetails && (
        <EditDetails
          isOpen={showEditDetails}
          closeModal={() => setShowEditDetails(false)}
          fixId={id}
        />
      )}
    </>
  );
};

export default NewFixModal;
