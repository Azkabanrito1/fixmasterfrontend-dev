import { useSnackbar } from "notistack";
import {
  BackBtn,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import {
  UseRatingBonusSetup,
  useGetAllRatingBonusSetUp,
  useUpdateRatingBonusSetup,
} from "../../../../hooks/useQueries/useAdmin";
import { Link, useNavigate } from "react-router-dom";
import { PATH_ADMIN } from "../../../../routes/paths";
import { useState } from "react";
import RatingBonusModal from "./RatingBonusModal";
import GlobalTable from "../../../../components/globalcomponents/GlobalTable";
import GlobalBallBeat from "../../../../components/globalcomponents/GlobalBallBeat";
import { Chip } from "@mui/material";
import GlobalTableActions from "../../../../components/globalcomponents/GlobalTableActions";
import { format, parseISO } from "date-fns";

const RatingBonus = () => {
  const [showAddRatingBonus, setShowAddRatingBonus] = useState(false);
  const [showUpdateRatingBonus, setShowUpdateRatingBonus] = useState(false);
  const [activeRatingBonus, setActiveRatingBonus] = useState({});

  //----------------------------------------------------------------Data featching:----------------------------------------------------------------
  const { data: ratingBonusData, isLoading } = useGetAllRatingBonusSetUp();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowAddRatingBonus(false);
    setShowUpdateRatingBonus(false);
  };

  const onFailure = (response) => {
    enqueueSnackbar(
      JSON.parse(response?.response?.request?.response)?.message,
      {
        variant: "error",
      }
    );
  };
  const { mutate: createRatingBonus, isLoading: isCreating } =
    UseRatingBonusSetup(onSuccess, onFailure);
  const { mutate: updateRatingsBonus, isLoading: isUpdating } =
    useUpdateRatingBonusSetup(onSuccess, onFailure);

  const { enqueueSnackbar } = useSnackbar();

  //----------------------------------------------------------------Modal controller----------------------------------------------------------------
  const shownAddReferralHandler = () => {
    setShowAddRatingBonus(true);
  };

  const updateHandler = (id) => {
    const activeRating = ratingBonusData?.data?.find(
      (rating) => rating.id === id
    );

    setActiveRatingBonus(activeRating);
    setShowUpdateRatingBonus(true);
  };

  // ======================rating Bouns table =====================
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
      name: "roleName",
      label: "Collaborator",
    },
    {
      name: "bonusValue",
      label: "Bonus Value",
      options: {
        customBodyRender: (value, tableMeta) => {
          const role = ratingBonusData?.data[tableMeta.rowIndex]?.role;
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
      name: "bonusType",
      label: "bonusType",
    },
    {
      name: "valueType",
      label: "Value Type",
    },
    {
      name: "createdAt",
      label: "Created At",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      }
      
    },
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

  const submitRatingBonus = (initPayload) => {
    const payload = {
      roleId: initPayload.roleId,
      bonusValue: initPayload.bonusValue,
      bonusType: initPayload.bonusType,
      valueType: initPayload.valueType,
    };
    createRatingBonus(payload);
    // console.log(payload);
  };
  const updateRatingBonus = (initPayload) => {
    const payload = {
      roleId: initPayload.roleId,
      bonusValue: initPayload.bonusValue,
      bonusType: initPayload.bonusType,
      valueType: initPayload.valueType,
      id: activeRatingBonus.id,
      status:initPayload.status,
    };
    updateRatingsBonus(payload);
    // console.log(payload)
  };

  return (
    <>
      <div className="position-relative mb-5 gap-4">
        <BackBtn />
        <PageHeading>Rating Bonus setting</PageHeading>
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
            Create rating bonus
          </Link>
        </div>
      </div>

      {!isLoading && (
        <GlobalTable data={ratingBonusData?.data} columns={columns} />
      )}

      {showAddRatingBonus && (
        <RatingBonusModal
          isOpen={showAddRatingBonus}
          closeModal={() => setShowAddRatingBonus(false)}
          action={submitRatingBonus}
          actionText="Add rating bonus"
          isLoading={isCreating}
          heading="Add rating bonus"
        />
      )}
      {showUpdateRatingBonus && (
        <RatingBonusModal
          isOpen={showUpdateRatingBonus}
          closeModal={() => setShowUpdateRatingBonus(false)}
          action={updateRatingBonus}
          actionText="Update"
          isLoading={isUpdating}
          activeData={activeRatingBonus}
          heading="Update rating "
        />
      )}
    </>
  );
};

export default RatingBonus;
