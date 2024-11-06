import styled from "styled-components";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useGetCollaboratorJobs } from "../../../hooks/useQueries/useJobs";
import Cards from "../../../components/csecomponent/cse/dashboardComponent/jobs/ongoings/Cards";
import { jobTypes } from "../../../utils/selectOptions";

const TechOngoingJobs = () => {
  const { data: ongoingJobs } = useGetCollaboratorJobs(jobTypes.ongoing);
  return (
    <>
      <div className="mb-5">
        <PageHeading>Ongoing Jobs</PageHeading>
      </div>
      <BackBtn />
      <JobContainer>
        {ongoingJobs?.data?.map((job) => {
          return <Cards key={job.fixId} job={job} tech={true} />;
        })}
      </JobContainer>
    </>
  );
};

export default TechOngoingJobs;

const JobContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.2rem;
`;
