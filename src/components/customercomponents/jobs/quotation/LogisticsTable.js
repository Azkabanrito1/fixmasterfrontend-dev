import { InfoTable } from "../../../globalcomponents/Utilities";
import { TableTitle } from "./QuoteTable";

const LogisticsTable = ({ logistics, quoteData }) => {
  const TbodyTemplate = () => (
    <>
      {logistics?.map((item, index) => (
        <tr key={index}>
          <td>{item?.itemName}</td>
          <td>{item?.itemDescription}</td>
          <td>{item?.totalPrice}</td>
          <td className="orange fw-bold">{item?.totalPrice}</td>
        </tr>
      ))}
    </>
  );

  return (
    <div>
      <TableTitle>
        <h4>Logistics</h4>
      </TableTitle>

      <InfoTable layout={"auto"} border="1px solid #222">
        <thead>
          <tr>
            <th>Items</th>
            <th>Description</th>
            <th>Price</th>
            <th className="orange">Total</th>
          </tr>
        </thead>
        <tbody>
          <TbodyTemplate />
        </tbody>
      </InfoTable>
      <TableTitle>
        <h4>Logistics Total</h4>
        <span className="total">{quoteData?.totalLogisticsCost}</span>
      </TableTitle>
    </div>
  );
};

export default LogisticsTable;
