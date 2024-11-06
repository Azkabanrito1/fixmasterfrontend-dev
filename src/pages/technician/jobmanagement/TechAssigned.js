import React, { useState } from "react";
import {
  useAcceptOrRejectJob,
  useGetCollaboratorJobs,
  useGetJobDetails,
} from "../../../hooks/useQueries/useJobs";
import { useSnackbar } from "notistack";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import UnassignedJobDetails from "../../../components/csecomponent/cse/dashboardComponent/jobs/UnassignedJobDetails";
import { format } from "date-fns";
import { jobTypes } from "../../../utils/selectOptions";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../../components/globalcomponents/DateFilterToolbar";

const TechAssignedJob = () => {
  const [openJobModal, setOpenJobModal] = useState(false);
  const [fixId, setFixId] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const { data: technicianAssignedJobsData, isLoading } =
    useGetCollaboratorJobs(jobTypes.unAccepted);

  const { data: fixDetailsData } = useGetJobDetails(fixId, {
    enabled: !!fixId,
  });

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "scheduleDate",
    technicianAssignedJobsData?.data
  );

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const onSuccessRejection = (response) => {
    enqueueSnackbar(response.message, {
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
  const unassignedJobsColumns = [
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
      name: "bookingClass",
      label: "Booking Type",
    },
    {
      name: "bookingCategory",
      label: "Job Category",
    },
    {
      name: "bookingType",
      label: "Service Type",
    },
    {
      name: "scheduleDate",
      label: "Date Booked",
      options: {
        customBodyRender: (value, meta) =>
          !!value &&
          format(
            new Date(
              `${value.slice(0, 10)}T${
                technicianAssignedJobsData?.data?.[meta.rowIndex]?.scheduleTime
              }`
            ),
            "dd-MM-yyyy hh:mm a"
          ),
      },
    },

    {
      name: "fixId",
      label: "Actions",
      options: {
        customBodyRender: (value) => {
          const acceptPayload = {
            fixId: value,
            role: "Technician",
            action: "Accepted",
          };
          const rejectPayload = {
            fixId: value,
            role: "Technician",
            action: "Rejected",
          };
          const actions = [
            {
              id: 1,
              name: "View Job",
              action: () => {
                setOpenJobModal(true);
                setFixId(value);
              },
              disabled: false,
            },
            {
              id: 2,
              name: "Accept Job",
              action: () => {
                acceptJob(acceptPayload);
              },
              disabled: false,
            },
            {
              id: 3,
              name: "Reject Job",
              action: () => {
                rejectJob(rejectPayload);
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
        <PageHeading>Assigned Jobs</PageHeading>
      </div>
      <div className="text-center">
        <GlobalBallBeat loading={isLoading} color="var(--clr-primary)" />
      </div>
      {!isLoading && (
        <GlobalTable
          columns={unassignedJobsColumns}
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

      {openJobModal && (
        <UnassignedJobDetails
          isOpen={openJobModal}
          closeModal={() => setOpenJobModal(false)}
          title="Assigned Job"
          jobs={fixDetailsData?.data}
        />
      )}
    </>
  );
};

export default TechAssignedJob;
