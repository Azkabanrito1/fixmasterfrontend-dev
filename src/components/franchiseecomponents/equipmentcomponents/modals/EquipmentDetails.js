import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import GlobalModal from "../../../../components/globalcomponents/GlobalModal";
import AltModalHeader from "../../../../components/layouts/modal/AltModalHeader";
import { getEquipmentDetails } from "../../../../redux/equipment/actions";

const EquipmentDetails = ({ isOpen, closeModal, equipment }) => {
  const [equipmentDetails, setEquipmentDetails] = useState({});

  const dispatch = useDispatch();

  const getEquipmentDetail = async () => {
    const response = await dispatch(getEquipmentDetails(equipment.id));
    setEquipmentDetails(response.data);
  };

  useEffect(() => {
    getEquipmentDetail();
  }, []);

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading="Equipment Details" closeModal={closeModal} />

      <EquipmentDets>
        <div>
          <h3>Item ID</h3>
          <span>{equipment.id}</span>
        </div>
        <div className="text-center">
          <h3>Item Name</h3>
          <span className="text-capitalize">{equipment.name}</span>
        </div>
        <div className="text-center">
          <h3>Condition</h3>
          <span className="text-capitalize">
            {equipment.equipmentCondition}
          </span>
        </div>
        <div>
          <h3>Availability</h3>
          <span className="text-capitalize">{equipment.availabilty}</span>
        </div>
        <div className="text-center">
          <h3>Description</h3>
          <span>{equipment.description}</span>
        </div>
        {equipmentDetails.jobId == true && (
          <>
            <div>
              <h3>Borrowed by</h3>
              <span>{equipmentDetails.borrowedBy}</span>
            </div>
            <div>
              <h3>Borrowed On</h3>
              <span>{equipmentDetails.borrowedOn}</span>
            </div>
            <div>
              <h3>Job Id</h3>
              <span>{equipmentDetails.jobId}</span>
            </div>
          </>
        )}
      </EquipmentDets>
    </GlobalModal>
  );
};

export default EquipmentDetails;

const EquipmentDets = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 20px;
  margin-bottom: 2rem;

  h3 {
    margin-bottom: 6px;
    color: var(--clr-primary);
    font-size: 1rem;
  }
`;
