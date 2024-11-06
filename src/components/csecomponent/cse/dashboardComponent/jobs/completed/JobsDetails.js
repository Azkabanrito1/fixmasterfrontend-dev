import GlobalModal from "../../../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../../../layouts/modal/AltModalHeader";
import JobDet from "./JobDet";

const JobsDetails = ({ isOpen, closeModal, title, jobId, jobs }) => {
  const jobDetails = jobs?.filter((job) => {
    return job.fixId === jobId;
  });
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={title} closeModal={closeModal} />
      <JobDet job={jobDetails?.at(0)} title={title} />
    </GlobalModal>
  );
};

export default JobsDetails;
