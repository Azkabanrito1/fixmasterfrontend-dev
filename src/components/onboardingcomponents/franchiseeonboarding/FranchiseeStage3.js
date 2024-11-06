import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalTable from "../../globalcomponents/GlobalTable";
import {
  useFranchiseeFinalDiscussionDate,
  useGetQaAndFranchiseeMcq,
  useGetQaAndFranchiseeMcqByUserId,
} from "../../../hooks/useQueries/useOnboarding";
import SetInterviewDate from "../../globalcomponents/modals/SetInterviewDate";
import { useState } from "react";
import { useSnackbar } from "notistack";
import ViewResult from "../../globalcomponents/modals/ViewTrainingMCQResult";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import moment from "moment";
import { format } from "date-fns";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";

const FranchiseeStage3 = () => {
  const [showReadinessModal, setShowReadinessModal] = useState(false);
  const [activeApplicant, setActiveApplicant] = useState({});
  const [openResultModal, setopenResultModal] = useState();

  const { enqueueSnackbar } = useSnackbar();

  //---------------------------data fetching----------------------------------------------------
  const { data: mcqData, isLoading } = useGetQaAndFranchiseeMcq(1);

  const { data: mcqResultData, isLoading: loadingResults } =
    useGetQaAndFranchiseeMcqByUserId({
      userId: activeApplicant?.userId,
      roleId: 1,
      options: {
        enabled: !!activeApplicant?.userId,
      },
    });

  const [selectedDate, setSelectedDate] = useState("startDate");

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    selectedDate,
    mcqData?.data
  );

  const getActiveApplicants = function (applicantId) {
    return mcqData?.data?.filter(
      (applicant) => applicant.userId === applicantId
    );
  };

  const showReadiness = function (id) {
    const applicant = getActiveApplicants(id);
    setActiveApplicant(applicant[0]);
    setShowReadinessModal(true);
  };
  const showResultHandler = function (id) {
    const applicant = getActiveApplicants(id);
    setActiveApplicant(applicant[0]);
    setopenResultModal(true);
  };

  const closeReadiness = function () {
    setShowReadinessModal(false);
  };

  const closeResultHandler = function () {
    setopenResultModal(false);
  };

  // ----------------------------------------mutation callbacks fns --------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    closeReadiness();
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: setDiscussionDate, isLoading: isSetting } =
    useFranchiseeFinalDiscussionDate(onSuccess, onFailure);

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableRow) => tableRow.rowIndex + 1,
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
      label: "Exams Passed",
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
              action: () => showReadiness(value),
            },
            {
              id: 1,
              name: "View Result",
              action: () => showResultHandler(value),
            },
          ];
          return <GlobalTableActions actions={actions} id="userId" />;
        },
      },
    },
  ];

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
      <div style={{ textAlign: "center" }}>
        <GlobalBallBeat loading={isLoading} color="var(--clr-primary)" />
      </div>

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
      {showReadinessModal && (
        <SetInterviewDate
          isOpen={showReadinessModal}
          closeModal={closeReadiness}
          setInterview={acceptApplicants}
          address={"Location Address"}
          applicant={activeApplicant}
          isSubmitting={isSetting}
          interviewType={"readiness"}
        />
      )}

      {openResultModal && (
        <ViewResult
          data={mcqResultData?.data}
          isOpen={openResultModal}
          closeModal={closeResultHandler}
          isLoading={loadingResults}
        />
      )}
    </>
  );
};
export default FranchiseeStage3;
