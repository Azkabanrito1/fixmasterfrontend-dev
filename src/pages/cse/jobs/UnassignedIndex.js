import {
  PageHeading,
  BackBtn,
} from "../../../components/globalcomponents/Utilities";
import {
  useAcceptOrRejectJob,
  useGetCseAndTechNewJobs,
  useGetJobDetails,
} from "../../../hooks/useQueries/useJobs";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import { useState } from "react";
import { useSnackbar } from "notistack";
import UnassignedJobDetails from "../../../components/csecomponent/cse/dashboardComponent/jobs/UnassignedJobDetails";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import useDateQueries from "../../../hooks/useDateQueries";
import useDateFilter from "../../../hooks/useDateFilter";
import DateFilterToolbar from "../../../components/globalcomponents/DateFilterToolbar";

const UnassignedIndex = () => {
  const [openJobModal, setOpenJobModal] = useState(false);
  const [fixId, setFixId] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  //---------------------------------data fetching----------------------------------------------------
  const { data: newJobsData, isLoading } = useGetCseAndTechNewJobs();
  const { data: fixDetailsData } = useGetJobDetails(fixId, {
    enabled: !!fixId,
  });

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "jobDateCreated",
    newJobsData?.data
  );

  const onSuccess = () => {
    enqueueSnackbar("Job accepted successfully", {
      variant: "success",
    });
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  //-------------------------------------------------modal controller ----------------------------------------
  const openJobModalHandler = (id) => {
    setFixId(id);
    setOpenJobModal(true);
  };
  const closeJobModalHandler = () => {
    setFixId(null);
    setOpenJobModal(false);
  };

  const { mutate: acceptJob } = useAcceptOrRejectJob(onSuccess, onFailure);
  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableIndex) => tableIndex.rowIndex + 1,
      },
    },
    {
      name: "fixNumber",
      label: "Fix ID",
      options: {
        customBodyRender: (value) => value?.split("-")[1],
      },
    },
    {
      name: "distanceToFixLocation",
      label: "Distance To Me",
      options: {
        customBodyRender: (value) =>
          `${Math.trunc(value).toLocaleString("en-US")}m`,
      },
    },
    {
      name: "jobType",
      label: "Booking Type",
    },
    {
      name: "jobDateCreated",
      label: "Booking Date",
    },
    { name: "jobCategory", label: "Job Category" },
    { name: "jobClass", label: "Service Type" },
    {
      name: "jobId",
      label: "Actions",
      options: {
        customBodyRender: (value) => {
          const payload = {
            fixId: value,
            role: "CSE",
            action: "CSE Accepted",
          };

          const actions = [
            {
              id: 2,
              name: "Accept Job",
              action: () => {
                acceptJob(payload);
              },
              disabled: false,
            },
            {
              id: 3,
              name: "View Details",
              action: () => {
                openJobModalHandler(value);
              },
              disabled: false,
            },
          ];
          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="jobId" />
            </div>
          );
        },
      },
    },
  ];
  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Unassigned Jobs</PageHeading>
      </div>
      <div className="text-center">
        <GlobalBallBeat loading={isLoading} color="var(--clr-primary)" />
      </div>

      <GlobalTable
        columns={columns}
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
      {openJobModal && (
        <UnassignedJobDetails
          isOpen={openJobModal}
          closeModal={closeJobModalHandler}
          title="Unassigned Jobs"
          jobs={fixDetailsData?.data}
        />
      )}
    </>
  );
};

export default UnassignedIndex;
