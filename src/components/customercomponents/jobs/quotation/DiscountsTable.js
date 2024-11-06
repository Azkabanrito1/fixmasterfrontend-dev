import { Fragment } from "react";
import { InfoTable } from "../../../globalcomponents/Utilities";
import { TableTitle } from "./QuoteTable";

const DiscountTable = ({ discounts, quoteData }) => {
  const tbodyTemplate = discounts?.map((item, index) => (
    <tr key={index}>
      <td></td>
      <td>{item.description}</td>
      <td>{item.earned}</td>
    </tr>
  ));

  return (
    <div>
      <TableTitle>
        <h4>Discount</h4>
      </TableTitle>

      <InfoTable layout={"auto"} border="1px solid #222">
        <thead>
          <tr>
            <th>Items</th>
            <th>Description</th>
            <th>Earned</th>
          </tr>
        </thead>
        <tbody>{tbodyTemplate}</tbody>
      </InfoTable>
      <TableTitle bg="#006717" clr="#fff" totalClr="#fff">
        <h4>Discount Total</h4>
        <span className="total">{quoteData?.totalDiscount}</span>
      </TableTitle>
    </div>
  );
};

export default DiscountTable;
