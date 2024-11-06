import React, { useState } from "react";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import {
  useAcceptOrRejectJob,
  useGetCollaboratorJobs,
} from "../../../hooks/useQueries/useJobs";
import { jobTypes } from "../../../utils/selectOptions";
import UnassignedJobDetails from "../../../components/csecomponent/cse/dashboardComponent/jobs/UnassignedJobDetails";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import DateFilterToolbar from "../../../components/globalcomponents/DateFilterToolbar";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";

const UnAcceptedJobs = () => {
  const [openJobModal, setOpenJobModal] = useState(false);
  const [activeJob, setActiveJob] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  // -----------------------------data fetching--------------------------------
  const { data: newJobsData, isLoading } = useGetCollaboratorJobs(
    jobTypes.unAccepted
  );

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "dateCreated",
    newJobsData?.data
  );

  const getActiveJob = (fixId) =>
    newJobsData?.data?.filter((item) => item.fixId === fixId);

  const showJobDetails = (id) => {
    const jobDetails = getActiveJob(id);
    setActiveJob(jobDetails[0]);
    setOpenJobModal(true);
  };

  //---------------------------mutate and mutate fn--------------------------------------------------------
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
  const onSuccessRejection = () => {
    enqueueSnackbar("Job rejected successfully", {
      variant: "success",
    });
  };
  const onFailureRejection = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: acceptJob } = useAcceptOrRejectJob(onSuccess, onFailure);
  const { mutate: rejectJob } = useAcceptOrRejectJob(
    onSuccessRejection,
    onFailureRejection
  );

  const columns = [
    {
      name: "S/N",
      options: {
        customBodyRender: (_, meta) => meta.rowIndex + 1,
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
      name: "dateCreated",
      label: "Booked Date",
      options: {
        customBodyRender: (value) =>
          !!value ? format(new Date(value), "dd-MM-yyyy hh:mm a") : "N/A",
      },
    },
    {
      name: "scheduleDate",
      label: "Scheduled Fix Date",
      options: {
        customBodyRender: (value, meta) => {
          if (!!value) {
            return format(
              new Date(
                `${value.slice(0, 10)}T${
                  newJobsData?.data?.[meta.rowIndex]?.scheduleTime
                }`
              ),
              "dd-MM-yyyy hh:mm a"
            );
          } else {
            return "N/A";
          }
        },
      },
    },
    {
      name: "fixId",
      label: "Actions",
      options: {
        customBodyRender: (value) => {
          const payload = {
            fixId: value,
            role: "CSE",
            action: "Accepted",
          };
          const payloads = {
            fixId: value,
            role: "CSE",
            action: "Rejected",
          };
          const actions = [
            {
              id: 1,
              name: "View Job",
              action: () => showJobDetails(value),
              disabled: false,
            },
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
              name: "Reject Job",
              action: () => {
                rejectJob(payloads);
              },
              disabled: false,
            },
          ];
          return <GlobalTableActions actions={actions} id="fixId" />;
        },
      },
    },
  ];

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>UnAccepted Jobs</PageHeading>
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
          closeModal={() => setOpenJobModal(false)}
          title="Unaccepted Jobs"
          jobs={activeJob}
        />
      )}
    </>
  );
};

export default UnAcceptedJobs;
