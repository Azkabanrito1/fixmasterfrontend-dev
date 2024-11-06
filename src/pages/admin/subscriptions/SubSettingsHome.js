import { useState } from "react";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import { PageHeading } from "../../../components/globalcomponents/Utilities";
import HomeTable from "../../../components/admincomponents/subscriptions/HomeTable";
import {
  useCreateSub,
  useGetSubPlansByStatus,
} from "../../../hooks/useQueries/useAdmin";
import AddSubscription from "../../../components/admincomponents/subscriptions/modals/CreateSubscription";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { PATH_ADMIN } from "../../../routes/paths";
import { useGetUserRole } from "../../../hooks/useQueries/useIdentity";

const SubSettingsHome = () => {
  const [showAddSub, setShowAddSub] = useState(false);
  const [status, setStatus] = useState("All");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onCreateSuccess = (response) => {
    const subId = response.message.slice(response.message.indexOf("_") + 1);

    enqueueSnackbar("Subscription created successfully", {
      variant: "success",
    });
    navigate(`${PATH_ADMIN.configSub}/${subId}`);
  };

  const onCreateError = (error) => {
    enqueueSnackbar(error.message, { variant: "error" });
  };
  const { mutate: createSubscription, isLoading: isSubmitting } = useCreateSub(
    onCreateSuccess,
    onCreateError
  );
  const { data: subPlanData, isLoading } = useGetSubPlansByStatus(status);
  const { data: roleData } = useGetUserRole();
  const isDefaultSuper = !!roleData?.filter(
    (role) => role.name.toLowerCase() === "super admin"
  )[0]?.isDefault;

  const subscriptions = subPlanData?.data;

  const openAddSubscription = () => setShowAddSub(true);

  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
        <PageHeading className="mb-0">Subscriptions</PageHeading>
        {isDefaultSuper && (
          <GlobalBtn
            display="inline-block"
            width="max-content"
            px="1em"
            py=".7em"
            fs="16px"
            fw={400}
            onClick={openAddSubscription}
          >
            Setup Subscription
          </GlobalBtn>
        )}
      </div>

      <HomeTable
        isLoading={isLoading}
        subscriptions={subscriptions?.reverse()}
        isSuperAdmin={isDefaultSuper}
      />

      {showAddSub && isDefaultSuper && (
        <AddSubscription
          isOpen={showAddSub}
          closeModal={() => setShowAddSub(false)}
          createSubscription={createSubscription}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
};

export default SubSettingsHome;
