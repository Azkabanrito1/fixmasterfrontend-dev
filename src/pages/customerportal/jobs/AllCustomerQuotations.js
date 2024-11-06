import { useState } from "react";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import {
  useAcceptOrRejectQuote,
  useGetAllQuotations,
} from "../../../hooks/useQueries/useJobs";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import CustomerQuotationsTable from "../../../components/customercomponents/jobs/CustomerQuotationsTable";
import ConfirmAcceptModal from "../../../components/globalcomponents/modals/ConfirmAcceptModal";
import { useSnackbar } from "notistack";
import ConfirmDeleteModal from "../../../components/globalcomponents/modals/ConfirmDeleteModal";

const AllCustomerQuotations = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [showAcceptModal, setShowAcceptModal] = useState({
    show: false,
    id: null,
  });
  const [showRejectModal, setShowRejectModal] = useState({
    show: false,
    id: null,
  });
  const { data: allQuotations, isLoading } = useGetAllQuotations();

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
  const controlAcceptModal = (id, show) =>
    setShowAcceptModal({
      show,
      id,
    });

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
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Quotations</PageHeading>
      </div>

      <GlobalBallBeat loading={isLoading} />
      {!isLoading && (
        <CustomerQuotationsTable
          data={allQuotations?.data}
          acceptQuoteAction={controlAcceptModal}
          rejectQuoteAction={controlRejectModal}
        />
      )}

      {showAcceptModal.show && (
        <ConfirmAcceptModal
          open={showAcceptModal.show}
          close={() => controlAcceptModal(null, false)}
          onDelete={() => respondToQuote(acceptPayload)}
          actionText={"Accept"}
          labelText={"Accept Quote"}
          pText={"Are you sure you want to accept this quote?"}
        />
      )}

      {showRejectModal.show && (
        <ConfirmDeleteModal
          open={showRejectModal.show}
          close={() => controlRejectModal(null, false)}
          onDelete={() => respondToQuote(rejectPayload)}
          labelText={"Reject Quote"}
          actionText={"Reject"}
          pText={"Are you sure you want to reject this quote?"}
        />
      )}
    </>
  );
};

export default AllCustomerQuotations;
