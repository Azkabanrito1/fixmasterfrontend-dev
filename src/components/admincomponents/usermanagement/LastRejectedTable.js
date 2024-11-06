import { useState } from "react";
import { useGetRejectedCollaborators } from "../../../hooks/useQueries/useOnboarding";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import RejectionReasonModal from "../../globalcomponents/modals/RejectionReasonModal";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";
import { format } from "date-fns";

const LastRejectedTable = ({ role }) => {
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [activeApplicant, setActiveApplicant] = useState({});

  const { data: rejectedCollaborators, isLoading } =
    useGetRejectedCollaborators(role, "last");

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "dateRejected",
    rejectedCollaborators?.data
  );

  const openReasonModal = (value) => {
    setShowReasonModal(true);
    let applicantIndex = rejectedCollaborators.data.findIndex(
      (x) => x.id === value
    );
    setActiveApplicant(rejectedCollaborators.data[applicantIndex]);
  };

  const closeReasonModal = () => {
    setShowReasonModal(false);
  };

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
    {
      name: "name",
      label: "Name",
    },
    {
      name: "dateRejected",
      label: "Rejected Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "rjectedBy",
      label: "Rejected By",
    },
    {
      name: "id",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value, tableMeta) => {
          const actions = [
            {
              id: 0,
              name: "Rejection Reason",
              action: () => openReasonModal(value),
            },
          ];
          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="last" />
            </div>
          );
        },
      },
    },
  ];

  return (
    <div>
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && rejectedCollaborators?.data?.length > 0 && (
        <GlobalTable
          columns={columns}
          data={filteredResults}
          options={{
            customToolbar: () => (
              <DateFilterToolbar
                dateQueries={dateQueries}
                setDateQueries={setDateQueries}
              />
            ),
          }}
        />
      )}

      {showReasonModal && (
        <RejectionReasonModal
          isLoading={isLoading}
          isOpen={showReasonModal}
          closeModal={closeReasonModal}
          role={role}
          type={"last"}
          applicantId={activeApplicant.id}
        />
      )}

      {!isLoading && rejectedCollaborators?.data?.length === 0 && (
        <p className="text-center">No rejected {role} in this stage</p>
      )}
    </div>
  );
};

export default LastRejectedTable;
