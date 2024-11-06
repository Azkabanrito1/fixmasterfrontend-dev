import { useState } from "react";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import OngoingFixModal from "../../../components/customercomponents/jobs/modals/OngoingFixModal";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import MessageCSE from "../../../components/customercomponents/jobs/modals/MessageCse";
import {
  useGetCollaboratorJobs,
  useGetJobDetails,
} from "../../../hooks/useQueries/useJobs";
import OngoingFixTable from "../../../components/customercomponents/jobs/OngoingTable";
import { jobTypes } from "../../../utils/selectOptions";

const CustomerOngoingJobs = () => {
  const { data: allOngoingJobs, isLoading } = useGetCollaboratorJobs(
    jobTypes.ongoing
  );

  const [showModal, setShowModal] = useState({
    isShowModal: false,
    id: null,
    showMessageCSE: false,
  });

  const { data: jobDetail } = useGetJobDetails(showModal.id, {
    enabled: !!showModal.id,
  });

  const showJobModal = (id) => {
    setShowModal({
      ...showModal,
      isShowModal: true,
      id,
    });
  };

  const recipient = {
    name: jobDetail?.data?.franchiseeOrCseAssignedName,
    role: "CSE",
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
        <PageHeading>Ongoing Fix</PageHeading>
      </div>

      <GlobalBallBeat loading={isLoading} />
      {!isLoading && (
        <OngoingFixTable
          data={allOngoingJobs?.data}
          showJobModal={showJobModal}
        />
      )}

      {showModal.isShowModal && (
        <OngoingFixModal
          messageCse={messageCSE}
          isOpen={showModal.isShowModal}
          closeModal={closeJobModal}
          id={showModal.id}
          stage="ongoing"
        />
      )}

      {showModal.showMessageCSE && (
        <MessageCSE
          isOpen={showModal.showMessageCSE}
          closeModal={closeMessageCse}
          fixId={showModal.id}
          recipient={recipient}
        />
      )}
    </>
  );
};

export default CustomerOngoingJobs;
