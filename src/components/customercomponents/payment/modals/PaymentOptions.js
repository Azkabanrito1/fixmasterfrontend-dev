import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import OptionCard from "../PaymentOptionCard";
import { OptionsContainer } from "../PaymentUtilities";
import { useSnackbar } from "notistack";
import { useGetUserProfile } from "../../../../hooks/useQueries/useIdentity";
import { useInitPayStack } from "../../../../hooks/useQueries/usePayment";
import GlobalFullScreenLoader from "../../../globalcomponents/GlobalFullScreenLoader";
import { useGetFixBookingFee } from "../../../../hooks/useQueries/useJobs";

const PaymentOptions = ({
  isOpen,
  closeModal,
  fixId,
  openPayWithSub,
  openPayWithWallet,
}) => {
  const { data: userData } = useGetUserProfile();
  const email = userData?.user?.email;
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = (response) => {
    closeModal();
    return (window.location.href = response.data.data.authorization_url);
  };

  const onError = (response) =>
    enqueueSnackbar(response.message, { variant: "error" });

  const { mutate: initPayment, isLoading } = useInitPayStack(
    onSuccess,
    onError
  );

  const { data: priceData } = useGetFixBookingFee(fixId);
  const price = priceData?.data;

  const initiatePaystack = async () => {
    const payload = {
      email,
      gifteeEmail: "",
      amount: String(price),
      planCode: "",
      subscriptionPlanId: 0,
      fixId: +fixId,
      paymentTypes: 1,
    };

    initPayment(payload);
  };

  const options = [
    // subscription removed in the first pilot of fixmaster
    // {
    //   id: 0,
    //   title: "Subscription",
    //   subtitle: "Book using your active subscription",
    //   icon: "/images/subPayIcon.svg",
    //   action: () => {
    //     closeModal();
    //     openPayWithSub();
    //   },
    // },
    {
      id: 1,
      title: "Wallet",
      subtitle: "Pay from your wallet",
      icon: "/images/walletSubPay.svg",
      action: () => {
        closeModal();
        openPayWithWallet();
      },
    },
    {
      id: 2,
      title: "Other",
      subtitle: "Pay via bank transfer, card, crypto currency and mobile money",
      icon: "/images/cash.svg",
      action: () => {
        initiatePaystack();
      },
    },
  ];

  return (
    <GlobalModal
      isOpen={isOpen}
      closeModal={closeModal}
      shouldCloseOnOverlayClick={false}
    >
      <AltModalHeader
        heading="Payment option to confirm your booking"
        closeModal={closeModal}
      />

      <OptionsContainer>
        {options.map((option) => (
          <OptionCard key={option.id} option={option} />
        ))}
      </OptionsContainer>

      <GlobalFullScreenLoader open={isLoading} />
    </GlobalModal>
  );
};

export default PaymentOptions;
