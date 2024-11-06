import {
  PageHeading,
  BackBtn,
} from "../../../components/globalcomponents/Utilities";
import {
  useGetCseAndTechNewJobs,
  useGetJobDetails,
  useTechnicianShowInterest,
} from "../../../hooks/useQueries/useJobs";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import { useState } from "react";
import { useSnackbar } from "notistack";
import UnassignedJobDetails from "../../../components/csecomponent/cse/dashboardComponent/jobs/UnassignedJobDetails";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../../components/globalcomponents/DateFilterToolbar";

const TechUnassignedJobs = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [jobId, setJobId] = useState("");
  const [viewJob, setViewJob] = useState(false);

  const viewJobHandler = (id) => {
    setViewJob(true);
    setJobId(id);
  };

  const closeJobDetails = () => {
    setViewJob(false);
  };
  //----------------------------data fetching------------------------
  const { data: technicianNewJobsData, isLoading } = useGetCseAndTechNewJobs();
  const { data: fixDetailsData } = useGetJobDetails(jobId, {
    enabled: !!jobId,
  });

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "jobDateCreated",
    technicianNewJobsData?.data
  );

  const onSuccess = () => {
    enqueueSnackbar("Success", {
      variant: "success",
    });
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: signifyJob } = useTechnicianShowInterest(
    onSuccess,
    onFailure
  );

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableIndex) => tableIndex.rowIndex + 1,
      },
    },
    {
      name: "jobId",
      label: "Fix ID",
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
          const actions = [
            {
              id: 1,
              name: "Signify for Job",
              action: () => {
                signifyJob(value);
              },
              disabled: false,
            },
            {
              id: 2,
              name: "View Details",
              action: () => {
                viewJobHandler(value);
              },
              disabled: false,
            },
          ];
          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="fixId" />
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

      {viewJob && (
        <UnassignedJobDetails
          isOpen={viewJob}
          closeModal={closeJobDetails}
          title="Unassigned Job"
          jobs={fixDetailsData?.data}
        />
      )}
    </>
  );
};

export default TechUnassignedJobs;
