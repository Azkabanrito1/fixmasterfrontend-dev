import { format } from "date-fns";
import {
  useGetBankDetailsByCollab,
  useRespondToBankDetails,
} from "../../../hooks/useQueries/useJobs";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../globalcomponents/GlobalTable";
import { BackBtn } from "../../globalcomponents/Utilities";
import { Chip } from "@mui/material";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import { useSnackbar } from "notistack";
import useControlModal from "../../../hooks/useControlModal";
import ConfirmRejectionModal from "../../globalcomponents/modals/ConfirmRejectionModal";
import { useState } from "react";
import ConfirmAcceptModal from "../../globalcomponents/modals/ConfirmAcceptModal";
import GlobalFullScreenLoader from "../../globalcomponents/GlobalFullScreenLoader";

const CollaboratorBankDetails = ({ collaborator }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { isModalOpen, openModal, closeModal } = useControlModal();
  const [activeId, setActiveId] = useState(null);
  const [accept, setAccept] = useState(false);

  const collab =
    collaborator.toLowerCase() === "qa master"
      ? "qa"
      : collaborator.toLowerCase();
  const {
    data: bankDetails,
    isLoading,
    refetch,
  } = useGetBankDetailsByCollab(collab);

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
    setAccept(false);
    refetch();
  };

  const onError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: respondToDetails, isLoading: isSubmitting } =
    useRespondToBankDetails(onSuccess, onError);

  const acceptDetails = () => {
    const payload = {
      bankDetailsId: activeId,
      action: 1, // approve enum
      rejectionReason: "",
    };
    respondToDetails(payload);
  };

  const rejectDetails = ({ reason }) => {
    const payload = {
      bankDetailsId: activeId,
      action: 2, // reject enum from BE
      rejectionReason: reason,
    };
    respondToDetails(payload);
  };

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, table) => table.rowIndex + 1,
      },
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "bankName",
      label: "Bank Name",
    },
    {
      name: "acctNumber",
      label: "Account Number",
    },
    {
      name: "createdAt",
      label: "Date Created",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "bankBranch",
      label: "Bank Branch",
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={
              value.toLowerCase() === "approved"
                ? "Approved"
                : value === "pending"
                ? "Pending"
                : "Rejected"
            }
            color={
              value.toLowerCase() === "approved"
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
        customBodyRender: (value, meta) => {
          const isPending =
            bankDetails?.data[meta.rowIndex].status === "pending";

          const actions = [
            {
              id: 1,
              name: "Accept Bank Details",
              action: () => {
                setActiveId(value);
                setAccept(true);
              },
              disabled: !isPending,
            },
            {
              id: 2,
              name: "Reject Bank Details",
              action: () => {
                openModal();
                setActiveId(value);
              },
              disabled: !isPending,
            },
          ];  
          return <GlobalTableActions actions={actions} />;
        },
      },
    },
  ];
  return (
    <>
      <BackBtn />
      <GlobalBallBeat loading={isLoading} />
      {!isLoading && (
        <div style={{ marginTop: "30px" }}>
          <GlobalTable
            title={`${collaborator.toUpperCase()} BANK DETAILS`}
            columns={columns}
            data={bankDetails?.data}
          />
        </div>
      )}

      {accept && (
        <ConfirmAcceptModal
          open={accept}
          isLoading={isSubmitting}
          labelText="Confirm Bank Details"
          pText="Are you sure you want to proceed?"
          actionText="Confirm"
          onDelete={acceptDetails}
          close={() => setAccept(false)}
        />
      )}

      {isModalOpen && (
        <ConfirmRejectionModal
          isLoading={isSubmitting}
          pText="Are you sure you want to reject these bank details"
          labelText="Reject User Bank Details"
          placeholder="State the reason for the rejection"
          onReject={rejectDetails}
          isOpen={isModalOpen}
          closeModal={() => {
            closeModal();
            setActiveId(null);
          }}
        />
      )}
    </>
  );
};
export default CollaboratorBankDetails;
