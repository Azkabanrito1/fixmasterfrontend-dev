import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import { useState } from "react";
import {
  useGetTechnicianApplicantStageTwo,
  useSetTechnicianInterview,
} from "../../../hooks/useQueries/useOnboarding";
import { format } from "date-fns";
import { Chip } from "@mui/material";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import { useSnackbar } from "notistack";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import SetInterviewDate from "../../../components/globalcomponents/modals/SetInterviewDate";
import ViewFirstMCQModal from "../../../components/onboardingcomponents/cseonboarding/modal/ViewFirstMCQmodal";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../../components/globalcomponents/DateFilterToolbar";

const StageTwo = () => {
  const [openMCQModal, setOpenMCQModal] = useState(false);
  const [showOpenDiscussion, setShowOpenDiscussion] = useState(false);
  const [techApplicant, setTechApplicant] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const getActiveTech = (applicantId) =>
    applicantMcqResult?.data?.filter(
      (applicant) => applicant.userId === applicantId
    );
  const viewMCQResult = (id) => {
    const applicant = getActiveTech(id);
    setTechApplicant(applicant);
    setOpenMCQModal(true);
  };
  const closeMCQ = () => {
    setOpenMCQModal(false);
    setTechApplicant([]);
  };

  const openDiscussion = (userId) => {
    const applicant = getActiveTech(userId);
    setTechApplicant(applicant[0]);
    setShowOpenDiscussion(true);
  };

  const closeDiscussion = (userId) => {
    setTechApplicant(userId);
    setShowOpenDiscussion(false);
  };
  //--------------fetching data--------------------
  const { data: applicantMcqResult, isLoading } =
    useGetTechnicianApplicantStageTwo();

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "examDate",
    applicantMcqResult?.data
  );

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
      userId: techApplicant?.userId,
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
      name: "technicianCategory",
      label: "Category",
      options: {
        customBodyRender: (value) => {
          const categories = value?.map((cat) => {
            return cat.categoryName;
          });
          return <span>{categories?.join(", ")}</span>;
        },
      },
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
              value?.toLowerCase() === "passed"
                ? "success"
                : value?.toLowerCase() === "skipped"
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
              id: 0,
              name: "View MCQ Result",
              action: () => viewMCQResult(value),
              disabled: false,
            },
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
          data={filteredResults}
          options={{
            elevation: 0,
            selectableRows: "none",
            rowsPerPage: 20,
            rowsPerPageOptions: [20, 50, 100],
            customToolbar: () => (
              <DateFilterToolbar
                dateQueries={dateQueries}
                setDateQueries={setDateQueries}
              />
            ),
          }}
        />
      )}
      {!isLoading && applicantMcqResult?.data?.length === 0 && (
        <p className="text-center">There are no applicants in this stage</p>
      )}
      {showOpenDiscussion && (
        <SetInterviewDate
          isOpen={showOpenDiscussion}
          closeModal={closeDiscussion}
          setInterview={setDiscussion}
          isSubmitting={isSubmitting}
          address={"Meeting Link"}
          interviewType={"readiness"}
        />
      )}
      {openMCQModal && (
        <ViewFirstMCQModal
          open={openMCQModal}
          close={closeMCQ}
          headerText={`MCQ RESULT`}
          data={techApplicant}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default StageTwo;
