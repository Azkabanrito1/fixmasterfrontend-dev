import { useState } from "react";
import AddBtn from "../../../components/franchiseecomponents/jobsmanagement/AddBtn";
import JobEarningsModal from "../../../components/csecomponent/cse/dashboardComponent/jobs/JobEarningsModal";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import { useGetCollaboratorRoles } from "../../../hooks/useQueries/useIdentity";
import {
  useCreateCollaboratorEarnings,
  useGetCollaboratorEarningsById,
  useUpdateCollaboratorEarnings,
} from "../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";

const FranchiseeEarnings = ({ collaborator }) => {
  const [openAddEarnnings, setOpenAddEarnnings] = useState(false);
  const [showUpdateEarning, setShowUpdateEarning] = useState(false);
  const [activeEarning, setActiveEarning] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  // ---------------------------------------------------------------- Modal controller------------------------------------------q
  const showAddEarnings = () => {
    setOpenAddEarnnings(true);
  };

  const updateEarningHandler = (id) => {
    const activeEarnings = userEarnings?.filter((earning) => earning.id === id);
    setActiveEarning(activeEarnings[0]);
    setShowUpdateEarning(true);
  };

  //----------------------------------------------------------------table view------------------------------------------------
  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMetal) => tableMetal.rowIndex + 1,
      },
    },
    {
      name: "collaborator",
      label: "Collaborator",
    },
    {
      name: "amount",
      label: "Salary",
      options: {
        customBodyRender: (value) => {
          return <div>{`${value}%`}</div>;
        },
      },
    },
    {
      name: "employmentType",
      label: "Employee Type",
    },
    {
      name: "markup",
      label: "Markup",
      options: {
        customBodyRender: (value) => {
          return <div>{`${value}%`}</div>;
        },
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "Update Service",
              action: () => updateEarningHandler(value),
              disabled: false,
            },
          ];
          return <GlobalTableActions id="id" actions={actions} />;
        },
      },
    },
  ];

  //----------------------------------------------------data fetching---------------------------------------
  const { data: roles } = useGetCollaboratorRoles();

  const userRole = roles?.data.find(
    (roles) => roles.name?.toLowerCase() === collaborator
  );
  const { data: earningsData, isLoading } = useGetCollaboratorEarningsById(
    userRole?.id
  );

  const userEarnings = earningsData?.data?.map((data) => {
    return {
      amount: data?.amount,
      id: data?.id,
      markup: data?.collaboratorMarkup,
      employmentType: data?.employmentType,
      collaborator: data?.role,
    };
  });

  //----------------------------------------------------------------mutate $ mutate fn----------------------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setOpenAddEarnnings(false);
    setShowUpdateEarning(false);
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: createEarnings, isLoading: isCreating } =
    useCreateCollaboratorEarnings(onSuccess, onFailure);

  const { mutate: updateEarnings, isLoading: isUpdating } =
    useUpdateCollaboratorEarnings(onSuccess, onFailure);

  // ----------------------------------------------------------------invoking mutate method----------------------------------------------------------------
  const submitFranchiseEarning = (initPayload) => {
    // valueType 1 is percentage value while valueType 2 is flat rate
    const payload = {
      intervId: 0,
      employmentTypeId: initPayload.employmentType,
      amount: initPayload.earnings,
      valueType: 1,
      role: userRole?.id,
      diagnosticRate: 0,
      completionRate: 0,
      warrantyRate: 0,
      fastTrackRate: 0,
      collaboratorMarkup: initPayload.markup,
    };
    createEarnings(payload);
  };
  const updateEarning = (initPayload) => {
    // valueType 1 is percentage value while valueType 2 is flat rate
    const payload = {
      intervId: 0,
      employmentTypeId: initPayload.employmentType,
      amount: initPayload.earnings,
      valueType: 1,
      role: userRole?.id,
      diagnosticRate: 0,
      completionRate: 0,
      warrantyRate: 0,
      fastTrackRate: 0,
      collaboratorMarkup: initPayload.markup,
      id: activeEarning?.id,
    };
    updateEarnings(payload);
  };

  return (
    <>
      <GlobalBallBeat loading={isLoading} />
      <GlobalTable columns={columns} data={userEarnings} />
      {userEarnings?.length > 0 ? (
        ""
      ) : (
        <AddBtn
          text={`Add ${collaborator} Earnings`}
          action={showAddEarnings}
        />
      )}
      {openAddEarnnings && (
        <JobEarningsModal
          isOpen={openAddEarnnings}
          closeModal={() => setOpenAddEarnnings(false)}
          collaborator="Franchisee"
          header="Franchisee Earning"
          action={submitFranchiseEarning}
          loading={isCreating}
          actionText="Add"
        />
      )}
      {showUpdateEarning && (
        <JobEarningsModal
          isOpen={showUpdateEarning}
          closeModal={() => setShowUpdateEarning(false)}
          collaborator="Franchisee"
          header="Update Earning"
          action={updateEarning}
          data={activeEarning}
          actionText="Update"
          loading={isUpdating}
        />
      )}
    </>
  );
};

export default FranchiseeEarnings;
