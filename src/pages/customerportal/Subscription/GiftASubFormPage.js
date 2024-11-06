import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import GiftSubForm from "../../../components/customercomponents/subscription/GiftSubForm";
import { useSnackbar } from "notistack";
import { useGetUserProfile } from "../../../hooks/useQueries/useOnboarding";
import { useInitPayStack } from "../../../hooks/useQueries/usePayment";
import GlobalFullScreenLoader from "../../../components/globalcomponents/GlobalFullScreenLoader";
import { giftSubSchema } from "../../../Validations/giftSubValidation";
import { useGetSubPlansByStatus } from "../../../hooks/useQueries/useAdmin";
import { useGiftSubscription } from "../../../hooks/useQueries/useIdentity";
import { PATH_CUSTOMER } from "../../../routes/paths";

const GiftASubForm = () => {
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });
  const [giftDetails, setGiftDetails] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const { data: userProfileData } = useGetUserProfile();
  const { data: allSubPlansData } = useGetSubPlansByStatus("all");
  const navigate = useNavigate();
  const { subId } = useParams();
  const allSubPlans = allSubPlansData?.data;
  const email = userProfileData?.user?.email;
  const searchParams = new URLSearchParams(window.location.search);
  const gifteeMail = searchParams.get("email");
  const referenceId = searchParams.get("reference");

  useEffect(() => {
    setGiftDetails(JSON.parse(localStorage.getItem(gifteeMail)));
  }, []);

  // ===================callbacks================
  const onPaymentSuccess = (response) => {
    const formData = {
      gifterEmail: email,
      title: values.title,
      surname: values.lastName,
      firstName: values.firstName,
      email: values.email,
      phoneNumber: `${selectedCountry.code} ${values.phoneNo}`,
      subscriptionPlanId: yearlyPlan[0].id,
      purpose: values.purpose,
      messageToRecipient: values.message,
    };

    localStorage.setItem(values.email, JSON.stringify(formData));
    window.location.href = response.data.data.authorization_url;
  };

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    localStorage.removeItem(gifteeMail);
    navigate(PATH_CUSTOMER.dashboard);
  };
  const onError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: giftSub, isLoading: isGifting } = useGiftSubscription(
    onSuccess,
    onError
  );
  const { mutate: initPayment, isLoading: isPaying } = useInitPayStack(
    onPaymentSuccess,
    onError
  );

  const onSubmit = async (values) => {
    const payload = {
      email,
      gifteeEmail: values.email,
      amount: String(yearlyPlan[0].amount),
      planCode: yearlyPlan[0].planCode,
      subscriptionPlanId: +yearlyPlan[0].id,
      fixId: 0,
      paymentTypes: 4,
    };

    initPayment(payload);
  };

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      subId,
      purpose: "",
      message: "",
    },
    onSubmit,
    validationSchema: giftSubSchema,
  });

  const subscription = allSubPlans?.filter(
    (plan) => plan.id === parseInt(values.subId)
  );

  const yearlyPlan = subscription?.[0]?.plans?.filter(
    (plan) => plan.duration.toLowerCase() === "yearly"
  );

  const usablePlans = allSubPlans?.filter(
    (plan) => plan.plans.length > 0 && plan.plans.length < 4
  );

  const subOptions = usablePlans?.map((sub) => ({
    id: sub.id,
    name: sub.longName,
  }));

  const formikHandlers = {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  };

  const phoneHandlers = { selectedCountry, setSelectedCountry };

  useEffect(() => {
    if (gifteeMail && giftDetails && email) {
      const payload = {
        gifterEmail: email,
        title: giftDetails.title,
        surname: giftDetails.surname,
        firstName: giftDetails.firstName,
        email: gifteeMail,
        phoneNumber: giftDetails.phoneNumber,
        subscriptionPlanId: giftDetails.subscriptionPlanId,
        purpose: giftDetails.purpose,
        messageToRecipient: giftDetails.messageToRecipient,
        referenceId: referenceId,
      };

      giftSub(payload);
    }
  }, [gifteeMail, giftDetails, userProfileData?.user?.email]);

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Gift Subscription</PageHeading>
      </div>

      <p className="fs-5 mb-4">
        Buy a gift subscription for your friends and family with your FixMaster
        account
      </p>

      <GiftSubForm
        formikHandlers={formikHandlers}
        phoneHandlers={phoneHandlers}
        subOptions={subOptions}
        isLoading={isGifting || isPaying}
      />

      <GlobalFullScreenLoader open={isGifting || isPaying} />
    </>
  );
};

export default GiftASubForm;
