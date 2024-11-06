import { useState } from "react";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
// import MessageCSE from "../../../components/customercomponents/jobs/modals/MessageCse";
import { useGetCollaboratorJobs } from "../../../hooks/useQueries/useJobs";
import { jobTypes } from "../../../utils/selectOptions";
import ClosedFixTable from "../../../components/customercomponents/jobs/ClosedTable";
import ClosedFixModal from "../../../components/customercomponents/jobs/modals/ClosedFixModal";

const CustomerOngoingJobs = () => {
  const { data: allClosedJobs, isLoading } = useGetCollaboratorJobs(
    jobTypes.completed
  );
  const [showModal, setShowModal] = useState({
    isShowModal: false,
    id: null,
    // showMessageCSE: false,
  });

  const showJobModal = (id) => {
    setShowModal({
      ...showModal,
      isShowModal: true,
      id,
    });
  };

  const closeJobModal = () =>
    setShowModal({
      ...showModal,
      isShowModal: false,
      id: null,
    });

  const messageCSE = (id) =>
    setShowModal({ ...showModal, showMessageCSE: true, id });
  const closeMessageCse = () =>
    setShowModal({ ...showModal, showMessageCSE: false });

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Closed Fix</PageHeading>
      </div>

      <GlobalBallBeat loading={isLoading} />
      {!isLoading && (
        <ClosedFixTable
          data={allClosedJobs?.data}
          showJobModal={showJobModal}
        />
      )}

      {showModal.isShowModal && (
        <ClosedFixModal
          isOpen={showModal.isShowModal}
          closeModal={closeJobModal}
          id={showModal.id}
          stage="closed"
        />
      )}

      {/* {showModal.showMessageCSE && (
        <MessageCSE
          isOpen={showModal.showMessageCSE}
          closeModal={closeMessageCse}
          cseName={showModal.jobCSEName}
          jobId={showModal.id}
        />
      )} */}
    </>
  );
};

export default CustomerOngoingJobs;
