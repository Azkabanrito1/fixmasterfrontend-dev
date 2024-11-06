import { useState } from "react";
import RatingsTable from "../../../components/customercomponents/jobs/RatingsTable";
import { useGetCollaboratorJobs } from "../../../hooks/useQueries/useJobs";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import { jobTypes } from "../../../utils/selectOptions";
import FeedbackRatings from "../../../components/customercomponents/jobs/modals/FeedbackRating";

const Ratings = () => {
  const { data: allOngoingJobs, isLoading } = useGetCollaboratorJobs(
    jobTypes.ongoing
  );
  const [showModal, setShowModal] = useState({
    isShowModal: false,
    id: null,
  });

  const showRatingModal = (id) =>
    setShowModal({
      isShowModal: true,
      id,
    });
  const hideRatingModal = () =>
    setShowModal({
      isShowModal: false,
      id: null,
    });

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Feedback and Ratings</PageHeading>
      </div>

      <GlobalBallBeat loading={isLoading} />
      {!isLoading && (
        <RatingsTable
          data={allOngoingJobs?.data}
          showRatingModal={showRatingModal}
        />
      )}

      {showModal.isShowModal && (
        <FeedbackRatings
          isOpen={showModal.isShowModal}
          closeModal={hideRatingModal}
          fixId={showModal.id}
        />
      )}
    </>
  );
};

export default Ratings;
