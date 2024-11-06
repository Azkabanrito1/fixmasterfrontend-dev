import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch } from "react-redux";
import GlobalBtn from "../../../../components/globalcomponents/GlobalBtn";
import GlobalModal from "../../../../components/globalcomponents/GlobalModal";
import AltModalHeader from "../../../../components/layouts/modal/AltModalHeader";
import { deleteEquipment } from "../../../../redux/equipment/actions";

const EquipmentDetails = ({ isOpen, closeModal, equipment }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    const response = await dispatch(deleteEquipment(equipment.id));
    if (response.status === "Success") {
      enqueueSnackbar(`Equipment: ${equipment.id} has been deleted`, {
        variant: "success",
      });
      closeModal();
    } else {
      enqueueSnackbar(`An error occurred: ${response.message}`, {
        variant: "error",
      });
    }
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading="Delete Equipment" closeModal={closeModal} />

      <p>
        Are you sure you want to delete {equipment.id}:{" "}
        <span className="text-capitalize">{equipment.name}</span>
      </p>

      <div className="text-center mt-5">
        <GlobalBtn
          display="inline-flex"
          mx="1rem"
          width="max-content"
          height="auto"
          py="0.5rem"
          px="0.6rem"
          fs="18px"
          onClick={closeModal}
        >
          No, keep
        </GlobalBtn>
        <GlobalBtn
          display="inline-flex"
          color="var(--clr-primary)"
          bgClr="transparent"
          border="1px solid var(--clr-primary)"
          width="max-content"
          height="auto"
          py="0.5rem"
          px="0.6rem"
          fs="18px"
          onClick={handleDelete}
        >
          Yes, Delete
        </GlobalBtn>
      </div>
    </GlobalModal>
  );
};

export default EquipmentDetails;
