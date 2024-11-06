import { useNavigate } from "react-router-dom";
import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../../../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import GlobalBtn from "../../../../../globalcomponents/GlobalBtn";
import GlobalTable from "../../../../../globalcomponents/GlobalTable";

const UnassignedHome = ({ data }) => {
  const navigate = useNavigate();

  const columns = [
    {
      name: "jobId",
      label: "Job ID",
    },
    {
      name: "jobClass",
      label: "Service Type",
    },
    {
      name: "jobCategory",
      label: "Job Category",
    },
    {
      name: "jobType",
      label: "Job Type",
    },
    {
      name: "requestTime",
      label: "Time Posted",
    },
  ];

  return (
    <AssignmentContainer style={{ marginTop: "20px" }}>
      <AssignmentHeader className="mb-4">
        <h2 className="fw-bold">Unassigned Jobs</h2>

        <GlobalBtn
          height="auto"
          width="max-width"
          py="8px"
          px="20px"
          fs="16px"
          fw="600"
          onClick={() => navigate("/cse/job-management/unaccepted")}
        >
          View All
        </GlobalBtn>
      </AssignmentHeader>
      <GlobalTable
        columns={columns}
        data={data?.newJobs}
        options={{
          elevation: 0,
          filter: false,
          search: false,
          viewColumns: false,
          print: false,
          download: false,
          selectableRows: "none",
          rowsPerPage: 5,
          rowsPerPageOptions: [5, 10, 15],
        }}
      />
    </AssignmentContainer>
  );
};

export default UnassignedHome;
