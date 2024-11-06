import { format } from "date-fns";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import OrderDetails from "../../../components/suppliercomponent/quote/modal/OrderDetails";
import { useState } from "react";
import ReplacedItem from "../../../components/suppliercomponent/modal/ReplacedItem";
import {
  useAgreedOrDisagreeReplacement,
  useDispatchSupplies,
  useGetReplacementByStatus,
} from "../../../hooks/useQueries/useJobs";
import { replacedStatus } from "../../../utils/selectOptions";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import ConfirmAcceptModal from "../../../components/globalcomponents/modals/ConfirmAcceptModal";
import { useSnackbar } from "notistack";
import ConfirmDeleteModal from "../../../components/globalcomponents/modals/ConfirmDeleteModal";
import DelivaryDate from "../../../components/globalcomponents/modals/DelivaryDate";

const NewReplacement = () => {
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const [openReplaceItem, setOpenReplaceItem] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openConfirmDelivery, setOpenConfirmDelivery] = useState(false);
  const [activeId, setActiveId] = useState({});

  const { enqueueSnackbar } = useSnackbar();
  const getActiveItem = (id) =>
    replacedData?.data?.filter((item) => item.dispatchId === id);

  const showOrderDetails = (id) => {
    const activeItem = getActiveItem(id);
    setActiveId(activeItem[0]);
    setOpenViewDetails(true);
  };

  const openShowReplacedItem = (id) => {
    const activeItem = getActiveItem(id);
    setActiveId(activeItem[0]);
    setOpenReplaceItem(true);
  };
  const showRejectedHandler = (id) => {
    const activeItem = getActiveItem(id);
    setActiveId(activeItem[0]);
    setOpenRejectModal(true);
  };
  const showConfimModalHandler = (id) => {
    const activeItem = getActiveItem(id);
    setActiveId(activeItem[0]);
    setOpenConfirmDelivery(true);
  };

  const closeOrderDetails = () => setOpenViewDetails(false);
  const closeShowReplacedItem = () => setOpenReplaceItem(false);
  const closeRejectedHandler = () => setOpenRejectModal(false);

  //-------------------------------data fetching-------------------------------
  const { data: replacedData, isLoading } = useGetReplacementByStatus(
    replacedStatus.new
  );
  //---------------------------mutate &mutate fn------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    closeShowReplacedItem();
    closeRejectedHandler();
    setOpenConfirmDelivery(false);
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: agreeOrDisagree, isLoading: isAgreeOrDisagree } =
    useAgreedOrDisagreeReplacement(onSuccess, onFailure);

  const { mutate: dispatchSupplies, isLoading: isConfirmDelivery } =
    useDispatchSupplies(onSuccess, onFailure);

  // console.log(replacedData);

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "poNumber",
      label: "PO Number",
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
      name: "rejectedTimeStamp",
      label: "Rejected Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "rejectedTimeStamp",
      label: "Rejected Time",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "h:mm a"),
      },
    },
    {
      name: "dispatchId",
      label: "Actions",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 1,
              name: "View details",
              action: () => {
                showOrderDetails(value);
              },
            },
            {
              id: 2,
              name: "Agree to Replace",
              action: () => {
                openShowReplacedItem(value);
              },
            },
            {
              id: 3,
              name: "Disagree to Replace",
              action: () => {
                showRejectedHandler(value);
              },
              disabled: replacedData?.data[0]?.isAgree ? true : false,
            },
            {
              id: 4,
              name: "Record dispatch",
              action: () => {
                showConfimModalHandler(value);
              },
              disabled: replacedData?.data[0]?.isAgree ? false : true,
            },
          ];
          return <GlobalTableActions actions={actions} id="dispatchId" />;
        },
      },
    },
  ];

  const agreed = () => {
    const payload = {
      dispatchId: activeId.dispatchId,
      actionType: 1,
    };
    agreeOrDisagree(payload);
  };
  const disAgreed = () => {
    const payload = {
      dispatchId: activeId.dispatchId,
      actionType: 2,
    };
    agreeOrDisagree(payload);
  };

  const submit = (initialPayload) => {
    const payload = {
      date: initialPayload.date,
      time: initialPayload.time,
      requestId: activeId.requestId,
      dispatchType: 2,
    };
    dispatchSupplies(payload);
  };

  return (
    <>
      <GlobalBallBeat loading={isLoading} />
      <GlobalTable
        title="New(replacement)"
        columns={columns}
        data={replacedData?.data}
      />
      {openViewDetails && (
        <OrderDetails
          isOpen={openViewDetails}
          closeModal={closeOrderDetails}
          title="Replaced Items"
          replacedData={activeId}
        />
      )}

      {openReplaceItem && (
        <ConfirmAcceptModal
          open={openReplaceItem}
          close={closeShowReplacedItem}
          pText="Kindly confirm that you can replaced this items"
          actionText="Accept"
          onDelete={agreed}
          isLoading={isAgreeOrDisagree}
        />
      )}
      {openRejectModal && (
        <ConfirmDeleteModal
          open={openRejectModal}
          close={closeRejectedHandler}
          pText="Are you sure you cannot replace this items"
          actionText="Reject"
          onDelete={disAgreed}
          isLoading={isAgreeOrDisagree}
        />
      )}
      {openConfirmDelivery && (
        <DelivaryDate
          isOpen={openConfirmDelivery}
          closeModal={() => setOpenConfirmDelivery(false)}
          heading="Confirm Delivery"
          isConfirm={isConfirmDelivery}
          confirmDispatch={submit}
        />
      )}
    </>
  );
};

export default NewReplacement;
