import { useState } from "react";
import {
  useGetQaAndFranchiseeMcq,
  useGetQaAndFranchiseeMcqByUserId,
  useQaFinalDiscussionDate,
} from "../../../hooks/useQueries/useOnboarding";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import { useSnackbar } from "notistack";
import { format } from "date-fns";
import SetInterviewDate from "../../globalcomponents/modals/SetInterviewDate";
import ViewResult from "../../globalcomponents/modals/ViewTrainingMCQResult";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";

const QAStage3Table = () => {
  const [activeApplicant, setActiveApplicant] = useState({});
  const [showReadiness, setShowReadiness] = useState(false);
  const [openResult, setOenResult] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  //---------------------------data fetching----------------------------------------------------
  const { data: mcqData, isLoading } = useGetQaAndFranchiseeMcq(2);

  const [selectedDate, setSelectedDate] = useState("startDate");

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    selectedDate,
    mcqData?.data
  );

  const { data: mcqResultData, isLoading: loadingResults } =
    useGetQaAndFranchiseeMcqByUserId({
      roleId: 2,
      userId: activeApplicant?.userId,
    });

  const getActiveApplicant = (applicantId) =>
    mcqData?.data?.filter((data) => data.userId === applicantId);

  const openReadinessModal = (value) => {
    const applicant = getActiveApplicant(value);
    setActiveApplicant(applicant[0]);
    setShowReadiness(true);
  };

  const closeReadinessModal = () => {
    setShowReadiness(false);
  };

  const openResultModal = (id) => {
    let applicant = mcqData?.data.filter((data) => data.userId === id);
    setActiveApplicant(applicant[0]);
    setOenResult(true);
  };
  const closeResultModal = () => {
    setOenResult(false);
  };

  // ----------------------------------------mutation callbacks fns --------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    closeReadinessModal();
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: setDiscussionDate, isLoading: isSetting } =
    useQaFinalDiscussionDate(onSuccess, onFailure);

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, index) => index.rowIndex + 1,
      },
    },

    {
      name: "name",
      label: "Name",
    },

    {
      name: "startDate",
      label: "Start Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "endDate",
      label: "End Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "numberOfFoldersToPass",
      label: "Exams Required",
    },
    {
      name: "totalTestPassed",
      label: "Exam Passed",
    },
    {
      name: "userId",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "Confirm Readiness",
              action: () => openReadinessModal(value),
              disabled: false,
            },
            {
              id: 1,
              name: "View Result",
              action: () => openResultModal(value),
              disabled: false,
            },
          ];
          return <GlobalTableActions actions={actions} id="userId" />;
        },
      },
    },
  ];

  // console.log(mcqData);

  const acceptApplicants = function (initialPayload) {
    const payload = {
      userId: activeApplicant.userId,
      discussionDate: initialPayload.interviewDate,
      interviewLink: initialPayload.interviewLink,
    };
    setDiscussionDate(payload);
  };

  return (
    <>
      <GlobalBallBeat loading={isLoading} style={{ textAlign: "center" }} />

      {!isLoading && (
        <GlobalTable
          columns={columns}
          data={filteredResults}
          options={{
            customToolbar: () => (
              <DateFilterToolbar
                dateQueries={dateQueries}
                setDateQueries={setDateQueries}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                firstDate="startDate"
                secondDate="endDate"
              />
            ),
          }}
        />
      )}

      {showReadiness && (
        <SetInterviewDate
          isOpen={showReadiness}
          closeModal={closeReadinessModal}
          setInterview={acceptApplicants}
          readText={true}
          address={"Meeting Link"}
          applicant={activeApplicant}
          isSubmitting={isSetting}
          interviewType={"readiness"}
        />
      )}
      {openResult && (
        <ViewResult
          data={mcqResultData?.data}
          isLoading={loadingResults}
          isOpen={openResult}
          closeModal={closeResultModal}
        />
      )}
    </>
  );
};
export default QAStage3Table;
