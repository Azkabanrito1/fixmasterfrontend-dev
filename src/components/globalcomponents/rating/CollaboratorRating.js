import { useState } from "react";
import GlobalTable from "../GlobalTable";
import GlobalTableActions from "../GlobalTableActions";
import { PageHeading } from "../Utilities";
import RatingInput from "./RatingInput";
import {
  useCreateCollaboratorRating,
  useGetCollboratorRating,
} from "../../../hooks/useQueries/useJobs";
import { format } from "date-fns";
import GlobalBallBeat from "../GlobalBallBeat";
import { useSnackbar } from "notistack";
import DateFilterToolbar from "../DateFilterToolbar";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";

const CollaboratorRating = ({ collaborator }) => {
  const [showRatingInput, setShowRatingInput] = useState(false);
  const [activeRater, setActiveRater] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  //-----------------------------------------------------data fetching-----------------------------------------------------------------
  const { data: ratingData, isLoading } = useGetCollboratorRating();

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "dateCreated",
    ratingData?.data
  );

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowRatingInput(false);
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: rateCollaborator, isLoading: isCreating } =
    useCreateCollaboratorRating(onSuccess, onFailure);

  const getActiveRater = (id) => {
    return ratingData?.data?.filter((rating) => rating.id === id);
  };

  const showRatingHandler = (id) => {
    const rating = getActiveRater(id);
    setActiveRater(rating[0]);
    setShowRatingInput(true);
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
      name: "rateeName",
      label: "Ratee Name",
    },
    {
      name: "fixPhase",
      label: "Phase",
    },
    {
      name: "roleName",
      label: "Role",
    },
    {
      name: "dateCreated",
      label: "Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd/MM/yyyy"),
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
              name: "Collaborator rating",
              action: () => showRatingHandler(value),
            },
          ];
          return <GlobalTableActions actions={actions} id={"id"} />;
        },
      },
    },
  ];

  const submitRating = (initPayload) => {
    const payload = {
      comment: initPayload.comment,
      ratedValue: initPayload.ratedValue,
      rateSource: activeRater.fixPhase,
      retee: activeRater.rateeId,
    };
    rateCollaborator(payload);
  };
  return (
    <>
      <PageHeading>Feedback and Rating</PageHeading>

      <GlobalBallBeat loading={isLoading} />

      <GlobalTable
        columns={columns}
        data={filteredResults}
        options={{
          customToolbar: () => (
            <DateFilterToolbar
              dateQueries={dateQueries}
              setDateQueries={setDateQueries}
            />
          ),
        }}
      />
      {showRatingInput && (
        <RatingInput
          isOpen={showRatingInput}
          closeModal={() => setShowRatingInput(false)}
          data={activeRater}
          action={submitRating}
          isCreating={isCreating}
        />
      )}
    </>
  );
};

export default CollaboratorRating;
