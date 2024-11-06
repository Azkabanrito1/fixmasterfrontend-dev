import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import RequestCard from "./RequestCard";

const RequestSupport = ({ data }) => {
  return (
    <AssignmentContainer>
      <AssignmentHeader>
        <h2>Support Request</h2>
      </AssignmentHeader>
      <RequestCard data={data} />
    </AssignmentContainer>
  );
};

export default RequestSupport;
