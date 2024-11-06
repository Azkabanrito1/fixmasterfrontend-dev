import { useSnackbar } from "notistack";
import { useState } from "react";
import {
  useGetTechnicianApplicantStageTwo,
  useSetTechnicianInterview,
} from "../../../hooks/useQueries/useOnboarding";
import { format } from "date-fns";
import { Chip } from "@mui/material";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../globalcomponents/GlobalTable";
import SetInterviewDate from "../../globalcomponents/modals/SetInterviewDate";

const TechStage2 = () => {
  const [showOpenDiscussion, setShowOpenDiscussion] = useState(false);
  const [techApplicantId, setTechApplicantId] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const openDiscussion = (userId) => {
    setShowOpenDiscussion(true);
    setTechApplicantId(userId);
  };
  const closeDiscussion = (userId) => {
    setTechApplicantId(userId);
    setShowOpenDiscussion(false);
  };
  //--------------fetching data--------------------
  const { data: applicantMcqResult, isLoading } =
    useGetTechnicianApplicantStageTwo(techApplicantId, {
      enabled: !!techApplicantId,
    });

  // --------------mutation callbacks--------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeDiscussion();
  };
  const onFailed = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  //---------mutation-------------
  const { mutate: setDiscussionDate, isLoading: isSubmitting } =
    useSetTechnicianInterview(onSuccess, onFailed);

  const setDiscussion = (load) => {
    const payload = {
      userId: techApplicantId,
      discussionDate: load.interviewDate,
      interviewLink: load.interviewLink,
    };

    setDiscussionDate(payload);
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
      name: "examDate",
      label: "Exam Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "grade",
      label: "Grade",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value}
            color={
              value.toLowerCase() === "passed"
                ? "success"
                : value.toLowerCase() === "skipped"
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
              name: "Set Discusion Date",
              action: () => {
                openDiscussion(value);
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
          data={applicantMcqResult?.data}
          options={{
            filter: false,
            search: false,
            viewColumns: false,
            print: false,
            download: false,
            selectableRows: "none",
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 10],
          }}
        />
      )}
      {!isLoading && applicantMcqResult?.data?.length === 0 && (
        <p className="text-center">There are no applicants in this stage</p>
      )}
      {showOpenDiscussion && (
        <SetInterviewDate
          interviewType={"interview"}
          isOpen={showOpenDiscussion}
          closeModal={closeDiscussion}
          applicantId={techApplicantId}
          setInterview={setDiscussion}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
};

export default TechStage2;
