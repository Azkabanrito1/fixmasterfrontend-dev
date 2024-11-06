import { InfoTable } from "../../../globalcomponents/Utilities";
import { TableTitle } from "./QuoteTable";

const EquipmentHireTable = ({ eqpHire }) => {
  const TbodyTemplate = () => (
    <>
      {eqpHire?.map((item, index) => (
        <tr key={index}>
          <td></td>
          <td>{item?.equipmentName}</td>
          <td className="orange fw-bold">{item?.hireCost}</td>
        </tr>
      ))}
    </>
  );

  return (
    <div>
      <TableTitle>
        <h4>Equipment Hire</h4>
      </TableTitle>

      <InfoTable layout={"auto"} border="1px solid #222">
        <thead>
          <tr>
            <th>Items</th>
            <th>Name</th>
            <th className="orange">Cost</th>
          </tr>
        </thead>
        <tbody>
          <TbodyTemplate />
        </tbody>
      </InfoTable>
      <TableTitle>
        <h4>Equipment Total</h4>
        <span className="total">{eqpHire?.totalPriceForEquipment}</span>
      </TableTitle>
    </div>
  );
};

export default EquipmentHireTable;
