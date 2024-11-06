import styled from "styled-components";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useGetCollaboratorJobs } from "../../../hooks/useQueries/useJobs";
import Cards from "../../../components/csecomponent/cse/dashboardComponent/jobs/ongoings/Cards";
import { jobTypes } from "../../../utils/selectOptions";

const OngoingHome = () => {
  const { data: ongoingJobs } = useGetCollaboratorJobs(jobTypes.ongoing);
  return (
    <>
      <div className="mb-5">
        <PageHeading>Ongoing Jobs</PageHeading>
        <BackBtn />
      </div>

      {ongoingJobs?.data?.length > 0 ? (
        <JobContainer>
          {ongoingJobs?.data?.map((job) => {
            return <Cards key={job} job={job} />;
          })}
        </JobContainer>
      ) : (
        <p className="text-center w-100">There are no ongoing jobs</p>
      )}
    </>
  );
};

export default OngoingHome;
const JobContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.2rem;
`;
