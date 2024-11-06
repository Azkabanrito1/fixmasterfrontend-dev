import styled from "styled-components";
import { timeFilters } from "../../../utils/selectOptions";
import { useGetCollaboratorJobCount } from "../../../hooks/useQueries/useJobs";
import { PageHeading } from "../../../components/globalcomponents/Utilities";
import TerritoryHealthCards from "../../../components/franchiseecomponents/dashboardcomponents/TerritoryHealthCards";
import { useNavigate } from "react-router-dom";

const JobManagement = () => {
  const navigate = useNavigate();
  const { data: jobData } = useGetCollaboratorJobCount();

  const urgentUnAssignedJobs = {
    ...jobData?.data?.urgentUnAssignedJobs,
    totalDay: jobData?.data?.urgentUnAssignedJobs?.totalToday,
  };
  const unAssignedJobs = {
    ...jobData?.data?.unAssignedJobs,
    totalDay: jobData?.data?.unAssignedJobs?.totalToday,
  };
  const ongoingJobs = {
    ...jobData?.data?.ongoingJobs,
    totalDay: jobData?.data?.ongoingJobs?.totalToday,
  };
  const warrantyClaims = {
    ...jobData?.data?.warrantyClaims,
    totalDay: jobData?.data?.warrantyClaims?.totalToday,
  };
  const completedJobs = {
    ...jobData?.data?.completedJobs,
    totalDay: jobData?.data?.completedJobs?.totalToday,
  };
  const rejectedJobs = {
    ...jobData?.data?.rejectedJobs,
    totalDay: jobData?.data?.rejectedJobs?.totalToday,
  };
  const myJobs = {
    ...jobData?.data?.myJobs,
    totalDay: jobData?.myJobs?.urgentUnAssignedJobs?.totalToday,
  };

  const jobStatus = [
    {
      title: "Urgent Unassigned Jobs",
      text: "Total Urgent Unassigned Jobs",
      img: "/images/urgent.png",
      ref: "urgent-unassigned",
      color: "var(--clr-primary)",
      values: urgentUnAssignedJobs,
      filters: [timeFilters],
    },
    {
      title: "Unassigned Jobs",
      text: "Total Unassigned Jobs",
      img: "/images/unassigned.png",
      ref: "unassigned",
      color: "#FF9B04",
      values: unAssignedJobs,
      filters: [timeFilters],
    },
    {
      title: "Ongoing Jobs",
      text: "Total Ongoing Jobs",
      img: "/images/ongoing.png",
      ref: "ongoing",
      color: "#7B61FF",
      values: ongoingJobs,
      filters: [timeFilters],
    },
    {
      title: "Warranty Claims",
      text: "Total Warranty Claims",
      img: "/images/warranty-jobs.png",
      ref: "warranty",
      color: "var(--clr-primary)",
      values: warrantyClaims,
      filters: [timeFilters],
    },
    {
      title: "Completed Jobs",
      text: "Total Completed Jobs",
      img: "/images/completed.png",
      ref: "completed",
      color: "#11E981",
      values: completedJobs,
      filters: [timeFilters],
    },
    {
      title: "Rejected Jobs",
      text: "Total Rejected jobs",
      img: "/images/rejected.png",
      ref: "rejected",
      color: "#E01B1B",
      values: rejectedJobs,
      filters: [timeFilters],
    },
    {
      title: "My Jobs",
      text: "Total Self-Assigned Jobs",
      img: "/images/self-assigned.png",
      ref: "my-jobs",
      color: "#00AF90",
      values: myJobs,
      filters: [timeFilters],
    },
  ];

  const jobsTemplate = jobStatus.map((status) => {
    return (
      <TerritoryHealthCards
        key={status.title}
        title={status.title}
        text={status.text}
        img={status.img}
        color={status.color}
        filters={status.filters}
        values={status.values}
        handleCardClick={() => navigate(`${status.ref}`)}
      />
    );
  });

  return (
    <>
      <PageHeading className="mb-4">Jobs Management</PageHeading>
      <JobContainer>{jobsTemplate}</JobContainer>
    </>
  );
};

export default JobManagement;

export const JobContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;
