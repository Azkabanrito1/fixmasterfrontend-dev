import JobsCard from "../../../components/csecomponent/cse/dashboardComponent/jobs/management/JobsCard";
import { GridCardsContainer } from "../../../components/globalcomponents/Utilities";
import styled from "styled-components";
import { useGetCollaboratorJobCount } from "../../../hooks/useQueries/useJobs";

const TechJobsHome = () => {
  //-----------------------data fetching------------------------
  const { data: jobData } = useGetCollaboratorJobCount();

  const jobs = [
    {
      id: 0,
      icon: "/images/new-fix.png",
      title: "Unassigned Job",
      description: "Click to see all unassigned jobs.",
      to: "unassigned",
      notificationCount: jobData?.data?.unAssignedJobs?.totalCount,
      color: "#ffb443",
    },
    {
      id: 1,
      icon: "/images/new-fix.png",
      title: "Assigned Job",
      description: "Click to see all unassigned jobs.",
      to: "assigned",
      notificationCount: jobData?.data?.assignedJobs?.totalCount,
      color: "#ffb443",
    },
    {
      id: 2,
      icon: "/images/ongoing-fix.png",
      title: "Ongoing Jobs",
      description: "Click to see all ongoing jobs.",
      to: "ongoing",
      notificationCount: jobData?.data?.ongoingJobs?.totalCount,
      color: "#7b61ff",
    },
    {
      id: 3,
      icon: "/images/warranty-fix.png",
      title: "Completed Jobs",
      description: "Click to see all completed jobs.",
      to: "completed",
      notificationCount: jobData?.data?.completedJobs?.totalCount,
      color: "#11e981",
    },
    {
      id: 4,
      icon: "/images/completed-fix.png",
      title: "Warranty Jobs",
      description: "Click to see all Warranty jobs...",
      to: "warranty",
      notificationCount: jobData?.data?.warrantyClaims?.totalCount,
      color: "#f58451",
    },
    {
      id: 5,
      icon: "/images/completed-fix.png",
      title: "Rejected Jobs",
      description: "Click to see all rejected jobs...",
      to: "rejected",
      notificationCount: jobData?.data?.rejectedJobs?.totalCount,
      color: "#f58451",
    },
  ];

  return (
    <Container>
      {jobs.map((job) => (
        <JobsCard key={job.id} job={job} />
      ))}
    </Container>
  );
};

export default TechJobsHome;

const Container = styled(GridCardsContainer)`
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;
