import { format } from "date-fns";
import React from "react";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import { useState } from "react";
import OrderDetails from "../../../components/suppliercomponent/quote/modal/OrderDetails";

const ProgressReplacement = () => {
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const [activeId, setActiveId] = useState("");

  const showOrderDetails = (id) => {
    setActiveId(id);
    setOpenViewDetails(true);
  };

  const closeOrderDetails = () => setOpenViewDetails(false);

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "po",
      label: "PO Number",
    },
    {
      name: "itemName",
      label: "Item Name",
    },
    {
      name: "quantity",
      label: "Quantity",
    },
    {
      name: "rejectedDate",
      label: "Rejected Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "rejectedTime",
      label: "Rejected Time",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "h:mm a"),
      },
    },
    {
      name: "replacementId",
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
          ];
          return <GlobalTableActions actions={actions} id="replacementId" />;
        },
      },
    },
  ];

  return (
    <>
      <GlobalTable
        title="In progress(replacement)"
        columns={columns}
        data={[]}
      />
      {openViewDetails && (
        <OrderDetails
          isOpen={openViewDetails}
          closeModal={closeOrderDetails}
          title="Inprogress Details"
          activeId={activeId}
        />
      )}
    </>
  );
};

export default ProgressReplacement;
