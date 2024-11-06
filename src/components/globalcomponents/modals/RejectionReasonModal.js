import GlobalModal from "../../globalcomponents/GlobalModal";
import styled from "styled-components";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { useGetRejectedCollaborators } from "../../../hooks/useQueries/useOnboarding";

const RejectionReasonModal = ({
  isOpen,
  closeModal,
  role,
  type,
  applicantId,
}) => {
  const { data: rejectedCollaborators, isLoading } =
    useGetRejectedCollaborators(role, type);

  const applicant = rejectedCollaborators?.data?.filter((item) => {
    if (item.id === applicantId) return item.name;
  });

  return (
    <GlobalModal
      isOpen={isOpen}
      closeModal={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <AltModalHeader
        closeModal={closeModal}
        heading={`Reason for Rejecting ${applicant[0]?.name}`}
        alignText={`center`}
      />
      <GlobalBallBeat loading={isLoading} />
      {!isLoading && (
        <ApplicantDetails>{applicant[0]?.reason}</ApplicantDetails>
      )}
    </GlobalModal>
  );
};

export default RejectionReasonModal;

const ApplicantDetails = styled.div`
  width: 100%;
  line-height: 2.2rem;
  font-family: Roboto;
  font-style: normal;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  letter-spacing: 0.01rem;
`;
