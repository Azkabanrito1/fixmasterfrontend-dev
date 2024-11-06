import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { InfoTable } from "../../../globalcomponents/Utilities";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { getAllEquipment } from "../../../../redux/equipment/actions";
import GlobalCheckbox from "../../../globalcomponents/GlobalCheckbox";

const AssignEquipment = ({
  isOpen,
  closeModal,
  addEquipment,
  addedEqp = [],
}) => {
  const [allEquipment, setAllEquipment] = useState([]);
  const [chosenEquipment, setChosenEquipment] = useState(addedEqp);

  const dispatch = useDispatch();

  const fetchEquipment = async () => {
    const response = await dispatch(getAllEquipment());
    if (response.data) setAllEquipment(response.data);
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  let availableEqp = allEquipment.filter(
    (eqp) => eqp.equipmentCondition.toLowerCase() === "good"
  );
  availableEqp = availableEqp.filter(
    (eqp) => eqp.availabilty.toLowerCase() === "in-store"
  );

  const updateChosenEqp = (id, equipment) => {
    if (chosenEquipment.map((eqp) => eqp.id).includes(id)) {
      setChosenEquipment((prev) => prev.filter((eqp) => eqp.id !== id));
    } else {
      setChosenEquipment((prev) => [...prev, equipment]);
    }
  };

  const tableTemplate = availableEqp.map((eqp) => {
    return (
      <tr
        key={eqp.id}
        style={{ cursor: "pointer" }}
        onClick={() => updateChosenEqp(eqp.id, eqp)}
      >
        <td>
          <GlobalCheckbox
            mb={"0"}
            checked={chosenEquipment
              .map((chosen) => chosen.id)
              .includes(eqp.id)}
            handleChange={() => updateChosenEqp(eqp.id, eqp)}
          />
        </td>
        <td>{eqp.name}</td>
        <td>{eqp.description}</td>
        <td>{eqp.ratePerHour}</td>
      </tr>
    );
  });

  return (
    <GlobalModal
      isOpen={isOpen}
      closeModal={closeModal}
      shouldCloseOnOverlayClick={false}
    >
      <AltModalHeader heading="Equipment Inventory" closeModal={closeModal} />

      <InfoTable minWidth={"500px"}>
        <col style={{ width: "10%" }} />
        <thead>
          <tr>
            <th colSpan={"2"}>Name</th>
            <th className="text-center">Description</th>
            <th>Rate/hr</th>
          </tr>
        </thead>
        <tbody>{tableTemplate}</tbody>
      </InfoTable>

      <BtnGroup>
        <GlobalBtn
          width="120px"
          height="auto"
          px="1rem"
          py=".8rem"
          onClick={() => {
            addEquipment(chosenEquipment);
            closeModal();
          }}
        >
          Assign
        </GlobalBtn>
      </BtnGroup>
    </GlobalModal>
  );
};

export default AssignEquipment;

const BtnGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
  bottom: 0.6rem;
`;
