import { useState } from "react";
import { Button } from "@mui/material";
import {
  useGetCCOThirdStageApplicants,
  useGetCollaboratorRating,
  useGradeCCoApplicant,
  useRateApplicantInterview,
} from "../../../../../hooks/useQueries/useOnboarding";
import GlobalBtn from "../../../../globalcomponents/GlobalBtn";
import GlobalBallBeat from "../../../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../../../globalcomponents/GlobalTable";
import ViewInterviewVideos from "../../../../franchiseecomponents/csemanagement/modals/ViewInterviewVideos";
import GradeTechApplicant from "../../../../../pages/qamaster/techmanagement/GradeTechApplicant";
import { useSnackbar } from "notistack";
import { format } from "date-fns";
import useDateQueries from "../../../../../hooks/useDateQueries";
import useDateFilter from "../../../../../hooks/useDateFilter";
import DateFilterToolbar from "../../../../globalcomponents/DateFilterToolbar";

const CCOStage3Table = () => {
  const [activeApplicant, setActiveApplicant] = useState({});
  const [showGradeApplicant, setShowGradeApplicant] = useState(false);
  const [showWatchInterview, setShowWatchInterview] = useState(false);
  const [ratingsData, setRatingsData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  // =============data fetching =================
  const { data: ccoStage3Data, isLoading } = useGetCCOThirdStageApplicants();

  const applicantData = ccoStage3Data?.data?.map((data) => {
    return {
      name: `${data.firstName} ${data.lastName}`,
      ...data,
    };
  });

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(dateQueries, "userDate", applicantData);

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
  //------------------------mutation------------------------
  const { mutate: ratingCriteria } = useGetCollaboratorRating(onSuccess);

  const { mutate: rateApplicant, isLoading: isGrading } =
    useRateApplicantInterview({
      onSuccess: onSuccessfullRAting,
      onFailed,
      roleId: 2,
    });

  let stage3Applicants = ccoStage3Data?.data;
  stage3Applicants = stage3Applicants?.map((applicant, index) => ({
    ...applicant,
    sn: index + 1,
  }));

  // get active application
  const getActiveApplication = (id) =>
    stage3Applicants?.filter((applicant) => applicant.id === id);

  // modal controls
  const openGradeApplicant = (id) => {
    const applicant = getActiveApplication(id);
    setActiveApplicant(applicant[0]);
    setShowGradeApplicant(true);
    const payload = {
      role: 4,
      type: 2,
    };
    ratingCriteria(payload);
  };
  const openWatchInterview = (id) => {
    const applicant = getActiveApplication(id);
    setActiveApplicant(applicant[0]);
    setShowWatchInterview(true);
  };
  const closeGradeApplicant = () => {
    setActiveApplicant(null);
    setShowGradeApplicant(false);
  };
  const closeWatchInterview = () => {
    setActiveApplicant(null);
    setShowWatchInterview(false);
  };

  const columns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        customBodyRender: (_, index) => index.rowIndex + 1,
      },
    },
    { name: "name", label: "Name" },
    {
      name: "userDate",
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
      role: 4,
      type: 2,
      applicantId: activeApplicant?.id,
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

      {!isLoading && !applicantData?.length && (
        <p className="text-center">There are no applicants in this stage</p>
      )}

      {showGradeApplicant && (
        <GradeTechApplicant
          isOpen={showGradeApplicant}
          closeModal={closeGradeApplicant}
          criteriaData={ratingsData}
          gradeApplicant={gradeApplicant}
          isGrading={isGrading}
        />
      )}

      {showWatchInterview && (
        <ViewInterviewVideos
          isOpen={showWatchInterview}
          closeModal={closeWatchInterview}
          applicant={activeApplicant?.userId}
        />
      )}
    </div>
  );
};

export default CCOStage3Table;
