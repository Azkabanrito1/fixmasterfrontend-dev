import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { AssignmentContainer, AssignmentHeader } from "./DashboardHomeSection";
import { InfoTable, NoData } from "../../globalcomponents/Utilities";

const UrgentAssignments = ({ assignments }) => {
  const assignmentTemplate = assignments?.map((assignment) => {
    return (
      <tr key={assignment?.id}>
        <td>{assignment?.timePosted}</td>
        <td>{assignment?.sla}</td>
        <td>{assignment?.jobRef}</td>
        <td>{assignment?.jobCategory}</td>
        <td>{assignment?.jobClass}</td>
      </tr>
    );
  });

  return (
    <AssignmentContainer>
      <AssignmentHeader>
        <h2>Urgent Assignments Needed</h2>
        {assignments?.length > 0 && (
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

      <InfoTable minWidth="500px">
        {assignments?.length > 0 ? (
          <>
            <thead>
              <tr>
                <th>Time Posted</th>
                <th>SLA</th>
                <th>Job Ref</th>
                <th>Job Category</th>
                <th>Service Type</th>
                <th>- - - -</th>
              </tr>
            </thead>
            <tbody>{assignmentTemplate}</tbody>
          </>
        ) : (
          <tbody>
            <NoData dataName="urgent unassigned jobs" cols="6" />
          </tbody>
        )}
      </InfoTable>
    </AssignmentContainer>
  );
};

export default UrgentAssignments;
