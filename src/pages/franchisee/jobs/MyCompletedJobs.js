import {
  PageHeading,
  BackBtn,
} from "../../../components/globalcomponents/Utilities";
import { useState } from "react";
import JobsDetails from "../../../components/csecomponent/cse/dashboardComponent/jobs/completed/JobsDetails";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import { useGetCollaboratorJobs } from "../../../hooks/useQueries/useJobs";
import { format } from "date-fns";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import { jobTypes } from "../../../utils/selectOptions";

const MyCompletedJobs = () => {
  const [openJobModal, setOpenJobModal] = useState(false);
  const [fixId, setFixId] = useState("");
  const { data: completedJobs, isLoading } = useGetCollaboratorJobs(
    jobTypes.completed
  );

  const openJobDetails = (id) => {
    setOpenJobModal(true);
    setFixId(id);
  };
  const closeJobDetails = () => {
    setOpenJobModal(false);
  };
  const completedJobsColumns = [
    {
      name: "fixNumber",
      label: "Fix ID",
      options: {
        customBodyRender: (value) => value?.split("-")[1],
      },
    },
    {
      name: "bookingClass",
      label: "Job Class",
    },
    {
      name: "bookingCategory",
      label: "Job Category",
    },
    {
      name: "bookingType",
      label: "Job Type",
    },
    {
      name: "dateCreated",
      label: "Date Booked",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "scheduleDate",
      label: "Date Accepted",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "fixId",
      label: "Actions",
      options: {
        customBodyRender: (value) => {
          return (
            <a
              href={"#"}
              className="text-danger fw-bold"
              id="fixId"
              style={{ cursor: "pointer" }}
              onClick={() => {
                openJobDetails(value);
              }}
            >
              View details
            </a>
          );
        },
      },
    },
  ];
  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Completed Jobs</PageHeading>
      </div>

      <div className="text-center">
        <GlobalBallBeat loading={isLoading} color="var(--clr-primary)" />
      </div>
      {!isLoading && (
        <GlobalTable
          columns={completedJobsColumns}
          data={completedJobs?.data}
          options={{
            elevation: 0,
            selectableRows: "none",
            rowsPerPage: 20,
            rowsPerPageOptions: [20, 50, 100],
          }}
        />
      )}

      {openJobModal && (
        <JobsDetails
          isOpen={openJobModal}
          closeModal={closeJobDetails}
          title="Completed Jobs"
          jobId={fixId}
          jobs={completedJobs?.data}
        />
      )}
    </>
  );
};

export default MyCompletedJobs;
