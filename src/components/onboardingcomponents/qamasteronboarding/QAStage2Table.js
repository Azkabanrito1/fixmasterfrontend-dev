import { useSnackbar } from "notistack";
import {
  useGetCollaboratorRating,
  useGetFranchiseeAndQaStageTwo,
  useRateApplicantInterview,
} from "../../../hooks/useQueries/useOnboarding";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import { useState } from "react";
import GradeTechApplicant from "../../../pages/qamaster/techmanagement/GradeTechApplicant";
import { format } from "date-fns";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";

const QAStage2Table = () => {
  const [showRating, setShowRating] = useState(false);
  const [activeApplicant, setActiveApplicant] = useState({});
  const [ratingsData, setRatingsData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  // ----------------data fetching------------------------
  const { data: discussionData, isLoading } = useGetFranchiseeAndQaStageTwo(2);

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "interviewDate",
    discussionData?.data
  );

  // --------------mutation callbacks--------------
  const onSuccess = (response) => {
    setRatingsData(response);
  };

  const onFailed = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const onSuccessfullRAting = (response) => {
    enqueueSnackbar(response.data, {
      variant: "success",
    });
    closeShowRatingModal();
  };
  //------------------------mutation------------------------
  const { mutate: ratingCriteria, isLoading: loadingRatingData } =
    useGetCollaboratorRating(onSuccess);

  const { mutate: rateApplicant, isLoading: isGrading } =
    useRateApplicantInterview({
      onSuccess: onSuccessfullRAting,
      onFailed,
      roleId: 2,
    });
  const getActiveApplicant = (id) =>
    discussionData?.data.filter((data) => data.id === id);

  const showRatingModal = (id) => {
    const applicant = getActiveApplicant(id);
    setActiveApplicant(applicant[0]);
    setShowRating(true);
    const payload = {
      role: 2,
      type: 2,
    };
    ratingCriteria(payload);
  };

  const closeShowRatingModal = () => {
    setShowRating(false);
  };

  const columns = [
    {
      name: "s/name",
      label: "S/N",
      options: {
        customBodyRender: (_, table) => table.rowIndex + 1,
      },
    },
    {
      name: "name",
      label: "Name",
    },

    {
      name: "interviewDate",
      label: "Interview Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "interviewTime",
      label: "Interview Time",
    },
    {
      name: "id",
      label: "Action ",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 1,
              name: "Grade Applicant",
              action: () => showRatingModal(value),
            },
          ];
          return <GlobalTableActions actions={actions} id="id" />;
        },
      },
    },
  ];

  const gradeApplicant = (initpayload) => {
    const payload = {
      role: 2,
      type: 1,
      applicantId: activeApplicant.id,
      additionalComment: "",
      ratings: initpayload.ratings,
    };
    rateApplicant(payload);
  };

  return (
    <>
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

      {showRating && (
        <GradeTechApplicant
          isOpen={showRating}
          closeModal={closeShowRatingModal}
          criteriaData={ratingsData}
          gradeApplicant={gradeApplicant}
          isLoading={loadingRatingData}
          isGrading={isGrading}
        />
      )}
    </>
  );
};
export default QAStage2Table;
