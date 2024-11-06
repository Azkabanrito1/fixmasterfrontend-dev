import {
  useCseDiscussionDate,
  useGetCSESecondMcq,
  useGetCseFinalMcqResult,
} from "../../../hooks/useQueries/useOnboarding";
import { useState } from "react";
import { useSnackbar } from "notistack";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import SetInterviewDate from "../../globalcomponents/modals/SetInterviewDate";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../globalcomponents/GlobalTable";
import ViewResult from "../../globalcomponents/modals/ViewTrainingMCQResult";
import { format } from "date-fns";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";

const CSEStage4Table = () => {
  const [showLinkText, setShowLinkText] = useState(null);
  const [openReadinessModal, setOpenReadinessModal] = useState(false);
  const [openResultModal, setOpenResultModal] = useState(false);
  const [activeApplicant, setActiveApplicant] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  // ----------------data fetching------------------------
  const { data: cseSecondMcq, isLoading } = useGetCSESecondMcq();
  const { data: cseSecondMcqResult } = useGetCseFinalMcqResult(
    activeApplicant?.userId,
    {
      enabled: !!activeApplicant?.userId,
    }
  );

  const [selectedDate, setSelectedDate] = useState("startDate");

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    selectedDate,
    cseSecondMcq?.data
  );

  // --------------mutation callbacks--------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeReadiness();
  };
  const onFailed = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  //------------------------mutation------------------------
  const { mutate: finalDiscussion, isLoading: isSubmitting } =
    useCseDiscussionDate(onSuccess, onFailed);

  const setFinalDiscussion = (initPayload) => {
    const payload = {
      cseId: activeApplicant?.userId,
      interviewDate: initPayload.interviewDate,
      interviewLink: initPayload.interviewLink,
    };
    finalDiscussion(payload);
  };
  const getActiveApplicant = (applicantId) =>
    cseSecondMcq?.data?.filter((data) => data.userId === applicantId);

  const openReadiness = (userId) => {
    const applicant = getActiveApplicant(userId);
    setOpenReadinessModal(true);
    setActiveApplicant(applicant[0]);
    setShowLinkText(true);
  };

  const openResult = (userId) => {
    const applicant = getActiveApplicant(userId);
    setActiveApplicant(applicant[0]);
    setOpenResultModal(true);
  };

  const closeReadiness = () => {
    setOpenReadinessModal(false);
  };
  const closeResult = () => {
    setOpenResultModal(false);
  };

  const cseColumns = [
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
      name: "totalTestPassed",
      label: "Total Folder",
    },
    {
      name: "numberOfFoldersToPass",
      label: "Folder Passed",
    },

    {
      name: "userId",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 1,
              name: "Set Interview Date",
              action: () => {
                openReadiness(value);
              },
              disabled: false,
            },
            {
              id: 2,
              name: "View Result",
              action: () => {
                openResult(value);
              },
              disabled: false,
            },
          ];
          return <GlobalTableActions actions={actions} id="id" />;
        },
      },
    },
  ];

  return (
    <div>
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && cseSecondMcq?.data?.length > 0 && (
        <GlobalTable
          columns={cseColumns}
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

      {!isLoading && !cseSecondMcq?.data?.length && (
        <p className="text-center">There are no applicants in this stage</p>
      )}
      {openReadinessModal && (
        <SetInterviewDate
          isOpen={openReadiness}
          closeModal={closeReadiness}
          applicant={activeApplicant}
          setInterview={setFinalDiscussion}
          isSubmitting={isSubmitting}
          isVisible={showLinkText}
          address={"Meeting Link"}
          interviewType={"readiness"}
        />
      )}

      {openResultModal && (
        <ViewResult
          isOpen={openResultModal}
          closeModal={closeResult}
          data={cseSecondMcqResult?.data}
        />
      )}
    </div>
  );
};

export default CSEStage4Table;
