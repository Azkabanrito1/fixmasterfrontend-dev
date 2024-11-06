import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import { format } from "date-fns";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import {
  useGetCollaboratorRating,
  useGetTechnicianDiscussion,
  useRateApplicantInterview,
} from "../../../hooks/useQueries/useOnboarding";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { capitalizeFirstLetter, username } from "../../../utils/utilityFxns";
import { Chip } from "@mui/material";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../../components/globalcomponents/DateFilterToolbar";
import GradeTechApplicant from "./GradeTechApplicant";

const StageFive = ({ data }) => {
  const [showRating, setShowRating] = useState(false);
  const [activeApplicant, setActiveApplicant] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [rateApplicantModal, setRateApplicantModal] = useState(false);
  const [techApplicantId, setTechApplicantId] = useState("");
  const [ratingsData, setRatingsData] = useState([]);
  const discussionType = "final";
  //----------data fetching----------------
  const { data: technicianDiscussion, isLoading } =
    useGetTechnicianDiscussion(discussionType);

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "interviewDate",
    technicianDiscussion?.data
  );

  const showRatingModal = (id) => {
    const applicant = getActiveApplicant(id);
    setActiveApplicant(applicant[0]);
    setShowRating(true);
    const payload = {
      role: 5,
      type: 1,
    };
    ratingCriteria(payload);
  };
  const closeShowRatingModal = () => {
    setShowRating(false);
  };
  const closeRateApplicant = (userId) => {
    setRateApplicantModal(false);
    setTechApplicantId(userId);
  };

  // control modal behavior
  const getActiveApplicant = (userId) => {
    return technicianDiscussion?.data?.filter(
      (applicant) => applicant.userId === userId
    );
  };

  // --------------mutation callbacks--------------
  const onSuccess = (response) => {
    setRatingsData(response);
  };

  const onFailed = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const onSuccessfullRAting = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    closeShowRatingModal();
  };

  //------------------mutation-------------------

  const { mutate: ratingCriteria, isLoading: loading } =
    useGetCollaboratorRating(onSuccess);

  const { mutate: rateApplicant, isLoading: isGrading } =
    useRateApplicantInterview({
      onSuccess: onSuccessfullRAting,
      onFailed,
      roleId: 5,
    });

  const techColumns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        customBodyRender: (_, meta) => meta.rowIndex + 1,
      },
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "technicianCategory",
      label: "Category",
      options: {
        customBodyRender: (value) => {
          const categories = value?.map((cat) => {
            return cat.categoryName;
          });
          return <span>{categories?.join(", ")}</span>;
        },
      },
    },
    {
      name: "interviewDate",
      label: "Discussion",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },

    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={capitalizeFirstLetter(value)}
            color={
              value?.toLowerCase() === "approved"
                ? "success"
                : value === "pending"
                ? "warning"
                : "error"
            }
          />
        ),
      },
    },
    {
      name: "userId",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 1,
              name: "Grade Applicant",
              action: () => {
                showRatingModal(value);
              },

              disabled: false,
            },
          ];
          return <GlobalTableActions actions={actions} id="id" />;
        },
      },
    },
  ];
  const gradeApplicant = (initpayload) => {
    const payload = {
      role: 5,
      type: 3,
      applicantId: activeApplicant.id,
      additionalComment: "",
      ratings: initpayload.ratings,
      collabUserId: activeApplicant?.userId,
    };
    rateApplicant(payload);
  };
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <GlobalBallBeat loading={isLoading} color="var(--clr-primary)" />
      </div>

      {!isLoading && (
        <GlobalTable
          columns={techColumns}
          data={filteredResults}
          options={{
            elevation: 0,
            filter: data ? false : true,
            search: data ? false : true,
            viewColumns: data ? false : true,
            print: data ? false : true,
            download: data ? false : true,
            selectableRows: "none",
            rowsPerPage: data ? 5 : 20,
            rowsPerPageOptions: [data ? 5 : 20, 50, 100],
            customToolbar: () => (
              <DateFilterToolbar
                dateQueries={dateQueries}
                setDateQueries={setDateQueries}
              />
            ),
          }}
        />
      )}

      {!isLoading && technicianDiscussion?.data?.length === 0 && (
        <p className="text-center">There are no applicants in this stage</p>
      )}
      {showRating && (
        <GradeTechApplicant
          isOpen={showRating}
          closeModal={closeRateApplicant}
          applicantId={techApplicantId}
          criteriaData={ratingsData}
          isLoading={loading}
          gradeApplicant={gradeApplicant}
          isGrading={isGrading}
        />
      )}
    </>
  );
};

export default StageFive;
