import styled from "styled-components";
import JobsCard from "../../../components/csecomponent/cse/dashboardComponent/jobs/management/JobsCard";
import {
  BackBtn,
  GridCardsContainer,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useGetCollaboratorJobCount } from "../../../hooks/useQueries/useJobs";
import { Stack } from "@mui/material";
import { UserCardsContainer } from "../usermanagement/CollaboratorMgmtOptions";

const JobsManaged = () => {
  //-----------------------data fetching------------------------
  const { data: jobData } = useGetCollaboratorJobCount();

  const jobs = [
    {
      id: 0,
      icon: "/images/new-fix.png",
      title: "Unassigned Jobs",
      description: "View all.",
      to: "unassigned",
      notificationCount: jobData?.data?.unAssignedJobs?.totalCount,
      color: "#ffb443",
    },
    {
      id: 1,
      icon: "/images/ongoing-fix.png",
      title: "Ongoing Jobs",
      description: "View all.",
      to: "ongoing",
      notificationCount: jobData?.data?.ongoingJobs?.totalCount,
      color: "#7b61ff",
    },
    {
      id: 2,
      icon: "/images/warranty-fix.png",
      title: "Completed Jobs",
      description: "View all.",
      to: "completed",
      notificationCount: jobData?.data?.completedJobs?.totalCount,
      color: "#11e981",
    },
    {
      id: 3,
      icon: "/images/completed-fix.png",
      title: "Warranty Jobs",
      description: "View all.",
      to: "warranty",
      notificationCount: jobData?.data?.warrantyClaims?.totalCount,
      color: "#f58451",
    },

    {
      id: 4,
      icon: "/images/completed-fix.png",
      title: "Rejected Jobs",
      description: "View all.",
      to: "rejected",
      notificationCount: jobData?.data?.rejectedJobs?.totalCount,
      color: "#f58451",
    },
  ];

  return (
    <Stack spacing={4}>
      <div>
        <BackBtn />
        <PageHeading>Jobs Managed</PageHeading>
      </div>
      <UserCardsContainer>
        {jobs.map((job) => (
          <JobsCard key={job.id} job={job} />
        ))}
      </UserCardsContainer>
    </Stack>
  );
};

export default JobsManaged;

const Container = styled(GridCardsContainer)`
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;
