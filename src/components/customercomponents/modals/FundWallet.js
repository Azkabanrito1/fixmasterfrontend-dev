import { useState } from "react";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalModal from "../../globalcomponents/GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import { useSnackbar } from "notistack";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useInitPayStack } from "../../../hooks/useQueries/usePayment";
import { useGetUserProfile } from "../../../hooks/useQueries/useOnboarding";
import { FormGroup } from "../../globalcomponents/Utilities";

const FundWallet = ({ isOpen, closeModal }) => {
  const { data: profile } = useGetUserProfile();
  const [price, setPrice] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = (response) =>
    (window.location.href = response.data.data.authorization_url);

  const onError = (response) =>
    enqueueSnackbar(response.message, { variant: "error" });

  const { mutate: initPayment, isLoading } = useInitPayStack(
    onSuccess,
    onError
  );

  const handleChange = (event) => setPrice(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      email: profile?.user?.email,
      gifteeEmail: "",
      amount: String(price),
      planCode: "",
      subscriptionPlanId: 0,
      fixId: 0,
      paymentTypes: 3,
    };

    initPayment(payload);
  };

  return (
    <GlobalModal width="400px" isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader closeModal={closeModal} heading="Fund Wallet" />

      <form onSubmit={handleSubmit}>
        <FormGroup className="mb-3">
          <GlobalInput
            labelText="Amount"
            value={price}
            name="price"
            inputType="number"
            required
            handleChange={handleChange}
          />
        </FormGroup>

        <GlobalBtn mx="auto" type="submit" disabled={isLoading} width="80%">
          Pay Now
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default FundWallet;
