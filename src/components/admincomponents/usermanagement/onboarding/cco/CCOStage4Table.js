import {
  useGetCCOSecondMcq,
  useGetCCOFinalMcqResult,
  useSetCCODiscussionDate,
} from "../../../../../hooks/useQueries/useOnboarding";
import { useState } from "react";
import { useSnackbar } from "notistack";
import SetInterviewDate from "../../../../globalcomponents/modals/SetInterviewDate";
import ViewResult from "../../../../globalcomponents/modals/ViewTrainingMCQResult";
import GlobalTable from "../../../../globalcomponents/GlobalTable";
import GlobalBallBeat from "../../../../globalcomponents/GlobalBallBeat";
import GlobalTableActions from "../../../../globalcomponents/GlobalTableActions";
import { format } from "date-fns";
import useDateFilter from "../../../../../hooks/useDateFilter";
import useDateQueries from "../../../../../hooks/useDateQueries";
import DateFilterToolbar from "../../../../globalcomponents/DateFilterToolbar";

const CCOStage4Table = () => {
  const [showLinkText, setShowLinkText] = useState(null);
  const [openReadinessModal, setOpenReadinessModal] = useState(false);
  const [openResultModal, setOpenResultModal] = useState(false);
  const [activeApplicant, setActiveApplicant] = useState({});
  const [ccoId, setCcoId] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  // ----------------data fetching------------------------
  const { data: ccoSecondMcq, isLoading } = useGetCCOSecondMcq();
  const { data: ccoSecondMcqResult } = useGetCCOFinalMcqResult(ccoId, {
    enabled: !!ccoId,
  });

  const [selectedDate, setSelectedDate] = useState("startDate");

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    selectedDate,
    ccoSecondMcq?.data
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
    useSetCCODiscussionDate(onSuccess, onFailed);

  const getActiveApplication = (id) =>
    ccoSecondMcq.data?.filter((applicant) => applicant.userId === id);

  const setFinalDiscussion = (initPayload) => {
    const payload = {
      userId: ccoId,
      discussionDate: initPayload.interviewDate,
      interviewLink: initPayload.interviewLink,
    };
    finalDiscussion(payload);
  };

  const openReadiness = (userId) => {
    setOpenReadinessModal(true);
    const applicant = getActiveApplication(userId);
    setActiveApplicant(applicant[0]);
    setCcoId(userId);
    setShowLinkText(true);
  };

  const openResult = (userId) => {
    setOpenResultModal(true);
    setCcoId(userId);
  };

  const closeReadiness = () => {
    setOpenReadinessModal(false);
  };
  const closeResult = () => {
    setOpenResultModal(false);
  };

  const columns = [
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

      {!isLoading && ccoSecondMcq?.data?.length > 0 && (
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

      {!isLoading && !ccoSecondMcq?.data?.length && (
        <p className="text-center">There are no applicants in this stage</p>
      )}
      {openReadinessModal && (
        <SetInterviewDate
          isOpen={openReadiness}
          closeModal={closeReadiness}
          applicantId={ccoId}
          setInterview={setFinalDiscussion}
          isSubmitting={isSubmitting}
          isVisible={showLinkText}
          applicant={activeApplicant}
          address={`Interview Link`}
          interviewType="readiness"
        />
      )}

      {openResultModal && (
        <ViewResult
          isOpen={openResultModal}
          closeModal={closeResult}
          data={ccoSecondMcqResult?.data}
        />
      )}
    </div>
  );
};

export default CCOStage4Table;
