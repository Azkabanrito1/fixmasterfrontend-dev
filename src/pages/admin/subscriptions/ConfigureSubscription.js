import { useParams } from "react-router";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import PaymentPlansSection from "../../../components/admincomponents/subscriptions/PaymentPlansSection";
import { useGetSubPlanDetails } from "../../../hooks/useQueries/useAdmin";
import BookingTypeSection from "../../../components/admincomponents/subscriptions/BookingTypeSection";
import FixCategoriesSection from "../../../components/admincomponents/subscriptions/FixCategorySection";

const ConfigureSubscription = () => {
  const { subId } = useParams();

  const { data: subDetails, isLoading } = useGetSubPlanDetails(subId);

  const paymentPlans = subDetails?.subscription?.plans;
  const bookingTypes = subDetails?.subscription?.jobClasses;
  const fixCategories = subDetails?.subscription?.jobCategories;

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading className="fs-4">
          Configure {subDetails?.subscription?.longName} Subscription
        </PageHeading>
      </div>
      <PaymentPlansSection
        isLoading={isLoading}
        paymentPlans={paymentPlans}
        subId={subId}
      />
      <BookingTypeSection
        isLoading={isLoading}
        bookingTypes={bookingTypes}
        subId={subId}
      />
      <FixCategoriesSection
        isLoading={isLoading}
        fixCategories={fixCategories}
        subId={subId}
      />
    </>
  );
};

export default ConfigureSubscription;
