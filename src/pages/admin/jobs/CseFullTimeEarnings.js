import { useState } from "react";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import {
  useCreateCollaboratorEarnings,
  useGetCollaboratorEarningsById,
  useUpdateCollaboratorEarnings,
} from "../../../hooks/useQueries/useAdmin";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import AddBtn from "../../../components/franchiseecomponents/jobsmanagement/AddBtn";
import { useGetCollaboratorRoles } from "../../../hooks/useQueries/useIdentity";
import { useSnackbar } from "notistack";
import CseAndTechnicianEarningsModal from "./CseAndTechnicianEarningsModal";

const CseFullTimeEarnings = ({ collaborator }) => {
  const [showAddEarnings, setShowAddEarnings] = useState(false);
  const [showUpdateEarning, setShowUpdateEarning] = useState(false);
  const [activeEarning, setActiveEarning] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  //----------------------------------------------------data fetching---------------------------------------
  const { data: roles } = useGetCollaboratorRoles();

  const userRole = roles?.data.find(
    (roles) => roles.name?.toLowerCase() === collaborator
  );

  const { data: earningsData, isLoading } = useGetCollaboratorEarningsById(
    userRole?.id
  );

  const userEarnings = earningsData?.data
    ?.map((data) => {
      return {
        amount: data?.amount,
        id: data?.id,
        markup: data?.collaboratorMarkup,
        employmentType: data?.employmentType,
        collaborator: data?.role,
      };
    })
    .filter((data) => data?.employmentType?.toLowerCase() === "fulltime");

  //----------------------------------------------------------------Modal controller----------------------------------------------------------------
  const addEarningHandler = function () {
    setShowAddEarnings(true);
  };

  const updateHandler = (id) => {
    const earnings = userEarnings?.filter((earning) => earning.id === id);
    setActiveEarning(earnings[0]);
    setShowUpdateEarning(true);
  };

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
        customBodyRender: (value) => `₦${value?.toLocaleString()}`,
      },
    },
    {
      name: "employmentType",
      label: "Employment Type",
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
              action: () => updateHandler(value),
            },
          ];
          return <GlobalTableActions id="id" actions={actions} />;
        },
      },
    },
  ];

  //----------------------------------------------------------------mutate $ mutate fn----------------------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowAddEarnings(false);
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

  const submit = (initPayload) => {
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
    const payload = {
      intervId: 0,
      employmentTypeId: initPayload.employmentType,
      amount: initPayload.earnings,
      valueType: 2,
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
          text={`Add ${collaborator} Full time earnings`}
          action={addEarningHandler}
        />
      )}

      {showAddEarnings && (
        <CseAndTechnicianEarningsModal
          isOpen={showAddEarnings}
          closeModal={() => setShowAddEarnings(false)}
          heading="Add full time earnings"
          action={submit}
          isLoading={isCreating}
          actionText="Add"
        />
      )}
      {showUpdateEarning && (
        <CseAndTechnicianEarningsModal
          isOpen={showUpdateEarning}
          closeModal={() => setShowUpdateEarning(false)}
          heading="Update earnings"
          action={updateEarning}
          activeEarning={activeEarning}
          isLoading={isUpdating}
          actionText="Update"
        />
      )}
    </>
  );
};

export default CseFullTimeEarnings;
