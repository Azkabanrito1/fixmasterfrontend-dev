import { useState } from "react";
import GlobalBallBeat from "../../../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../../../globalcomponents/GlobalTable";
import ConfirmAcceptModal from "../../../../globalcomponents/modals/ConfirmAcceptModal";
import ConfirmDeleteModal from "../../../../globalcomponents/modals/ConfirmDeleteModal";
import { useSnackbar } from "notistack";
import {
  useRejectCCO,
  useApproveCCO,
  useGetCCOApplicants,
} from "../../../../../hooks/useQueries/useOnboarding";
import { Chip } from "@mui/material";
import GlobalTableActions from "../../../../globalcomponents/GlobalTableActions";
import { format } from "date-fns";
import ViewCCOApplicantInfoModal from "./modal/ViewCCOApplicantInfoModal";
import ConfirmRejectionModal from "../../../../globalcomponents/modals/ConfirmRejectionModal";
import useDateFilter from "../../../../../hooks/useDateFilter";
import useDateQueries from "../../../../../hooks/useDateQueries";
import DateFilterToolbar from "../../../../globalcomponents/DateFilterToolbar";

const CCOStage1Table = () => {
  const [openViewModal, setOpenViewModal] = useState(false);
  const [activeApplicant, setActiveApplicant] = useState({});
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // data fetching
  const { data: stage1Applicants, isLoading } = useGetCCOApplicants();

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "dateApplied",
    stage1Applicants?.data
  );

  // modal controls
  const openViewMoreModal = (id) => {
    setOpenViewModal(true);
    const applicant = getActiveApplication(id);
    setActiveApplicant(applicant[0]);
  };
  const closeViewMoreModal = (id) => {
    setOpenViewModal(false);
    setActiveApplicant({});
  };

  const openAcceptModal = (id) => {
    setShowAcceptModal(true);
    const applicant = getActiveApplication(id);
    console.log(applicant);
    setActiveApplicant(applicant[0]);
  };
  const openRejectModal = (id) => {
    setShowRejectModal(true);
    const applicant = getActiveApplication(id);
    setActiveApplicant(applicant[0]);
  };
  const closeAcceptModal = () => {
    setShowAcceptModal(false);
    setActiveApplicant({});
  };
  const closeRejectModal = () => {
    setShowRejectModal(false);
    setActiveApplicant({});
  };

  // get active application
  const getActiveApplication = (id) =>
    stage1Applicants.data?.filter((applicant) => applicant.id === id);

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
  const { mutate: acceptApplicant, isLoading: isApproving } = useApproveCCO(
    onSuccess,
    onFailed
  );
  const { mutate: rejectApplicant, isLoading: isRejecting } = useRejectCCO(
    onSuccess,
    onFailed
  );

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
          value + " " + stage1Applicants.data[tableMeta.rowIndex].lastName,
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
      name: "videoAttachment",
      label: "Video",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => (
          <a href={value} className="video" target="_blank">
            View Video
          </a>
        ),
      },
    },
    {
      name: "cvAttachment",
      label: "CV",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => (
          <a href={value} className="orange" target="_blank">
            View
          </a>
        ),
      },
    },
    {
      name: "coverLetterAttachment",
      label: "Cover Letter",
      options: {
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
              action: () => openViewMoreModal(value),
            },
            {
              id: 1,
              name: "Accept Candidate",
              action: () => openAcceptModal(value),
              disabled:
                stage1Applicants.data[tableMeta.rowIndex].status ===
                  "approved" ||
                stage1Applicants.data[tableMeta.rowIndex].status === "rejected",
            },
            {
              id: 2,
              name: "Reject Candidate",
              action: () => openRejectModal(value),
              disabled:
                stage1Applicants.data[tableMeta.rowIndex].status ===
                  "approved" ||
                stage1Applicants.data[tableMeta.rowIndex].status === "rejected",
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

  return (
    <div>
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && stage1Applicants.data?.length > 0 && (
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

      {!isLoading && !stage1Applicants?.length && (
        <p className="text-center">There are no applicants in this stage</p>
      )}

      {showAcceptModal && (
        <ConfirmAcceptModal
          isLoading={isApproving}
          open={showAcceptModal}
          close={closeAcceptModal}
          onDelete={() => acceptApplicant(activeApplicant.id)}
          pText={`Are you sure you want to approve ${activeApplicant.firstName}'s application`}
          labelText={"Approve CCO Candidate"}
          actionText={"Approve"}
        />
      )}

      {showRejectModal && (
        <ConfirmRejectionModal
          isLoading={isRejecting}
          // open={showRejectModal}
          isOpen={showRejectModal}
          // close={closeRejectModal}
          closeModal={closeRejectModal}
          onReject={() => rejectApplicant(activeApplicant.id)}
          pText={`Are you sure you want to reject ${activeApplicant.firstName}'s application`}
          labelText={"Reject CCO Candidate"}
          actionText={"Reject"}
        />
      )}
      {openViewModal && (
        <ViewCCOApplicantInfoModal
          open={openViewModal}
          close={closeViewMoreModal}
          applicantId={activeApplicant.id}
          headerText={`CCO APPLICANT INFORMATION`}
        />
      )}
    </div>
  );
};

export default CCOStage1Table;
