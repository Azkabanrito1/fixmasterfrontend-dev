import { useState } from "react";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import OrderDetails from "../../../components/suppliercomponent/quote/modal/OrderDetails";
import {
  useDispatchSupplies,
  useGetPurchaseOrderByStatus,
} from "../../../hooks/useQueries/useJobs";
import { orderStatus } from "../../../utils/selectOptions";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import DelivaryDate from "../../../components/globalcomponents/modals/DelivaryDate";
import { useSnackbar } from "notistack";

const OpenPurchase = () => {
  const [openOrderDetails, setOpenOrderDetails] = useState(false);
  const [openDispatchOrder, setOpenDispatchOrder] = useState();
  const [activeId, setActiveId] = useState("");

  const { data: openOrderData, isLoading } = useGetPurchaseOrderByStatus(
    orderStatus.open
  );

  const { enqueueSnackbar } = useSnackbar();

  //--------------------------mutationFn & mutate--------------------------------
  const onSucces = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setOpenDispatchOrder(false);
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: dispatchSupplies, isLoading: isConfirmDelivery } =
    useDispatchSupplies(onSucces, onFailure);

  const openOrderDetailsHandler = (id) => {
    setActiveId(id);
    setOpenOrderDetails(true);
  };
  const showOrderDetailsHandler = (id) => {
    setActiveId(id);
    setOpenDispatchOrder(true);
  };
  const closeOrderHandler = () => setOpenOrderDetails(false);
  // console.log(openOrderData);
  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, meta) => meta.rowIndex + 1,
      },
    },
    {
      name: "jobNumber",
      label: "Job ID",
    },
    {
      name: "itemName",
      label: "Item Name",
    },
    {
      name: "requestDate",
      label: "Request Date",
    },
    {
      name: "poConfirmationDate",
      label: "Response Date",
      options: {
        customBodyRender: (value) => value.split(" ")[0],
      },
    },
    {
      name: "totalPrice",
      label: "Quote Cost",
    },
    {
      name: "unitPrice",
      label: "Uint Price",
    },
    {
      name: "deliveryFee",
      label: "Delivary Fees",
    },
    {
      name: "quantity",
      label: "Quantity",
    },
    {
      name: "rfqRequestId",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 1,
              name: "View PO Details",
              action: () => {
                openOrderDetailsHandler(value);
              },
              disabled: false,
            },
            {
              id: 2,
              name: "Record dispatch",
              action: () => {
                showOrderDetailsHandler(value);
              },
              disabled: false,
            },
          ];
          return <GlobalTableActions actions={actions} id="poId" />;
        },
      },
    },
  ];
  const submit = (initialPayload) => {
    const payload = {
      date: initialPayload.date,
      time: initialPayload.time,
      requestId: activeId,
      dispatchType: 1,
    };
    dispatchSupplies(payload);
  };
  return (
    <>
      <GlobalBallBeat loading={isLoading} />
      <GlobalTable
        title="Open Purchase Order"
        columns={columns}
        data={openOrderData?.data}
      />
      {openOrderDetails && (
        <OrderDetails
          isOpen={openOrderDetails}
          closeModal={closeOrderHandler}
          title="Open Purchase Details"
          order={openOrderData?.data}
          activeId={activeId}
        />
      )}
      {openDispatchOrder && (
        <DelivaryDate
          isOpen={openDispatchOrder}
          closeModal={() => setOpenDispatchOrder(false)}
          heading="Confirm Delivery"
          isConfirm={isConfirmDelivery}
          confirmDispatch={submit}
        />
      )}
    </>
  );
};

export default OpenPurchase;
