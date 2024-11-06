import {
  PageHeading,
  BackBtn,
  JobsStyledNav,
} from "../../../../../globalcomponents/Utilities";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { useGetCollaboratorJobs } from "../../../../../../hooks/useQueries/useJobs";
import { jobTypes } from "../../../../../../utils/selectOptions";
import { useState } from "react";
import MessageCSE from "../../../../../customercomponents/jobs/modals/MessageCse";
import { useGetJobDetails } from "../../../../../../hooks/useQueries/useJobs";

const MyJobsTemplate = () => {
  const { data: getJobDetails } = useGetCollaboratorJobs(jobTypes.ongoing);
  const [showModal, setShowModal] = useState({
    isShowModal: false,
    showMessage: false,
  });
  const { fixId } = useParams();

  const ongoingJob = getJobDetails?.data?.filter((job) => {
    return job.fixId === Number(fixId);
  });

  const { data: jobDetail } = useGetJobDetails(fixId, {
    enabled: !!fixId,
  });

  const openMessage = () => setShowModal({ ...showModal, showMessage: true });
  const closeMessage = () => setShowModal({ ...showModal, showMessage: false });

  const recipient = {
    name: jobDetail?.data?.customerName,
    role: "Customer",
  };

  return (
    <>
      <div className="mb-5">
        <PageHeading>Ongoing Jobs</PageHeading>
        <BackBtn />
      </div>

      <JobsStyledNav>
        <ul>
          <li>
            <NavLink to="job-details">Job Details</NavLink>
          </li>
          <li>
            <NavLink to="initial-contact">Initial Contact</NavLink>
          </li>
          <li>
            <NavLink to="diagnostic-visits">Diagnostic Visit</NavLink>
          </li>
          <li>
            <NavLink to="supplies">Supplies</NavLink>
          </li>
          <li>
            <NavLink to="completion">Completion</NavLink>
          </li>
          <li>
            <NavLink to="warranty">Warranty</NavLink>
          </li>
          <li>
            <NavLink to="notification">Notifications</NavLink>
          </li>
          <li>
            <Link to={"#"} onClick={() => openMessage(fixId)}>
              Messages
            </Link>
          </li>
        </ul>
      </JobsStyledNav>

      <Outlet context={{ jobDetails: ongoingJob?.[0] || {} }} />

      {showModal.showMessage && (
        <MessageCSE
          isOpen={showModal.showMessage}
          closeModal={closeMessage}
          fixId={fixId}
          recipient={recipient}
        />
      )}
    </>
  );
};

export default MyJobsTemplate;
