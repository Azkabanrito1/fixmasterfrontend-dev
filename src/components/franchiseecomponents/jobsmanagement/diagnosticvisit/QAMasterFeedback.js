import { SectionHeading } from "../../../globalcomponents/Utilities";

const Feedbacks = ({ feedback }) => {
  return (
    <div>
      <div>{feedback?.title}</div>
      <div>
        <div></div>
        <div>
          <p></p>
          <div className="audio-track"></div>
        </div>
      </div>
    </div>
  );
};

const QAMasterFeedback = () => {
  const visitDetails = {
    qaMasterFeedback: [
      // {
      //   title: "Electrical",
      //   text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend laoreet varius viverra quis potenti sit risus arcu. Dui vitae luctus at enim. Elit nunc ipsum pulvinar dignissim vel. Nec, elit proin pellentesque eu pellentesque parturient nisl sed morbi.",
      //   audio: "audio.url",
      // },
    ],
  };

  return (
    <section className="mb-5">
      <SectionHeading>QA Master Feedback</SectionHeading>

      {visitDetails?.qaMasterFeedback?.length > 0 ? (
        <Feedbacks />
      ) : (
        <div className="text-center p-4 text-muted">
          <i className="fas fa-comments fs-3 mb-2"></i>
          <p>You do not have a feedback yet</p>
        </div>
      )}
    </section>
  );
};

export default QAMasterFeedback;
