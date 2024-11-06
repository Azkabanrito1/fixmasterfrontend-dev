import React from "react";
import styled from "styled-components";
import OngoingCard from "./OngoingCard";
import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../../../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";

const OngoingIndex = ({ job }) => {
  // console.log(job);
  return (
    <>
      <JobContainer>
        <AssignmentHeader>
          <h2 className="fw-bold">Ongoing Jobs</h2>
        </AssignmentHeader>
        <div>
          {job?.map((job, index) => {
            return <OngoingCard job={job} key={index} />;
          })}
        </div>
      </JobContainer>
    </>
  );
};

export default OngoingIndex;
const JobContainer = styled(AssignmentContainer)`
  padding: 1rem;

  & > div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }
`;
