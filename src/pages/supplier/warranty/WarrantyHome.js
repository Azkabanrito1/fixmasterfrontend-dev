import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import ReplacedItem from "../../../components/suppliercomponent/modal/ReplacedItem";
import { useState } from "react";
import format from "date-fns/format";

const WarrantyHomes = () => {
  const [openReplaceItem, setOpenReplaceItem] = useState(false);
  const [activeId, setActiveId] = useState("");

  const openShowReplacedItem = (id) => {
    setActiveId(id);
    setOpenReplaceItem(true);
  };
  const closeShowReplacedItem = () => setOpenReplaceItem(false);

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
      name: "itemName",
      label: "Item",
    },
    {
      name: "quantity",
      label: "Quantity",
    },
    {
      name: "uom",
      label: "UOM",
    },
    {
      name: "claimDate",
      label: "Claim Date",
      options: {
        customBodyRender: (value) =>
          value ? format(new Date(value), "dd-MM-yyyy") : "",
      },
    },
    {
      name: "claimTime",
      label: "Claim Time",
      options: {
        customBodyRender: (value) =>
          value ? format(new Date(value), "dd-MM-yyyy") : "",
      },
    },
    {
      name: "uom",
      label: "UOM",
    },
    {
      name: "warrantyId",
      label: "Actions",
      options: {
        customBodyRender: (value) => {
          const action = [
            {
              id: 1,
              name: "Replace Item",
              action: () => {
                openShowReplacedItem(value);
              },
              disabled: false,
            },
            {
              id: 1,
              name: "Item cannot be replaced",
              action: () => {
                console.log(value);
              },
              disabled: true,
            },
            {
              id: 1,
              name: "Contact CSE",
              action: () => {
                console.log(value);
              },
              disabled: true,
            },
          ];
          return <GlobalTableActions actions={action} id="warrantyId" />;
        },
      },
    },
  ];
  const data = [
    {
      poNumber: "12dfgj",
      itemName: "Bulb",
      quantity: 20,
      cliamDate: new Date(),
      cliamTime: new Date(21, 11, 2022, 14, 34, 10),
      warrantyId: 1,
    },
  ];

  return (
    <>
      <GlobalTable title="Warranty" columns={columns} data={data} />

      {openReplaceItem && (
        <ReplacedItem
          isOpen={openReplaceItem}
          closeModal={closeShowReplacedItem}
          data={{}}
        />
      )}
    </>
  );
};

export default WarrantyHomes;
