import { useGetQaSupportRequestByFixId } from "../../../../../../../hooks/useQueries/useJobs";
import {
  Grid,
  SectionHeading,
} from "../../../../../../globalcomponents/Utilities";

const Feedbacks = ({ feedback }) => {
  return (
    <div key={feedback.responseID}>
      <div className="mb-3">{feedback?.qaResponse}</div>
      <Grid columns="3">
        {feedback?.qaResponse_Media?.map((media) => {
          if (media.mediaType === "image") {
            return (
              <div className="image" key={media.id}>
                <img src={media.mediaUrl} alt={media.id} />
              </div>
            );
          } else if (media.mediaType === "video") {
            return (
              <div className="video" key={media.id}>
                <video src={media.mediaUrl} controls />
              </div>
            );
          }
        })}
      </Grid>
    </div>
  );
};

const QAMasterFeedback = ({ fixId, stage }) => {
  const { data: qamasterFeedbackData } = useGetQaSupportRequestByFixId(
    fixId,
    stage ? 1 : 2
  );

  const feedBackTemplates = qamasterFeedbackData?.data?.map((feedback) => (
    <Feedbacks feedback={feedback} key={feedback?.responseID} />
  ));
  return (
    <section className="mb-5">
      <SectionHeading>QA Master Feedback</SectionHeading>

      {feedBackTemplates}
      {qamasterFeedbackData?.data?.length > 0 ? null : (
        <div className="text-center p-4 text-muted">
          <i className="fas fa-comments fs-3 mb-2"></i>
          <p>You do not have a feedback yet</p>
        </div>
      )}
    </section>
  );
};

export default QAMasterFeedback;
