import styled from "styled-components";
import MaterialsTable from "./MaterialsTable";
import LabourTable from "./LabourTable";
import LogisticsTable from "./LogisticsTable";
import WarrantyTable from "./WarrantyTable";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import {
  useGetCollaboratorJobs,
  useGetQuoteDetails,
} from "../../../../hooks/useQueries/useJobs";
import DiscountTable from "./DiscountsTable";
import ConfirmAcceptModal from "../../../globalcomponents/modals/ConfirmAcceptModal";
import ConfirmDeleteModal from "../../../globalcomponents/modals/ConfirmDeleteModal";
import { jobTypes } from "../../../../utils/selectOptions";
import { useState } from "react";
import { useEffect } from "react";
import EquipmentHireTable from "./EquipmentHireTable";
import QuotePaymentOptions from "../../payment/modals/QuotePaymentOptions";
import { useReducer } from "react";
import { getStatusIndex } from "../../../../utils/utilityFxns";
import PayQuoteWithWallet from "../../payment/modals/PayQuoteWithWallet";
import { buttonGroupClasses } from "@mui/material";

const QuoteTable = ({
  fixId,
  controlAcceptModal,
  controlRejectModal,
  acceptPayload,
  rejectPayload,
  respondToQuote,
  showAcceptModal,
  showRejectModal,
  initState,
  showModalReducer,
  openPaymentOptions,
  setPayOpt,
  showPayOpt,
}) => {
  const [fixStatus, setFixStatus] = useState("");

  const [showPayWtWallet, setPayWtWallet] = useReducer(
    showModalReducer,
    initState
  );

  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // opening the modals
  // const openPaymentOptions = () => setPayOpt("open");
  const openPayWithWallet = () => setPayWtWallet("open");
  // closing the modals
  const closePaymentOptions = () => setPayOpt("close");
  const closePayWithWallet = () => setPayWtWallet("close");

  // const [fixStatus, setFixStatus] = useState("");
  const { data: quoteDetailsData } = useGetQuoteDetails(fixId);
  const quoteData = quoteDetailsData?.data;

  const { data: allOngoingJobs } = useGetCollaboratorJobs(jobTypes.ongoing);

  useEffect(() => {
    const currentFix =
      allOngoingJobs?.data &&
      allOngoingJobs?.data?.filter((item) => item.fixId === Number(fixId));

    const thatFix = currentFix?.map((item) => item.fixStatus);
    thatFix && setFixStatus(thatFix[0]);
  }, [showPayWtWallet, allOngoingJobs?.data]);

  // Check localStorage for payment status on mount
  useEffect(() => {
    const savedStatus = localStorage.getItem(`paymentStatus_${fixId}`);
    if (savedStatus === "true") {
      setPaymentCompleted(true);
    }
  }, [fixId]);

  // Handler for successful payment
  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
    localStorage.setItem(`paymentStatus_${fixId}`, "true");
  };

  return (
    <div>
      <h3
        className="fw-bold fs-5 text-center mb-3"
        style={{ color: "var(--clr-primary)" }}
      >
        Schedule of cost breakdown and amount due for payment
      </h3>

      {quoteData?.materials?.length > 0 && (
        <MaterialsTable
          fixId={parseInt(fixId)}
          materials={quoteData?.materials}
          quoteData={quoteData}
        />
      )}

      {quoteData?.labour?.length > 0 && (
        <LabourTable labour={quoteData?.labour} quoteData={quoteData} />
      )}

      {quoteData?.logistics?.length > 0 && (
        <LogisticsTable
          logistics={quoteData?.logistics}
          quoteData={quoteData}
        />
      )}

      {quoteData?.equipmentHires?.length > 0 && (
        <EquipmentHireTable
          eqpHire={quoteData?.equipmentHires}
          quoteData={quoteData}
        />
      )}

      <TableTitle>
        <h4>FixMaster Royalty Total</h4>
        <small>5% of Materials and Labour Total Cost</small>
        <span className="total">{quoteData?.fmRoyalty?.totalAmount}</span>
      </TableTitle>

      {quoteData?.discounts?.length > 0 && (
        <DiscountTable discounts={quoteData?.discounts} quoteData={quoteData} />
      )}

      <TableTitle bg="#006717" clr="#fff" totalClr="#fff">
        <h4>Booking Fee</h4>
        <small>Refundable Fee</small>
        <span className="total">{quoteData?.bookingFee}</span>
      </TableTitle>

      <TableTitle>
        <h4>Grand Total</h4>
        <span className="total">{quoteData?.grandTotal}</span>
      </TableTitle>

      <TableTitle bg="#fff" clr="var(--clr-primary)">
        <h4>VAT</h4>
        <span className="total">{quoteData?.vat}</span>
      </TableTitle>

      <TableTitle bg="var(--clr-primary)" clr="#fff" totalClr="#fff">
        <h4>To Pay Now</h4>
        <span className="total">{quoteData?.amountDue}</span>
      </TableTitle>

      <p className="mb-2 text-muted">
        Our quotations are real time generated, based on prices sourced from
        over 100 Suppliers using our unique quotation engine. We source only
        quality spares to ensure that we can give you an automatic warranty on
        all jobs delivered to you. Thank you for using FixMaster
      </p>

      <p className="mb-5">
        Kindly accept the quote. Should you wish to reject it, a cost of NGN
        4000 will become due for the completed diagnostic work
      </p>

      {fixStatus === "Customer Quote Notified" ||
      fixStatus === "Quote Generated" ||
      fixStatus === "Quote Notified" ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ gap: "1rem" }}
        >
          <GlobalBtn
            onClick={() => {
              controlAcceptModal(fixId, true);
            }}
          >
            Accept Quote
          </GlobalBtn>
          <GlobalBtn onClick={() => controlRejectModal(fixId, true)}>
            Reject Quote
          </GlobalBtn>
        </div>
      ) : fixStatus === "Quotation Rejected" ? (
        <div></div>
      ) : fixStatus === "Quotation Accepted" && !paymentCompleted ? (
        <GlobalBtn
          onClick={() => openPaymentOptions()}
          style={{
            margin: "0 auto",
          }}
        >
          Make Payment
        </GlobalBtn>
      ) : (
        <div></div>
      )}

      {showAcceptModal.show && (
        <ConfirmAcceptModal
          open={showAcceptModal.show}
          close={() => controlAcceptModal(null, false)}
          onDelete={() => {
            respondToQuote(acceptPayload);
            openPaymentOptions();
          }}
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
          pText2={"Diagnosis fee will be deducted from your wallet."}
        />
      )}

      {showPayOpt && (
        <QuotePaymentOptions
          fixId={fixId}
          isOpen={showPayOpt}
          closeOnOverlayClick={true}
          closeModal={closePaymentOptions}
          openPayWithWallet={openPayWithWallet}
        />
      )}

      {showPayWtWallet && (
        <PayQuoteWithWallet
          isOpen={showPayWtWallet}
          closeModal={closePayWithWallet}
          fixId={fixId}
          openPaymentOptions={openPaymentOptions}
          price={quoteData?.amountDue}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default QuoteTable;

export const TableTitle = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 0.6rem;
  margin-block: 0.5rem;
  isolation: isolate;
  z-index: 1;

  background-color: ${({ bg }) => bg || "#dadada"};
  color: ${({ clr }) => clr || "#000"};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -50px;
    width: calc(100% + 100px);
    height: 100%;
    background-color: ${({ bg }) => bg || "#dadada"};
    z-index: -1;
  }

  h4 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 0;
  }

  span.total {
    font-size: 1.2rem;
    font-weight: bold;
    color: ${({ totalClr }) => totalClr || "var(--clr-primary)"};
  }
`;
