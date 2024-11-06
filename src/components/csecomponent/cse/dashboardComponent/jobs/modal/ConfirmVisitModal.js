import GlobalModal from "../../../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../../../layouts/modal/AltModalHeader";
import JobVisitDate from "../JobVisitDate";

const ConfirmVisit = ({ isOpen, closeModal, fixId }) => {
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        isOpen={isOpen}
        closeModal={closeModal}
        heading={"Diagnostics Visit Date"}
      />
      <JobVisitDate fixId={fixId} closeModal={closeModal} />
    </GlobalModal>
  );
};

export default ConfirmVisit;
