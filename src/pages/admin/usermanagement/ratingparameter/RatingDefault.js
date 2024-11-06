import { useSnackbar } from "notistack";
import {
  BackBtn,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import {
  UseRatingBonusSetup,
  UseRatingDefaultSetup,
  useGetAllRatingBonusSetUp,
  useGetAllRatingDefaultSetup,
  useUpdateRatingBonusSetup,
  useUpdateRatingDefaultSetup,
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
import RatingDefaultModal from "./RatingDefaultModal";

const RatingDefault = () => {
  const [showAddRatingDefault, setShowAddRatingdDefault] = useState(false);
  const [showUpdateRatingDefault, setShowUpdateRatingDefault] = useState(false);
  const [activeRatingDefault, setActiveRatingDefault] = useState({});

  //----------------------------------------------------------------Data featching:----------------------------------------------------------------
  const { data: ratingDefaultData, isLoading } = useGetAllRatingDefaultSetup();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowAddRatingdDefault(false);
    setShowUpdateRatingDefault(false);
  };

  const onFailure = (response) => {
    enqueueSnackbar(
      JSON.parse(response?.response?.request?.response)?.message,
      {
        variant: "error",
      }
    );
  };
  const { mutate: createRatingDefault, isLoading: isCreating } =
    UseRatingDefaultSetup(onSuccess, onFailure);
  const { mutate: updateRatingDefault, isLoading: isUpdating } =
    useUpdateRatingDefaultSetup(onSuccess, onFailure);

  const { enqueueSnackbar } = useSnackbar();

  //----------------------------------------------------------------Modal controller----------------------------------------------------------------
  const shownAddReferralHandler = () => {
    setShowAddRatingdDefault(true);
  };

  const updateHandler = (id) => {
    const activeRatingDefault  = ratingDefaultData?.data?.find(
      (rating) => rating.id === id
    );

    setActiveRatingDefault(false);
    setShowUpdateRatingDefault(true);
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
      name: "defaultRating",
      label: "Default Rating",
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
      defaultRating: initPayload.defaultRating,

    };
    createRatingDefault(payload);
    // console.log(payload);
  };
  const updateRatingBonus = (initPayload) => {
    const payload = {
      roleId: initPayload.roleId,
      defaultRating: initPayload.defaultRating,
      
      id: activeRatingDefault.id,
      status:initPayload.status,
    };
    updateRatingDefault(payload);
    // console.log(payload)
  };

  return (
    <>
      <div className="position-relative mb-5 gap-4">
        <BackBtn />
        <PageHeading>Rating Default setting</PageHeading>
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
            Create rating default
          </Link>
        </div>
      </div>

      {!isLoading && (
        <GlobalTable data={ratingDefaultData?.data} columns={columns} />
      )}

      {showAddRatingDefault && (
        <RatingDefaultModal
          isOpen={showAddRatingDefault}
          closeModal={() => setShowAddRatingdDefault(false)}
          action={submitRatingBonus}
          actionText="Add "
          isLoading={isCreating}
          heading="Add ratin Default "
        />
        
      )}
      {showUpdateRatingDefault && (
        <RatingDefaultModal
          isOpen={showUpdateRatingDefault}
          closeModal={() => setShowUpdateRatingDefault(false)}
          action={updateRatingBonus}
          actionText="Update"
          isLoading={isUpdating}
          activeData={activeRatingDefault}
          heading="Update"
        />
      )}
    </>
  );
};

export default RatingDefault;
