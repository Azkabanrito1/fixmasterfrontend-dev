import { useReducer } from "react";
import { useSnackbar } from "notistack";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import NewFixModal from "../../../components/customercomponents/jobs/modals/NewFixModal";
import { useOutletContext } from "react-router-dom";
import ConfirmDeleteModal from "../../../components/globalcomponents/modals/ConfirmDeleteModal";
import MessageCSE from "../../../components/customercomponents/jobs/modals/MessageCse";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import NewFixTable from "../../../components/customercomponents/jobs/NewFixTable";
import {
  useCancelFix,
  useGetCollaboratorJobs,
} from "../../../hooks/useQueries/useJobs";
import { jobTypes } from "../../../utils/selectOptions";
import EditDetails from "../../../components/customercomponents/jobs/modals/EditDetails";

const initState = {
  id: null,
  stage: "",
  showCancelModal: false,
  showFixModal: false,
  showMessageCSE: false,
  showEditModal: false,
};

const stateReducer = (state, action) => {
  switch (action.type) {
    case "openFixModal":
      return {
        ...state,
        showFixModal: true,
        id: action.id,
        stage: action.stage,
      };
    case "openCancelModal":
      return {
        ...state,
        showCancelModal: true,
        id: action.id,
      };
    case "openEditModal":
      return {
        ...state,
        showEditModal: true,
        id: action.id,
        stage: action.stage,
      };
    case "showMessageCSE":
      return { ...state, showMessageCSE: true };
    case "cancelSuccess":
      return {
        ...state,
        showCancelModal: false,
        showFixModal: false,
      };
    case "closeFixModal":
      return { ...state, showFixModal: false };
    case "closeCancelModal":
      return { ...state, showCancelModal: false };
    case "closeMessageCSE":
      return { ...state, showMessageCSE: false };
    case "closeEditModal":
      return { ...state, showEditModal: false };
    default:
      return state;
  }
};

const CustomerNewJobs = () => {
  const [showModal, setShowModal] = useReducer(stateReducer, initState);
  // const [showEditBooking, setshowEditBooking] = useState();
  // const { data: allNewJobs, isLoading } = useGetCustomerNewJobs();
  const { data: allNewJobs, isLoading } = useGetCollaboratorJobs(
    jobTypes.unAssigned
  );
  const { setFixId, openPaymentOptions } = useOutletContext();

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    onCancelSuccess();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
    closeCancelModal();
  };

  const { mutate: cancelFixBooking } = useCancelFix(onSuccess, onFailure);

  const openAddInfo = (id, stage) =>
    setShowModal({ type: "openFixModal", id, stage });
  const openCancelBooking = (id) =>
    setShowModal({ type: "openCancelModal", id });
  const openEditBooking = (id) => setShowModal({ type: "openEditModal", id });
  const openMessageCse = () => setShowModal({ type: "showMessageCSE" });
  const closeFixModal = () => setShowModal({ type: "closeFixModal" });
  const closeEditModal = () => setShowModal({ type: "closeEditModal" });
  const closeCancelModal = () => setShowModal({ type: "closeCancelModal" });
  const onCancelSuccess = () => setShowModal({ type: "cancelSuccess" });
  const closeMessageCse = () => setShowModal({ type: "closeMessageCSE" });

  const messageCSE = () => {
    openMessageCse();
  };

  const payForFix = (fixId) => {
    setFixId(fixId);
    openPaymentOptions();
  };

  const cancelFix = () => {
    const payload = {
      fixId: showModal.id,
    };
    cancelFixBooking(payload);
  };

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>New Fix</PageHeading>
      </div>

      {<GlobalBallBeat loading={isLoading} />}

      {!isLoading && (
        <NewFixTable
          data={allNewJobs?.data}
          payBookingFee={payForFix}
          openAddInfo={openAddInfo}
          cancelBooking={openCancelBooking}
          openEditBooking={openEditBooking}
        />
      )}

      {showModal.showFixModal && (
        <NewFixModal
          isOpen={showModal.showFixModal}
          closeModal={closeFixModal}
          id={showModal.id}
          stage={showModal.stage}
          messageCSE={messageCSE}
          // messageCSE={() => console.log("opened")}
          openCancelModal={openCancelBooking}
        />
      )}

      {showModal.showCancelModal && (
        <ConfirmDeleteModal
          open={showModal.showCancelModal}
          close={closeCancelModal}
          onDelete={cancelFix}
          pText="Do you really want to cancel this fix?"
          labelText="Are You Sure?"
          actionText="Proceed"
        />
      )}

      {showModal.showMessageCSE && (
        <MessageCSE
          isOpen={showModal.showMessageCSE}
          closeModal={closeMessageCse}
          jobId={showModal.id}
        />
      )}
      {
        <EditDetails
          isOpen={showModal.showEditModal}
          closeModal={closeEditModal}
          fixId={showModal.id}
        />
      }
    </>
  );
};

export default CustomerNewJobs;
