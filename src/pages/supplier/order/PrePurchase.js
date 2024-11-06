import { format } from "date-fns";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import { useState } from "react";
import OrderDetails from "../../../components/suppliercomponent/quote/modal/OrderDetails";
import ConfirmAcceptModal from "../../../components/globalcomponents/modals/ConfirmAcceptModal";
import ConfirmDeleteModal from "../../../components/globalcomponents/modals/ConfirmDeleteModal";
import {
  useAcceptOrRejectPo,
  useGetNewPurchaseOrder,
} from "../../../hooks/useQueries/useJobs";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import { useSnackbar } from "notistack";

const PrePurchase = () => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCannotConfirm, setShowCannotConfirm] = useState(false);
  const [activeId, setActiveId] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  //-----------------------data fetching------------------------
  const { data: newOrderData, isLoading } = useGetNewPurchaseOrder();

  // ---------------mutation and mutation fns------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    closeConfirm();
    closeRejectModal();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: acceptOrRejectPo, isLoading: isAcceptOrReject } =
    useAcceptOrRejectPo(onSuccess, onFailure);

  const openconfirm = (id) => {
    setActiveId(id);
    setShowConfirm(true);
  };

  const openRejectModal = (id) => {
    setActiveId(id);
    setShowCannotConfirm(true);
  };

  const showOrders = (id) => {
    setActiveId(id);
    setShowOrderDetails(true);
  };

  const closeConfirm = () => setShowConfirm(false);

  const closeOrders = () => setShowOrderDetails(false);
  const closeRejectModal = () => setShowCannotConfirm(false);
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
      name: "responseDate",
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
      name: "rfqResponseId",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 1,
              name: "Accept",
              action: () => {
                openconfirm(value);
              },
              disabled: false,
            },
            {
              id: 2,
              name: "Reject",
              action: () => {
                openRejectModal(value);
              },
              disabled: false,
            },
            {
              id: 3,
              name: "View Details",
              action: () => {
                showOrders(value);
              },
              disabled: false,
            },
          ];
          return <GlobalTableActions actions={actions} id="purchaseId" />;
        },
      },
    },
  ];

  const acceptPurchaseOrder = () => {
    const payload = {
      rfqResponseId: activeId,
      supplierAction: "Accepted",
    };
    acceptOrRejectPo(payload);
  };

  const rejectPurchaseOrder = () => {
    const payload = {
      rfqResponseId: activeId,
      supplierAction: "Rejected",
    };
    acceptOrRejectPo(payload);
  };

  return (
    <>
      <GlobalBallBeat loading={isLoading} />
      <GlobalTable
        title="Pre Purchase Order"
        columns={columns}
        data={newOrderData?.data || []}
      />
      {showOrderDetails && (
        <OrderDetails
          isOpen={showOrderDetails}
          closeModal={closeOrders}
          title="Pre Purchase Details"
          order={newOrderData?.data}
          activeId={activeId}
        />
      )}
      <ConfirmAcceptModal
        open={showConfirm}
        close={closeConfirm}
        labelText={"Confirm Purchase Order"}
        onDelete={acceptPurchaseOrder}
        pText="Are you sure you want to Confirm the Purchase of this Order?"
        actionText={"Yes"}
        isLoading={isAcceptOrReject}
      />
      <ConfirmDeleteModal
        open={showCannotConfirm}
        close={closeRejectModal}
        labelText={"Confirm Purchase Order"}
        onDelete={rejectPurchaseOrder}
        pText="Are you sure you want to Confirm that you cannot Purchase this Order?"
        actionText={"No"}
        isLoading={isAcceptOrReject}
      />
    </>
  );
};

export default PrePurchase;
