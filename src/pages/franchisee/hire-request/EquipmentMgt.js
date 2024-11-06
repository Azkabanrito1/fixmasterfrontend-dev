import { format } from "date-fns";
import { useState } from "react";
import { PageHeading } from "../../../components/globalcomponents/Utilities";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import {
  useCreateEquipment,
  useGetAllEquipments,
  useUpdateEquipment,
} from "../../../hooks/useQueries/useJobs";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import AddEquipment from "../../../components/franchiseecomponents/equipmentcomponents/modals/AddEquipment";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import { useSnackbar } from "notistack";

const EquipmentMgt = () => {
  const { data: allEquipments, isLoading: loadingAllEquipments } =
    useGetAllEquipments();
  const [activeEqp, setActiveEqp] = useState({});
  const [activeEqpId, setActiveEqpId] = useState(null);
  const [showAddEqpModal, setShowAddEqpModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeAddEqp();
  };
  const onFail = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: createEqp, isLoading: isCreating } = useCreateEquipment(
    onSuccess,
    onFail
  );
  const { mutate: updateEqp, isLoading: isUpdating } = useUpdateEquipment(
    onSuccess,
    onFail
  );

  const openAddEqp = (eqpId) => {
    setShowAddEqpModal(true);
    const activeEqp = allEquipments?.data?.filter((eqp) => eqp.id === eqpId);
    setActiveEqp(activeEqp);
    setActiveEqpId(eqpId);
  };

  const closeAddEqp = () => setShowAddEqpModal(false);

  const columns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        customBodyRender: (_, meta) => meta.rowIndex + 1,
      },
    },
    { name: "name", label: "Name" },
    { name: "availabilty", label: "Availability" },
    {
      name: "quantity",
      label: "Quantity",
      options: {
        customBodyRender: (value) => <div className="">{value}</div>,
      },
    },
    {
      name: "rateCharged",
      label: "Rate",
      options: {
        customBodyRender: (value) => <div className="">{value}</div>,
      },
    },
    {
      name: "dateCreated",
      label: "Date Created",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "Update Equipment",
              action: () => openAddEqp(value),
              disabled: false,
            },
            // {
            //   id: 1,
            //   name: "Delete Equipment",
            //   action: () => console.log(value),
            //   disabled: true,
            // },
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

  const CustomToolbar = ({ action }) => (
    <GlobalBtn
      height="auto"
      width="max-width"
      py="10px"
      px="20px"
      fs="18px"
      fw="600"
      onClick={action}
      className="d-inline"
    >
      Add Equipment
    </GlobalBtn>
  );

  return (
    <>
      <PageHeading>Equipment Management</PageHeading>
      <GlobalBallBeat loading={loadingAllEquipments} />

      {!loadingAllEquipments && (
        <GlobalTable
          data={allEquipments?.data}
          columns={columns}
          options={{
            customToolbar: () => <CustomToolbar action={openAddEqp} />,
          }}
        />
      )}

      {showAddEqpModal && (
        <AddEquipment
          isLoading={isCreating || isUpdating}
          isOpen={showAddEqpModal}
          closeModal={closeAddEqp}
          eqpId={activeEqpId}
          createEqp={createEqp}
          updateEqp={updateEqp}
          equipment={activeEqp[0]}
        />
      )}
    </>
  );
};

export default EquipmentMgt;
