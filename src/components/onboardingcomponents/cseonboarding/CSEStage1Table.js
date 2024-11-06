import { useState } from "react";
import { Chip } from "@mui/material";
import { useSnackbar } from "notistack";
import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import ConfirmAcceptModal from "../../globalcomponents/modals/ConfirmAcceptModal";
import {
  useApproveCSEFirstStage,
  useGetAllCSEApplicants,
  useRejectionCseApplication,
} from "../../../hooks/useQueries/useOnboarding";
import ConfirmRejectionModal from "../../globalcomponents/modals/ConfirmRejectionModal";
import { format } from "date-fns";
import ViewCSEApplicantInfoModal from "./modal/ViewCSEApplicantInfoModal";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";

const CSEStage1Table = () => {
  const [openViewModal, setOpenViewModal] = useState(false);
  const [activeApplicant, setActiveApplicant] = useState({});
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // ----------------data fetching------------------------
  const { data: cseApplicants, isLoading } = useGetAllCSEApplicants();

  let stage1Applicants = cseApplicants?.data?.filter(
    (applicant) => applicant.stageStatusId <= 3
  );
  stage1Applicants = stage1Applicants?.map((applicant) => ({
    ...applicant,
    name: applicant.name,
  }));

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "dateCreated",
    stage1Applicants
  );

  // get active application
  const getActiveApplication = (id) =>
    stage1Applicants?.filter((applicant) => applicant.id === id);

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

  // --------------mutation callbacks--------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeAcceptModal();
    closeRejectModal();
  };
  const onFailed = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const onSuccessReject = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeAcceptModal();
    closeRejectModal();
  };
  const onFailedReject = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  // ----------------mutations------------------------
  const { mutate: acceptApplicant, isLoading: isApproving } =
    useApproveCSEFirstStage(onSuccess, onFailed);

  const { mutate: rejectApplicant, isLoading: isRejecting } =
    useRejectionCseApplication(onSuccessReject, onFailedReject);

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
      name: "dateCreated",
      label: "Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "videoUrl",
      label: "Video",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => (
          <a href={value} target="_blank" className="video">
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
      name: "stageStatusId",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={
              value === 1 ? "Pending" : value === 2 ? "Approved" : "Rejected"
            }
            color={value === 1 ? "warning" : value === 2 ? "success" : "error"}
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
              disabled: stage1Applicants[tableMeta.rowIndex].stageStatusId > 1,
            },
            {
              id: 2,
              name: "Reject Candidate",
              action: () => openRejectModal(value),
              disabled: stage1Applicants[tableMeta.rowIndex].stageStatusId > 1,
            },
          ];

          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="cse-stage-1" />
            </div>
          );
        },
      },
    },
  ];
  const rejectCse = (initialPayload) => {
    const payload = {
      applicantId: activeApplicant.id,
      comment: initialPayload.reason,
    };
    rejectApplicant(payload);
  };

  return (
    <div>
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && stage1Applicants?.length > 0 && (
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
          pText={`Are you sure you want to approve ${activeApplicant.name}'s application`}
          labelText={"Approve CSE Candidate"}
          actionText={"Approve"}
        />
      )}
      {showRejectModal && (
        <ConfirmRejectionModal
          isOpen={showRejectModal}
          closeModal={closeRejectModal}
          labelText="Reject CSE Candidate"
          actionText={"Reject"}
          onReject={rejectCse}
          pText={`Are you sure you want to reject  ${activeApplicant.name}'s application`}
          isLoading={isRejecting}
        />
      )}
      {openViewModal && (
        <ViewCSEApplicantInfoModal
          open={openViewModal}
          close={() => setOpenViewModal(false)}
          applicantId={activeApplicant.id}
          headerText={`CSE APPLICANT INFORMATION`}
        />
      )}
    </div>
  );
};

export default CSEStage1Table;
