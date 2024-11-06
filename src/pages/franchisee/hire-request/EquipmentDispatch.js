import { useState } from "react";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import { PageHeading } from "../../../components/globalcomponents/Utilities";
import DelivaryDate from "../../../components/globalcomponents/modals/DelivaryDate";
import {
  useDispatchEqupiment,
  useGetEqpReadyForDispatch,
} from "../../../hooks/useQueries/useJobs";
import { formatTime } from "../../../utils/selectOptions";
import { format } from "date-fns";
import { useSnackbar } from "notistack";

const DispatchEquipment = () => {
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const openDispatchHandler = (id) => {
    setActiveId(id);
    setShowDispatchModal(true);
  };
  const closeDispatchHandler = () => {
    setActiveId(null);
    setShowDispatchModal(false);
  };

  //--------------------------------data fetching--------------------------------
  const { data: dispatchData } = useGetEqpReadyForDispatch();

  //----------------------------mutate & mutate fn--------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    closeDispatchHandler();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: dispatechEqp } = useDispatchEqupiment(onSuccess, onFailure);

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
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 1,
              name: "Confirm dispatch",
              action: () => openDispatchHandler(value),
            },
          ];
          return <GlobalTableActions actions={actions} id="id" />;
        },
      },
    },
  ];

  const confirmDispatch = (initPayload) => {
    const payload = {
      date: initPayload.date,
      time: initPayload.time,
      id: activeId,
    };
    dispatechEqp(payload);
  };
  return (
    <>
      <PageHeading>Equipment Dispatch</PageHeading>
      <GlobalTable columns={columns} data={dispatchData?.data} />
      {showDispatchModal && (
        <DelivaryDate
          isOpen={showDispatchModal}
          closeModal={closeDispatchHandler}
          confirmDispatch={confirmDispatch}
          heading="Confirm Dispatch"
        />
      )}
    </>
  );
};

export default DispatchEquipment;
