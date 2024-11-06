import { Button, Stack } from "@mui/material";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { PaymentContent } from "../PaymentUtilities";
import { useState } from "react";
import {
  useGetFixBookingFee,
  useWalletForJob,
} from "../../../../hooks/useQueries/useJobs";
import { useSnackbar } from "notistack";
import {
  useGenerateWalletPin,
  useGetDebitCodes,
} from "../../../../hooks/useQueries/useAdmin";
import GlobalFullScreenLoader from "../../../globalcomponents/GlobalFullScreenLoader";
import ShowPin from "./ShowPin";

const PayWithWallet = ({ isOpen, closeModal, fixId, openPaymentOptions }) => {
  const [pin, setPin] = useState("");
  const [openShowPin, setOpenShowPin] = useState(false);
  const [response, setResponse] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const { data: debitCodes } = useGetDebitCodes();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
  };
  const onGenPinSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    setResponse(response);
    setOpenShowPin(true);
  };
  const onFail = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: generatePin } = useGenerateWalletPin(onGenPinSuccess, onFail);
  const { mutate: payWithWallet, isLoading: isPaying } = useWalletForJob(
    onSuccess,
    onFail
  );

  const { data: priceData } = useGetFixBookingFee(fixId);
  const price = priceData?.data;

  const bookFixCode = debitCodes?.data
    ?.filter((code) => code.name.toLowerCase() === "book fix")?.[0]
    .debitCode.trim();

  const pay = () => {
    const payload = {
      fixId,
      amount: price,
      waletPin: pin,
      reasonCode: bookFixCode.trim(),
    };

    payWithWallet(payload);
  };

  const handleChange = (e) => setPin(e.target.value);

  return (
    <GlobalModal
      isOpen={isOpen}
      closeModal={() => {
        openPaymentOptions();
        closeModal();
      }}
      width={"500px"}
      shouldCloseOnOverlayClick={false}
    >
      <AltModalHeader
        closeModal={() => {
          closeModal();
          openPaymentOptions();
        }}
        heading={"Pay with wallet"}
      />

      <PaymentContent>
        <div className="fee">
          <h3>Booking fee</h3>
          <span className="fs-5 fw-bold orange">N{price}</span>
        </div>
      </PaymentContent>

      <Stack marginBottom={1}>
        <GlobalInput
          labelText={"Please input your pin"}
          value={pin}
          handleChange={handleChange}
          isRequired
        />
      </Stack>

      <p className="text-center mb-3">
        Don't have pin/Forgot your pin{" "}
        <Button sx={{ color: "#f26222" }} onClick={generatePin}>
          Get Pin
        </Button>
      </p>

      <GlobalBtn mx="auto" onClick={pay} disabled={isPaying}>
        Pay Now
      </GlobalBtn>

      <GlobalFullScreenLoader open={isPaying} />
      {openShowPin && (
        <ShowPin
          isOpen={openShowPin}
          closeModal={() => setOpenShowPin(false)}
          response={response}
        />
      )}
    </GlobalModal>
  );
};

export default PayWithWallet;
