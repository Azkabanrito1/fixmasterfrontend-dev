import styled from "styled-components";
import { PATH_ADMIN } from "../../../routes/paths";
import {
  GridCardsContainer,
  GroupHeading,
} from "../../globalcomponents/Utilities";
import UserCard from "../usermanagement/UserCard";

const JobsSection = ({ data }) => {
  const jobsArr = [
    {
      id: 0,
      icon: "/images/unassigned.png",
      title: "Unassigned Jobs",
      description: "Total Unassigned Jobs",
      to: PATH_ADMIN.unassignedJobs,
      totalUsers: data.newJobs,
    },
    {
      id: 1,
      icon: "/images/ongoing.png",
      title: "Ongoing Jobs",
      description: "Total Ongoing Jobs",
      to: PATH_ADMIN.ongoingJobs,
      totalUsers: data.ongoingJobs,
    },
    {
      id: 2,
      icon: "/images/warranty-jobs.png",
      title: "Warranty Claims",
      description: "Total Warranty Claims",
      to: PATH_ADMIN.warrantyJobs,
      totalUsers: data.warrantyJobs,
    },
    {
      id: 3,
      icon: "/images/completed.png",
      title: "Completed Jobs",
      description: "Total Completed Jobs",
      to: PATH_ADMIN.completedJobs,
      totalUsers: data.completedJobs,
    },
    {
      id: 4,
      icon: "/images/rejected.png",
      title: "Rejected Jobs",
      description: "Total Rejected Jobs",
      to: PATH_ADMIN.rejectedJobs,
      totalUsers: data.completedJobs,
    },
  ];

  const jobsTemplate = jobsArr.map((job) => (
    <UserCard key={job.id} user={job} />
  ));

  return (
    <div>
      <GroupHeading>Jobs</GroupHeading>

      <UserCardsContainer>{jobsTemplate}</UserCardsContainer>
    </div>
  );
};

export default JobsSection;

const UserCardsContainer = styled(GridCardsContainer)`
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;
