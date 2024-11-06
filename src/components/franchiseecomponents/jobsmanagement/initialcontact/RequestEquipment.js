import { SectionHeading } from "../../../../pages/franchisee/jobs/MyJobDetails";
import { InfoTable } from "../../../globalcomponents/Utilities";
import AddBtn from "../AddBtn";

const RequestEquipmentSection = ({
  equipmentRequested,
  openAssignEqpModal,
}) => {
  const equipmentBodyTemplate = equipmentRequested.map((eqp) => {
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
    <section className="mb-5" style={{ marginInline: "auto" }}>
      <SectionHeading className="mb-4">Request Equipment</SectionHeading>
      {equipmentRequested?.length > 0 ? (
        <>
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
            <tbody>{equipmentBodyTemplate}</tbody>
          </InfoTable>
          <AddBtn
            action={openAssignEqpModal}
            id="more-equipment"
            text="Request More Equipment"
          />
        </>
      ) : (
        <AddBtn
          action={openAssignEqpModal}
          id={"request-equipment"}
          text="Request Equipment"
        />
      )}
    </section>
  );
};

export default RequestEquipmentSection;
