import GlobalBallBeat from "../../../../components/globalcomponents/GlobalBallBeat";
import { useState } from "react";
import GlobalTable from "../../../../components/globalcomponents/GlobalTable";
import GlobalTableActions from "../../../../components/globalcomponents/GlobalTableActions";
import { BackBtn } from "../../../../components/globalcomponents/Utilities";
import {
  useAssignWorkingTypeToCollaborator,
  useGetCollaboratorForAssignment,
} from "../../../../hooks/useQueries/useOnboarding";
import ConfirmAcceptModal from "../../../../components/globalcomponents/modals/ConfirmAcceptModal";
import { format } from "date-fns";
import WorkingTypeModal from "./modal/WorkingTypeModal";
import { useSnackbar } from "notistack";
import DateFilterToolbar from "../../../../components/globalcomponents/DateFilterToolbar";
import useDateQueries from "../../../../hooks/useDateQueries";
import useDateFilter from "../../../../hooks/useDateFilter";
import WorkTypeHistory from "./modal/WorkTypeHistory";

const AdminAssignWorkingTypes = ({ role }) => {
  const [openWorkTypeModal, setOpenWorkTypeModal] = useState(false);
  const [openWorkTypeHistoryModal, setOpenWorkTypeHistoryModal] =
    useState(false);
  const [payload, setPayload] = useState({});
  const [activeApplicant, setActiveApplicant] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const { data: collaboratorForAssignment, isSuccess } =
    useGetCollaboratorForAssignment(role);
  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "createdAt",
    collaboratorForAssignment?.data
  );

  const getActiveApplication = (id) => {
    const applicant = collaboratorForAssignment?.data?.filter(
      (applicant) => applicant.collaboratorUserId === id
    );
    setActiveApplicant(applicant[0]);
  };

  const setWorkingType = (userId, workingTypeId) => {
    setOpenWorkTypeModal(true);
    getActiveApplication(userId);
    setPayload({
      collaboratorUserId: userId,
      employmentTypeId: workingTypeId,
    });
    console.log(activeApplicant);
  };
  const showHistory = (userId) => {
    setOpenWorkTypeHistoryModal(true);
    getActiveApplication(userId);
  };

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    setOpenWorkTypeModal(false);
  };
  const onFailed = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: confirmWokingType, isLoading } =
    useAssignWorkingTypeToCollaborator(onSuccess, onFailed);

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
      name: "fullName",
      label: "Name",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "workingType",
      label: "Working Type",
    },
    {
      name: "territoryName",
      label: "Territory",
    },
    {
      name: "createdAt",
      label: "Date created",
      options: {
        customBodyRender: (value) =>
          format(new Date(value), "dd-MM-yyyy") || "N/A",
      },
    },
    {
      name: "collaboratorUserId",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value, tableMeta) => {
          const actions =
            role === "cse" || role === "technician"
              ? [
                  {
                    id: 0,
                    name: "View Work type history",
                    action: () => showHistory(value),
                  },
                  {
                    id: 1,
                    name: "Assign as Fulltime",
                    action: () => setWorkingType(value, 1),
                    disabled:
                      collaboratorForAssignment?.data[
                        tableMeta.rowIndex
                      ].workingType.toLowerCase() === "fulltime"
                        ? true
                        : false,
                  },
                  {
                    id: 2,
                    name: "Assign as Contract",
                    action: () => setWorkingType(value, 2),
                    disabled:
                      collaboratorForAssignment?.data[
                        tableMeta.rowIndex
                      ].workingType.toLowerCase() === "contract"
                        ? true
                        : false,
                  },
                  {
                    id: 3,
                    name: "Assign as Freelance",
                    action: () => setWorkingType(value, 3),
                    disabled:
                      collaboratorForAssignment?.data[
                        tableMeta.rowIndex
                      ].workingType.toLowerCase() === "freelance"
                        ? true
                        : false,
                  },
                ]
              : [
                  {
                    id: 0,
                    name: "View Work type history",
                    action: () => showHistory(value),
                  },
                  {
                    id: 1,
                    name: "Assign as Fulltime",
                    action: () => setWorkingType(value, 1),
                    disabled:
                      collaboratorForAssignment?.data[
                        tableMeta.rowIndex
                      ].workingType.toLowerCase() === "fulltime"
                        ? true
                        : false,
                  },
                  {
                    id: 2,
                    name: "Assign as Contract",
                    action: () => setWorkingType(value, 2),
                    disabled:
                      collaboratorForAssignment?.data[
                        tableMeta.rowIndex
                      ].workingType.toLowerCase() === "contract"
                        ? true
                        : false,
                  },
                ];
          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="assign-working-type" />
            </div>
          );
        },
      },
    },
  ];

  return (
    <>
      <BackBtn />
      <GlobalBallBeat loading={!isSuccess} />
      {isSuccess && (
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
      {openWorkTypeModal && (
        <WorkingTypeModal
          isLoading={isLoading}
          open={openWorkTypeModal}
          close={() => setOpenWorkTypeModal(false)}
          pText={`Set working type of ${activeApplicant.fullName.toUpperCase()} to ${
            payload.employmentTypeId === 1
              ? "Fulltime"
              : payload.employmentTypeId === 2
              ? "Contract"
              : "Freelance"
          }?`}
          onDelete={() => confirmWokingType(payload)}
          actionText="Approve"
          labelText="Collaborator Working Type"
        />
      )}
      {openWorkTypeHistoryModal && (
        <WorkTypeHistory
          open={openWorkTypeHistoryModal}
          close={() => setOpenWorkTypeHistoryModal(false)}
          applicant={activeApplicant}
        />
      )}
    </>
  );
};
export default AdminAssignWorkingTypes;
