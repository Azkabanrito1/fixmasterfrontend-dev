import React, { useState } from "react";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import OrderDetails from "../../../components/suppliercomponent/quote/modal/OrderDetails";
import { useGetPurchaseOrderByStatus } from "../../../hooks/useQueries/useJobs";
import { orderStatus } from "../../../utils/selectOptions";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";

const ClosePurchase = () => {
  const [openViewDetails, setOpenViewDetails] = useState();
  const [activeSupply, setactiveSupply] = useState({});

  // ---------------------------data fetching ------------------------
  const { data: completedData, isLoading } = useGetPurchaseOrderByStatus(
    orderStatus.completed
  );

  const getActiveItem = (id) =>
    completedData?.data?.filter((item) => item.poId === id);
  const openViewDetailsHandler = (id) => {
    const activeItem = getActiveItem(id);
    setactiveSupply(activeItem[0]);
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
      name: "poId",
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
          return <GlobalTableActions actions={actions} id="poId" />;
        },
      },
    },
  ];
  return (
    <>
      <GlobalBallBeat loading={isLoading} />
      <GlobalTable
        title="Completed purchase order"
        columns={columns}
        data={completedData?.data}
      />

      {openViewDetails && (
        <OrderDetails
          title="Completed details"
          isOpen={openViewDetails}
          closeModal={closeViewDetailsHandler}
          order={completedData?.data}
          completed={activeSupply}
        />
      )}
    </>
  );
};

export default ClosePurchase;
