import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { InfoTable, NoData } from "../../globalcomponents/Utilities";
import UrgentAssignmentView from "./UrgentAssignmentView";

const Urgent = () => {
  return (
    <AssignmentContainer>
      <AssignmentHeader>
        <h2>Urgent Assignments Needed</h2>
        <UrgentAssignmentView />
      </AssignmentHeader>
      <InfoTable>
        <thead>
          <tr>
            <th>Time Posted</th>
            <th>SLA</th>
            <th>Job Ref</th>
            <th>Job Category</th>
            <th>Job Class</th>
            <th>-----</th>
          </tr>
        </thead>
        <tbody>{<NoData cols="6" />}</tbody>
      </InfoTable>
    </AssignmentContainer>
  );
};

export default Urgent;
