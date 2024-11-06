import React, { useState } from "react";
import AddBtn from "../../../components/franchiseecomponents/jobsmanagement/AddBtn";
import JobEarningsModal from "../../../components/csecomponent/cse/dashboardComponent/jobs/JobEarningsModal";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import CseAndTechnicianEarningsModal from "./CseAndTechnicianEarningsModal";
import {
  useCreateCollaboratorEarnings,
  useGetCollaboratorEarningsById,
  useUpdateCollaboratorEarnings,
} from "../../../hooks/useQueries/useAdmin";
import { useGetCollaboratorRoles } from "../../../hooks/useQueries/useIdentity";
import { useSnackbar } from "notistack";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";

const CseFreelanceEarnings = ({ collaborator }) => {
  const [showAddEarning, setShowAddEarning] = useState(false);
  const [showUpdateEarning, setShowUpdateEarning] = useState(false);
  const [activeEarning, setActiveEarning] = useState({});
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
        diagnosticRate: data?.diagnosticRate,
        warrantyRate: data?.warrantyRate,
        completionRate: data?.completionRate,
        fastTrackRate: data?.fastTrackRate,
      };
    })
    .filter((data) => data?.employmentType?.toLowerCase() === "freelance");

  //----------------------------------------------------------------Modal controller----------------------------------------------------------------
  const addEarningHandler = function () {
    setShowAddEarning(true);
  };

  const updateHandler = (id) => {
    const earnings = userEarnings?.find((earning) => earning.id === id);
    setActiveEarning(earnings);
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
      name: "completionRate",
      label: "Completion Rate",
      options: {
        customBodyRender: (value) => `₦${value?.toLocaleString()}`,
      },
    },
    {
      name: "warrantyRate",
      label: "Warranty Rate",
      options: {
        customBodyRender: (value) => `₦${value?.toLocaleString()}`,
      },
    },
    {
      name: "fastTrackRate",
      label: "FastTrack Rate",
      options: {
        customBodyRender: (value) => `₦${value?.toLocaleString()}`,
      },
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
    setShowAddEarning(false);
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
      valueType: 2,
      role: userRole?.id,
      diagnosticRate: initPayload.diagnosticsRate,
      completionRate: initPayload.completionRate,
      warrantyRate: initPayload.warrantyRate,
      fastTrackRate: initPayload.fastTrackRate,
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
      diagnosticRate: initPayload.diagnosticsRate,
      completionRate: initPayload.completionRate,
      warrantyRate: initPayload.warrantyRate,
      fastTrackRate: initPayload.fastTrackRate,
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
        <AddBtn text="Add Freelance Earnings" action={addEarningHandler} />
      )}

      {showAddEarning && (
        <CseAndTechnicianEarningsModal
          collaborator="CSE"
          isOpen={showAddEarning}
          closeModal={() => setShowAddEarning(false)}
          heading="Add earnings"
          action={submit}
          isLoading={isCreating}
          employment="freelance"
          actionText="Add"
        />
      )}

      {showUpdateEarning && (
        <CseAndTechnicianEarningsModal
          isOpen={showUpdateEarning}
          closeModal={() => setShowUpdateEarning(false)}
          heading="Update earnings"
          action={updateEarning}
          activeFreelanceEarning={activeEarning}
          isLoading={isUpdating}
          actionText="Update"
          employment="freelance"
        />
      )}
    </>
  );
};

export default CseFreelanceEarnings;
