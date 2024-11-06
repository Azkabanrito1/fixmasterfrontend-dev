import { useNavigate } from "react-router-dom";
import CustomToolbarBtn from "../../globalcomponents/CustomToolbarBtn";
import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import { useState } from "react";
import styled from "styled-components";
import ViewResponseModal from "../modals/ViewResponseModal";
import moment from "moment";
import { useViewTickets } from "../../../hooks/useQueries/useIdentity";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import useDateQueries from "../../../hooks/useDateQueries";
import useDateFilter from "../../../hooks/useDateFilter";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";

const CommentToMgmt = ({ rowNumber, dashboard, role }) => {
  const { data: adminMessages, isLoading } = useViewTickets();
  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "dateSent",
    adminMessages?.data
  );

  const [activeApplicant, setActiveApplicant] = useState({});
  const getActiveApplicant = (value) => {
    let applicantIndex = adminMessages?.data.findIndex(
      (x) => x.ticketId === value
    );
    setActiveApplicant(adminMessages?.data[applicantIndex]);
  };

  //  modal controls
  const [openViewResponseModal, setOpenViewResponseModal] = useState(false);

  const viewResponse = (id) => {
    setOpenViewResponseModal(true);
    getActiveApplicant(id);
  };

  const navigate = useNavigate();
  const ToolBarContainer = styled.span`
    display: ${dashboard ? "block" : "none"};
  `;
  const columns = [
    {
      name: "S/N",
      options: {
        filter: false,
        searchable: false,
        customBodyRender: (_value, MUIDataTableMeta) => {
          return MUIDataTableMeta.rowIndex + 1;
        },
      },
    },
    { name: "senderName", label: "Name" },
    {
      name: "dateSent",
      label: "Comment Date",
      options: {
        customBodyRender: (value) =>
          !!value && moment(value).format("DD-MM-YYYY"),
      },
    },
    { name: "messageType", label: "Comment Type" },
    {
      name: "ticketId",
      label: "Actions",
      options: {
        customBodyRender: (value, meta) => {
          const actions = [
            {
              id: 1,
              name: "Respond",
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
  const urlPath = window.location.pathname;

  return (
    <>
      <GlobalBallBeat loading={isLoading} />
      {!isLoading && (
        <>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h3 className="">Comments to Management</h3>
            <ToolBarContainer>
              <CustomToolbarBtn
                action={() => {
                  if (urlPath.includes("dashboard")) {
                    navigate(
                      urlPath.replace("dashboard", "comment-to-management")
                    );
                  } else {
                    navigate("comment-to-management");
                  }
                }}
              />
            </ToolBarContainer>
          </div>
          <GlobalTable
            data={filteredResults}
            columns={columns}
            options={{
              rowsPerPage: rowNumber,
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

      {openViewResponseModal && (
        <ViewResponseModal
          open={openViewResponseModal}
          close={() => setOpenViewResponseModal(false)}
          headerText={`Messages and Responses`}
          data={activeApplicant}
        />
      )}
    </>
  );
};

export default CommentToMgmt;
