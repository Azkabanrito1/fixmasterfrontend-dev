import GlobalBtn from "../../globalcomponents/GlobalBtn";
import CreatePaymentPlan from "./modals/CreatePaymentPlan";
import { useState } from "react";
import { useCreateSubPlan } from "../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import { formatNumberWithCommas } from "../../../utils/utilityFxns";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../globalcomponents/GlobalTable";

const PaymentPlansSection = ({ paymentPlans, isLoading, subId }) => {
  const [showAddPlan, setShowAddPlan] = useState(false);
  const [activePlan, setActivePlan] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const onCreateSuccess = () => {
    setShowAddPlan(false);
    enqueueSnackbar("Plan added successfully", { variant: "success" });
  };
  const onCreateFailure = (error) => {
    enqueueSnackbar(error.message || error, { variant: "error" });
  };
  const { mutate: addPlan, isLoading: isSubmitting } = useCreateSubPlan(
    subId,
    onCreateSuccess,
    onCreateFailure
  );

  const editPlan = (plan) => {
    setActivePlan(plan);
    setShowAddPlan(true);
  };

  const closeModal = () => {
    setShowAddPlan(false);
    setActivePlan(null);
  };

  const columns = [
    {
      name: "S/N",
      options: {
        customBodyRender: (_value, MUIDataTableMeta) =>
          MUIDataTableMeta.rowIndex + 1,
      },
    },
    { name: "duration", label: "Duration" },
    {
      name: "amount",
      label: "Amount",
      options: { customBodyRender: (value) => formatNumberWithCommas(value) },
    },
    {
      name: "numberOfJobs",
      label: "Number of Jobs",
      options: { customBodyRender: (value) => formatNumberWithCommas(value) },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        customBodyRender: (value) => {
          const plan = paymentPlans.filter((plan) => plan.id === value);

          const actions = [
            {
              id: 0,
              name: "Edit Plan",
              action: () => editPlan(plan),
              disabled: true,
            },
          ];

          return <GlobalTableActions actions={actions} id="payment-plans" />;
        },
      },
    },
  ];

  const CustomToolBar = () => (
    <GlobalBtn
      width="max-content"
      px="1rem"
      py="0.7rem"
      display="inline-block"
      onClick={() => setShowAddPlan(true)}
    >
      Add Payment Plan
    </GlobalBtn>
  );

  return (
    <div className="mb-4">
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && (
        <GlobalTable
          title="Payment Plans"
          columns={columns}
          data={paymentPlans}
          options={{
            elevation: 0,
            rowsPerPage: 20,
            pagination: false,
            selectableRows: "none",
            rowsPerPageOptions: [20, 50, 100],
            customToolbar: () => <CustomToolBar />,
          }}
        />
      )}

      {showAddPlan && (
        <CreatePaymentPlan
          existingPlans={paymentPlans}
          isOpen={showAddPlan}
          closeModal={closeModal}
          addPlan={addPlan}
          editPlan={() => {
            console.log("edited");
            closeModal();
          }}
          isSubmitting={isSubmitting}
          initValue={activePlan}
          subId={subId}
        />
      )}
    </div>
  );
};

export default PaymentPlansSection;
