import React, { useState } from "react";
import { SectionHeading } from "../../../../../../globalcomponents/Utilities";
import GlobalTableActions from "../../../../../../globalcomponents/GlobalTableActions";
import GlobalTable from "../../../../../../globalcomponents/GlobalTable";
import ConfirmAcceptModal from "../../../../../../globalcomponents/modals/ConfirmAcceptModal";
import {
  useConfirmDispatchEqupiment,
  useGetEqpDeliveredByFixId,
  useReturnEqupiment,
} from "../../../../../../../hooks/useQueries/useJobs";
import { useSnackbar } from "notistack";
import { Chip } from "@mui/material";
import { format } from "date-fns";
import { formatTime } from "../../../../../../../utils/selectOptions";

const EquipmentDelivered = ({ fixId }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEquipReturnModal, setShowEquipReturnModal] = useState(false);
  const [activeEquipment, setActiveEquipment] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  //------------------------data fetching------------------------
  const { data: equipmentData } = useGetEqpDeliveredByFixId(fixId);

  //---------------------------mutate & mutate fn------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowConfirmModal(false);
    setShowEquipReturnModal(false);
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: confirmEqp, isLoading: isConfirming } =
    useConfirmDispatchEqupiment(onSuccess, onFailure);
  const { mutate: returedEquipment, isLoading: isReturning } =
    useReturnEqupiment(onSuccess, onFailure);
  const getActiveEquip = (id) =>
    equipmentData?.data?.filter((equip) => equip.id === id);
  const confirmModalHandler = (id) => {
    const activeEquip = getActiveEquip(id);
    setActiveEquipment(activeEquip[0]);
    setShowConfirmModal(true);
  };
  const confirmReturnModalHandler = (id) => {
    const activeEquip = getActiveEquip(id);
    setActiveEquipment(activeEquip[0]);
    setShowEquipReturnModal(true);
  };
  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, metaIndex) => metaIndex.rowIndex + 1,
      },
    },
    {
      name: "fixId",
      label: "Job ID",
    },
    {
      name: "dateNeeded",
      label: "Date Needed",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd/MM/yyyy"),
      },
    },
    {
      name: "timeNeeded",
      label: "Time Needed",
      options: {
        customBodyRender: (value) => formatTime(value),
      },
    },
    {
      name: "equipmentName",
      label: "Equipment Name",
    },
    {
      name: "quantity",
      label: "Quantity",
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={
              value?.toLowerCase() === "awaiting"
                ? "Awaiting"
                : value?.toLowerCase() === "received"
                ? "Received"
                : value?.toLowerCase() === "approved"
                ? "Approved"
                : value?.toLowerCase() === "dipatched"
                ? "Dipatched"
                : value?.toLowerCase() === "returned"
                ? "Returned"
                : null
            }
            color={
              value?.toLowerCase() === "awaiting"
                ? "warning"
                : value?.toLowerCase() === "received"
                ? "success"
                : value?.toLowerCase() === "approved"
                ? "primary"
                : value?.toLowerCase() === "dispatched"
                ? "info"
                : value?.toLowerCase() === "returned"
                ? "secondary"
                : "error"
            }
          />
        ),
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value, tableMeta) => {
          const actions = [
            {
              id: 1,
              name: "Confirm delivery",
              action: () => confirmModalHandler(value),
              disabled:
                equipmentData?.data[
                  tableMeta.rowIndex
                ]?.status?.toLowerCase() === "received"
                  ? true
                  : false,
            },
            {
              id: 2,
              name: "Confirm Return",
              action: () => confirmReturnModalHandler(value),
              disabled:
                equipmentData?.data[
                  tableMeta.rowIndex
                ]?.status?.toLowerCase() === "returned"
                  ? true
                  : false,
            },
          ];
          return <GlobalTableActions actions={actions} id="id" />;
        },
      },
    },
  ];

  const submit = () => {
    const payload = {
      id: activeEquipment?.id,
    };
    confirmEqp(payload);
  };

  const confirmReturn = () => {
    const payload = {
      fixId,
      equipmentId: activeEquipment?.id,
    };
    returedEquipment(payload);
  };

  return (
    <section>
      <SectionHeading>Equipment Delivered </SectionHeading>
      <GlobalTable columns={columns} data={equipmentData?.data} />
      {showConfirmModal && (
        <ConfirmAcceptModal
          open={showConfirmModal}
          close={() => setShowConfirmModal(false)}
          pText="Can you confirm that this equipment has been delivered?"
          actionText="Confirm"
          onDelete={submit}
          isLoading={isConfirming}
        />
      )}
      {showEquipReturnModal && (
        <ConfirmAcceptModal
          open={showEquipReturnModal}
          close={() => setShowEquipReturnModal(false)}
          pText="Can you confirm that you want to return this equipment?"
          actionText="Confirm"
          onDelete={confirmReturn}
          isLoading={isReturning}
        />
      )}
    </section>
  );
};

export default EquipmentDelivered;
