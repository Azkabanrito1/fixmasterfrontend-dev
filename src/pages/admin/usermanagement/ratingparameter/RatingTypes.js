import React, { useState } from "react";
import GlobalTableActions from "../../../../components/globalcomponents/GlobalTableActions";
import {
  useCreateRatingType,
  useGetCollaboratorRatingType,
  useUpdateRatingType,
} from "../../../../hooks/useQueries/useAdmin";
import { useGetCollaboratorRoles } from "../../../../hooks/useQueries/useIdentity";
import { useSnackbar } from "notistack";
import GlobalBallBeat from "../../../../components/globalcomponents/GlobalBallBeat";
import GlobalTable from "../../../../components/globalcomponents/GlobalTable";
import AddUserInfo from "../ratingparameters/AddUserInfo";
import { Chip } from "@mui/material";
import {
  BackBtn,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const RatingTypes = () => {
  const [showRating, setShowRating] = useState();
  const [editRating, setEditRating] = useState(false);
  // const [deleteRating, setDeleteRating] = useState(false);
  const [activeRating, setActiveRating] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  //------------------------------------data fetching----------------------------------------------------
  const { data: ratingData, isLoading } = useGetCollaboratorRatingType();

  const { data: rolesData } = useGetCollaboratorRoles();
  const role = rolesData?.data?.filter((item) => {
    return item?.name === "";
  });

  //------------------------------------------------------mutate & mutate fn----------------------------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowRating(false);
    setEditRating(false);
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: addRatingParam, isLoading: isCreating } = useCreateRatingType(
    onSuccess,
    onFailure
  );
  const { mutate: updateRatingType, isLoading: isUpdating } =
    useUpdateRatingType(onSuccess, onFailure);

  const getActiveRating = (id) =>
    ratingData?.data.filter((rating) => rating.id === id);

  const showRatingHandler = (id) => {
    setShowRating(true);
  };
  const editRatingHandler = (id) => {
    const rating = getActiveRating(id);
    setActiveRating(rating[0]);
    setEditRating(true);
  };
  // const deleteRatingHandler = (id) => {
  //   const rating = getActiveRating(id);
  //   setActiveRating(rating[0]);
  //   setDeleteRating(true);
  // };

  const addRatingParams = (initPayload) => {
    const payload = {
      description: initPayload.name,
      indicator: +initPayload.indicator,
      roleId: initPayload.role,
    };
    addRatingParam(payload);
  };
  const editRatings = (initPayload) => {
    const payload = {
      description: initPayload.name,
      indicator: +initPayload.indicator,
      id: activeRating.id,
      status: initPayload.status,
      roleId: initPayload.role,
    };
    updateRatingType(payload);
  };

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, index) => index.rowIndex + 1,
      },
    },
    {
      name: "roleName",
      label: "Collaborator",
    },
    {
      name: "description",
      label: "Descriptions",
    },
    {
      name: "indicator",
      label: "Indicator",
    },
    {
      name: "createdAt",
      label: "Date Created",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <Chip
              label={value?.toLowerCase() === "active" ? "Active" : "Inactive"}
              color={value?.toLowerCase() === "active" ? "success" : "warning"}
            />
          );
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
              id: 1,
              name: "Edit rating",
              action: () => editRatingHandler(value),
            },
          ];
          return <GlobalTableActions actions={actions} id="id" />;
        },
      },
    },
  ];
  return (
    <>
      <div className="position-relative mb-5 gap-4">
        <BackBtn />
        <PageHeading>Rating type</PageHeading>
        <div>
          <Link
            onClick={showRatingHandler}
            className="position-absolute top-0 end-0 btn"
            style={{
              backgroundColor: "var(--clr-primary)",
              color: "#fff ",
            }}
            width="max-content"
            px="2em"
          >
            Create rating Type
          </Link>
        </div>
      </div>
      <GlobalBallBeat loading={isLoading} />

      <GlobalTable columns={columns} data={ratingData?.data} />

      {showRating && (
        <AddUserInfo
          isOpen={showRating}
          closeModal={() => setShowRating(false)}
          addRatings={addRatingParams}
          isCreating={isCreating}
          headingText="Add rating type"
        />
      )}
      {editRating && (
        <AddUserInfo
          isOpen={editRating}
          closeModal={() => setEditRating(false)}
          addRatings={addRatingParams}
          isCreating={isUpdating}
          initRating={activeRating}
          editRating={editRatings}
          headingText="Add update rating type"
        />
      )}
      {/* {deleteRating && (
        <ConfirmDeleteModal
          actionText={"Delete"}
          open={deleteRating}
          close={() => setDeleteRating(false)}
          onDelete={() => console.log(activeRating?.id)}
          labelText={"Delete Rating Parameter?"}
          pText={"Are you sure you want to delete this rating parameter?"}
          //   isLoading={isDeleting}
        />
      )} */}
    </>
  );
};

export default RatingTypes;
