import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalTable from "../../globalcomponents/GlobalTable";
import GradeTechApplicant from "../../../pages/qamaster/techmanagement/GradeTechApplicant";
import { useState } from "react";
import {
  useGetCollaboratorRating,
  useGetFranchiseeAndQaStageTwo,
  useRateApplicantInterview,
} from "../../../hooks/useQueries/useOnboarding";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { useSnackbar } from "notistack";
import { format } from "date-fns";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";

const FranchiseeStage2 = () => {
  const [showRating, setShowRating] = useState(false);
  const [activeApplicant, setActiveApplicant] = useState({});
  const [ratingsData, setRatingsData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  //-------------------------data fetching-------------------------
  const { data: discussionData, isLoading } = useGetFranchiseeAndQaStageTwo(1);

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "interviewDate",
    discussionData?.data
  );

  const onSuccess = (response) => {
    setRatingsData(response);
  };
  const onSuccessfullRAting = (response) => {
    enqueueSnackbar(response.data, {
      variant: "success",
    });
    closeShowRatingModal();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: ratingCriteria } = useGetCollaboratorRating(onSuccess);
  const { mutate: rateApplicant } = useRateApplicantInterview({
    onSuccess: onSuccessfullRAting,
    onFailed: onFailure,
    roleId: 1,
  });

  const getActiveApplicant = (id) =>
    discussionData?.data.filter((applicant) => applicant.id === id);

  const showRatingModal = (id) => {
    const applicant = getActiveApplicant(id);
    setActiveApplicant(applicant[0]);
    setShowRating(true);
    const payload = {
      role: 1,
      type: 2,
    };
    ratingCriteria(payload);
  };

  const closeShowRatingModal = (id) => {
    setShowRating(false);
  };

  const columns = [
    {
      name: "s/n",
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
      name: "territoryName",
      label: "Territory",
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
          return <GlobalTableActions actions={actions} id="applicant" />;
        },
      },
    },
  ];
  const gradeApplicant = (initpayload) => {
    const payload = {
      role: 1,
      type: 1,
      applicantId: activeApplicant.id,
      additionalComment: "",
      ratings: initpayload.ratings,
    };
    rateApplicant(payload);
  };
  return (
    <>
      <div className="text-align-center">
        <GlobalBallBeat loading={isLoading} />
      </div>
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
        />
      )}
    </>
  );
};
export default FranchiseeStage2;
