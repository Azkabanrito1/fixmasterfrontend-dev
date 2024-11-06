import { useSnackbar } from "notistack";
import NewLoyaltyForm from "../../../components/admincomponents/loyalty/NewLoyaltyForm";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import {
  useUpdateReferralSetup,
  UseCreateReferralSetup,
  useGetAllreferralSetting,
} from "../../../hooks/useQueries/useAdmin";
import { Link, useNavigate } from "react-router-dom";
import { PATH_ADMIN } from "../../../routes/paths";
import { useState } from "react";
import ReferralModal from "./ReferralModal";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import { Chip } from "@mui/material";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import { format, parseISO } from "date-fns";

const CreateReferrals = () => {
  const [showAddReferral, setShowAddReferral] = useState(false);
  const [showUpdateReferral, setShowUpdateReferral] = useState(false);
  const [activeReferral, setActiveReferral] = useState({});

  //----------------------------------------------------------------Data featching:----------------------------------------------------------------
  const { data: referralData, isLoading } = useGetAllreferralSetting();

  // const { data: rolesData } = useGetCollaboratorRoles();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowAddReferral(false);
    setShowUpdateReferral(false);
  };

  const onFailure = (response) => {
    enqueueSnackbar(
      JSON.parse(response?.response?.request?.response)?.message,
      {
        variant: "error",
      }
    );
  };
  const { mutate: createEarningReferral, isLoading: isCreating } =
    UseCreateReferralSetup(onSuccess, onFailure);
  const { mutate: updateEarningReferral, isLoading: isUpdating } =
    useUpdateReferralSetup(onSuccess, onFailure);

  const { enqueueSnackbar } = useSnackbar();

  //----------------------------------------------------------------Modal controller----------------------------------------------------------------
  const shownAddReferralHandler = () => {
    setShowAddReferral(true);
  };

  const updateHandler = (id) => {
    const activeEarning = referralData?.data?.find(
      (earning) => earning.id === id
    );

    setActiveReferral(activeEarning);
    setShowUpdateReferral(true);
  };

  // ======================referral table =====================
  // console.log(roleData?.data);
  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, value) => value.rowIndex + 1,
      },
    },

    {
      name: "role",
      label: "Collaborator",
    },
    {
      name: "earningValue",
      label: "Earning Value",
      options: {
        customBodyRender: (value, tableMeta) => {
          const role = referralData?.data[tableMeta.rowIndex]?.role;
          const symbol = role?.toLowerCase() === "customer" ? "%" : "₦";
          const renderEarnings =
            role?.toLowerCase() === "customer"
              ? `${value}${symbol}`
              : `${symbol}${value}`;
          return <div>{renderEarnings}</div>;
        },
      },
    },
    {
      name: "earningType",
      label: "Earning Type",
    },
    // {
    //   name: "createdAt",
    //   label: "Created At",
    //   options: {
    //     customBodyRender: (value) => format(parseISO(value), "dd/MM/yyyy"),
    //   },
    // },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value?.toLowerCase() === "active" ? "Active" : "Inactive"}
            color={value?.toLowerCase() === "active" ? "success" : "error"}
          />
        ),
      },
    },
    {
      name: "id",

      label: "Actions",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "Edit",
              action: () => {
                updateHandler(value);
              },
              disabled: false,
            },
          ];
          return <GlobalTableActions actions={actions} id="id" />;
        },
      },
    },
  ];

  const submitReferralEarnings = (initPayload) => {
    const payload = {
      roleId: initPayload.roleId,
      earningValue: initPayload.earningValue,
      earningType: initPayload.earningType,
    };
    createEarningReferral(payload);
  };
  const updateReferralEarnings = (initPayload) => {
    const payload = {
      earningValue: initPayload.earningValue,
      id: activeReferral.id,
      status: initPayload.status,
      earningType: initPayload.earningType,
    };
    updateEarningReferral(payload);
  };

  return (
    <>
      <div className="position-relative mb-5 gap-4">
        <BackBtn />
        <PageHeading>Referrals earning setting</PageHeading>
        <GlobalBallBeat loading={isLoading} />
        <div>
          <Link
            onClick={shownAddReferralHandler}
            className="position-absolute top-0 end-0 btn"
            style={{
              backgroundColor: "var(--clr-primary)",
              color: "#fff ",
            }}
            width="max-content"
            px="2em"
          >
            Create referral earning
          </Link>
        </div>
      </div>

      {!isLoading && (
        <GlobalTable data={referralData?.data} columns={columns} />
      )}

      {showAddReferral && (
        <ReferralModal
          isOpen={showAddReferral}
          closeModal={() => setShowAddReferral(false)}
          action={submitReferralEarnings}
          actionText="Add referral earning"
          isLoading={isCreating}
          heading="Add referral earnings"
        />
      )}
      {showUpdateReferral && (
        <ReferralModal
          isOpen={showUpdateReferral}
          closeModal={() => setShowUpdateReferral(false)}
          action={updateReferralEarnings}
          actionText="Update"
          isLoading={isUpdating}
          activeData={activeReferral}
          heading="Update referral earnings"
        />
      )}
    </>
  );
};

export default CreateReferrals;
