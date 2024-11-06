import { Fragment } from "react";
import { InfoTable } from "../../../globalcomponents/Utilities";
import { TableTitle } from "./QuoteTable";
import { Button } from "@mui/material";

const WarrantyTable = ({ warranties }) => {
  const ItemRow = ({ item }) => (
    <tr>
      <td>Item {item.id}</td>
      <td>{item.description}</td>
      <td>{item.price}</td>
      <td></td>

      <td className="text-center p-0">
        <Button
          sx={{
            color: "#fff",
            width: "50px",
            height: "50px",
            backgroundColor: "var(--clr-primary)",
          }}
        >
          <i className="fa fa-trash"></i>
        </Button>
      </td>
    </tr>
  );

  const tbodyTemplate = warranties?.equipmentWarranty.map((warranty, index) => (
    <Fragment key={index}>
      {warranty?.warrantyItems?.map((item, id) => (
        <ItemRow item={item} key={id} />
      ))}
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td className="orange fw-bold">{warranties?.totalPriceForWarranty}</td>
        <td></td>
      </tr>
    </Fragment>
  ));

  return (
    <div>
      <TableTitle>
        <h4>Warranty</h4>
      </TableTitle>

      <InfoTable layout={"auto"} border="1px solid #222">
        <thead>
          <tr>
            <th>Items</th>
            <th>Description</th>
            <th>Price</th>
            <th className="orange">Total</th>
            <th>---</th>
          </tr>
        </thead>
        <tbody>{tbodyTemplate}</tbody>
      </InfoTable>
      <TableTitle>
        <h4>Warranty</h4>
        <span className="total">{warranties?.totalPriceForWarranty}</span>
      </TableTitle>
    </div>
  );
};

export default WarrantyTable;
