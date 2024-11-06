import * as React from "react";
import {
  useApproveFranchiseeAndQaApplication,
  useApproveQaApplication,
  useGetQaApplicants,
  useRejectFranchiseeAndQaApplication,
  useRejectQaApplication,
} from "../../../hooks/useQueries/useOnboarding";
import { useSnackbar } from "notistack";
import { Chip, Grid } from "@mui/material";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../globalcomponents/GlobalTable";
import { useState } from "react";
import SetInterviewDate from "../../globalcomponents/modals/SetInterviewDate";
import ConfirmRejectionModal from "../../globalcomponents/modals/ConfirmRejectionModal";
import { format } from "date-fns";
import ViewQaMasterApplication from "../../qamastercomponent/modal/ViewQaMasterApplication";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";

const QAStage1Table = () => {
  const [activeApplicant, setActiveApplicant] = useState({});
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // ----------------data fetching------------------------
  const { data: qaApplicants, isLoading } = useGetQaApplicants();

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "dateApplied",
    qaApplicants?.data
  );

  // modal controls

  const openApplicationModal = (value) => {
    setShowApplicationModal(true);
    let applicantIndex = qaApplicants.data.findIndex((x) => x.id === value);
    setActiveApplicant(qaApplicants.data[applicantIndex]);
  };
  const openAcceptModal = (value) => {
    setShowAcceptModal(true);
    let applicantIndex = qaApplicants.data.findIndex((x) => x.id === value);
    setActiveApplicant(qaApplicants.data[applicantIndex]);
  };
  const openRejectModal = (value) => {
    setShowRejectModal(true);
    let applicantIndex = qaApplicants.data.findIndex((x) => x.id === value);
    setActiveApplicant(qaApplicants.data[applicantIndex]);
  };
  const closeApplicationModal = (value) => {
    setShowApplicationModal(false);
  };
  const closeAcceptModal = () => {
    setShowAcceptModal(false);
  };
  const closeRejectModal = () => {
    setShowRejectModal(false);
  };

  // --------------mutation callbacks--------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeAcceptModal();
    closeRejectModal();
  };
  const onFailed = () => {
    enqueueSnackbar("Meeting Link is required", { variant: "error" });
  };

  // ----------------mutations------------------------
  const { mutate: acceptApplicant, isLoading: isApproving } =
    useApproveFranchiseeAndQaApplication(onSuccess, onFailed);
  const { mutate: rejectApplicant, isLoading: isRejecting } =
    useRejectFranchiseeAndQaApplication(onSuccess, onFailed);

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
      name: "firstName",
      label: "Name",
      options: {
        customBodyRender: (value, tableMeta) =>
          value + " " + qaApplicants.data[tableMeta.rowIndex].lastName,
      },
    },
    {
      name: "dateApplied",
      label: "Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },

    {
      name: "cv",
      label: "CV",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => {
          return (
            <a
              href={value}
              target="blank"
              className="text-danger font-weight-bold"
            >
              View
            </a>
          );
        },
      },
    },
    {
      name: "coverLetter",
      label: "Cover Letter",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => {
          return (
            <a
              href={value}
              target="blank"
              className="text-danger font-weight-bold"
            >
              View
            </a>
          );
        },
      },
    },

    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={
              value === "approved"
                ? "Approved"
                : value === "pending"
                ? "Pending"
                : "Rejected"
            }
            color={
              value === "approved"
                ? "success"
                : value === "pending"
                ? "warning"
                : "error"
            }
          />
        ),
      },
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
              name: "View Application",
              action: () => openApplicationModal(value),
            },
            {
              id: 1,
              name: "Accept Candidate",
              action: () => openAcceptModal(value),
              disabled:
                qaApplicants.data[tableMeta.rowIndex].status === "approved" ||
                qaApplicants.data[tableMeta.rowIndex].status === "rejected",
            },
            {
              id: 2,
              name: "Reject Candidate",
              action: () => openRejectModal(value),
              disabled:
                qaApplicants.data[tableMeta.rowIndex].status === "approved" ||
                qaApplicants.data[tableMeta.rowIndex].status === "rejected",
            },
          ];
          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="qa-stage-1" />
            </div>
          );
        },
      },
    },
  ];

  const acceptApplicants = (initPayload) => {
    const payload = {
      applicantId: activeApplicant.id,
      address: initPayload.interviewLink,
      dateTime: initPayload.interviewDate,
      role: 2,
    };
    acceptApplicant(payload);
  };

  const rejectApplicants = (applicant) => {
    const payload = {
      applicantId: activeApplicant.id,
      additionalComments: applicant.reason,
      role: 2,
    };
    rejectApplicant(payload);
  };

  return (
    <>
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && qaApplicants.data?.length > 0 && (
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

      {showApplicationModal && (
        <ViewQaMasterApplication
          isLoading={isRejecting}
          isOpen={showApplicationModal}
          closeModal={closeApplicationModal}
          applicantId={activeApplicant.id}
          headerText={`QA APPLICANT INFORMATION`}
        />
      )}

      {showAcceptModal && (
        <SetInterviewDate
          interviewType="interview"
          isOpen={showAcceptModal}
          closeModal={closeAcceptModal}
          setInterview={acceptApplicants}
          address={"Meeting Location"}
          applicant={activeApplicant}
          isSubmitting={isApproving}
        />
      )}

      {showRejectModal && (
        <ConfirmRejectionModal
          isLoading={isRejecting}
          open={showRejectModal}
          close={closeRejectModal}
          isOpen={showRejectModal}
          closeModal={closeRejectModal}
          labelText="Reject QA master Candidate"
          actionText={"Reject"}
          onReject={rejectApplicants}
          pText={`Are you sure you want to reject ${activeApplicant.firstName}'s application`}
        />
      )}
    </>
  );
};
export default QAStage1Table;
