import { Fragment } from "react";
import { InfoTable } from "../../../globalcomponents/Utilities";
import { TableTitle } from "./QuoteTable";

const LabourTable = ({ labour, quoteData }) => {
  const tbodyTemplate = labour?.map((service, index) =>
    service?.items?.map((item, itemIndex) => (
      <tr key={itemIndex}>
        <td>{service.name}</td>
        <td>{item.serviceName}</td>
        <td>{item.noOfHours}</td>
        <td>{item.ratePerHour}</td>
        <td>{item.totalPrice}</td>
        <td className="orange fw-bold">{service?.subTotal}</td>
      </tr>
    ))
  );

  return (
    <div>
      <TableTitle>
        <h4>Labour</h4>
      </TableTitle>

      <InfoTable layout={"auto"} border="1px solid #222">
        <thead>
          <tr>
            <th>Items</th>
            <th>Description</th>
            <th>Hours</th>
            <th>Rate/Hr</th>
            <th>Price</th>
            <th className="orange">Total</th>
            {/* <th>---</th> */}
          </tr>
        </thead>
        <tbody>{tbodyTemplate}</tbody>
      </InfoTable>
      <TableTitle>
        <h4>Labour Total</h4>
        <span className="total">{quoteData?.totalLabourCost}</span>
      </TableTitle>
    </div>
  );
};

export default LabourTable;
