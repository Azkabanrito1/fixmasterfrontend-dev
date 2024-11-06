import { Chip } from "@mui/material";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useGetCollaboratorRoles } from "../../../hooks/useQueries/useIdentity";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import {
  GetAllreferralSetting,
  UseCreateReferralSetup,
} from "../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { useState } from "react";
import ReferralModal from "./ReferralModal";

// import createEarningReferral  from "../../../hooks/useQueries/useAdmin";

const ReferralForm = () => {
  const [showAddReferral, setShowAddReferral] = useState(false);

  //----------------------------------------------------------------Modal controller----------------------------------------------------------------
  const shownAddReferralHandler = () => {
    setShowAddReferral(true);
  };

  //----------------------------------------------------------------Data featching:----------------------------------------------------------------
  const { data: referralData, isLoading } = GetAllreferralSetting();

  // const { data: rolesData } = useGetCollaboratorRoles();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowAddReferral(false);
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: createEarningReferral, isLoading: isCreating } =
    UseCreateReferralSetup(onSuccess, onFailure);

  const { enqueueSnackbar } = useSnackbar();

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
      label: "Collaborator Type",
    },
    {
      name: "earningValue",
      label: "Referral Earning",
    },
    {
      name: "createdAt",
      label: "Created At",
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value ? "Active" : ""}
            color={value ? "success" : "error"}
          />
        ),
      },
    },
    {
      name: "loyaltyId",

      label: "Actions",
      width: 80,
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "View Info",
              action: () => {
                console.log(value);
              },
              disabled: false,
            },
          ];
          return <GlobalTableActions actions={actions} id="loyalty" />;
        },
      },
    },
  ];

  const submitReferralEarnings = (initPayload) => {
    const payload = {
      roleId: initPayload.roleId,
      earningValues: initPayload.earningValue,
    };
    createEarningReferral(payload);
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
        />
      )}
    </>
  );
};

export default ReferralForm;
