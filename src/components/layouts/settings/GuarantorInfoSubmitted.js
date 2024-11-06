import { useGetStageId } from "../../../hooks/useQueries/useOnboarding";
import GlobalModal from "../../globalcomponents/GlobalModal";
import AltModalHeader from "../modal/AltModalHeader";

const GuarantorInfoSubmitted = ({ isOpen, closeModal, info }) => {
  const { data: onboardingData } = useGetStageId();

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        title="Guarantor Info Submitted Successfully"
        closeModal={closeModal}
      />
      {!onboardingData?.data?.isCompleted ? (
        <div>
          {info === "guarantor" ? (
            <p className="mb-3 fs-5">
              You have successfully added all guarantor information. Please log
              out and await confirmation from your guarantors
            </p>
          ) : (
            <p className="mb-3 fs-5">
              You have successfully added two trusted customer information.
              Please log out and await confirmation from your guarantors
            </p>
          )}
        </div>
      ) : (
        <div>
          {info === "guarantor" ? (
            <p className="mb-3 fs-5">
              You have successfully added all guarantor information.
            </p>
          ) : (
            <p className="mb-3 fs-5">
              You have successfully added two trusted customer information.
            </p>
          )}
        </div>
      )}
      <p className="mb-3 fs-5">We will be in touch with you.</p>
    </GlobalModal>
  );
};

export default GuarantorInfoSubmitted;
