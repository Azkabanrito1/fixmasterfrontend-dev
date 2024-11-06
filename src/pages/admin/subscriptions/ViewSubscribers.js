import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import {
  useGetSubPlanDetails,
  useGetSubscribers,
} from "../../../hooks/useQueries/useAdmin";
import { useParams } from "react-router-dom";
import ViewSubscribersTable from "../../../components/admincomponents/subscriptions/ViewSubscribersTable";

const ViewSubscribers = () => {
  const { subId } = useParams();

  const { data: CustomerSubDetails, isLoading } = useGetSubscribers(subId);

  const { data: subDetails } = useGetSubPlanDetails(subId);

  const subscription = CustomerSubDetails?.data;

  return (
    <>
      <BackBtn />

      <div
        // className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3"
        style={{ marginLeft: "auto", marginRight: "auto", marginTop: "0.5rem" }}
      >
        <PageHeading className="mb-0">
          {subDetails?.subscription?.longName} Subscribers
        </PageHeading>
      </div>

      <ViewSubscribersTable
        isLoading={isLoading}
        subscription={subscription?.reverse()}
      />
    </>
  );
};

export default ViewSubscribers;
