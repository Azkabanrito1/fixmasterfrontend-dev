import { Chip } from "@mui/material";
import GlobalTable from "../../../../../globalcomponents/GlobalTable";
import AddBtn from "../../../../../franchiseecomponents/jobsmanagement/AddBtn";
import { SectionHeading } from "../../../../../globalcomponents/Utilities";
import GlobalTableActions from "../../../../../globalcomponents/GlobalTableActions";
import { useState } from "react";
import ConfirmDeleteModal from "../../../../../globalcomponents/modals/ConfirmDeleteModal";
import { useSnackbar } from "notistack";
import { useDeleteHireEquipment } from "../../../../../../hooks/useQueries/useJobs";

const EquipmentReq = ({ openAssignEqpModal, equipments }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [activeEquipmentId, setActiveEquipmentId] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const showDeleteModalHandler = (id) => {
    setActiveEquipmentId(id);
    setOpenDeleteModal(true);
  };

  //------------------------------mutations fn and callback------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setOpenDeleteModal(false); //
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: deleteHireRequest, isLoading } = useDeleteHireEquipment(
    onSuccess,
    onFailure
  );
  const columns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        customBodyRender: (_, meta) => meta.rowIndex + 1,
      },
    },
    {
      name: "equipmentName",
      label: "Equipment",
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
              value?.toLowerCase() === "approved"
                ? "Approved"
                : value?.toLowerCase() === "awaiting"
                ? "Awaiting"
                : value?.toLowerCase() === "received"
                ? "Received"
                : value?.toLowerCase() === "dispatched"
                ? "Dispatched"
                : value?.toLowerCase() === "returned"
                ? "Returned"
                : null
            }
            color={
              value?.toLowerCase() === "approved"
                ? "warning"
                : value?.toLowerCase() === "awaiting"
                ? "primary"
                : value?.toLowerCase() === "received"
                ? "success"
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
              name: "Delete Equipment",
              action: () => showDeleteModalHandler(value),
              disabled:
                equipments[tableMeta.rowIndex]?.status?.toLowerCase() ===
                "approved"
                  ? true
                  : equipments[tableMeta.rowIndex]?.status?.toLowerCase() ===
                    "received"
                  ? true
                  : false,
            },
          ];
          return <GlobalTableActions actions={actions} id="id" />;
        },
      },
    },
  ];

  return (
    <section className="mb-5" style={{ marginInline: "auto" }}>
      <SectionHeading className="mb-4">Request Equipment</SectionHeading>
      {equipments?.length > 0 && (
        <GlobalTable
          columns={columns}
          data={equipments}
          options={{ selection: "none" }}
        />
      )}

      <AddBtn
        action={openAssignEqpModal}
        id={"request-equipment"}
        text="Request Equipment"
      />

      {openDeleteModal && (
        <ConfirmDeleteModal
          open={openDeleteModal}
          close={() => setOpenDeleteModal(false)}
          labelText="Are you sure you want to delete this equipment"
          actionText="Delete"
          onDelete={() => deleteHireRequest(activeEquipmentId)}
          isLoading={isLoading}
        />
      )}
    </section>
  );
};

export default EquipmentReq;
