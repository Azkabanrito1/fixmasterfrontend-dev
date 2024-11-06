import React from "react";
import GlobalSelectTableModal from "../../../../../../globalcomponents/GlobalSelectionTableModal";

const InitialEquipment = ({
  eqpServices,
  selectedData,
  isLoading,
  closeModal,
  isOpen,
  addEquip,
}) => {
  const services =
    eqpServices?.map((equip, index) => ({
      id: equip.id,
      index: index + 1,
      name: equip.name,
    })) || [];

  const selected = selectedData?.map((service) => ({
    id: service.serviceId,
    name: service.serviceName,
  }));

  const columns = [
    { field: "index", headerName: "S/N", width: 100 },
    { field: "name", headerName: "Name", flex: 1 },
  ];

  return (
    <GlobalSelectTableModal
      isOpen={isOpen}
      closeModal={closeModal}
      initData={services}
      isLoading={isLoading}
      selectedData={selected}
      action={addEquip}
      columns={columns}
      heading="Add Services"
    />
  );
};

export default InitialEquipment;
