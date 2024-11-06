import { useState } from "react";
import GlobalTable from "../globalcomponents/GlobalTable";
import CustomToolbarBtn from "../globalcomponents/CustomToolbarBtn";
import CustomerSupport from "../csecomponent/cse/dashboardComponent/comment/Comment";
import GlobalTableActions from "../globalcomponents/GlobalTableActions";
import { Chip } from "@mui/material";
import ViewResponseModal from "../hrcomponents/modals/ViewResponseModal";
import { useViewTickets } from "../../hooks/useQueries/useIdentity";
import format from "date-fns/format";
import DateFilterToolbar from "../globalcomponents/DateFilterToolbar";
import useDateQueries from "../../hooks/useDateQueries";
import GlobalBallBeat from "../globalcomponents/GlobalBallBeat";
import useDateFilter from "../../hooks/useDateFilter";

const CommentsDashboard = () => {
  const { data: comments, isLoading } = useViewTickets();
  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(dateQueries, "dateSent", comments?.data);
  const [openCommentsModal, setOpenCommentsModal] = useState(false);

  const [activeApplicant, setActiveApplicant] = useState({});
  const getActiveApplicant = (value) => {
    let applicantIndex = comments?.data?.findIndex((x) => x.ticketId === value);
    setActiveApplicant(comments?.data[applicantIndex]);
  };
  const [openViewResponseModal, setOpenViewResponseModal] = useState(false);

  //view response
  const viewResponse = (id) => {
    setOpenViewResponseModal(true);
    getActiveApplicant(id);
  };

  const columns = [
    { name: "senderName", label: "Name" },
    {
      name: "dateSent",
      label: "Comment Date",
      options: {
        customBodyRender: (value) =>
          value ? format(new Date(value), "dd-MM-yyyy") : "",
      },
    },
    { name: "messageType", label: "Comment Type" },
    {
      name: "isResponded",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value ? "Responded" : "Pending"}
            color={value ? "success" : "warning"}
          />
        ),
      },
    },
    {
      name: "ticketId",
      label: "Actions",
      options: {
        customBodyRender: (value, meta) => {
          const actions = [
            {
              id: 0,
              name: "Send Comment",
              action: () => viewResponse(value),
            },
          ];

          return (
            <div>
              <GlobalTableActions actions={actions} />
            </div>
          );
        },
      },
    },
  ];
  return (
    <>
      <GlobalBallBeat loading={isLoading} />
      {!isLoading && (
        <>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h3 className="">Comments sent to Management</h3>
            <CustomToolbarBtn
              text="SEND A COMMENT"
              action={() => {
                setOpenCommentsModal(true);
              }}
            />
          </div>
          <GlobalTable
            data={filteredResults}
            columns={columns}
            options={{
              rowsPerPageOptions: [5, 10, 20, 50],
              customToolbar: () => (
                <DateFilterToolbar
                  dateQueries={dateQueries}
                  setDateQueries={setDateQueries}
                />
              ),
            }}
          />
        </>
      )}

      {openCommentsModal && (
        <CustomerSupport
          isOpen={openCommentsModal}
          close={() => setOpenCommentsModal(false)}
        />
      )}
      {openViewResponseModal && (
        <ViewResponseModal
          open={openViewResponseModal}
          close={() => setOpenViewResponseModal(false)}
          headerText={`Messages and responses`}
          data={activeApplicant}
        />
      )}
    </>
  );
};
export default CommentsDashboard;
