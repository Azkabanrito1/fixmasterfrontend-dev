import GlobalBtn from "../../../../globalcomponents/GlobalBtn";
import GlobalModal from "../../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../../layouts/modal/AltModalHeader";

const DeleteAddress = ({ isOpen, closeModal, handleDelete, addressId }) => {
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading="Delete Address" closeModal={closeModal} />

      <p>Are you sure you want to delete address {addressId}: </p>

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

export default DeleteAddress;
