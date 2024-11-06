import {
  PageHeading,
  BackBtn,
} from "../../../components/globalcomponents/Utilities";
import JobsDetails from "../../../components/csecomponent/cse/dashboardComponent/jobs/completed/JobsDetails";
import { useGetCollaboratorJobs } from "../../../hooks/useQueries/useJobs";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import { format } from "date-fns";
import { useState } from "react";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import { jobTypes } from "../../../utils/selectOptions";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../../components/globalcomponents/DateFilterToolbar";

const RejectedJob = () => {
  const [openJobModal, setOpenJobModal] = useState(false);
  const [fixId, setFixId] = useState("");
  const { data: rejectedJobs, isLoading } = useGetCollaboratorJobs(
    jobTypes.rejected
  );

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "rejectedDate",
    rejectedJobs?.data
  );

  const openJobDetails = (id) => {
    setOpenJobModal(true);
    setFixId(id);
  };
  const closeJobDetails = (id) => {
    setOpenJobModal(false);
    setFixId(id);
  };
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
      name: "rejectedDate",
      label: "Rejection Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },

    {
      name: "fixId",
      label: "-------",
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
        <PageHeading>Rejected Jobs</PageHeading>
      </div>

      <div className="text-center">
        <GlobalBallBeat loading={isLoading} color="var(--clr-primary)" />
      </div>
      {!isLoading && (
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
      )}

      {openJobModal && (
        <JobsDetails
          isOpen={openJobModal}
          closeModal={closeJobDetails}
          title="Rejected Jobs"
          jobId={fixId}
          jobs={rejectedJobs?.data}
        />
      )}
    </>
  );
};

export default RejectedJob;
