import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import GlobalCollapsible from "../../../globalcomponents/GlobalCollapsible";
import { useGetCseInterviewById } from "../../../../hooks/useQueries/useOnboarding";

const VideoPlayer = ({ videoUrl }) => (
  <video controls width={"100%"} style={{ aspectRatio: "16/9" }}>
    <source src={videoUrl} />
  </video>
);

const ViewInterviewVideos = ({ applicant, isOpen, closeModal }) => {
  const { data: videoData } = useGetCseInterviewById(applicant);
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader closeModal={closeModal} heading={"Interview Videos"} />

      {videoData?.data?.map((data) => (
        <GlobalCollapsible key={data.id} title={data.interviewQuestion}>
          <VideoPlayer videoUrl={data.videoUrl} />
        </GlobalCollapsible>
      ))}
    </GlobalModal>
  );
};

export default ViewInterviewVideos;
