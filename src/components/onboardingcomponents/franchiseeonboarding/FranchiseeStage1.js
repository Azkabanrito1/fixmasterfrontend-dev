import { useState } from "react";
import {
  useApproveFranchiseeAndQaApplication,
  useGetFranchiseeApplicants,
  useRejectFranchiseeAndQaApplication,
} from "../../../hooks/useQueries/useOnboarding";
import { useSnackbar } from "notistack";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../globalcomponents/GlobalTable";
import { Chip } from "@mui/material";
import SetInterviewDate from "../../globalcomponents/modals/SetInterviewDate";
import ConfirmRejectionModal from "../../globalcomponents/modals/ConfirmRejectionModal";
import ViewFranchiseeApplication from "../../franchiseecomponents/modals/ViewFranchiseeApplication";
import { format } from "date-fns";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";

const FranchiseeStage1 = () => {
  const [activeApplicant, setActiveApplicant] = useState({});
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // ----------------data fetching------------------------
  const { data: franchiseeApplicants, isLoading } =
    useGetFranchiseeApplicants();

  const applicantData = franchiseeApplicants?.data?.map((applicant) => {
    return {
      ...applicant,
      name: `${applicant.firstName} ${applicant.lastName}`,
    };
  });

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "dateApplied",
    applicantData
  );

  // modal controls
  const openApplicationModal = (value) => {
    setShowApplicationModal(true);
    let applicantIndex = applicantData?.findIndex(
      (x) => x.applicantId === value
    );
    setActiveApplicant(applicantData[applicantIndex]);
  };
  const openAcceptModal = (value) => {
    setShowAcceptModal(true);
    let applicantIndex = applicantData?.findIndex(
      (x) => x.applicantId === value
    );
    setActiveApplicant(applicantData[applicantIndex]);
  };
  const openRejectModal = (value) => {
    setShowRejectModal(true);
    let applicantIndex = applicantData?.findIndex(
      (x) => x.applicantId === value
    );
    setActiveApplicant(applicantData[applicantIndex]);
  };
  const closeApplicationModal = () => {
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
  const onFailed = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
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
      name: "name",
      label: "Name",
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
      name: "territory",
      label: "Territory",
    },
    {
      name: "cvAttachment",
      label: "CV",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => {
          return (
            <a
              href={value}
              target="_blank"
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
        customBodyRender: (value) => {
          return (
            <a
              href={value}
              target="_blank"
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
      name: "applicantId",
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
              // disabled:
              //   applicantData[tableMeta.rowIndex].status === "approved" ||
              //   applicantData[tableMeta.rowIndex].status === "rejected",
            },
            {
              id: 1,
              name: "Accept Candidate",
              action: () => openAcceptModal(value),
              disabled:
                applicantData[tableMeta.rowIndex].status === "approved" ||
                applicantData[tableMeta.rowIndex].status === "rejected",
            },
            {
              id: 2,
              name: "Reject Candidate",
              action: () => openRejectModal(value),
              disabled:
                applicantData[tableMeta.rowIndex].status === "approved" ||
                applicantData[tableMeta.rowIndex].status === "rejected",
            },
          ];
          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="applicantId" />
            </div>
          );
        },
      },
    },
  ];

  const acceptApplicants = (intialPayload) => {
    const payload = {
      address: intialPayload.interviewLink,
      dateTime: intialPayload.interviewDate,
      applicantId: activeApplicant.applicantId,
      role: 1,
    };
    acceptApplicant(payload);
  };

  const rejectApplicants = (applicant) => {
    const payload = {
      applicantId: activeApplicant.applicantId,
      additionalComments: applicant.reason,
      role: 1,
    };
    rejectApplicant(payload);
  };

  return (
    <>
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && (
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
        <ViewFranchiseeApplication
          isLoading={isRejecting}
          isOpen={showApplicationModal}
          closeModal={closeApplicationModal}
          applicantId={activeApplicant.applicantId}
          headerText={`FRANCHISEE APPLICANT INFORMATION`}
        />
      )}

      {showAcceptModal && (
        <SetInterviewDate
          interviewType={"interview"}
          isOpen={showAcceptModal}
          closeModal={closeAcceptModal}
          setInterview={acceptApplicants}
          address={"Location Address"}
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
          labelText="Reject Franchisee Candidate"
          actionText={"Reject"}
          onReject={rejectApplicants}
          pText={`Are you sure you want to reject ${activeApplicant.firstName}'s application`}
        />
      )}
    </>
  );
};
export default FranchiseeStage1;
