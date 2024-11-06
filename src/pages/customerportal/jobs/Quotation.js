import QuoteHeader from "../../../components/customercomponents/jobs/quotation/QuoteHeader";
import QuoteTable from "../../../components/customercomponents/jobs/quotation/QuoteTable";
import { useParams } from "react-router-dom";
import { useAcceptOrRejectQuote } from "../../../hooks/useQueries/useJobs";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useReducer } from "react";

const initState = false;

const showModalReducer = (state, action) => {
  switch (action) {
    case "open":
      return true;
    case "close":
      return false;
    default:
      return state;
  }
};

const Quotation = () => {
  const { fixId } = useParams();

  const { enqueueSnackbar } = useSnackbar();
  const [showAcceptModal, setShowAcceptModal] = useState({
    show: false,
    id: null,
  });
  const [showRejectModal, setShowRejectModal] = useState({
    show: false,
    id: null,
  });

  const [showPayOpt, setPayOpt] = useReducer(showModalReducer, initState);

  const openPaymentOptions = () => setPayOpt("open");

  // =====================mutations========================
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    controlAcceptModal(null, false);
    controlRejectModal(null, false);
  };

  const onError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: respondToQuote } = useAcceptOrRejectQuote(onSuccess, onError);

  // =====================actions========================
  const controlAcceptModal = (id, show) => {
    setShowAcceptModal({
      show,
      id,
    });
  };

  const controlRejectModal = (id, show) =>
    setShowRejectModal({
      show,
      id,
    });

  const acceptPayload = {
    jobNumber: showAcceptModal.id,
    customerAction: "Accept",
  };

  const rejectPayload = {
    jobNumber: showRejectModal.id,
    customerAction: "Reject",
  };

  return (
    <>
      <QuoteHeader fixId={fixId} />
      <QuoteTable
        fixId={fixId}
        controlAcceptModal={controlAcceptModal}
        controlRejectModal={controlRejectModal}
        acceptPayload={acceptPayload}
        rejectPayload={rejectPayload}
        respondToQuote={respondToQuote}
        showAcceptModal={showAcceptModal}
        showRejectModal={showRejectModal}
        initState={initState}
        showModalReducer={showModalReducer}
        openPaymentOptions={openPaymentOptions}
        showPayOpt={showPayOpt}
        setPayOpt={setPayOpt}
      />
    </>
  );
};

export default Quotation;
