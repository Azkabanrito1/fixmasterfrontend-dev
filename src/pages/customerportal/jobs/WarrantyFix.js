import { useState } from "react";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { jobTypes } from "../../../utils/selectOptions";
import { useGetCollaboratorJobs } from "../../../hooks/useQueries/useJobs";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import WarrantyTable from "../../../components/customercomponents/jobs/WarrantyTable";
import OngoingFixModal from "../../../components/customercomponents/jobs/modals/OngoingFixModal";
import MessageCSE from "../../../components/customercomponents/jobs/modals/MessageCse";
import WarrantyClaim from "../../../components/customercomponents/jobs/modals/WarrantyClaim";

const CustomerWarrantyJobs = () => {
  const { data: allWarrantyJobs, isLoading } = useGetCollaboratorJobs(
    jobTypes.warrantyClaims
  );

  const [showModal, setShowModal] = useState({
    isShowModal: false,
    id: null,
    showMessageCSE: false,
    shoWwarrantyClaims: false,
  });

  const showJobModal = (id) =>
    setShowModal({
      ...showModal,
      isShowModal: true,
      id,
    });

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
  const warrantyClaims = (id) =>
    setShowModal({ ...showModal, shoWwarrantyClaims: true, id });
  const closeWarrantyClaim = () =>
    setShowModal({ ...showModal, shoWwarrantyClaims: false });

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Warranty Fix</PageHeading>
      </div>

      <GlobalBallBeat loading={isLoading} />
      {!isLoading && (
        <WarrantyTable
          data={allWarrantyJobs?.data}
          showJobModal={showJobModal}
        />
      )}

      {showModal.isShowModal && (
        <OngoingFixModal
          messageCse={messageCSE}
          isOpen={showModal.isShowModal}
          closeModal={closeJobModal}
          id={showModal.id}
          stage="warranty"
        />
      )}

      {showModal.showMessageCSE && (
        <MessageCSE
          isOpen={showModal.showMessageCSE}
          closeModal={closeMessageCse}
          jobId={showModal.id}
        />
      )}
    </>
  );
};

export default CustomerWarrantyJobs;
