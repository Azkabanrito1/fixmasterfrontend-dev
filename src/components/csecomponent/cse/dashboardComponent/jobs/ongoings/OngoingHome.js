import styled from "styled-components";
import OngoingCard from "./OngoingCard";
import {
  BackBtn,
  PageHeading,
} from "../../../../../globalcomponents/Utilities";

const OngoingHome = () => {
  return (
    <>
      <div className="mb-5">
        <PageHeading>
          <h2>Ongoing Jobs</h2>
        </PageHeading>
      </div>

      <BackBtn />
      <JobContainer>
        <OngoingCard />
      </JobContainer>
    </>
  );
};

export default OngoingHome;
const JobContainer = styled.div`
  padding: 1rem;

  & > div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.2rem;
  }
`;
