import { Stack } from "@mui/material";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import WithdrawalsTable from "../../../components/admincomponents/withdrawals/WithdrawalsTable";
import { useSnackbar } from "notistack";
import {
  useGetWithdrawalRequestsByStatus,
  useRespondToWithdrawalRequests,
} from "../../../hooks/useQueries/useAdmin";
import WithdrawalsModal from "../../../components/admincomponents/withdrawals/WithdrawalsModal";
import { useEffect, useState } from "react";
import ConfirmAcceptModal from "../../../components/globalcomponents/modals/ConfirmAcceptModal";
import { useGetCollaboratorRoles } from "../../../hooks/useQueries/useIdentity";

const Withdrawals = ({ collaborator }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [showResponseModal, setShowResponseModal] = useState({
    isAcceptOpen: false,
    isRejectOpen: false,
    requestId: null,
  });
  const [roleId, setRoleId] = useState("");
  const { data: withdrawalRequests, isLoading } =
    useGetWithdrawalRequestsByStatus({ collabId: roleId });
  const { data: rolesData } = useGetCollaboratorRoles();
  useEffect(() => {
    const collaboratorData = rolesData?.data?.filter(
      (collab) => collab?.name?.toLowerCase() === collaborator?.toLowerCase()
    )?.[0];
    setRoleId(collaboratorData?.id);
  }, [withdrawalRequests, isLoading, collaborator]);

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    closeRejectRequestModal();
    closeAcceptRequestModal();
  };
  const onFailed = (error) => {
    enqueueSnackbar(error.message, { variant: "error" });
  };

  const { mutate: respond, isSubmitting } = useRespondToWithdrawalRequests(
    onSuccess,
    onFailed
  );

  const openRejectRequestModal = (id) =>
    setShowResponseModal({
      isRejectOpen: true,
      requestId: id,
      isAcceptOpen: false,
    });
  const closeRejectRequestModal = (id) =>
    setShowResponseModal({
      isRejectOpen: false,
      requestId: null,
      isAcceptOpen: false,
    });
  const openAcceptRequestModal = (id) =>
    setShowResponseModal({
      isRejectOpen: false,
      requestId: id,
      isAcceptOpen: true,
    });
  const closeAcceptRequestModal = (id) =>
    setShowResponseModal({
      isRejectOpen: false,
      requestId: null,
      isAcceptOpen: false,
    });
  console.log("hello");
  return (
    <Stack>
      <BackBtn />
      <div className="mt-3 mb-3">
        <PageHeading className="mb-0">Withdrawal Request</PageHeading>
      </div>

      <WithdrawalsTable
        withdrawalReqs={withdrawalRequests?.data}
        isLoading={isLoading}
        openRejectModal={openRejectRequestModal}
        openAcceptModal={openAcceptRequestModal}
      />

      {showResponseModal.isRejectOpen && (
        <WithdrawalsModal
          isOpen={showResponseModal.isRejectOpen}
          closeModal={closeRejectRequestModal}
          isSubmitting={isSubmitting}
          respondToRequest={respond}
          withdrawalId={showResponseModal.requestId}
        />
      )}

      {showResponseModal.isAcceptOpen && (
        <ConfirmAcceptModal
          open={showResponseModal.isAcceptOpen}
          isLoading={isSubmitting}
          pText="Do you want to confirm withdrawal request?"
          labelText="Confirm Withdrawal"
          actionText="Confirm"
          onDelete={() =>
            respond({ id: showResponseModal.requestId, reason: "", action: 1 })
          }
          close={closeAcceptRequestModal}
        />
      )}
    </Stack>
  );
};

export default Withdrawals;
