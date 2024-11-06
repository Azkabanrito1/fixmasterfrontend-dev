import React from "react";
import { BackBtn, PageHeading } from "../../globalcomponents/Utilities";
import { format } from "date-fns";
import GlobalTable from "../../globalcomponents/GlobalTable";
import { Rating } from "@mui/material";

const SupplierHistory = () => {
  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "purchaseOrder",
      label: "PO",
    },
    {
      name: "purchaseDate",
      label: "Purchase Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "deliveryDate",
      label: "Delivery Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "itemName",
      label: "Item Name",
    },
    {
      name: "rating",
      label: "Rating",
      options: {
        customBodyRender: (value) => (
          <Rating name="read-only" value={value} readOnly />
        ),
      },
    },
    {
      name: "comment",
      label: "Comment",
    },
  ];

  //<Rating name="half-rating" defaultValue={2.5} precision={0.5} />
  return (
    <>
      <div>
        <PageHeading>Supplies History</PageHeading>
        <BackBtn />
      </div>

      <GlobalTable columns={columns} data={[]} />
    </>
  );
};

export default SupplierHistory;
