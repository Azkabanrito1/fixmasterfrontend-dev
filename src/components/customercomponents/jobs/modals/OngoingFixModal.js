import { useReducer } from "react";
import { useSnackbar } from "notistack";
import FixDetails from "./FixDetails";
import EditDetails from "./EditDetails";
import FixModalBody from "../FixModalBody";
import Notifications from "./Notifications";
import RejectJobModal from "./RejectJobModal";
import DiagnosisReport from "./DiagnosisReportModal";
import FixModalHeading from "../FixModalHeading";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import ConfirmAcceptModal from "../../../globalcomponents/modals/ConfirmAcceptModal";
import {
  useAcknowledgeJobCompletion,
  useGetJobDetails,
} from "../../../../hooks/useQueries/useJobs";
import WarrantyClaim from "./WarrantyClaim";

const initState = {
  fixDetails: false,
  editDetails: false,
  diagnosticReport: false,
  notifications: false,
  deleteModal: false,
  acceptModal: false,
  jobRejection: false,
};

const modalStateReducer = (state, action) => {
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        [action.name]: true,
      };
    case "CLOSE":
      return {
        ...state,
        [action.name]: false,
      };
    default:
      return state;
  }
};

const OngoingFixModal = ({ isOpen, closeModal, id, stage, messageCse }) => {
  const { data: jobData } = useGetJobDetails(id);
  const ongoingFix = jobData?.data || {};

  const [modalState, setModalState] = useReducer(modalStateReducer, initState);
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    setModalState({
      type: "CLOSE",
      name: "acceptModal",
    });
    closeModal();
  };
  const onError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: acknowledge } = useAcknowledgeJobCompletion(
    onSuccess,
    onError
  );

  return (
    <>
      <GlobalModal isOpen={isOpen} closeModal={closeModal}>
        <AltModalHeader closeModal={closeModal} mb={"0"} />
        <FixModalHeading
          messageCse={() => messageCse(id)}
          colors={{ primary: "#7B61FF", secondary: "#DED7FF" }}
          createDate={ongoingFix?.createDate}
          diagnosisAction={() =>
            setModalState({
              type: "OPEN",
              name: "diagnosticReport",
            })
          }
          fixStage={stage}
          jobRef={ongoingFix?.fixId}
          notifications={() =>
            setModalState({
              type: "OPEN",
              name: "notifications",
            })
          }
          openDetails={() =>
            setModalState({
              type: "OPEN",
              name: "fixDetails",
            })
          }
        />
        <FixModalBody
          cancelBooking={() =>
            setModalState({
              type: "OPEN",
              name: "deleteModal",
            })
          }
          confirm
          editBooking={() =>
            setModalState({
              type: "OPEN",
              name: "editDetails",
            })
          }
          fix={ongoingFix}
          fixStage={stage}
          rejectJob={() =>
            setModalState({
              type: "OPEN",
              name: "jobRejection",
            })
          }
          acceptJob={() =>
            setModalState({
              type: "OPEN",
              name: "acceptModal",
            })
          }
        />
      </GlobalModal>

      {modalState.fixDetails && (
        <FixDetails
          isOpen={modalState.fixDetails}
          closeModal={() =>
            setModalState({
              type: "CLOSE",
              name: "fixDetails",
            })
          }
          fixId={id}
        />
      )}

      {modalState.editDetails && (
        <EditDetails
          isOpen={modalState.editDetails}
          closeModal={() =>
            setModalState({
              type: "CLOSE",
              name: "editDetails",
            })
          }
          fixId={id}
        />
      )}

      {modalState.diagnosticReport && (
        <DiagnosisReport
          isOpen={modalState.diagnosticReport}
          closeModal={() =>
            setModalState({
              type: "CLOSE",
              name: "diagnosticReport",
            })
          }
          fixId={id}
        />
      )}

      {modalState.notifications && (
        <Notifications
          isOpen={modalState.notifications}
          closeModal={() =>
            setModalState({
              type: "CLOSE",
              name: "notifications",
            })
          }
          fixId={id}
        />
      )}

      {modalState.jobRejection && (
        <RejectJobModal
          isOpen={modalState.jobRejection}
          closeModal={() =>
            setModalState({
              type: "CLOSE",
              name: "jobRejection",
            })
          }
          fixId={id}
          respond={acknowledge}
        />
      )}

      {modalState.acceptModal && (
        <ConfirmAcceptModal
          open={modalState.acceptModal}
          close={() =>
            setModalState({
              type: "CLOSE",
              name: "acceptModal",
            })
          }
          onDelete={() => acknowledge({ fixId: id })}
          pText="Do you really want to confirm the completion of this fix?"
          labelText="Are You Sure?"
          actionText="Delete"
        />
      )}
      {/* {showModal.warrantyClaims && ( */}
      <WarrantyClaim
      // isOpen={showModal.warrantyClaims}
      // closeModal={closeWarrantyClaim}
      />
    </>
  );
};

export default OngoingFixModal;
