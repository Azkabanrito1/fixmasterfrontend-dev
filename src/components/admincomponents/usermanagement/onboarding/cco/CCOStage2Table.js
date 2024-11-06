import GlobalBallBeat from "../../../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../../../globalcomponents/GlobalTable";
import { useGetCCOSecondApplicants } from "../../../../../hooks/useQueries/useOnboarding";
import { useState } from "react";
import { Chip } from "@mui/material";
import { format } from "date-fns";
import ViewFirstMCQModal from "../../../../onboardingcomponents/cseonboarding/modal/ViewFirstMCQmodal";
import GlobalTableActions from "../../../../globalcomponents/GlobalTableActions";
import useDateFilter from "../../../../../hooks/useDateFilter";
import useDateQueries from "../../../../../hooks/useDateQueries";
import DateFilterToolbar from "../../../../globalcomponents/DateFilterToolbar";

const CCOStage2Table = () => {
  const [openMCQModal, setOpenMCQModal] = useState(false);
  const [activeApplicant, setActiveApplicant] = useState({});

  const { data: ccoApplicants, isLoading } = useGetCCOSecondApplicants();

  const stage2Applicants = ccoApplicants?.data?.map((applicant, index) => ({
    ...applicant,
    sn: index + 1,
  }));
  const getActiveApplicants = (applicantId) => {
    return stage2Applicants?.filter(
      (applicant) => applicant.userId === applicantId
    );
  };

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "examDate",
    stage2Applicants
  );

  const viewMCQResult = (id) => {
    const applicant = getActiveApplicants(id);
    setActiveApplicant(applicant);
    setOpenMCQModal(true);
  };
  const closeMCQ = () => {
    setOpenMCQModal(false);
    setActiveApplicant([]);
  };

  const columns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        filter: false,
        searchable: false,
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
      name: "examScore",
      label: "Exam Score",
    },

    {
      name: "grade",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value}
            color={value?.toLowerCase() === "passed" ? "success" : "error"}
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
              name: "View Result",
              action: () => viewMCQResult(value),
              disabled: false,
            },
          ];
          return <GlobalTableActions actions={actions} id="userId" />;
        },
      },
    },
  ];

  return (
    <div>
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && stage2Applicants?.length > 0 && (
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
      {openMCQModal && (
        <ViewFirstMCQModal
          open={openMCQModal}
          close={closeMCQ}
          headerText={`MCQ RESULT`}
          data={activeApplicant}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default CCOStage2Table;
