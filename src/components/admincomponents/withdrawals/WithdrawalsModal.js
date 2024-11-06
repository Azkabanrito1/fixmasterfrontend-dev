import { useState } from "react";
import GlobalTextArea from "../../globalcomponents/GlobalTextArea";
import GlobalModal from "../../globalcomponents/GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { BallBeat } from "react-pure-loaders";
import { useSnackbar } from "notistack";
import { useRespondToWithdrawalRequests } from "../../../hooks/useQueries/useAdmin";

const WithdrawalsModal = ({
  isOpen,
  closeModal,
  withdrawalId,
  respondToRequest,
  isSubmitting,
}) => {
  const [withdrawalReason, setWithdrawalReason] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;

    setWithdrawalReason(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: withdrawalId,
      reason: withdrawalReason,
      action: 2,
    };

    respondToRequest(payload);
  };

  return (
    <GlobalModal closeModal={closeModal} isOpen={isOpen}>
      <AltModalHeader
        heading="Reject Withdrawal Request"
        closeModal={closeModal}
      />
      {isSubmitting && (
        <div className="text-center mb-3">
          <BallBeat loading={isSubmitting} color="var(--clr-primary)" />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <GlobalTextArea
          inputName={"reason"}
          inputValue={withdrawalReason}
          labelText={"Rejection Reason"}
          handleChange={handleChange}
          required
        />

        <GlobalBtn
          className="mt-3"
          mx="auto"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting" : "Deny Request"}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default WithdrawalsModal;
