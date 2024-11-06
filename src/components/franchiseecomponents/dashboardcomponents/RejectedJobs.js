import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { AssignmentContainer, AssignmentHeader } from "./DashboardHomeSection";
import { InfoTable, NoData } from "../../globalcomponents/Utilities";
import { useSelector } from "react-redux";
import { BallBeat } from "react-pure-loaders";

const RejectedJobs = ({ rejectedJobs }) => {
  const { isLoading } = useSelector((state) => state.auth);

  const rejectedJobsTemplate = rejectedJobs?.map((job) => {
    return (
      <tr key={job.id}>
        <td>{job.jobClass}</td>
        <td>{job.jobCategory}</td>
        <td>{job.type}</td>
        <td>
          <button className="primary">View details</button>
        </td>
      </tr>
    );
  });

  return (
    <AssignmentContainer>
      <AssignmentHeader>
        <h2>Rejected Jobs</h2>
        {rejectedJobs?.length > 0 && (
          <GlobalBtn
            height="auto"
            width="max-width"
            py="8px"
            px="20px"
            fs="16px"
            fw="600"
          >
            View All
          </GlobalBtn>
        )}
      </AssignmentHeader>

      <div style={{ textAlign: "center" }}>
        <BallBeat color="var(--clr-primary)" loading={isLoading} />
      </div>

      <InfoTable minWidth="500px">
        {!isLoading &&
          (rejectedJobs?.length > 0 ? (
            <>
              <thead>
                <tr>
                  <th>Job Class</th>
                  <th>Job Category</th>
                  <th>Job Type</th>
                  <th>----</th>
                </tr>
              </thead>
              <tbody>{rejectedJobsTemplate}</tbody>
            </>
          ) : (
            <tbody>
              <NoData dataName="rejected jobs" cols="4" />
            </tbody>
          ))}
      </InfoTable>
    </AssignmentContainer>
  );
};

export default RejectedJobs;
