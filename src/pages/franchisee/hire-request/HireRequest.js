import { useState } from "react";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import { PageHeading } from "../../../components/globalcomponents/Utilities";
import {
  useAcceptOrRejectHire,
  useGetHireRequestJobs,
} from "../../../hooks/useQueries/useJobs";
import ViewHireRequest from "../../../components/franchiseecomponents/equipmentcomponents/modals/ViewRequest";
import ConfirmAcceptModal from "../../../components/globalcomponents/modals/ConfirmAcceptModal";
import ConfirmDeleteModal from "../../../components/globalcomponents/modals/ConfirmDeleteModal";
import { useSnackbar } from "notistack";
import { format } from "date-fns";

const HireRequests = () => {
  const { data: ongoingJobs, isLoading: loadingOngoingJobs } =
    useGetHireRequestJobs();
  const [showViewResultModal, setShowViewResultModal] = useState(false);
  const [activeRequestId, setActiveRequestId] = useState(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [activeEqpIds, setActiveEqpIds] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const openAcceptModal = (ids) => {
    setShowAcceptModal(true);
    setActiveEqpIds(ids);
  };
  const openRejectModal = (ids) => {
    setShowRejectModal(true);
    setActiveEqpIds(ids);
  };
  const closeAcceptModal = () => setShowAcceptModal(false);
  const closeRejectModal = () => setShowRejectModal(false);

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeViewRequest();
    closeAcceptModal();
    closeRejectModal();
  };

  const onFail = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: acceptorReject, isLoading } = useAcceptOrRejectHire(
    onSuccess,
    onFail
  );

  const rejectHireRequest = () => {
    const payload = {
      fixId: activeRequestId,
      equipmentId: activeEqpIds,
      action: "Reject",
    };

    acceptorReject(payload);
  };

  const acceptHireRequest = () => {
    const payload = {
      fixId: activeRequestId,
      equipmentId: activeEqpIds,
      action: "Approve",
    };

    acceptorReject(payload);
  };

  const openViewRequest = (fixId) => {
    setActiveRequestId(fixId);
    setShowViewResultModal(true);
  };

  const closeViewRequest = () => setShowViewResultModal(false);

  const columns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    { name: "fixId", label: "Fix ID" },
    { name: "bookingCategory", label: "Booking Category" },
    { name: "bookingClass", label: "Service Type" },
    {
      name: "scheduleDate",
      label: "Scheduled Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "fixId",
      label: "Actions",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "View Request",
              action: () => openViewRequest(value),
            },
          ];

          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} />
            </div>
          );
        },
      },
    },
  ];

  const fixStatus = ongoingJobs?.data?.fixStatus;

  return (
    <div>
      <PageHeading>Hire Requests</PageHeading>

      <GlobalBallBeat loading={loadingOngoingJobs} />
      {!loadingOngoingJobs && (
        <GlobalTable data={ongoingJobs?.data} columns={columns} />
      )}

      {showViewResultModal && (
        <ViewHireRequest
          openAcceptModal={openAcceptModal}
          openRejectModal={openRejectModal}
          isOpen={showViewResultModal}
          closeModal={closeViewRequest}
          fixId={activeRequestId}
          fixStatus={fixStatus}
        />
      )}

      {showAcceptModal && (
        <ConfirmAcceptModal
          open={showAcceptModal}
          close={closeAcceptModal}
          pText={"Are you sure you want to accept this request"}
          labelText={"Accept Hire Request"}
          onDelete={acceptHireRequest}
          isLoading={isLoading}
          actionText="Accept"
        />
      )}
      {showRejectModal && (
        <ConfirmDeleteModal
          open={showRejectModal}
          close={closeRejectModal}
          pText={"Are you sure you want to reject this request"}
          labelText={"Reject Hire Request"}
          onDelete={rejectHireRequest}
          isLoading={isLoading}
          actionText="Reject"
        />
      )}
    </div>
  );
};

export default HireRequests;
