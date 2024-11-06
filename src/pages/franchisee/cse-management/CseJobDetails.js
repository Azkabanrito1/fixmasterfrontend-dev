import GlobalModal from "../../../components/globalcomponents/GlobalModal";
import JobDetail from "../../../components/franchiseecomponents/jobsmanagement/JobDetail";
import { cseOngoingJobs } from "../../../utils/franchiseeCseData";
import AltModalHeader from "../../../components/layouts/modal/AltModalHeader";

const CseJobDetails = ({ isOpen, closeModal, title }) => {
  const template = cseOngoingJobs.map((job) => {
    return <JobDetail key={job.id} job={job} />;
  });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={title} closeModal={closeModal} />
      {template}
    </GlobalModal>
  );
};

export default CseJobDetails;
