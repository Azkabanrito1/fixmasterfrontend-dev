import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import { useState } from "react";
import ViewResult from "../../../components/globalcomponents/modals/ViewTrainingMCQResult";
import { format } from "date-fns";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import {
  useGetTechnicianFinalMcqResult,
  useGetTechnicianSecondMcqResult,
  useTechnicianFinalDiscussion,
} from "../../../hooks/useQueries/useOnboarding";
import { useSnackbar } from "notistack";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import SetInterviewDate from "../../../components/globalcomponents/modals/SetInterviewDate";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../../components/globalcomponents/DateFilterToolbar";

const StageFour = ({ data }) => {
  const [openReadinessModal, setOpenReadinessModal] = useState(false);
  const [openResultModal, setOpenResultModal] = useState(false);
  const [techId, setTechId] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  //----------------------------data fetching------------------------------------
  const { data: techApplicantsData, isLoading } =
    useGetTechnicianSecondMcqResult();

  const { data: resultData, isLoading: loadingResults } =
    useGetTechnicianFinalMcqResult(techId, {
      enabled: !!techId,
    });

  const [selectedDate, setSelectedDate] = useState("startDate");

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    selectedDate,
    techApplicantsData?.data
  );

  // --------------mutation callbacks--------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeReadiness();
  };
  const onFailed = () => {
    enqueueSnackbar("Meeting Link is required", { variant: "error" });
  };

  //------------------------mutation------------------------
  const { mutate: finalDiscussion, isLoading: isSubmitting } =
    useTechnicianFinalDiscussion(onSuccess, onFailed);
  const openReadiness = (userId) => {
    setOpenReadinessModal(true);
    setTechId(userId);
  };

  const setFinalDiscussion = (pay) => {
    const payload = {
      userId: techId,
      discussionDate: pay.interviewDate,
      interviewLink: pay.interviewLink,
    };

    finalDiscussion(payload);
  };

  const openResult = (userId) => {
    setOpenResultModal(true);
    setTechId(userId);
  };

  const closeReadiness = () => {
    setOpenReadinessModal(false);
  };
  const closeResult = () => {
    setOpenResultModal(false);
  };

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
      name: "startDate",
      label: "Start Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "endDate",
      label: "Completion Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },

    {
      name: "numberOfFoldersToPass",
      label: "Total Folder",
    },
    {
      name: "totalTestPassed",
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
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                firstDate="startDate"
                secondDate="endDate"
              />
            ),
          }}
        />
      )}
      {!isLoading && techApplicantsData?.data?.length === 0 && (
        <p className="text-center">There are no applicants in this stage</p>
      )}

      {openReadinessModal && (
        <SetInterviewDate
          applicantId={techId}
          isOpen={openReadinessModal}
          closeModal={closeReadiness}
          setInterview={setFinalDiscussion}
          isSubmitting={isSubmitting}
          address={"Meeting Link"}
          interviewType={"readiness"}
        />
      )}
      {openResultModal && (
        <ViewResult
          data={resultData?.data}
          isLoading={loadingResults}
          isOpen={openResultModal}
          closeModal={closeResult}
          technicianData={techApplicantsData?.technicianSecondMCQ1}
        />
      )}
    </>
  );
};

export default StageFour;
