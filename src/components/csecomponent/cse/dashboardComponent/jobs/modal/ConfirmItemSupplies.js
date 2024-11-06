import { Chip } from "@mui/material";
import GlobalModal from "../../../../../globalcomponents/GlobalModal";
import GlobalTable from "../../../../../globalcomponents/GlobalTable";
import GlobalTableActions from "../../../../../globalcomponents/GlobalTableActions";
import AltModalHeader from "../../../../../layouts/modal/AltModalHeader";
import ConfirmAcceptModal from "../../../../../globalcomponents/modals/ConfirmAcceptModal";
import { useState } from "react";
import ConfirmDeleteModal from "../../../../../globalcomponents/modals/ConfirmDeleteModal";
import {
  useAcceptOrRejectDelivery,
  useConfirmDeliveryCode,
  useGetSuppliesByFixId,
} from "../../../../../../hooks/useQueries/useJobs";
import ConfirmCode from "./ConfirmCode";
import GlobalBallBeat from "../../../../../globalcomponents/GlobalBallBeat";
import { useSnackbar } from "notistack";

const ConfirmItemSupplies = ({ isOpen, closeModal, fixId }) => {
  const [openApprovedModal, setOpenApprovedModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [showConfirmCode, setShowConfirmCode] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const showApprrovedHandler = (id) => {
    setActiveId(id);
    setOpenApprovedModal(true);
  };
  const showConfirmCodeHandler = (id) => {
    setActiveId(id);
    setShowConfirmCode(true);
  };
  const showRejecteddHandler = (id) => {
    setActiveId(id);
    setOpenRejectModal(true);
  };

  //---------------------------------------------data fetching--------------------------------
  const { data: suppliesData, isLoading } = useGetSuppliesByFixId(fixId);

  //-------------------------------mutate fn and mutations--------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowConfirmCode(false);
    setOpenApprovedModal(false); //
    setOpenRejectModal(false);
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: confirmCode } = useConfirmDeliveryCode(onSuccess, onFailure);
  const { mutate: accepOrReject, isLoading: isAcceptingOrRejecting } =
    useAcceptOrRejectDelivery(onSuccess, onFailure);

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, meta) => meta.rowIndex + 1,
      },
    },
    {
      name: "fixId",
      label: "Job ID",
    },
    {
      name: "name",
      label: "Item Name",
    },
    {
      name: "quantity",
      label: "Quantity",
    },
    {
      name: "unit",
      label: "Unit Of Measurement",
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={
              value?.toLowerCase() === "item dispatched"
                ? "Item Dispatched"
                : value?.toLowerCase() === "item received"
                ? "Item Received"
                : value?.toLowerCase() === "item accepted"
                ? "Item Accepted"
                : "Item Rejected"
            }
            color={
              value?.toLowerCase() === "item dispatched"
                ? "warning"
                : value?.toLowerCase() === "item received"
                ? "info"
                : value?.toLowerCase() === "item accepted"
                ? "success"
                : "error"
            }
          />
        ),
      },
    },
    {
      name: "dispatchId",
      label: "Action",
      options: {
        customBodyRender: (value, tableMeta) => {
          const actions = [
            {
              id: 1,
              name: "Confirm supplies",
              action: () => {
                showConfirmCodeHandler(value);
              },
              disabled:
                suppliesData.data[0]?.status?.toLowerCase() ===
                "item dispatched"
                  ? false
                  : true,
            },
            {
              id: 2,
              name: "Accept supplies",
              action: () => {
                showApprrovedHandler(value);
              },
              disabled:
                suppliesData.data[0]?.status?.toLowerCase() === "item received"
                  ? false
                  : suppliesData.data[0]?.status?.toLowerCase() ===
                    "item accepted"
                  ? false
                  : true,
            },
            {
              id: 3,
              name: "Reject supplies",
              action: () => {
                showRejecteddHandler(value);
              },
              disabled:
                suppliesData.data[0]?.status?.toLowerCase() === "item received"
                  ? false
                  : suppliesData.data[0]?.status?.toLowerCase() ===
                    "item accepted"
                  ? true
                  : true,
            },
          ];
          return <GlobalTableActions actions={actions} id="dispatchId" />;
        },
      },
    },
  ];

  const acceptDelivery = () => {
    const payload = {
      dispatchId: activeId,
      actionType: 1,
    };
    accepOrReject(payload);
  };
  const rejectDelivery = () => {
    const payload = {
      dispatchId: activeId,
      actionType: 2,
    };
    accepOrReject(payload);
  };

  return (
    <>
      <GlobalModal isOpen={isOpen} closeModal={closeModal}>
        <AltModalHeader heading="Items Supplies" closeModal={closeModal} />
        <GlobalBallBeat loading={isLoading} />
        <GlobalTable columns={columns} data={suppliesData?.data} />
      </GlobalModal>
      {openApprovedModal && (
        <ConfirmAcceptModal
          open={openApprovedModal}
          close={() => setOpenApprovedModal(false)}
          pText="Kindly approved this supplies has been delivered"
          actionText="Accept"
          onDelete={acceptDelivery}
          isLoading={isAcceptingOrRejecting}
        />
      )}
      {openRejectModal && (
        <ConfirmDeleteModal
          open={openRejectModal}
          close={() => setOpenRejectModal(false)}
          pText="Can you please confirm this supplies is rejected"
          actionText="Reject"
          onDelete={rejectDelivery}
          isLoading={isAcceptingOrRejecting}
        />
      )}
      {showConfirmCode && (
        <ConfirmCode
          isOpen={showConfirmCode}
          closeModal={() => setShowConfirmCode(false)}
          activeId={activeId}
          confirm={confirmCode}
        />
      )}
    </>
  );
};

export default ConfirmItemSupplies;
