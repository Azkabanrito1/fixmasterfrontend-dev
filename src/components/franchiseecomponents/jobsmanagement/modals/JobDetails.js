import GlobalModal from "../../../globalcomponents/GlobalModal";
import JobDetail from "../JobDetail";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";

const JobDetails = ({ isOpen, closeModal, title, jobs }) => {
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={title} closeModal={closeModal} />
      <JobDetail job={jobs} title={title} />
    </GlobalModal>
  );
};

export default JobDetails;
