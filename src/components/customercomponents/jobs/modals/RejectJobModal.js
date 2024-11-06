import { useState } from "react";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import GlobalTextArea from "../../../globalcomponents/GlobalTextArea";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import { useSnackbar } from "notistack";

const RejectJobModal = ({ isOpen, closeModal, fixId, respond }) => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [reason, setReason] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const rejectJob = async () => {
    const payload = { fixId, reasonForRejection: reason };

    respond(payload);
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal} width="500px">
      <AltModalHeader
        closeModal={closeModal}
        heading={showDisclaimer ? "Job Rejection" : "Job Rejection Details"}
      />

      {showDisclaimer ? (
        <p>
          You should reject a fix if you have specifically discussed points of
          objection/rejection with your project manager(CSE) and the issue is
          still not being addressed . If you have not done this, Please do so.
          If you have and your issue remains, please click ‘Continue’ to reject
          the job.
        </p>
      ) : (
        <p className="text-muted">
          *Please confirm what the issue is and what the project manager
          said/did to result in a rejection{" "}
        </p>
      )}

      {!showDisclaimer && (
        <GlobalTextArea
          className="mb-3"
          border={"1px solid var(--clr-primary)"}
          inputName="reason"
          inputValue={reason}
          handleChange={(e) => setReason(e.target.value)}
          required
        />
      )}

      {showDisclaimer ? (
        <GlobalBtn
          width="auto"
          px="2rem"
          mx="auto"
          onClick={() => setShowDisclaimer(false)}
        >
          Continue
        </GlobalBtn>
      ) : (
        <GlobalBtn
          width="auto"
          px="2rem"
          mx="auto"
          onClick={rejectJob}
          disabled={reason === ""}
        >
          Submit
        </GlobalBtn>
      )}
    </GlobalModal>
  );
};

export default RejectJobModal;
