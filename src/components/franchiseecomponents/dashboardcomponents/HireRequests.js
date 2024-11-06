import { BallBeat } from "react-pure-loaders";
import { useNavigate } from "react-router-dom";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { AssignmentContainer, AssignmentHeader } from "./DashboardHomeSection";
import GlobalTable from "../../globalcomponents/GlobalTable";
import moment from "moment";

const HireRequests = ({ equipmentRequests, isLoading }) => {
  const navigate = useNavigate();
  const columns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "equipmentName",
      label: "Equipment Name",
    },
    {
      name: "quantity",
      label: "Quantity",
    },
    {
      name: "requestDate",
      label: "Request Date",
      options: {
        customBodyRender: (value) => {
          const dateTime = value.split(" ");
          const date = dateTime[0].replaceAll("/", "-");
          return date;
        },
      },
    },
    {
      name: "dateNeeded",
      label: "Schedule Date",
    },
  ];
  return (
    <>
      <AssignmentContainer>
        <AssignmentHeader>
          <h2>Hire Requests</h2>

          {equipmentRequests?.length > 0 && (
            <GlobalBtn
              height="auto"
              width="max-width"
              py="8px"
              px="20px"
              fs="16px"
              fw="400"
              onClick={() => navigate("/franchisee/hire-requests")}
            >
              View All
            </GlobalBtn>
          )}
        </AssignmentHeader>

        <div style={{ textAlign: "center" }}>
          <BallBeat color="var(--clr-primary)" loading={isLoading} />
        </div>

        {equipmentRequests?.length > 0 && (
          <GlobalTable
            title="Hire Requests"
            data={equipmentRequests}
            columns={columns}
            options={{
              customToolbar: () => <div></div>,
              print: false,
              download: false,
              search: false,
              filter: false,
              elevation: 0,
              selectableRows: "none",
              rowsPerPage: 5,
              rowsPerPageOptions: [5, 10, 20],
              viewColumns: false,
              displayToolbar: false,
            }}
          />
        )}
      </AssignmentContainer>
    </>
  );
};

export default HireRequests;
