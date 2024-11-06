import { useState } from "react";
import {
  PageHeading,
  BackBtn,
} from "../../../components/globalcomponents/Utilities";
import { useGetCollaboratorJobs } from "../../../hooks/useQueries/useJobs";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import JobsDetails from "../../../components/csecomponent/cse/dashboardComponent/jobs/completed/JobsDetails";
import { format } from "date-fns";
import { jobTypes } from "../../../utils/selectOptions";
import DateFilterToolbar from "../../../components/globalcomponents/DateFilterToolbar";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";

const TechWarrantyJobs = () => {
  const [openJobModal, setOpenJobModal] = useState(false);
  const [fixId, setFixId] = useState("");

  const { data: warrantyJobs, isLoading } = useGetCollaboratorJobs(
    jobTypes.warrantyClaims
  );

  const [selectedDate, setSelectedDate] = useState("dateCreated");

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    selectedDate,
    warrantyJobs?.data
  );

  const openJobDetails = (id) => {
    setOpenJobModal(true);
    setFixId(id);
  };
  const closeJobDetails = (id) => {
    setOpenJobModal(false);
    setFixId(id);
  };
  const warrantyJobsColumns = [
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
            <span
              tabIndex={0}
              className="text-danger fw-bold"
              id="fixId"
              style={{ cursor: "pointer" }}
              onClick={() => {
                openJobDetails(value);
              }}
            >
              View details
            </span>
          );
        },
      },
    },
  ];
  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Warranty Jobs</PageHeading>
      </div>
      <div className="text-center">
        <GlobalBallBeat loading={isLoading} color="var(--clr-primary)" />
      </div>
      {!isLoading && (
        <GlobalTable
          columns={warrantyJobsColumns}
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
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                firstDate="dateCreated"
                secondDate="scheduleDate"
              />
            ),
          }}
        />
      )}

      {openJobModal && (
        <JobsDetails
          isOpen={openJobModal}
          closeModal={closeJobDetails}
          title="Warranty Jobs"
          jobId={fixId}
          jobs={warrantyJobs.data}
        />
      )}
    </>
  );
};

export default TechWarrantyJobs;
