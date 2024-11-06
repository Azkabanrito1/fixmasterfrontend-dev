import { PageHeading } from "../../../components/globalcomponents/Utilities";
import { BsFillGiftFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { PATH_CUSTOMER } from "../../../routes/paths";
import SubscriptionBenefits from "../../../components/customercomponents/subscription/SubscriptionBenefits";
import SubPlansAlt from "../../../components/customercomponents/subscription/SubPlansAlt";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import { useGetSubPlansByStatus } from "../../../hooks/useQueries/useAdmin";

const GiftSubscription = () => {
  const navigate = useNavigate();
  const { data: allSubPlansData, isLoading } = useGetSubPlansByStatus("Active");
  const allSubPlans = allSubPlansData?.data;
  const usablePlans = allSubPlans?.filter((plan) => {
    const durations = plan.plans.map((item) => item.duration.toLowerCase());

    return durations.includes("yearly");
  });

  return (
    <>
      <PageHeading>Gift Subscription</PageHeading>
      <div className="text-center mb-4">
        <BsFillGiftFill color="var(--clr-primary)" fontSize="4rem" />
      </div>

      <p className="fs-5 mb-4">
        Are you searching for that exclusively unique gift that you can gift
        your friends and family? A gift that will light up their face and is
        guaranteed to put a smile on their face for the next 1 year, then look
        no more. Buy them a 1year FixMaster subscription
      </p>

      <h2 className="fs-5 mb-3 fw-bold">
        Our application will ensure that the holder enjoys
      </h2>

      <SubscriptionBenefits />

      <p className="mb-5 fs-5">
        We are the only company providing these benefits, with the goal of
        establishing a maintenance culture in our society.
      </p>

      <GlobalBallBeat loading={isLoading} />

      {!isLoading && (
        <SubPlansAlt
          allSubPlans={usablePlans}
          action={(id) => navigate(`${PATH_CUSTOMER.giftSubForm}/${id}`)}
        />
      )}
    </>
  );
};

export default GiftSubscription;
