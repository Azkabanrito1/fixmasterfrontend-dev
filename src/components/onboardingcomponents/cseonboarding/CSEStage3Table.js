import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../globalcomponents/GlobalTable";
import {
  useGetCSEThirdStageApplicants,
  useGetCSEThirdStageRatingCriteria,
  useGetCollaboratorRating,
  useRateApplicantInterview,
} from "../../../hooks/useQueries/useOnboarding";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useState } from "react";
import { Button } from "@mui/material";
import GradeApplicant from "../../qamastercomponent/techmanagement/modal/GradeApplicant";
import ViewInterviewVideos from "../../franchiseecomponents/csemanagement/modals/ViewInterviewVideos";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";

const CSEStage3Table = () => {
  const [activeApplicant, setActiveApplicant] = useState({});
  const [showGradeApplicant, setShowGradeApplicant] = useState(false);
  const [showWatchInterview, setShowWatchInterview] = useState(false);
  const [ratingsData, setRatingsData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  // =============data fetching =================
  const { data: cseStage3Data, isLoading } = useGetCSEThirdStageApplicants();

  // --------------mutation callbacks--------------
  const onSuccess = (response) => {
    setRatingsData(response);
  };

  const onFailed = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const onSuccessfullRAting = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    closeGradeApplicant();
  };

  const { mutate: ratingCriteria, isLoading: isLoadings } =
    useGetCollaboratorRating(onSuccess);
  const { mutate: rateApplicant, isLoading: isGrading } =
    useRateApplicantInterview({
      onSuccess: onSuccessfullRAting,
      onFailed,
      roleId: 2,
    });

  // console.log(cseStage3Data?.data);
  let stage3Applicants = cseStage3Data?.data;
  stage3Applicants = stage3Applicants?.map((applicant, index) => ({
    ...applicant,
    sn: index + 1,
  }));

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "interviewDate",
    stage3Applicants
  );

  const getActiveApplicant = (applicantId) =>
    cseStage3Data?.data?.filter((applicant) => applicant.id === applicantId);

  // modal controls
  const openGradeApplicant = (id) => {
    const applicant = getActiveApplicant(id);
    setActiveApplicant(applicant?.[0]);
    const payload = {
      role: 6,
      type: 2,
    };
    ratingCriteria(payload);
    setShowGradeApplicant(true);
  };

  const openWatchInterview = (id) => {
    const applicant = getActiveApplicant(id);
    setActiveApplicant(applicant?.at(0));
    setShowWatchInterview(true);
  };
  const closeGradeApplicant = () => {
    setShowGradeApplicant(false);
  };
  const closeWatchInterview = () => {
    setShowWatchInterview(false);
  };

  const columns = [
    { name: "sn", label: "S/N" },
    { name: "name", label: "Name" },
    {
      name: "interviewDate",
      label: "Interview Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "id",
      label: "Video",
      sort: false,
      filter: false,
      searchable: false,
      options: {
        customBodyRender: (value) => (
          <Button onClick={() => openWatchInterview(value)}>View</Button>
        ),
      },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => (
          <GlobalBtn
            onClick={() => openGradeApplicant(value)}
            width="max-content"
            px="1rem"
            py=".6rem"
            fs="1rem"
            fw="400"
          >
            Grade Applicant
          </GlobalBtn>
        ),
      },
    },
  ];

  const gradeApplicant = (initpayload) => {
    const payload = {
      role: 6,
      type: 2,
      applicantId: activeApplicant.id,
      additionalComment: "",
      ratings: initpayload.ratings,
    };
    rateApplicant(payload);
  };

  return (
    <div>
      <GlobalBallBeat loading={isLoading} />
      {!isLoading && stage3Applicants?.length > 0 && (
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
      )}
      {!isLoading && !stage3Applicants?.length && (
        <p className="text-center">There are no applicants in this stage</p>
      )}
      {showGradeApplicant && (
        <GradeApplicant
          isOpen={showGradeApplicant}
          closeModal={closeGradeApplicant}
          criteriaData={ratingsData}
          isLoading={isLoadings}
          gradeApplicant={gradeApplicant}
          isGrading={isGrading}
        />
      )}
      :
      {showWatchInterview && (
        <ViewInterviewVideos
          isOpen={showWatchInterview}
          closeModal={closeWatchInterview}
          applicant={activeApplicant?.cseId}
        />
      )}
    </div>
  );
};

export default CSEStage3Table;
