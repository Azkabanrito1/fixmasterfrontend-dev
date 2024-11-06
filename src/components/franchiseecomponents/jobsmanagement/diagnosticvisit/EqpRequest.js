import {
  InfoTable,
  NoData,
  SectionHeading,
} from "../../../globalcomponents/Utilities";

const EqpRequest = ({ equipmentRequested = [] }) => {
  const equipmentBodyTemplate = equipmentRequested?.map((eqp) => {
    return (
      <tr key={eqp.id}>
        <td className="text-capitalize text-center">{eqp.name}</td>
        <td className="text-capitalize text-center">{eqp.quantity}</td>
        <td className="text-uppercase text-center">
          <span
            style={{
              borderRadius: "1rem",
              backgroundColor:
                eqp.status.toLowerCase() === "delivered"
                  ? "#b0ecb980"
                  : "#fce0d3",
              color:
                eqp.status.toLowerCase() === "delivered"
                  ? "#37b34a"
                  : "var(--clr-primary)",
              paddingInline: "1.2rem",
              paddingBlock: "0.5rem",
            }}
          >
            {eqp.status}
          </span>
        </td>
      </tr>
    );
  });

  return (
    <section className="mb-5">
      <SectionHeading>Equipment Request</SectionHeading>

      <InfoTable>
        <colgroup>
          <col />
          <col width="50%" />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th className="text-center">Equipment</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {equipmentRequested?.length > 0 ? (
            equipmentBodyTemplate
          ) : (
            <NoData cols={"3"} />
          )}
        </tbody>
      </InfoTable>
    </section>
  );
};

export default EqpRequest;
