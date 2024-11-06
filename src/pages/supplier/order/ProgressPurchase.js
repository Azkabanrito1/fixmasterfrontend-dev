import { useState } from "react";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import OrderDetails from "../../../components/suppliercomponent/quote/modal/OrderDetails";
import { useGetPurchaseOrderByStatus } from "../../../hooks/useQueries/useJobs";
import { orderStatus } from "../../../utils/selectOptions";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";

const ProgressPurchase = () => {
  const [openViewDetails, setOpenViewDetails] = useState();
  const [activeId, setActiveId] = useState();

  const { data: progressOrderData, isLoading } = useGetPurchaseOrderByStatus(
    orderStatus.progress
  );
  const openViewDetailsHandler = (id) => {
    setActiveId(id);
    setOpenViewDetails(true);
  };
  const closeViewDetailsHandler = () => setOpenViewDetails(false);

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
                openViewDetailsHandler(value);
              },
              disabled: false,
            },
          ];
          return <GlobalTableActions actions={actions} id="rfqRequestId" />;
        },
      },
    },
  ];
  return (
    <>
      <GlobalBallBeat loading={isLoading} />
      <GlobalTable
        title="In Progress Purchase order"
        columns={columns}
        data={progressOrderData?.data}
      />

      {openViewDetails && (
        <OrderDetails
          title="In progress details"
          isOpen={openViewDetails}
          closeModal={closeViewDetailsHandler}
          order={progressOrderData?.data}
          activeId={activeId}
        />
      )}
    </>
  );
};

export default ProgressPurchase;
